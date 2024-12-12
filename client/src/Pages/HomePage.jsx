import React, { useRef, useState } from 'react';
import Card from "../components/Card"
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const petCategories = [
  {
    type: "Dog",
    img: "https://img.freepik.com/free-photo/cute-dog-studio_23-2150687281.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/dog"
  },
  {
    type: "Cat",
    img: "https://img.freepik.com/free-photo/beautiful-kitten-with-flowers-outdoors_23-2150752886.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/cat"
  },
  {
    type: "Rabbit",
    img: "https://via.placeholder.com/150", // Replace with actual img URL
    linkPage: "/adopt/rabbit"
  },
  {
    type: "Hamster",
    img: "https://img.freepik.com/free-photo/view-funny-animal_23-2151098421.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/hamster"
  },
  {
    type: "Parrot",
    img: "https://img.freepik.com/free-photo/group-colorful-birds-are-flying-formation-with-one-being-flown-by-another_188544-8130.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/parrot"
  },
  {
    type: "Lovebird",
    img: "https://via.placeholder.com/150", // Replace with actual img URL
    linkPage: "/adopt/lovebird"
  },
  {
    type: "Turtle",
    img: "https://img.freepik.com/free-photo/3d-animal-shape-glowing-with-bright-holographic-colors_23-2151037217.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/turtle"
  },
  {
    type: "Tortoise",
    img: "https://img.freepik.com/premium-photo/two-tortoises-are-walking-dirt-with-one-another_1300773-2627.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/tortoise"
  },
  {
    type: "Fish",
    img: "https://img.freepik.com/premium-photo/aquarium-with-fish-view-neon-light_1137868-2430.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/adopt/fish"
  }
];
const HomePage = () => {
  return (
    <>
      <div className="banner" style={{ height: "180px" }}>
        <h1 style={{ textAlign: "left" }}>
          Find your furry best friend at Happy Paws!
        </h1>
      </div>
      <div className="banner-image">
        <img
          src="https://img.freepik.com/premium-photo/petfluencer-maltese-poodle-sporting-vr-goggles-pink-light-against-blue-backdrop-concept-pets-petfluencer-maltese-poodle-vr-goggles-photoshoot_918839-38369.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid"
          alt=""
        />
      </div>
      <div className="banner">
      <h2>Adopting Pet Made Easy</h2>
      </div>
      <div className="container">
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            autoplay={
              {
                delay: 3000,
                disableOnInteraction: false,
              }
            }
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {petCategories.map((curEle)=>(<SwiperSlide>
              <Card data={{img:curEle.img,name:curEle.type,link:curEle.linkPage}}/>
            </SwiperSlide>))}
          </Swiper>
        </>
      </div>
    </>
  );
};

export default HomePage;
