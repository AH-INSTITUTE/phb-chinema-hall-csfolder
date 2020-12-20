import React from 'react';
import './Css/NotFoundPage.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import img from './defaultImg/Not Found1.png';

const NotFoundPage = () => {
    const location = useLocation();
    return (
        <section>
            <div className="container-fluid Notfound mt-4">

                <div className="col-8 mx-auto d-flex justify-content-center notFoundImg">
                    <img src={img} className="img-fluid" alt="bg" />
                </div>
                <div className=" col-10 mx-auto pt-3">
                    <h4 className="mb-4">The page you are looking are not found</h4>
                    <p className="d-flex">
                        <span className="mr-4">This Url "{location.pathname}" are unvalid</span>
                        <Link to="/home"><span className="home-btn">back home</span></Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
export default NotFoundPage;