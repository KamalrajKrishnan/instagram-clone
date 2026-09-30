import { useState } from "react";
const Course = (props) => {
  	const [isPurchased, setIsPurchased] = useState(false);
  	const [discount, setDiscount] = useState(0);

  	const handleBuyCourse = () => {
    	setIsPurchased(true);
  	};

  	const handleDiscount = (discountPercent) => {
    	const originalPrice = Number(props.price);
    	const discountedPrice = originalPrice - (originalPrice * discountPercent) / 100;
   	 	setDiscount(discountedPrice);
  	};

  	return (props.login && (
      	<div className="min-w-0 overflow-hidden rounded-md border border-gray-400 bg-yellow-50">        
        <img src={props.image} alt={props.name} className="h-24 w-full object-cover"/>

        <div className="flex min-h-[150px] flex-col p-3">

          	<h3 className="text-sm font-semibold text-gray-800">
            {props.name}</h3>

          	<p className="mt-1 text-xs text-gray-600">
            {props.tagline}</p>

          	<p className="mt-2 text-sm font-semibold text-gray-800">
            {discount > 0 ? `$${discount.toFixed(2)}` : `$${props.price}`}
          	</p>

          	<p className="mt-1 text-xs text-yellow-600">⭐ {props.ratings}</p>

          	<button
            	className="mt-2 border border-green-600 px-3 py-1 text-xs text-green-600 hover:bg-green-600 hover:text-white disabled:bg-green-600 disabled:text-white cursor-pointer"
            	onClick={handleBuyCourse}
            	disabled={isPurchased}>
				{isPurchased ? "✓ Purchased" : "Buy Now"}
          	</button>
          
          	<button className="mt-2 border border-sky-600 px-3 py-1 text-xs text-sky-600 hover:bg-sky-600 hover:text-white disabled:bg-sky-600 disabled:text-white cursor-pointer" onClick={() => handleDiscount(20)} disabled={isPurchased}
          	> Apply Discount</button>

			<button className="mt-2 border border-red-600 px-3 py-1 text-xs text-red-600 hover:bg-red-600 hover:text-white disabled:bg-red-600 disabled:text-white cursor-pointer" onClick={() => props.delete(props.id)}>Remove</button>

        </div>
	</div>
    )
  );
}

export default Course;