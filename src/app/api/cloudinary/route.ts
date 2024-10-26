import { uploadImage } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create an API route handler
export async function POST(request: Request) {
  const formData = await request.formData(); // Use formData to access the uploaded file
  const file = formData.get("file") as Blob; // Assuming the input name is 'file'
  const folder = formData.get("folder") as string; // If you want to specify a folder

  try {
    const imageUrl = await uploadImage(file, folder);
    return new Response(JSON.stringify({ url: imageUrl }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Upload image function

