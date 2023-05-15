import React from "react";
import Hero from "./Hero";
import Trending from "./trending/Trending";
import TopRated from './topRated/TopRated'
import Popular from './popular/Popular'

const Home = () => {
  return (
    <>
      <main style={{ backgroundColor: "black" }}>
        <Hero />
        <Trending />
        <Popular />
        <TopRated />
      </main>
    </>
  );
};

export default Home;
