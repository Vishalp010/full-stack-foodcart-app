/* eslint-disable @typescript-eslint/no-unused-vars */
import {connect} from '@/dbConfig/dbConfig'
import { UserModel as User } from '@/models/userModel';
import bcryptjs from 'bcryptjs'
import { NextResponse,NextRequest } from 'next/server'


connect()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    // Check if username is provided and meets the requirements
    if (!username || username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters long" }, { status: 400 });
    }

    // Check if password is provided and meets the length requirement
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "New user created successfully",
      success: true,
      savedUser,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
