import mongoose, { Schema, Document } from "mongoose";

// User Interface
export interface IUser extends Document {
  username: string;
  password: string;
}

// Menu Interface
export interface IMenu extends Document {
  name: string;
  category: string;
  price: number;
  availability: boolean;
}

// Order Interface
export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: {
    menuItem: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Completed";
  createdAt: Date;
}

// User Schema
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

// Menu Schema
const MenuSchema = new Schema<IMenu>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

// Order Schema
const OrderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Models
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const MenuModel = mongoose.models.Menu || mongoose.model<IMenu>("Menu", MenuSchema);
export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
