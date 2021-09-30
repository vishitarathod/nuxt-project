import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config()

//mongoose connection
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true ,useFindAndModify: false})
.then(() => console.log("mongodb connected"))
.catch((err) => console.log(err));
