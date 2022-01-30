import React from "react";
import { useForm } from "react-hook-form";
import { api_call, URL } from '../services/api_calls';
import { useNavigate } from 'react-router-dom';


function SignUp(props) {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    const on_sub_form = async (form_data) => {
        try {
            let data = await api_call(URL + '/users/signup/', 'POST', form_data);
            console.log(data);
            if (data) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Form validation
    let name = register('name', { required: true, minLength: 3 })
    let password = register('password', { required: true, minLength: 5 });
    let email_address = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
    let bussiness = register("bussiness", { required: false });

    return (
        <div className="col-6  container rounded d-flex justify-content-center" id="sign_up">
            <form onSubmit={handleSubmit(on_sub_form)} className="col-12  p-4  mt-4 ">
                <h1>Sign up for free!</h1>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Full name</label>
                    <input {...name}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.name && <small className="text-danger">Name must be larger than 2 charts</small>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input {...email_address} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.email && <small className="text-danger">Email invalid</small>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input {...password} type="password" className="form-control" id="exampleInputPassword1" />
                    {errors.password && <small className="text-danger">Password must be larger than 3 charts</small>}
                </div>
                <div className="mb-3 form-check">
                    <input {...bussiness} type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">I'm a business</label>
                </div>
                <button type="submit" className="btnClass">Submit</button>
            </form>
        </div>
    );
}
export default SignUp;