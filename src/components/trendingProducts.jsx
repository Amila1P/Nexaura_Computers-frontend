import ProductCard from "./productCard.jsx"

export default function TrendingProducts() {
    return (
        <div>
            <h1>Trending Products</h1>

            <ProductCard 
                name="Mac book Air" 
                price ="150 000.00" 
                image="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
            />
            
            <ProductCard 
                name="Mac book Pro" 
                price ="200 000.00" 
                image="https://fastly.picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I"
            />
            
            <ProductCard 
                name="Mac book Max" 
                price ="250 000.00" 
                image="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
            />


        </div>
    )
}