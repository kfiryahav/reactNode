import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { api_call, URL } from '../../services/api_calls';

const Add_card = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    // post request to add a new card to the db
    let add_new_card = async (form_data) => {
        console.log(form_data);
        try {
            let data = await api_call(URL + '/cards', 'POST', form_data);
            console.log(data);
            alert('sucessfully added card');
            navigate('/user_info')
        } catch (error) {
            console.log(error);
            alert('card submission failed');
        }
    }

    // form validation
    let bussiness_name = register('bussiness_name', { required: true })
    let bussines_description = register('bussines_description', { required: false })
    let bussines_address = register('bussines_address', { required: true })
    let bussines_phone = register('bussines_phone', { required: true, minLength: 7 })

    return (
        <div>
            <form className='col-6 mx-auto shadow p-3' onSubmit={handleSubmit(add_new_card)} id='add_card'>
                <h1>Add a new card</h1>
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
                    {errors.bussines_address && <small className="text-danger">Bussines address is required</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                    <input {...bussines_phone} type="tel" className="form-control" />
                    {errors.bussines_phone && <small className="text-danger">Bussines phone is required</small>}
                </div>
                <button type="submit" className="btnClass">Submit</button>
            </form>
        </div>
    )
}

export default Add_card;
