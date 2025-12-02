import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import WaitlistUser from "@/lib/db/models/WaitlistUser";
import { registerUserInEventor } from "@/lib/services/eventor";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, lastName, idNumber, birthDate, email, phone, botField } =
      body;

    if (botField && botField.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Request blocked" },
        { status: 400 }
      );
    }

    // Basic validation
    if (!name || !lastName || !idNumber || !birthDate || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const user = await WaitlistUser.create({
      name,
      lastName,
      idNumber,
      birthDate,
      email,
      phone,
    });

    // Register in Eventor (External API)
    // We don't block the response if this fails, or maybe we do?
    // For now, let's await it to ensure consistency.
    try {
      await registerUserInEventor({
        name,
        lastName,
        idNumber,
        birthDate,
        email,
        phone,
        externalRef: user._id,
      });
    } catch (error) {
      console.error("Failed to register in Eventor:", error);
      // We might want to mark the user as "synced: false" in DB if this fails
    }

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error("Error in waitlist API:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
