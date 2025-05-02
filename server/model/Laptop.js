const mongoose = require('mongoose');

const LaptopSchema = new mongoose.Schema(
  {
    laptop_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // store as number (parse from string if needed)
      required: true,
    },
    processor: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    img_link: {
      type: String,
      required: true,
    },
    display: {
      type: Number, // convert to a number if needed
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    no_of_ratings: {
      type: Number,
      default: 0,
    },
    no_of_reviews: {
      type: Number,
      default: 0,
    },
    laptop_brand: {
      type: String,
      required: true,
    },
    os_brand: {
      type: String,
      required: true,
    },
    processor_brand: {
      type: String,
      required: true,
    },
    usecases: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Laptop', LaptopSchema);