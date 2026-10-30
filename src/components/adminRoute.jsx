import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api.js";

/**
 * Safely parse and validate the auth token stored in localStorage.
 * Checks structure, expiry, and admin privileges.
 */
function getAuthTokenData() {
    const token = localStorage.getItem("token");
    if (!token) {
        return { token: null, isValid: false, isAdmin: false };
    }

    try {
        const parts = token.split(".");
        if (parts.length !== 3) {
            localStorage.removeItem("token");
            return { token: null, isValid: false, isAdmin: false };
        }

        const payload = JSON.parse(atob(parts[1]));

        // Check token expiration
        if (payload?.exp && Date.now() >= payload.exp * 1000) {
            localStorage.removeItem("token");
            return { token: null, isValid: false, isAdmin: false };
        }

        // Support both isAdmin (camelCase) and is_admin (snake_case)
        const isAdmin = Boolean(payload?.isAdmin === true || payload?.is_admin === true);

        return { token, isValid: true, isAdmin, payload };
    } catch {
        localStorage.removeItem("token");
        return { token: null, isValid: false, isAdmin: false };
    }
}

/**
 * AdminRoute Component
 *
 * Secures all /admin/* routes:
 * 1. Immediate client-side check on token existence, expiry, and isAdmin flag to prevent UI flashing.
 * 2. Background verification against GET /users/me to ensure server-side validity.
 * 3. Securely redirects non-admin or unauthenticated users to the home page ("/").
 */
export default function AdminRoute({ children, user, setUser }) {
    const location = useLocation();
    const tokenData = getAuthTokenData();

    const [isAuthorized, setIsAuthorized] = useState(() => {
        // If context user exists, check that; otherwise check parsed token
        if (user) {
            return Boolean(user.isAdmin === true || user.is_admin === true);
        }
        return tokenData.isValid && tokenData.isAdmin;
    });

    const [hasCheckedServer, setHasCheckedServer] = useState(false);

    useEffect(() => {
        const currentTokenData = getAuthTokenData();

        if (!currentTokenData.isValid || !currentTokenData.token) {
            toast.error("Access denied. Please sign in as an administrator.");
            setIsAuthorized(false);
            setHasCheckedServer(true);
            return;
        }

        if (!currentTokenData.isAdmin) {
            toast.error("Access denied. Administrator privileges required.");
            setIsAuthorized(false);
            setHasCheckedServer(true);
            return;
        }

        // Verify with backend /users/me endpoint
        api.get("/users/me", {
            headers: { Authorization: "Bearer " + currentTokenData.token },
        }).then((res) => {
            const serverUser = res.data;
            const serverIsAdmin = Boolean(serverUser?.isAdmin === true || serverUser?.is_admin === true);

            if (serverIsAdmin) {
                setIsAuthorized(true);
                if (setUser) setUser(serverUser);
            } else {
                toast.error("Access denied. You do not have admin permissions.");
                setIsAuthorized(false);
            }
        }).catch((err) => {
            if (err?.response?.status === 401) {
                localStorage.removeItem("token");
                if (setUser) setUser(null);
            }
            toast.error("Session invalid or expired. Redirecting to home.");
            setIsAuthorized(false);
        }).finally(() => {
            setHasCheckedServer(true);
        });
    }, [location.pathname]);

    // Immediate gate: redirect if token is missing or not admin
    if (!tokenData.isValid || !tokenData.isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Server verification gate: redirect if server check failed
    if (hasCheckedServer && !isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return children;
}
