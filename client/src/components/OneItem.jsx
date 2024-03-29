import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'


const OneItem = (props) => {
    const { id } = useParams()
    const nav = useNavigate()
    const [singleItem, setSingleItem] = useState({})
    const [loginError, setLoginError] = useState()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/item/${id}`)
            .then((res) => {
                console.log('*******', res.data)
                setSingleItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/item/${id}`, { withCredentials: true })
            .then((res) => {
                nav('/dashboard')
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.verified === false) {
                    // console.log("Debugging pt 2")
                    setLoginError(true)
                }else{
                    // console.log("new-step")
                    setLoginError(null)
                }
            })

    }

    return (
        <div className='p-4'>
            <div className='d-flex flex-wrap justify-content-around'>
                <div className='p-4 m-3 single-item'>
                    <h1 className='m-4'>{singleItem.name}</h1>
                    <p>Price: ${singleItem.price}</p>
                    <p>Description: {singleItem.description}</p>

                    {/* <Link to={`/item/${id}/edit`} className='btn btn-warning'>Edit Item</Link> */}
                    <button className='btn btn-danger' onClick={deleteHandler} >Delete Item</button>
                    <Link to={`/messages`} className='btn btn-warning'>Message</Link>
                    {
                        loginError ?
                            <p className='text-danger'>Login to use this function!</p> :
                            null
                    }

                </div>
            </div>

        </div>
    )
}

export default OneItem;