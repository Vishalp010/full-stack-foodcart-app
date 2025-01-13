import { connect } from '@/dbConfig/dbConfig';
import { UserModel as User } from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await connect(); // Ensure DB connection

  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
