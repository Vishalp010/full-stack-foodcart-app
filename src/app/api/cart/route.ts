import { NextApiRequest, NextApiResponse } from "next";
import { OrderModel as Order } from "@/models/orderModel"; // Separate import for Order model
import { MenuModel as Menu } from "@/models/menuModel"; // Separate import for Menu model
import { connectToDatabase } from "@/dbConfig/dbConfig"; // Assuming this is your DB connection helper
import mongoose from "mongoose";

// API handler for adding to cart and placing orders
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, menuItemId, quantity } = req.body;

    // Validate input
    if (!userId || !menuItemId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    try {
      // Connect to the database
      await connectToDatabase();

      // Fetch the menu item details
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem || !menuItem.availability) {
        return res.status(404).json({ message: "Item not available" });
      }

      // Calculate total price
      const totalPrice = menuItem.price * quantity;

      // Create the order
      const order = new Order({
        userId: new mongoose.Types.ObjectId(userId),
        items: [{ menuItem: menuItem._id, quantity }],
        totalAmount: totalPrice,
        status: "Pending",
        createdAt: new Date(),
      });

      // Save the order
      await order.save();

      return res.status(200).json({ message: "Item added to cart", order });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};
