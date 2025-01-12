import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { MenuModel as Menu } from '@/models/userModel';

// Ensure MongoDB connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();

    // Validate the incoming data (optional but recommended)
    if (!data.name || !data.category || !data.price || typeof data.availability === 'undefined') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new menu item
    const newMenuItem = new Menu({
      name: data.name,
      category: data.category,
      price: data.price,
      availability: data.availability,
    });

    // Save the new menu item to the database
    await newMenuItem.save();

    // Return success response
    return NextResponse.json(
      { message: 'Menu item added successfully' },
      { status: 200 }
    );
  } catch (error:any) {
    // Handle any errors
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
