import express from 'express'
import dotenv from "dotenv"
import mongoose from "mongoose"
import PostRouter from './routes/postRoutes.js';
import UserRouter from './routes/userRoutes.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connect to the DB
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.log(err.message);
})

//router
app.use('/api/posts/', PostRouter);
app.use('/api/users/', UserRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at: http://localhost:${port}`)
})