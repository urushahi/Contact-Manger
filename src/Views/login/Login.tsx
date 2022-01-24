import axios from 'axios';
import React, { useState } from 'react'
import { BsEye, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [passwordIcon, setPasswordIcon] = useState(false);
    const togglePasswordIcon = () => setPasswordIcon(!passwordIcon)

    const navigate = useNavigate();

    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault();

        await axios.get(`http://localhost:5000/user/${email}/${password}`)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data.id);
                navigate("/index");
                window.location.reload();
            })
            .catch(err => {
                alert("Wrong email or password")
            })
    }
    return (
        <>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={onFormSubmit}>
                    <h3 className='text-center mb-3'>Login</h3>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="email" className='form-control' onChange={onChangeEmail} />
                    </div> <div className="form-group">
                        <label htmlFor="">Password</label>
                        <div className="input-group">
                            <input type={`${passwordIcon ? "password" : "text"}`} placeholder="password" className='form-control' onChange={onChangePassword} />
                            <div className="input-group-icon" onClick={() => togglePasswordIcon()}>
                                {passwordIcon ?
                                    <BsEyeFill /> :
                                    <BsEyeSlashFill />
                                }

                            </div>
                        </div>
                    </div>
                    <button className='btn btn-success btn-block'>Log In</button>
                    <p className="message text-center mt-3">Don't have a account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login;
