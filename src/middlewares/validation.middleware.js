import { ZodError } from 'zod';
import ApiError from '../utils/apiError.js';
function validationMiddleware(schema){
    return async (req,res,next) => {
        //schema.parse(req.body);
        try{
            const validationData = schema.parse(req.body);
            req.body = validationData;
            next();
        } catch (error) {
            if(error instanceof ZodError) {
                //console.log(error);
                const formattedErrors = error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message,
                }));
                //return res.status(400).json(ApiError.badRequest('Validation Error',formattedErrors));
                throw ApiError.badRequest('Validation Error', formattedErrors);
            } else {
                throw ApiError.serverError(error.message);
            }
        }
        
    };
};

export default validationMiddleware;