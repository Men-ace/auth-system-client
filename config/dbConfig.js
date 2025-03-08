99% of storage used … If you run out, you can't create, edit and upload files. Get 100 GB of storage for $1.99 $0.49/month for 2 months.
import mongoose from "mongoose";

export const connectToMongoDb = () => {
  try {
    const connect = mongoose.connect(process.env.DB_CONNECT_URL + "/auth-system-oct")
    if(connect) {
      console.log(`Database conected: ${process.env.DB_CONNECT_URL}/auth-system-oct`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}