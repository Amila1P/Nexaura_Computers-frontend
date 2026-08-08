export default function ProductCard(props){

    const product = props.product;

    return(
        <Link to="/overview" className = "bg-green-500 border w-[300px] h-[400px] m-10 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 border justify-between cursor-pointer">
          <div className = "w-[300px] h-[300px] flex items-center justify-center bg-gray-100 relative">
                <img src={product.images[1]} alt={product.productName} className="w-[300px] h-[300px] object-cover absolute top-0 left-0 "/>
                <img src={product.images[0]} alt={product.productName} className="w-[300px] h-[300px] object-cover absolute top-0 left-0 primary-image transition-opacity duration-500 "/>
          </div>
          <h1 className="text-lg font-semibold mt-2 px-2">{product.name}</h1>
          <div className = "w-full flex flex-col py-4 mt-2">
            {
                product.labelledPrice >product.price && <span className="text-sm font-bold text-red-500 px-4 mt-2 line-through">Rs {product.price}</span>
            }
            <span className= "text-lg font-bold text-green-500 px-4 mt-2">Rs {product.labelledPrice}</span>
          </div>
        </Link>
    )
}