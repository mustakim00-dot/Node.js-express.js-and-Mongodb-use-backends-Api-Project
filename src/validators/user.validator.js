import { z } from 'zod';
const userSignupSchema = z.object({
    username: z.string().min(5),
    name: z.string().min(5),
    email:z.string().email(),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'password must contain at least one lowercase letter, one uppercase letter,one number, and be at least 8 characters long'),

});

const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const userUpdateSchema = z.object({
    username: z.string().min(5),
    name: z.string().min(5),
    email:z.string().email(),
});

const userPasswordUpdateSchema = z.object({
    oldPassword:
     z.string(),
   newPassword:
    z.string()
    .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'password must contain at least one lowercase letter, one uppercase letter,one number, and be at least 8 characters long'),
});

const userForgotPasswordSchema = z.object({
    email: z.string().email(),
})
const userForgotPasswordOTPSchema = z.object({
    //otp: z.string(),
    otp: z.number(),
})
const userResetPasswordSchema = z.object({
    otp: z.number(),
    password: z.string().regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'password must contain at least one lowercase letter, one uppercase letter,one number, and be at least 8 characters long'),
})

const avatarUploadSchema = z.object({
    avatar: z.any(),
})

export { userForgotPasswordOTPSchema, userForgotPasswordSchema, userPasswordUpdateSchema, userResetPasswordSchema, userSigninSchema, userSignupSchema, userUpdateSchema,avatarUploadSchema };

