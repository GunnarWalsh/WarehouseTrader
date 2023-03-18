import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = (props) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [errorsEmail, setErrorsEmail] = useState({})
    const [userReg, setUserReg] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onChangeHandler = (e) => {
        setUserReg({ ...userReg, [e.target.name]: e.target.value })
    }


    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', userReg, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err);
                console.log('^^USED EMAIL^^^', err.response.data.message)
                if (err.response.data.error) {
                    setErrors(err.response.data.error.errors)
                    console.log('^^Errors^^', errors)

                }
                if (err.response.data.message) {
                    setErrorsEmail(err.response.data)
                    console.log(errors)
                }
            })
    }

    return (
        <div className='form-location-reg'>
            <h1 className='text-black'>Register</h1>
            <form onSubmit={submitHandler} className='m-2'>
                <label className='form-label'>First Name:</label>
                <input className='form-control form-styling' type="text" name='firstName' value={userReg.firstName} onChange={onChangeHandler} />
                {
                    errors.firstName ?
                        <p className='text-danger'>{errors.firstName.message}</p> :
                        null
                }
                <label className='form-label'>Last Name:</label>
                <input className='form-control form-styling' type="text" name='lastName' value={userReg.lastName} onChange={onChangeHandler} />
                {
                    errors.lastName ?
                        <p className='text-danger'>{errors.lastName.message}</p> :
                        null
                }
                <label className='form-label'>Email:</label>
                <input className='form-control form-styling' type="text" name='email' value={userReg.email} onChange={onChangeHandler} />
                {
                    errors.email ?
                        <p className='text-danger'>{errors.email.message}</p> :
                        null
                }
                {
                    errorsEmail ?
                        <p className='text-danger'>{errorsEmail.message}</p> :
                        null
                }
                <label className='form-label'>Password:</label>
                <input className='form-control form-styling' type="password" name='password' value={userReg.password} onChange={onChangeHandler} />
                {
                    errors.password ?
                        <p className='text-danger'>{errors.password.message}</p> :
                        null
                }
                <label className='form-label'>Confirm Password:</label>
                <input className='form-control form-styling' type="password" name='confirmPassword' value={userReg.confirmPassword} onChange={onChangeHandler} />
                {
                    errors.confirmPassword ?
                        <p className='text-danger'>{errors.confirmPassword.message}</p> :
                        null
                }
                <button className='btn btn-dark mb-2'>Register</button>
            </form>
        </div>
    )
}

export default Register;