// const seedData = [
//     {
//         name: 'Food',
//         slug: 'food',
//         image: {
//             url: 'https://example.com/food.png',
//             public_id: 'sample_food',
//         },
//         subcategories: [
//             {
//               name: 'Groceries',
//               slug: 'groceries',
//               image: {
//                 url: 'https://example.com/groceries.png',
//                 public_id: 'sample_groceries',
//               }, 
//             },
//             {
//                 name: 'Restaurants',
//                 slug: 'restaurants',
//                 image: {
//                     url: 'https://example.com/restaurants.png',
//                     public_id: 'sample_restaurants',
//                 },
//             },
//         ],
//     },
//     {
//       name: 'Transport',
//       slug: 'transport',
//       image: {
//             url: 'https://example.com/transport.png',
//             public_id: 'sample_transport',
//       }, 
//       subcategories:[
//         {
//             name: 'Fuel',
//             slug: 'fuel',
//             image: {
//                 url: 'https://example.com/fuel.png',
//                 public_id: 'sample_fuel',
//             },
//         },
//         {
//             name: 'Public Transport',
//             slug: 'public-transport',
//             image: {
//                 url: 'https://example.com/public-transport.png',
//                 public_id: 'sample_public_transport',
//             },
//         },
//       ], 
//     },
// ];

import mongoose from "mongoose";
import { MONGO_URL } from "../constants.js";
import { Category } from "../models/category.model.js";
import { Subcategory } from "../models/subcategory.model.js";
import { imageSeed } from "./image.seed.js";




const seedData = [
  {
    name: 'Food',
    slug: 'food',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Groceries', slug: 'groceries', image: { url: '', public_id: '' } },
      { name: 'Restaurants', slug: 'restaurants', image: { url: '', public_id: '' } },
      { name: 'Snacks and Drinks', slug: 'snacks and drinks', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Transport',
    slug: 'transport',
    image: {
      url: 'https://res.cloudinary.com/dc1fwss8x/image/upload/v1753094125/seedingFiles/w5mxulksckslclrbkmnl.jpg',
      public_id: 'seedingFiles/w5mxulksckslclrbkmnl',
    },
    subcategories: [
      { name: 'Fuel', slug: 'fuel', image: { url: '', public_id: '' } },
      { name: 'Public Transport', slug: 'public transport', image: { url: '', public_id: '' } },
      { name: 'Ride Sharing', slug: 'ride sharing', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Housing',
    slug: 'housing',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Rent', slug: 'rent', image: { url: '', public_id: '' } },
      { name: ' Utilities', slug: ' Utilities', image: { url: '', public_id: '' } },
      { name: 'Maintenance', slug: 'Maintenance', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Health',
    slug: 'Health',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Medical Bills', slug: 'medical bills', image: { url: '', public_id: '' } },
      { name: 'Medicine', slug: 'medicine', image: { url: '', public_id: '' } },
      { name: 'Health Insurance', slug: 'Health insurance', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Streaming Services', slug: 'streaming services', image: { url: '', public_id: '' } },
      { name: 'Movie and Shows', slug: 'Movie and Shows', image: { url: '', public_id: '' } },
      { name: 'Games and Apps', slug: 'games and apps', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Personal Care',
    slug: 'personal care',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Salon', slug: 'salon', image: { url: '', public_id: '' } },
      { name: 'Cosmetics', slug: 'cosmetics', image: { url: '', public_id: '' } },
      { name: 'Fitness', slug: 'fitness', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Tuition Fees', slug: 'tuition fees', image: { url: '', public_id: '' } },
      { name: 'Books and Supplies', slug: 'Books and Supplies', image: { url: '', public_id: '' } },
      { name: 'Online Courses', slug: 'Online Courses', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Shopping',
    slug: 'shopping',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Clothing', slug: 'clothing', image: { url: '', public_id: '' } },
      { name: 'Electronics', slug: 'electronics', image: { url: '', public_id: '' } },
      { name: 'Household Items', slug: 'household items', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Travel',
    slug: 'travel',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Flights', slug: 'flights', image: { url: '', public_id: '' } },
      { name: 'Hotels', slug: 'hotels', image: { url: '', public_id: '' } },
      { name: 'Tours', slug: 'tours', image: { url: '', public_id: '' } },
    ],
  },
  {
    name: 'Others',
    slug: 'others',
    image: { url: '', public_id: '' },
    subcategories: [
      { name: 'Charity', slug: 'Charity', image: { url: '', public_id: '' } },
      { name: 'Gifts', slug: 'gifts', image: { url: '', public_id: '' } },
      { name: 'Miscellaneous', slug: 'Miscellaneous', image: { url: '', public_id: '' } },
    ],
  },
];


export async function seedCategories() {
  await mongoose.connect(MONGO_URL);
console.log('DB connected');

await Category.deleteMany({});
await Subcategory.deleteMany({});



  const imageSeedData = await imageSeed();
 imageSeedData.forEach( image => {
   seedData.forEach(category => {
      if(category.name === image.original_filename){
        category.image = {
          url: image.url,
          public_id: image.public_id,
        };
      } 

        category.subcategories.forEach(subcategory => {
          if (subcategory.name === image.original_filename){
            subcategory.image = {
              url: image.url,
              public_id: image.public_id,
            }
          }
        });
    });
  });

  console.log('image seeding done');
  for(const item of seedData) {
    
      const isExists = await Category.findOne({name: item.name});
      if(isExists) {
        console.log(`Skipping duplicate category: ${item.name}`);
        continue;
      }


    const category = await Category.create({
      name: item.name,
      slug: item.slug,
      image: item.image,
    });

    const validSubcategories = item.subcategories.filter( sub => sub.image && sub.image.url && sub.image.public_id);

    const subcategories = validSubcategories.map(sub => ({
      ... sub,
      category: category._id,
    }));
    console.log("sub-1");
    

    await Subcategory.insertMany(subcategories);
    console.log("sub-2");

  }
  console.log('Categories seeded successfully');
  
}
 

seedCategories();


// export async function seedCategories() {
//   await mongoose.connect(MONGO_URL);
//   console.log('DB connected');

//   await Category.deleteMany({});
//   await Subcategory.deleteMany({});

//   const imageSeedData = await imageSeed();

//   // ইমেজ গুলা ক্যাটেগরি এবং সাবক্যাটেগরিতে সেট করো
//   imageSeedData.forEach(image => {
//     seedData.forEach(category => {
//       if (category.name === image.original_filename) {
//         category.image = {
//           url: image.url,
//           public_id: image.public_id,
//         };
//       }

//       category.subcategories.forEach(subcategory => {
//         if (subcategory.name === image.original_filename) {
//           subcategory.image = {
//             url: image.url,
//             public_id: image.public_id,
//           };
//         }
//       });
//     });
//   });

//   console.log('image seeding done');

//   for (const item of seedData) {
//     // ডুপ্লিকেট চেক
//     const isExist = await Category.findOne({ name: item.name });
//     if (isExist) {
//       console.log(`Skipping duplicate category: ${item.name}`);
//       continue;
//     }

//     const category = await Category.create({
//       name: item.name,
//       slug: item.slug,
//       image: item.image,
//     });

//     const validSubcategories = item.subcategories.filter(
//       sub => sub.image && sub.image.url && sub.image.public_id
//     );

//     const subcategories = validSubcategories.map(sub => ({
//       ...sub,
//       category: category._id,
//     }));

//     console.log('sub-1');

//     await Subcategory.insertMany(subcategories);
//     console.log('sub-2');
//   }

//   console.log('Categories seeded successfully');
// }

// seedCategories();

