import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import OneItem from './components/OneItem';
import ItemForm from './components/ItemForm';
import EditItem from './components/EditItem';
import Chatroom from './components/Chatroom'

function App() {
  const [allItems, setAllItems] = useState([])
  const [socket] = useState(() => io(':8000'));
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState('')

  useEffect(() => {
    console.log('Is this running?');
    
    socket.on('connect', () => {
      console.log('Socket Connected');
      setIsConnected(true);
    });
    return () => {
      socket.disconnect(true)
    };
  }, [])


  return (
    <div className="App background">
      <Nav />
      <Routes>
        <Route path='/' element={<><Register/><Login/></> } />
        {/* <Route path='login' element={<Login />} /> */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='/item/:id' element={<OneItem />} />
        <Route path='/item/new' element={<ItemForm allItems={allItems} setAllItems={setAllItems} />} />
        <Route path='/item/:id/edit' element={<EditItem />} />
        <Route path='/messages' element={<Chatroom socket={socket} username={username} setUsername={setUsername}/>} />
      </Routes>
    </div>
  );
}

export default App;

