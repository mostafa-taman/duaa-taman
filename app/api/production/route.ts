import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});



export const GET = async () => {
    const data = await cloudinary.api
        .resources({ resource_type: "video", prefix: "video production", type: "upload", cache: false }, function (error, result) {
            if (result) return result;
            if (error) throw new Error(error.message);
        })
        .catch(() => { throw new Error("Failed to make Cloudinary request"); });

    return NextResponse.json(data);
};