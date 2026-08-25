import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-white flex items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-2xl min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center">

                <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-gray-200 leading-none">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-3 sm:mt-4">
                    Page Not Found
                </h2>

                <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md px-2">
                    Sorry, the page you are looking for doesn't exist or may have been moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 sm:mt-8 px-6 py-2.5 sm:px-7 sm:py-3 bg-blue-500 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200"
                >
                    Go Home
                </Link>

            </div>
        </div>
    )
}