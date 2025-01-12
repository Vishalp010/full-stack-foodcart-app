"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { removeFromCart } from "@/app/features/cartmanager/cartManagerSlice";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.carts);

  // Calculate the subtotal (sum of all item totalPrices)
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Tax and shipping details
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 50; // Fixed shipping charge

  // Total price (subtotal + tax + shipping)
  const totalPrice = subtotal + tax + shipping;

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Grid layout for larger screens */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
                >
                  {/* Item details */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.strMeal}</h2>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} x {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Total: ₹{item.totalPrice}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-600 text-white text-sm px-4 py-2"
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Right Section: Cart Summary */}
          {cartItems.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
              <div className="space-y-2">
                <p className="text-lg">Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p className="text-lg">Tax (10%): ₹{tax.toFixed(2)}</p>
                <p className="text-lg">Shipping: ₹{shipping.toFixed(2)}</p>
                <hr />
                <p className="text-xl font-semibold">
                  Total Price: ₹{totalPrice.toFixed(2)}
                </p>
              </div>
              <Button className="w-full bg-green-600 text-white mt-4">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
