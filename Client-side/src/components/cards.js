import React, { useEffect, useState } from 'react';
import { api_call, URL } from '../services/api_calls';

const Favorite_cards = () => {
    let [userDataNew, setUserDataNew] = useState([]);
    let [cards, setCards] = useState([]);
    let [update, forceUpdate] = useState(1);

    useEffect(() => {
        user_data();
        get_all_cards();
    }, []);

    // get user data
    const user_data = async () => {
        let data = await api_call(URL + '/users/user_info', 'GET');
        console.log(data);
        setUserDataNew(data);
    }

    // get all cards
    const get_all_cards = async () => {
        try {
            let cardsArr = await api_call(URL + '/cards', 'GET');
            setCards(cardsArr);
            console.log(cardsArr);
        } catch (error) {
            console.log(error);
        }
    }
    // update the new cards array of the user in the db
    const update_user_favorite_card = async (bussines_number) => {
        let user_cards = [...userDataNew.cards, bussines_number];
        user_cards = new Set([...user_cards]);
        userDataNew.cards.splice(0, userDataNew.cards.length, ...user_cards);
        console.log(userDataNew);
        try {
            let data = await api_call(URL + '/users/cards', 'PATCH', userDataNew);
            return data;
        } catch (error) {
            alert("Cards favorite update - failed")
        }
    }

    // update the new array after delete cards from favorite
    const remove_user_favorite_card = async (bussines_number) => {
        let temp_ar = userDataNew.cards.filter(item => item !== bussines_number)
        userDataNew.cards.splice(0, userDataNew.cards.length, ...temp_ar);

        try {
            let data = api_call(URL + '/users/cards', 'PATCH', { cards: userDataNew.cards });
            if (data.n === 1) {
                alert("Cards fav update")
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // the button of add/remove cards from favotitesdata
    const show_fav_btn = (item) => {
        if (!userDataNew.cards.includes(item.bussines_number)) {
            return (
                <button onClick={async () => {
                    await update_user_favorite_card(item.bussines_number);
                    forceUpdate(update + 1);
                }} className=" favoriteBtn">+ Favorite</button>
            )
        }
        else {
            return (<button onClick={async () => {
                await remove_user_favorite_card(item.bussines_number);
                forceUpdate(update + 1);
            }} className="UnFavoriteBtn">- Favorite</button>)
        }
    }


    return (
        <div>
            <h1 className="cards">Cards component</h1>
            <div className="row d-flex justify-content-around">
                {cards.map((item, index) => {
                    console.log(item)
                    return (
                        <div className="card col-3 m-4 p-2 text-light bg-dark cardsComponent" key={index}>
                            <div className="card-body ">
                                <h5 className="card-title"><strong>Bussines name:</strong>{item.bussines_name}</h5>
                                <h5 className="card-title"><strong>Bussines address:</strong>{item.bussines_address}</h5>
                                <h5 className="card-title"><strong>Bussines number:</strong> {item.bussines_number}</h5>
                                <h5 className="card-title"><strong>Phone:</strong> {item.bussines_phone}</h5>
                                <p className="card-text"><strong>Description:</strong>{item.bussines_description}</p>
                            </div>
                            {show_fav_btn(item)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Favorite_cards;
