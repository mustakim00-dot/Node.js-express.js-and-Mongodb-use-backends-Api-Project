import e from "express";
import { avatarUpload, forgetPassword, googleCallback, me, resetPassword, signin, signinWithGoogle, signout, signup, updatePassword, updateUser, validateOtp, verifyMail } from "../controllers/users/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/fileUpload.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { userForgotPasswordOTPSchema, userForgotPasswordSchema, userPasswordUpdateSchema, userResetPasswordSchema, userSigninSchema, userSignupSchema, userUpdateSchema } from "../validators/user.validator.js";

const router = e.Router();

router.post("/signup", validationMiddleware(userSignupSchema) ,signup);
router.get("/verify", verifyMail);
router.post("/signin", validationMiddleware(userSigninSchema),signin);
router.get('/signout',auth,signout);
router.post('/update',auth,validationMiddleware(userUpdateSchema), updateUser);
router.post('/update-password',auth,validationMiddleware(userPasswordUpdateSchema), updatePassword);
router.post('/forgot-password-otp', validationMiddleware(userForgotPasswordSchema),forgetPassword);
router.post('/verify-otp', validationMiddleware(userForgotPasswordOTPSchema), validateOtp);
router.post('/reset-password', validationMiddleware(userResetPasswordSchema), resetPassword);
router.get("/google-signin",signinWithGoogle);
router.get("/google/callback", googleCallback);
router.post("/avatar-upload", auth, upload.single('avatar'),avatarUpload);
router.get("/me", auth,me);



export default router;