import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ACCESS_TOKEN_SECRET, WHITELIST } from './constants.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import rateLimit from 'express-rate-limit';
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
app.use(cookieParser(ACCESS_TOKEN_SECRET));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
limit: (req,_res) => (req.user ? 100 : 10), 
  standardHeaders: 'draft-8', 
  legacyHeaders: true,
  message:'Too many requests from this IP, please try again after 15 minutes',
  keyGenerator: (req) => req.ip, 
});
app.use(limiter);


//define routes
import healthCheckRoute from './routes/healthCheck.route.js'; //problem
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import subcategoryRoute from './routes/subcategory.route.js';

app.use(healthCheckRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", subcategoryRoute);

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