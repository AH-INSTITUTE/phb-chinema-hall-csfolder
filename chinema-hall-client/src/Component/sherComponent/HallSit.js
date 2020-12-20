import React, { useEffect, useState } from 'react';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import MovieSit from '../../FakeData/FakeData';
import './Css/HassSit.css';
import { useParams } from 'react-router-dom';

const HallSit = () => {
    const [sit, setSit] = useState();
    const [allSitData, setAllSitData] = useState();
    // console.log(allSitData[0].sitNum);
    const sitNumber = (e) => {
        // console.log(e);

    }
    const { id } = useParams();
    const user = sessionStorage.getItem('user');
    const name = sessionStorage.getItem('name');
    // console.log(sit);
    useEffect(() => {
        const loadData = MovieSit;
        setSit(loadData);

        fetch(`http://localhost:3000/all-sit-data/${id}`)
            .then(res => res.json())
            .then(data => {
                setAllSitData(data)
            })
    }, []);


    const [formData, setFromData] = useState({
        id: id,
        status: "booked",
    });
    const onSubmits = (e) => {
        console.log(formData);
        // console.log(e);
        const formsData = new FormData();
        formsData.append("id", formData.id);
        formsData.append("status", formData.status);
        formsData.append("sitNum", e);
        formsData.append("user", user);
        formsData.append("name", name);

        if (allSitData.length < 10 ) {
            fetch(`http://localhost:3000/movie-sit/post-sit-data/${id}`, {
                method: 'POST',
                body: formsData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        alert("Booked Successfully... Hurray!")
                    }
                    if (data.success === false) {
                        alert("Booked Not Added... Sad!")
                    }
                    if (data.duplicate === true) {
                        alert("This is Already Book Sorry!")
                    }
                })
                .then(() => {
                    window.location.reload();
                })
        } else {
            alert("Already Maximum Booked Hall Sit")
        }
        // e.preventDefault();
    }

    return (
        <div className="mt-3 container mb-3">
            <h3><span className="main-title">Already Book Hall sits 🥰</span></h3>
            <div className="sit-part row">
                {allSitData && allSitData.map(book => (
                    <div key={book._id} className="col-6 col-lg-2 col-md-2 col-sm-3">
                        <div className="px-1 my-2 text-center border">
                            <EventSeatIcon className='sit_icon text-success cursor-eraser' />
                            <h6 className="text-center">Sit: {book.sitNum}</h6>
                        </div>
                    </div>
                ))}
            </div>

            <br/>
            <h3><span className="main-title">Available Hall sit 🥰</span></h3>
            <div className="sit-part row">
                {sit && sit.map(room => (
                    <div key={room.SitNum} className="col-6 col-lg-2 col-md-2 col-sm-3">
                        <div className="px-1 my-2 text-center border"
                            onClick={e => onSubmits(room.SitNum)}
                        >
                            <EventSeatIcon
                                className={

                                    sitNumber(room.SitNum) === true ? 'sit_icon text-success cursor-eraser' : 'sit_icon text-danger cursor-pointer'

                                }
                            />
                            <h6 className="text-center">Sit: {room.SitNum}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HallSit;