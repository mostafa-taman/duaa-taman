import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});



export const GET = async () => {
    const data = await cloudinary.api
        .resources({ resource_type: "image", type: "upload", prefix: "script", format: "pdf", invalidate: true, cache: false }, function (error, result) {
            if (result) return result;
            if (error) throw new Error(error.message);
        })
        .catch(() => { throw new Error("Failed to make Cloudinary request"); });

    return NextResponse.json(data, {
        headers: {
            "Cache-Control": "no-store, max-age=0",
        },
    });
};