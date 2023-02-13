const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => {
  console.log("Mongo connection error!");
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Database connected.");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your author id
      author: "63e4e319ab8ac8b400dbae56",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, consectetur nemo perspiciatis tempora dicta porro at minus in tenetur possimus perferendis nihil debitis reprehenderit ipsum provident accusantium excepturi maxime commodi. Facere, animi inventore. Tenetur dolor iure reprehenderit eaque autem, animi dicta quasi nemo perferendis, illum nihil voluptas at deserunt molestias cumque quis, temporibus officia ex explicabo vel. Soluta, repellendus mollitia!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/duiqzld67/image/upload/v1676110512/YelpCamp/lk2mpust11vao0owsfjf.png",
          filename: "YelpCamp/lk2mpust11vao0owsfjf",
        },
        {
          url: "https://res.cloudinary.com/duiqzld67/image/upload/v1676110575/YelpCamp/nxe7bxizfpjndhi26lvb.png",
          filename: "YelpCamp/nxe7bxizfpjndhi26lvb",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
