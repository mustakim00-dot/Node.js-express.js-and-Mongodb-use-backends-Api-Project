// const asyncHandler = (fn) => {
//     return function (err,req,res,next) {
//         return Promise.resolve(fn(req,res,next)).catch(err => next(err))
//     }
// }
const asyncHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(err => next(err));
export default asyncHandler;
