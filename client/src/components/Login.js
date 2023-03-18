import React, { useState } from 'react';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './loginForm.css'
const Login = (props) => {
    const navigate = useNavigate()
    const path = useLocation().pathname;
    const location = path.split("/")[1];
    const [errors, setErrors] = useState({})
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }
    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log('**********', err)
                if (err.response.data.message) {
                    setErrors(err.response.data)
                    console.log(errors)
                }
            })
    }
    return (
        <div className='form-location'>
            <h1>Login</h1>
            <form className='' onSubmit={loginHandler}>

                <label className='form-label'>Email:</label>
                <input className='form-control' type='text' name='email' value={userLogin.email} onChange={changeHandler}></input>
                {
                    errors ?
                        <p className='text-danger'>{errors.message}</p> :
                        null
                }

                <label className='form-label'>Password:</label>
                <input className='form-control form-styling' type='password' name='password' value={userLogin.password} onChange={changeHandler}></input>
                {
                    errors ?
                        <p className='text-danger'>{errors.message}</p> :
                        null
                }
                <button className='btn btn-dark'>Login</button>
            </form>
        </div>
    )
}
            
export default Login;
