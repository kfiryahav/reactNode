import React, { useEffect, useState } from 'react';
import axios from "axios";

const Home = (props) => {
    let [cards, setCards] = useState([]);

    // get user information
    useEffect(() => {
        let url = 'http://localhost:3400/cards';
        get_api_call(url);
    }, []);

    const get_api_call = async (_url) => {
        try {
            let respose = await axios.get(_url);
            setCards(respose.data);
            console.log(respose);
            return respose;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="row d-flex justify-content-around ">
                <h1 className="title_of_page">Home - all the cards list</h1>
                {/* print all cards */}
                {cards.map((item, index) => {
                    return (
                        <div className="card col-3 m-4 p-2 text-light bg-dark zoom" key={index}>
                            <img src="https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex4-almond/merlin_184842117_321090da-ce3a-4c4d-9e6a-3461506a39d3-articleLarge.jpg" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{item.bussines_name}</h5>
                                <p className="card-text">{item.bussines_description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home;