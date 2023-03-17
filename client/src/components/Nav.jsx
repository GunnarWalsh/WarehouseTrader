import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'

const Nav = (props) => {
    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {} , {withCredentials:true})
            .then((res) => {
                console.log(res);
                window.localStorage.removeItem('uuid')
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const loginHandler = () => {
        console.log(window.localStorage.getItem('uuid')) 
    }
    return (
        <div className='d-flex justify-content-evenly align-items-center'>
            <div className='nav'>
                <Link className='nav-link text-success' to={'/dashboard'}>Home</Link>
                
                <Link className='nav-link text-black' to={'/item/new'}>List an Item</Link>
                <button className='btn btn-dark' onClick={logout} >Account</button> 
            </div>
        </div>
)}

export default Nav;