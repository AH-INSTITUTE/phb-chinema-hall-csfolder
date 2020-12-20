
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import HeaderMainNav from '../sherComponent/HeaderMainNav';

const MyBook = () => {
    const getEmail = sessionStorage.getItem('user');
    const [serviceData, setServiceData] = useState([]);
    console.log(serviceData);
    useEffect(() => {
        fetch(`http://localhost:3000/user-book-list?email=${getEmail}`)
            .then(res => res.json())
            .then(data => setServiceData(data))
    }, [getEmail])
    return (
        <div>
            <header id="navbar-section">
                <Container>
                    <HeaderMainNav />
                </Container>
            </header>
            <section>
                {serviceData.length === 0 ?
                    <h3>You Don't have Any Booking list</h3>
                    :
                    <div className="container mx-auto mt-3 ">
                        <h4 >Total Booked {serviceData.length}</h4>
                        {serviceData.map(book => (
                            <div className="" key={book._id}>
                                <div className="border pl-4 mb-3">
                                    <p>Booking Id: {book.id}</p>
                                    <p>Sit Number : {book.sitNum}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                }
            </section>
        </div>
    );
};

export default MyBook;