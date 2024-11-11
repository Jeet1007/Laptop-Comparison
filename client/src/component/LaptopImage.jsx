import React from "react";
import ImageCarousel from "./ImageCarousel";

const LaptopImage = ({ imageUrl }) => {
    //console.log(imageUrl);
    // imageUrl.map((image) => {

    // };
    const { image_1, image_2, image_3, image_4, ...specs } = imageUrl;
    const images = [image_1, image_2, image_3, image_4];
  return (
    <>
        <ImageCarousel images={images} />
    </>
  );
};

export default LaptopImage;


