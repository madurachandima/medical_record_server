import app from "@app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

// Start the server immediately to pass health checks
app.listen({ port: PORT, host: "0.0.0.0" }, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Attempt database connection in the background
    if (!MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
        console.error("Please add MONGO_URI to your Back4app Container settings.");
        return;
    }

    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to MongoDB");
        })
        .catch((error) => {
            console.error("CRITICAL ERROR: Could not connect to MongoDB:", error.message);
            console.error("Please verify your MONGO_URI and network connection.");
        });
});