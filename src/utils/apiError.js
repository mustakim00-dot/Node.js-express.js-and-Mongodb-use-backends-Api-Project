// class ApiError extends Error {

//     // @param {number} statusCode - HTTP status code (e.g.,404,500)
//     // @param {string} message - Human-readable error message
//     // @param {object} [errors = {}]- Additional validation or field level errors
//     // @param {string} [stack]-optional stack trace
//     // @param {string} [errorCode]-optional internal error reference code


//     constructor(
//         statusCode,
//         message = 'Something went wrong',
//         errors = {},
//         stack = '',
//         errorCode = '',
//     ) {
//         //console.log(message);
        
//         super(message);

//         this.name = this.constructor.name;
//         // console.log(this.name);
        
//         this.success = false;
//         this.statusCode = statusCode;
//         this.message = message   //?? "Something went wrong";
//         this.errors = errors       //?? {};
//         this.errorCode = errorCode;
//         //this.stack = Error.captureStackTrace(this, this.constructor);
//         //this.stack = this.constructor.name;
//         //console.log(this.message);
        
//         if(stack){
//             this.stack = stack;
//         } else {
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }

//     // unauthorized (message = 'Unauthorized', errors = {}, errorCode = 'AUTH_401'){
//     //     return new ApiError(401, message, errors,'',errorCode);
//     // }

//     static unauthorized (message = 'Unauthorized', errors = {}, errorCode = 'AUTH_401'){
//         return new ApiError(401, message, errors,'',errorCode);  //problem
//     }

//     static forbidden (message = 'Forbidden', errors = {}, errorCode = 'AUTH_403'){
//         return new ApiError(403, message, errors,'',errorCode);
//     }

//     static badRequest (message = 'Bad Request', errors = {}, errorCode = 'REQ_400'){
//         return new ApiError(400, message, errors,'',errorCode);
//     }

//     static notFound (message = 'Not Found', errors = {}, errorCode = 'REQ_404'){
//         return new ApiError(404, message, errors,'',errorCode);
//     }

//     //Conflict
//     static conflict (message = 'Conflict', errors = {}, errorCode = 'REQ_409'){
//         return new ApiError(409, message, errors,'',errorCode);
//     }

//     //Server Error
//     static serverError (message = 'Internal Server Error', errors = {}, errorCode = 'SERVER_500'){
//         return new ApiError(500, message, errors,'',errorCode);
//     }

//     //Database Error
//     static databaseError (message = 'Database Error',errors = {}, errorCode = 'DB_500'){
//         return new ApiError(500, message, errors,'',errorCode)
//     }

//     //Custom Error
//     static custom (statusCode, message, errors = {}, errorCode = ''){
//         //console.log(message);
//         return new ApiError(statusCode, message, errors,'',errorCode);
//     }

// }
// export default ApiError;

// // const e = new ApiError(401,'Unauthorized',{}, '', 'AUTH_401');
// // throw e

// //throw new ApiError(401,'Unauthorized',{}, '', 'AUTH_401');

// // const e = new ApiError()
// // console.log(e.unauthorized());

// //console.log(ApiError.unauthorized("Hello Error"));






class ApiError extends Error {
  /**
   * Custom API Error class
   * @param {number} statusCode - HTTP status code (e.g.,404,500)
   * @param {string} message - Human-readable error message
   * @param {object} [errors = {}] - Additional validation or field level errors
   * @param {string} [stack] - Optional stack trace
   * @param {string} [errorCode] - Optional internal error reference code
   */
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = {},
    stack = '',
    errorCode = ''
  ) {
    super(message);
    this.name = this.constructor.name;

    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.errorCode = errorCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static unauthorized(message = 'Unauthorized', errors = {}, errorCode = 'AUTH_401') {
    return new ApiError(401, message, errors, '', errorCode);
  }

  static forbidden(message = 'Forbidden', errors = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, errors, '', errorCode);
  }

  static badRequest(message = 'Bad Request', errors = {}, errorCode = 'REQ_400', stack = '') {
    return new ApiError(400, message, errors, '', errorCode,stack);
  }

  static notFound(message = 'Not Found', errors = {}, errorCode = 'REQ_404') {
    return new ApiError(404, message, errors, '', errorCode);
  }

  static conflict(message = 'Conflict', errors = {}, errorCode = 'REQ_409') {
    return new ApiError(409, message, errors, '', errorCode);
  }

  static serverError(message = 'Internal Server Error', errors = {}, errorCode = 'SERVER_500') {
    return new ApiError(500, message, errors, '', errorCode);
  }

  static databaseError(message = 'Database Error', errors = {}, errorCode = 'DB_500') {
    return new ApiError(500, message, errors, '', errorCode);
  }

  static custom(statusCode, message, errors = {}, stack = '', errorCode = '') {
    return new ApiError(statusCode, message, errors, stack, errorCode);
  }
}

export default ApiError;