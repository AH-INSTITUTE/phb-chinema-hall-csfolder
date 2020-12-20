import React, { useEffect, useState } from 'react';
import './AllMovie.css';
import Fade from "react-reveal/Fade";
import { useHistory } from 'react-router-dom';

const AllMovie = () => {
    const [AllMovie, setAllMovie] = useState();
    const history = useHistory();
    console.log(AllMovie);
    useEffect(() => {
        fetch("http://localhost:3000/movie-data")
            .then((res) => res.json())
            .then((data) => {
                setAllMovie(data);
            });
    }, [setAllMovie]);

    return (
        <div className="pt-3">
            <Fade bottom>
                <h3><span className="main-title">All Movies 🥰</span></h3>
            </Fade>
            <Fade bottom>
                <div className="row">
                    {AllMovie && AllMovie.map(movie => (
                        <div key={movie._id} className="col-lg-3 ">
                            <div className="p-3 mb-3 border all-mov-det">
                                <div className="movie_img">
                                    <img src={movie.movieImg} alt="movieImg" />
                                    <span className="sub">{movie.subtitle}</span>
                                    <span className="rating">✨ {movie.rating}</span>
                                </div>
                                <div className="movie_text_details">
                                    <h3>{movie.movieName}</h3>
                                    <div className="">
                                        <span className="d-block">
                                            <span className="text-success">Movie Start: </span>
                                            {movie.hallStartDate}
                                        </span>
                                        <span>
                                            <span className="text-danger">Day Time: </span>
                                            {movie.dayTime}
                                        </span>
                                    </div>
                                </div>
                                <span onClick={() => history.push(`/movie-details/${movie._id}`)}>
                                    <button className="book-button my-1">Book Hall Sit</button>
                                </span>
                            </div>
                        </div>
                    ))

                    }
                </div>
            </Fade>
        </div>
    );
};

export default AllMovie;