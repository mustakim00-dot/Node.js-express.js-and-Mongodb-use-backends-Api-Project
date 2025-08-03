// import seedUpload from './image.seed.js';
import ApiError from '../utils/apiError.js';
import seedFuncCall from './category&subcategory.otherseed.js';
import resolve from './image.otherseed.js';
const seedCalling = async () => {
  try{
    await seedFuncCall();
    await resolve();
  } catch (error) {
    ApiError.serverError(error.message);
  }
  // await seedUpload();
  // seedFuncCall().catch(err => {
  //   console.error('Seeding error:', err);
  //   mongoose.disconnect();
  // });
};

seedCalling();
