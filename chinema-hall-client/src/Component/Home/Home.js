import React from 'react';
import { Container } from 'react-bootstrap';
import AllMovie from '../Movies/AllMovie/AllMovie';
import HotTopMovie from '../Movies/HotTopMovie/HotTopMovie';
import HeaderMainNav from '../sherComponent/HeaderMainNav';
import './Home.css';
import Footer from '../sherComponent/Footer';

const Home = () => {
    return (
        <main id="main">
            <header id="navbar-section">
                <Container>
                    <HeaderMainNav />
                </Container>
            </header>
            <section className="container pt-3">
                <HotTopMovie />
                <AllMovie />
            </section>
            <Footer />
        </main>
    );
};

export default Home;