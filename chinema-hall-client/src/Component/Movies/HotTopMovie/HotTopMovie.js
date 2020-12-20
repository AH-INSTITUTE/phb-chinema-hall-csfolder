import React, { useEffect, useState } from 'react';
import './HotTopMovie.css';

import Fade from "react-reveal/Fade";
import "swiper/swiper-bundle.min.css";
// import SwiperCore, {
//     Navigation,
//     Pagination,
//     Scrollbar,
//     A11y,
//     Autoplay,
//     Virtual,
//   } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// import topMovies from '../../../FakeData/FakeData';
import SingleMovie from './SingleTopListMovie';

const HotTopMovie = () => {

    const [topMovie, setTopMovie] = useState();

    useEffect(() => {
        const category = "HotMovie";
        fetch("http://localhost:3000/movie-data/catagories?field=" + category)
            .then((res) => res.json())
            .then((data) => {
                setTopMovie(data);
            });
    }, [setTopMovie]);

    return (
        <>
            <Fade bottom>
                <h3><span className="main-title">Hot Top Movies 🤑</span></h3>
            </Fade>
            <Fade>
                <Swiper
                    spaceBetween={50}
                    slidesPerView="auto"
                    navigation
                    autoplay={true}
                    key={topMovie && topMovie.length}
                >
                    {topMovie &&
                        topMovie.map((topMovieList, index) => (
                            <SwiperSlide key={index}>
                                <SingleMovie key={topMovieList.id} topMovieList={topMovieList} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Fade>
        </>
    );
};

export default HotTopMovie;