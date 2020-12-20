import React, { useEffect, useState } from 'react';
import './Css/MovieDetails.css'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HeaderMainNav from './HeaderMainNav';
import './MovieDetails';
import HallSit from './HallSit';
import Footer from './Footer';

const MovieDetails = () => {
    const { id } = useParams();

    const [singleDetails, setSingleDetails] = useState();
    // console.log(singleDetails);
    useEffect(() => {
        fetch(`http://localhost:3000/movie-data/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSingleDetails(data);
                sessionStorage.setItem("id", id);
                // console.log(data);
            });
    }, [setSingleDetails, id]);

    return (
        <section id="single-movie-details">
            <header id="navbar-section">
                <Container>
                    <HeaderMainNav />
                </Container>
            </header>
            <section className="single-movie pt-4">
                {singleDetails &&
                    singleDetails.map((singleMovie, index) => (
                        <div key={singleMovie._id} className="container">
                            <div className="row">
                                <div className="movie-head-details col-md-3">
                                    <div className="movie-img">
                                        <img src={singleMovie.movieImg} alt="" />
                                    </div>
                                </div>{/* head details end */}
                                <div className="movie-text-details col-md-9">
                                    <div className="movie-details pl-3">
                                        <h3>{singleMovie.movieFullDet}</h3>
                                        <span className="">The Future ain't what it used to be</span>
                                        <p>Year : {singleMovie.year}</p>
                                        <h5>Synopsis</h5>
                                        <ul className="list-unstyled ml-2">
                                            <li>Rating : <strong className="text-success">{singleMovie.rating}</strong></li>
                                            <li>Subtitle: <strong className="text-success">{singleMovie.subtitle}</strong></li>
                                            <li>CastHero: <strong className="text-success">{singleMovie.castHero}</strong></li>
                                            <li>CastDir: <strong className="text-success">{singleMovie.castDir}</strong></li>
                                            <li>Hall Start Date: <strong className="text-success">{singleMovie.hallStartDate}</strong></li>
                                            <li>Day Time: <strong className="text-success">{singleMovie.dayTime}</strong></li>
                                            <li>Genre: <strong className="text-success">{singleMovie.field}</strong></li>
                                        </ul>
                                    </div>
                                </div>{/* head text end */}
                            </div>
                            <div className="row desc-box">
                                <div className="px-3 tex-justify pt-2">
                                    <h5>Movie Description</h5>
                                    <strong className="text-success">{singleMovie.movieFullDet}</strong>. After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim and show to be better and evolved. Grug grows suspicious of the Betterman parents, Phil and Hope, as they secretly plan to break up his daughter Eep with her loving boyfriend Guy to ensure that their daughter Dawn has a loving and smart partner to protect her.
                               </div>
                            </div>
                        </div>
                    ))}
            </section>
            <section id="Hall_Sit_Area">
                <HallSit />
            </section>
            <Footer />
        </section>
    );
};

export default MovieDetails;