import React, { useEffect, useState } from 'react';
import { api_call, URL } from '../../services/api_calls';

const Favorite_cards = () => {

    let [favorite, setFavorite] = useState([]);

    useEffect(() => {
        get_favorite_cards();
    }, []);

    // simple get request to get all the favorite cards of the user
    const get_favorite_cards = async () => {
        let respone = await api_call(URL + '/users/fav_cards', 'GET');
        console.log(respone);
        setFavorite(respone);
    }

    return (
        <>
            <h1 className="favorites">Favorite cards</h1>
            <div className="row d-flex justify-content-around">
                {favorite.map((item, index) => {
                    return (
                        <div className="card col-3 m-4 p-2 text-light bg-dark zoom" key={index}>
                            <div className="card-body ">
                                <h5 className="card-title"><strong>Bussines name:</strong>{item.bussines_name}</h5>
                                <h5 className="card-title"><strong>Bussines address:</strong>{item.bussines_address}</h5>
                                <h5 className="card-title"><strong>Bussines number:</strong> {item.bussines_number}</h5>
                                <h5 className="card-title"><strong>Phone:</strong> {item.bussines_phone}</h5>
                                <p className="card-text"><strong>Description:</strong>{item.bussines_description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Favorite_cards;
