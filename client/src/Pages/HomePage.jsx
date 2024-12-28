import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import Card from "../components/Card"
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../styles/generalstyles.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const petCategories = [
  {
    type: "Dog",
    img: "https://images.pexels.com/photos/6298553/pexels-photo-6298553.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkPage: "/pets?species=dog"
  },
  {
    type: "Cat",
    img: "https://images.pexels.com/photos/667228/pexels-photo-667228.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkPage: "/pets?species=cat"
  },
  {
    type: "Rabbit",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/640px-Oryctolagus_cuniculus_Rcdo.jpg",
    linkPage: "/pets?species=rabbit"
  },
  {
    type: "Hamster",
    img: "https://img.freepik.com/free-photo/view-funny-animal_23-2151098421.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid",
    linkPage: "/pets?species=hamster"
  },
  {
    type: "Parrot",
    img: "https://images.pexels.com/photos/17061394/pexels-photo-17061394/free-photo-of-ara-ararauna-in-cage.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkPage: "/pets?species=parrot"
  },
  {
    type: "Lovebird",
    img: "https://images.pexels.com/photos/18082515/pexels-photo-18082515/free-photo-of-embracing-parrots-on-bench.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkPage: "/pets?species=lovebird"
  },
  {
    type: "Turtle",
    img: "https://images.pexels.com/photos/10465645/pexels-photo-10465645.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkPage: "/pets?species=turtle"
  },
  {
    type: "Tortoise",
    img: "https://media.istockphoto.com/id/1091652684/photo/star-tortoise.jpg?b=1&s=612x612&w=0&k=20&c=Lqvs64I5dSckMmSbKpmocXQUlEvdlJ3HWsNF9chAoTc=",
    linkPage: "/pets?species=tortoise"
  },
  {
    type: "Fish",
    img: "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?cs=srgb&dl=pexels-crisdip-35358-128756.jpg&fm=jpg",
    linkPage: "/pets?species=fish"
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
      <div className="banner" >
        <h1 ref={textRef} style={{ display: "inline-block" }}>
          Find your furry best friend at Happy Paws!
        </h1>
      </div>
      <div className="banner-image" style={{objectPosition:"bottom"}}>
        <img
          src="https://img.freepik.com/premium-photo/white-dog-wearing-glasses_564714-26135.jpg?w=1060"
          alt=""
        />
      </div>
      <div className="banner">
      <h2>Categories</h2>
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
