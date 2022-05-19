import React, { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import './style.scss';
const listPicture = [
  require('../../assets/img/img1.jpg'),
  require('../../assets/img/img2.webp'),
  require('../../assets/img/img3.png'),
  require('../../assets/img/img4.jpg'),
  require('../../assets/img/img5.jpg'),
];

export default function Carousel() {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'none',
          position: 'absolute',
          right: 0,
          margin: '0px 50px',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'none',
          position: 'absolute',
          left: 0,
          zIndex: 1,
          margin: '0px 50px',
        }}
        onClick={onClick}
      />
    );
  }
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full carousel mx-auto h-56 md:h-96 lg:h-96">
      <Slider {...settings}>
        {listPicture.map((img: string, index: number) => (
          <div  key={index} className=" relative w-full">
            <img
              className="w-full mx-auto object-cover h-56 md:h-96 lg:h-96"
              src={img}
              alt=""
            />
            <div className="slider absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
