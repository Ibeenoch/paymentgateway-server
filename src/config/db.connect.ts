import dotenv from 'dotenv/config'
import mongoose from "mongoose";


const connectDb = async() => {
   
    try {
        const dbConnect = await mongoose.connect(`${process.env.MONGO_URL}`).then((res) =>{
            console.log(`mongoose connect on ${res.connection.host}`)
        }).catch((err) => {
            console.log(err);
            process.exit(1)
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDb;