import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Homepage = (props) => {
    const { socket, username, setUsername } = props
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const joinServer = (e) => {
        e.preventDefault();
        socket.emit('join-server', username)
    }

    useEffect(() => {
        socket.on('new-user-joined', data => {
            console.log(data);
            setUsers(data)
        })
        socket.on('send-message-to-all-clients', data => {
            // console.log(data);
            setMessages(prevMessages => [...prevMessages, data])
        })
    }, [])
    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', { message: input, username: username })
        e.target.reset()
    }
    return (
        <div className='message-card'>
            <form onSubmit={joinServer}>
                <h2>Messages</h2>
                <label></label>
                <input placeholder='User Name' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className='btn btn-success m-2'>Join</button>
            </form>
            {
                users.map((user) => (
                    <p className='text-danger'>{user.username} joined the chat</p>
                ))
            }
            {
                messages.map((message) => (
                    <p className='messages'>{message.username} : {message.message}</p>
                ))
            }
            <form onSubmit={sendMessage}>
                <label></label>
                <input placeholder='Message'type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className='btn btn-primary m-1'>Send</button>
            </form>
        </div>
    )
}

export default Homepage;