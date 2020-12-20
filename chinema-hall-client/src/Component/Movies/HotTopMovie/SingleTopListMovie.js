import React from "react";
import { useHistory } from "react-router-dom";
import "./single.css";

const SingleMovie = ({ topMovieList }) => {
  const { movieName, movieImg, _id } = topMovieList;
  let history = useHistory();
  return (
    <div className="single-blog my-3 d-flex flex-column justify-content justify-content-around">
      <div className="blog-img-container overflow-hidden">
        <img className="w-100 blog-img" src={movieImg} alt="blog-img" />
      </div>
      <h5>{movieName}</h5>
      <span onClick={() => history.push(`/movie-details/${_id}`)}>
        <button className="book-button">Book Hall Sit</button>
      </span>
    </div>
  );
};

export default SingleMovie;
