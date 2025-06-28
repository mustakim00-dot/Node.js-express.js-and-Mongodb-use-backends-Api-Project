import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { WHITELIST } from './constants.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//const a = 'a';

app.use(
  cors({
    origin: WHITELIST,
    credentials: true,
  })
);
app.use(cookieParser());
//define routes
import healthCheckRoute from './routes/healthCheck.route.js'; //problem
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';

app.use(healthCheckRoute);


app.use("/api/v1/users",userRoute);
app.use("/api/v1", categoryRoute);

app.use(errorHandler); // problem 
export { app };

// Cross origin resourse Sharing (CORS)



// function (origin, callback) {
//   console.log(origin);
  
//   if (WHITELIST.indexOf(origin) !== -1) {
//     callback(null, true);
//   } else {
//     callback(new Error('Not allowed by CORS'));
//   }
// },