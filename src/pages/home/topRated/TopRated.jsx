import React from "react";
import TopRatedCarousel from "./TopRatedCarousel";
import CarouselContainer from "../../../components/carouselContainer/CarouselContainer";

const Trending = () => {
  return (
    <>
      <CarouselContainer>
        <TopRatedCarousel />
      </CarouselContainer>
    </>
  );
};

export default Trending;
