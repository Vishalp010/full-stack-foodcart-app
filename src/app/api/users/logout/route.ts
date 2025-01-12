// import { NextResponse } from "next/server";
// import {connect} from "@/dbConfig/dbConfig"

// connect()
// export async function GET (){

//     try {
//       const response = NextResponse.json({message:"logout successful"},{status:200}) //hume ye nextresponse type ka isliy bnaaya h taaki ye cookies k saath interact kr ske kuk ye feature nextresponse me inbuilt hota h 
//       response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})   //"token","" this part of code is here use to set token a blank string which means empty timestamp 0 krke humne turant khtm krdiya
//       return response
//     } catch (error:any) {
//       return NextResponse.json({error:error.messsage},{status:500})
//     }


// }
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET() {
  try {
    const response = NextResponse.json({ message: "logout successful" }, { status: 200 });

    // Set the "token" cookie to an empty value to log the user out
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: unknown) { // Change to unknown type
    // Narrow down the error type using a type guard
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Handle non-Error cases
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
}
