"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/features/cartmanager/cartManagerSlice"; // Redux action to add item to cart
import {Toaster,toast} from "react-hot-toast"

const CardDetails = () => {
  const card = useSelector((state: RootState) => state.selectedCard.card);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fixed price for each item
  const fixedPrice = 50;

  // State to store quantity and total price
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(fixedPrice); // Initialize with fixed price * 1 quantity

  // Update total price whenever quantity changes
  useEffect(() => {
    setTotalPrice(fixedPrice * quantity);
  }, [quantity]);

  const handleAddToCart = () => {
    try {
      // Prepare the meal data with the fixed price and quantity
      const mealData = {
        strMeal: card?.strMeal,
        strMealThumb: card?.strMealThumb,
        idMeal: card?.idMeal,
        price: fixedPrice,
        quantity: quantity, // Include quantity in the data
        totalPrice: fixedPrice * quantity, // Total price based on fixed price and quantity
      };
      toast.success("item added successfully");
      // Update the Redux store with the meal data
      dispatch(addToCart(mealData)); // Dispatch the meal data to Redux store
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  // Redirect to home if no card is found
  if (!card) {
    router.push("/home"); // Redirect to homepage
    return <p>Redirecting...</p>;
  }

  // Handle quantity increase/decrease
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(prev + delta, 1)); // Ensure quantity is at least 1
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{card.strMeal}</h1>
        <img
          src={card.strMealThumb}
          alt={card.strMeal}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">
          This dish {card.strMeal} is a delightful blend of flavors, combining fresh ingredients and unique spices to create a mouthwatering experience. Whether vegetarian or non-vegetarian, it offers a satisfying balance of textures and tastes that will leave you craving more. Perfectly cooked and artfully presented, it's a true culinary masterpiece that reflects both tradition and creativity in every bite.
        </p>
      </div>

      {/* New Section below the card */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
        {/* Displaying Fixed Price */}
        <p className="text-xl font-semibold text-green-600">₹{fixedPrice}</p>

        {/* Quantity Control */}
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={() => handleQuantityChange(-1)}>-</Button>
          <span className="text-lg">{quantity}</span>
          <Button onClick={() => handleQuantityChange(1)}>+</Button>
        </div>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="mt-4">
          Add to Cart
        </Button>
        <Toaster/>
        {/* Show Total Price */}
        <p className="mt-4 text-xl font-semibold">Total Price: ₹{totalPrice}</p>
      </div>
    </div>
  );
};

export default CardDetails;
