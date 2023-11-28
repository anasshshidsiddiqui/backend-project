import  express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGEN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// import {userRouter} from './routes/user.routes.js'

app.use("/api/v1/users", userRouter)
//url : http://localhost:8000/api/v1/users/register


export {app}