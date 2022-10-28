import express from "express";
import config from "./config";
import User from "./routes/user.routes";
import cors from 'cors';

const app = express();

//settings

app.set("port", config.port);


//middleares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/user',User);
export default app;
