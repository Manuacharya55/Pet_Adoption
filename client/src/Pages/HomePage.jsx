import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
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
    linkPage: "/pet/dog"
  },
  {
    type: "Cat",
    img: "https://img.freepik.com/free-photo/beautiful-kitten-with-flowers-outdoors_23-2150752886.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/cat"
  },
  {
    type: "Rabbit",
    img: "https://via.placeholder.com/150", // Replace with actual img URL
    linkPage: "/pet/rabbit"
  },
  {
    type: "Hamster",
    img: "https://img.freepik.com/free-photo/view-funny-animal_23-2151098421.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/hamster"
  },
  {
    type: "Parrot",
    img: "https://img.freepik.com/free-photo/group-colorful-birds-are-flying-formation-with-one-being-flown-by-another_188544-8130.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/parrot"
  },
  {
    type: "Lovebird",
    img: "https://via.placeholder.com/150", // Replace with actual img URL
    linkPage: "/pet/lovebird"
  },
  {
    type: "Turtle",
    img: "https://img.freepik.com/free-photo/3d-animal-shape-glowing-with-bright-holographic-colors_23-2151037217.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/turtle"
  },
  {
    type: "Tortoise",
    img: "https://img.freepik.com/premium-photo/two-tortoises-are-walking-dirt-with-one-another_1300773-2627.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/tortoise"
  },
  {
    type: "Fish",
    img: "https://img.freepik.com/premium-photo/aquarium-with-fish-view-neon-light_1137868-2430.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid", // Replace with actual img URL
    linkPage: "/pet/fish"
  }
];
const HomePage = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textWidth = textRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;

    // GSAP animation
    gsap.fromTo(
      textRef.current,
      { x: viewportWidth }, // Start off-screen (right side)
      {
        x: -textWidth, // End off-screen (left side)
        duration: 20, // Adjust speed of the movement
        repeat: -1, // Infinite repeat
        ease: "linear", // Smooth and consistent movement
      }
    );
  }, []);
  return (
    <>
      <div className="banner" style={{ overflow: "hidden", whiteSpace: "nowrap",height:"180px" }}>
        <h1 ref={textRef} style={{ display: "inline-block" }}>
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
      <h2>Start your happily-ever-after with a new paw-some friend</h2>
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
