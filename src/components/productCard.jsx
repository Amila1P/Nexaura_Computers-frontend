import {Link} from "react-router-dom"
import getFormattedPrice from "../utils/priceFormat";

export default function ProductCard(props){

    const product = props.product;

    return(
        <Link
            to={"/overview/"+product.productId}
            state={{product}}
            className="w-[calc(50vw-18px)] sm:w-[280px] lg:w-[300px] h-[300px] sm:h-[390px] lg:h-[450px] m-2 sm:m-4 lg:m-10 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 cursor-pointer"
        >
            <div className="w-full h-[180px] sm:h-[240px] lg:w-[300px] lg:h-[300px] flex items-center justify-center bg-gray-100 relative shrink-0">
                <img
                    src={product.images[1]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0"
                />

                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500"
                />
            </div>

            <h1 className="text-sm sm:text-lg font-semibold mt-2 px-2 line-clamp-2">
                {product.name}
            </h1>

            <div className="w-full flex flex-col py-1 sm:py-2">
                {
                    product.labelledPrice > product.price &&
                    <span className="text-xs sm:text-sm font-bold text-red-500 px-3 sm:px-4 mt-1 line-through">
                        {getFormattedPrice(product.labelledPrice)}
                    </span>
                }

                <span className="text-sm sm:text-lg font-bold text-green-500 px-3 sm:px-4 mt-1">
                    {getFormattedPrice(product.price)}
                </span>
            </div>
        </Link>
    )
}