import { app } from "./src/app.js";
import { PORT } from "./src/constants.js";
import dbConnection from "./src/db/index.js";
//console.log(process);

const serverStart = async () => {
    try{
        await dbConnection();
        app.listen(PORT,() => {
    console.log(`Server is running http://localhost:${PORT}/ `);
    
})
    } catch (error) {
        console.log("file: index.js:50 ~  serverStart ~ error:",error);
        process.exit(1); //Exit the process with failure code
    }
}

serverStart();
