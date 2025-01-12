// app/api/menu/getmenu/route.ts
import { connect } from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'
import { MenuModel as Menu } from '@/models/userModel'

connect()

export async function GET() {
  try {
    const menuItems = await Menu.find() // Fetch all menu items from the DB

    if (!menuItems) {
      return NextResponse.json({ error: 'No menu items found' }, { status: 404 })
    }

    return NextResponse.json(menuItems)

  } catch (error:any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
