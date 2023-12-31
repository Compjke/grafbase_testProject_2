import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const POST = async (req: Request) => {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 401 }
    );
  }

  try {
    const option = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [
        {
          width: 1000,
          height: 752,
          crop: "scale",
        },
      ],
    };

    const result = await cloudinary.uploader.upload(path, option);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
