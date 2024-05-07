import USER from "@/utils/user-model";
import { uri } from "@/utils/db";

export async function findAllBlogs() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri);

        // Fetch data
        const data = await USER.find({});
        console.log(data);

        // Close the database connection
        await mongoose.disconnect();

        // Return response
        return data;
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        return NextResponse.error(new Error("Failed to fetch data"));
    }
}