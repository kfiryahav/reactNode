import React from "react";
import { useForm } from "react-hook-form";
import { api_call, URL } from '../services/api_calls';

function Login(props) {
    let { register, handleSubmit, formState: { errors } } = useForm();

    // post request to the login rout on the server
    const onLogin = async (form_data) => {
        try {
            let data = await api_call(URL + '/users/login', 'POST', form_data);
            console.log('success');
            localStorage.setItem('token', data.token);
            if (data.token) {
                alert('Success you can go to home page');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert(`Email or password are inccorect`);

        }
    }

    // Form validation
    let password = register('password', { required: true, minLength: 3 });
    let email_address = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });

    return (
        <div className="col-6 d-flex justify-content-center container rounded" id="login">
            <form onSubmit={handleSubmit(onLogin)} className="col-12 rounded p-5  mt-4">
                <h1>Login</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input {...email_address} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.email && <small className="text-danger">Email invalid</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input {...password} type="password" className="form-control" id="exampleInputPassword1" />
                    {errors.password && <small className="text-danger">Password must be larger than 3 charts</small>}
                </div>
                <button type="submit" className="btnClass">Login</button>
            </form>


        </div>
    );
}
export default Login;