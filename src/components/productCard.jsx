export default function ProductCard(props){

    console.log(props.name)

    return(
        <div className = "bg-green-500 border w-[500px]" >
          <h1 className = "text-white text-[50px]">{props.name}</h1>
          <img src ={props.image} alt = {props.name} />
          <p>{props.price}</p>
          <button>Buy Now</button>
        </div>
    )
}