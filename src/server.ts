import app from "@app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || ""


// mongoose.connect(MONGO_URI).then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     })
// }).catch((error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
// })


mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen({ port: PORT, host: "0.0.0.0" }, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
})