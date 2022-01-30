import React, { useEffect, useState } from 'react';
import { api_call, URL } from '../services/api_calls';
import { Link } from 'react-router-dom';


const User_info = () => {
    let [user, setUser] = useState([]);
    let [userCards, setUserCards] = useState([]);
    let [bussiness, setBussiness] = useState(false);

    useEffect(() => {
        get_user_data();
        get_user_cards();
    }, []);

    // get the user data
    const get_user_data = async () => {
        let data = await api_call(URL + '/users/user_info', 'GET');
        setUser(data);
        if (data.bussiness !== false) {
            setBussiness(true);
        }
    }

    // get all user cards from db
    const get_user_cards = async () => {
        let data = await api_call(URL + '/users/user_cards', 'GET');
        console.log(data);
        setUserCards(data);
    }

    // delete card from the db 
    const delete_card = async (_id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            let data = await api_call(URL + '/cards/' + _id, 'DELETE');
            if (data.deletedCount === 1) {
                get_user_cards();
                alert('Card deleted');
            }
        }
    }

    return (
        <>
            <h1 className="user_info">User information</h1>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">{user.created_at}</p>
            </div>
            {(bussiness === true) ?
                <table className="table text-light bg-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Creation date</th>
                            <th scope="col">Bussines name</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCards.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.bussines_name}</th>
                                    <td>{item.created_at}</td>
                                    <td>{item.bussines_number}</td>

                                    <td>
                                        {/* add a button with the id of the card */}
                                        <Link to={`/edit_card?id=${item._id}`}>
                                            <button className="btnClass me-1">Edit</button>
                                        </Link><button onClick={() => { delete_card(item._id) }} className="btnClassDelete">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :
                ''
            }

        </>
    )
}

export default User_info;
