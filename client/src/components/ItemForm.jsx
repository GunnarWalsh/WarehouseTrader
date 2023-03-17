import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ItemForm = (props) => {
    const navigate = useNavigate()
    const { allItems, setAllItems } = props
    const [errors, setErrors] = useState({})
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: ''
    }, [])
    const changeHandler = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        e.target.reset()
        axios.post('http://localhost:8000/api/item/new', item, { withCredentials: true })
            .then((res) => {
                setItem([...allItems, item])
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data.error.name);
                if (err.response.data.error) {
                    setErrors(err.response.data.error.errors)
                    console.log('^^Errors^^', errors)
                }
            })
    }
    return (
        <div className='p-4'>
            <h2>Warehouse Trader</h2>
            <form className='w-25 m-3 single-item' onSubmit={submitHandler} >
                <h3>Need some clutter sold?</h3>
                <div className='p-2'>
                    <label className='form-label'>Title:</label>
                    <input className='form-control form-styling' type="text" onChange={changeHandler} value={item.name} name='name' />
                    {
                        errors.name ?
                            <p className='text-danger'>{errors.name.message}</p> :
                            null
                    }

                    <label className='form-label'>Price: $</label>
                    <input className='form-control form-styling' type="number" onChange={changeHandler} value={item.price} name='price' />
                    {
                        errors.price ?
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


                <button className='btn btn-dark'>Post Item</button>
            </form>
        </div>
    )
}
export default ItemForm;