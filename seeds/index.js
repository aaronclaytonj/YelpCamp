const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Reviews = require("../models/review");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  await Reviews.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6350a651e828c5f0ac364e49",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde porro iure corrupti magnam adipisci sint incidunt cum recusandae ipsa debitis laudantium asperiores ut praesentium, minima voluptate distinctio? Delectus, aliquid? Quis!",
      price,
    });
    await camp.save();
  }
  //   const c = new Campground({ title: "purple field" });
};

seedDB().then(() => {
  mongoose.connection.close();
});
