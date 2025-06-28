class ApiSuccess {
    // @param {number} statusCode - HTTP status code (e.g., 200,201);
    // @param {string} message - Human-readable  message;
    // @param {object} [data = {} ] - Response payload;
    // @param {object} [mata = {} ] - Optional metadata (e.g., pagination);

    constructor(statusCode = 200 , message = 'Success', data = {}, meta = {} ){
        this.success = statusCode < 400 ;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }

    static ok (message = 'Ok',data = {},meta = {}){
        return new ApiSuccess(200,message,data,meta);
    }

    static created (message = 'Resource created',data = {},meta = {}){
        return new ApiSuccess(201,message,data,meta);
    }

    static noContent (message = 'No content'){
        return new ApiSuccess(204,message);
    }

    static custom (statusCode,message,data = {},meta = {}){
        return new ApiSuccess(statusCode,message,data,meta);
    }


}
export default ApiSuccess;