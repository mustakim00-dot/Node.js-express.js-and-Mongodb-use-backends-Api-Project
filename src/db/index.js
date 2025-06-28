import mongoose from "mongoose";
import { MONGO_URL } from "../constants.js";
import ApiError from "../utils/apiError.js";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; //initial Delay of 1 Seconds

//const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

let id 
const dbConnection = async (attempt = 1) => {
    try{
        await mongoose.connect(MONGO_URL)
       console.log('Database connected successfully');
       
    } catch (error) {
        console.error(`Database connection failed (attempt ${attempt}) :${error.message}`);
        //throw ApiError.databaseError(error.message);

        if(attempt <= MAX_RETRIES){
            clearInterval(id);
            const delay = RETRY_DELAY_MS * 2 ** (attempt - 1); //Exponential backoff
            console.log(`Retrying in ${delay / 1000} seconds...`);
            //await sleep(delay);
            id = setTimeout(()=> {
                dbConnection(attempt + 1);
            },delay)
            //return dbConnection(attempt + 1);
        } else {
            console.error('Maximum retry attempts reached. Throwing error.');
            throw ApiError.databaseError(error.message);
        }
    }
}

export default dbConnection;