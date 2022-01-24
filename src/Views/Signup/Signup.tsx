import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault();

        const users = {
            email: email,
            password: password
        }

        await axios.post("http://localhost:5000/user/add", users)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={onFormSubmit}>
                    <h3 className='text-center mb-3'>Signup</h3>

                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="email" className='form-control' onChange={onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="password" className='form-control' onChange={onChangePassword} />
                    </div>
                    <button className='btn btn-success btn-block'>Sign Up</button>

                    <p className="message text-center mt-3">Already registered? <Link to="/">Log In</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup
