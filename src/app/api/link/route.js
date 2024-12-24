import link from "@/lib/models/link";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectMongoDB();

    const links = await link.find().sort({ _id: -1 });
    return NextResponse.json({
      statusCode: 200,
      data: links,
    });
  } catch (err) {
    return NextResponse.json({
      statusCode: 500,
      message: "An error occurred while connecting to MongoDB",
      error: err.message,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    await connectMongoDB();
    await link.create(data);

    return NextResponse.json(data);
  } catch (e) {
    NextResponse.json({
      statusCode: 500,
      message: "An error occurred while processing your request",
      error: e.toString(),
    });
  }
};
