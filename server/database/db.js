import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config();


const connection = () => {
    const DB_URI =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.43fzhth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try{
          mongoose.connect(DB_URI, {useNewUrlParser:true,
            useUnifiedTopology: true
          });
          console.log('database connected successfully')
    } catch (error){
        console.log('error while connection with the database' , error.message);
    }
}


export default connection;
 
 

