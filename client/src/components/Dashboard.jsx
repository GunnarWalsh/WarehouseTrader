import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const AllItems = (props) => {
    const [allItems, setAllItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items')
            .then((allItems) => {
                setAllItems(allItems.data)
                // console.log(allItems.data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div className='p-4 main-card'>
            <h2 className='mb-5'>All Items</h2>
            <div className='d-flex flex-wrap justify-content-around'>
                {
                    allItems.map((item) => (
                        <div className='p-4 m-3 w-25 item-card' key={item.id}>
                            <p>Item Name: {item.name}</p>
                            <p>Item Price: ${item.price}</p>
                            <Link to={`/item/${item._id}`} className='link-text'>Details</Link>  <Link to={`/item/${item._id}/edit`}  className='link-text'>Edit</Link> 
                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default AllItems;
