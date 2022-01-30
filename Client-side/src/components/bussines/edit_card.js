import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api_call, URL } from '../../services/api_calls';
import { useForm } from "react-hook-form";

const Edit_card = (props) => {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    let navigate = useNavigate();
    let [card, setCard] = useState({});
    let { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // form validation
    let bussiness_name = register('bussines_name', { required: true })
    let bussines_description = register('bussines_description', { required: false })
    let bussines_address = register('bussines_address', { required: true })
    let bussines_phone = register('bussines_phone', { required: true, minLength: 7 })

    // let navigate = useNavigate();
    useEffect(() => {
        // check_if_bussiness();
        single_card();
    }, []);

    // get single card from the db
    let single_card = async () => {
        let card = await api_call(URL + '/cards/single/' + id);
        console.log(card);
        setCard(card);

        // updating the input on the first load
        setValue("bussines_name", card.bussines_name);
        setValue("bussines_description", card.bussines_description);
        setValue("bussines_address", card.bussines_address);
        setValue("bussines_phone", card.bussines_phone);
    }

    // put request to the server to change cards infomation
    const edit_card = async (dataForm) => {
        console.log(dataForm);

        try {
            let card_update = await api_call(URL + '/cards/' + id, 'PUT', dataForm);
            console.log(card_update)
            if (card_update.modifiedCount === 1) {
                alert("Card has been update");
                navigate('/user_info');
            }
            else {
                alert("You didn't change the card")
            }
        }
        catch (err) {
            console.log(err);
            alert("There is a problem, please try next time!");
        }
    }

    return (
        <>
            <form className='col-6 mx-auto p-3' id='' onSubmit={handleSubmit(edit_card)} id='edit_card'>
                <h1 className="title_of_page">Edit cards</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Bussines name</label>
                    <input {...bussiness_name} type="text" className="form-control" />
                    {errors.bussiness_name && <small className="text-danger">Bussiness name is required</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                    <input {...bussines_description} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <input {...bussines_address} type="text" className="form-control" />
                    {errors.bussines_address && <small className="text-danger">Bussines_address is required</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                    <input {...bussines_phone} type="tel" className="form-control" />
                    {errors.bussines_phone && <small className="text-danger">Bussines_phone is required</small>}
                </div>
                <button type="submit" className="btnClass">Submit</button>
            </form>
        </>
    )
}

export default Edit_card;
