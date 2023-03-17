import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const EditItem = (props) => {
    const navigate = useNavigate()
    const { allItems, setAllItems } = props
    const [errors, setErrors] = useState({})
    const [login, setLogin] = useState({})
    const { id } = useParams()
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: ''
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/item/${id}`)
            .then((res) => {
                console.log('useEffect', res.data);
                setItem(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/item/${id}/edit`, item, { withCredentials: true })
            .then((res) => {
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err)
                console.log('^^^^^^^',err.response.data);
                setErrors(err.response.data.error.errors);
                setLogin(err.response.data)
            })

    }
    const changeHandler = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }

    return ((
        <div className='d-flex justify-content-center flex-row'>

            <form className='w-25 m-3' onSubmit={submitHandler} >
                <div className='p-2'>
                    <label className='form-label'>Item Name:</label>
                    <input className='form-control form-styling' type="text" onChange={changeHandler} value={item.name} name='name' />
                    {
                        errors.name ?
                            <p className='text-danger'>{errors.name.message}</p> :
                            null
                    }

                    <label className='form-label'>Item Price:</label>
                    <input className='form-control form-styling' type="number" onChange={changeHandler} value={item.price} name='price' />
                    {
                        errors.type ?
                            <p className='text-danger'>{errors.price.message}</p> :
                            null
                    }

                    <label className='form-label'>Item Description:</label>
                    <input className='form-control form-styling' type="text" onChange={changeHandler} value={item.description} name='description' />
                    {
                        errors.description ?
                            <p className='text-danger'>{errors.description.message}</p> :
                            null
                    }
                </div>
                <br />
                <button className='btn btn-dark'>Edit</button>
            </form>
        </div>
    ))
}

export default EditItem;