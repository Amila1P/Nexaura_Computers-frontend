const exampleCart = [
    {
        product:{
            productId: "123",
            productName: "Example Product",
            image: "https://placeholder.com",
            labelledPrice: 29.99,
            price: 19.99,
        },
        quantity: 2
    },
    {
        product:{
            productId: "456",
            productName: "Another Product",
            image: "https://placeholder.com",
            labelledPrice: 49.99,
            price: 39.99,
        },
        quantity: 1
    }
];

export function getCart(){
    const cartString = localStorage.getItem("cart");
    if(cartString == null){
         localStorage.setItem("cart", "[]");
         return [];
    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity){
    const cart = getCart().map((item) => {
        if (item.product) {
            return item;
        }

        return {
            product: {
                productId: item.productId,
                productName: item.productName,
                image: item.image,
                labelledPrice: item.labelledPrice,
                price: item.price,
            },
            quantity: item.quantity,
        };
    });

    const existingProductIndex = cart.findIndex(item => item.product.productId === product.productId);
    
    if (existingProductIndex === -1) {
        if (quantity > 0) {
            cart.push({
                product: {
                    productId: product.productId,
                    productName: product.name || product.productName,
                    image: product.images?.[0] || product.image || "",
                    labelledPrice: product.labelledPrice,
                    price: product.price,
                },
                quantity: quantity
            });
        }
    } else {
        const newQty = cart[existingProductIndex].quantity + quantity;
        if (newQty > 0) {
            cart[existingProductIndex].quantity = newQty;
        } else {
            cart.splice(existingProductIndex, 1);
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}
