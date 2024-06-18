import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');

  async function getSavedFriends() {
    const res = await axios.get('/api/friends');
    setFriends(res.data);
  };

  useEffect(() => {
    getSavedFriends()
  }, []);
  
  function addFriend() {
    const newFriends = [...friends];
    const newFriend = { picture: picture, name: name };
    newFriends.push(newFriend);
    setFriends(newFriends);

    setPicture('');
    setName('');
  };

  const friendInfo = friends.map((friend) => {
    return (
      <div key={`${friend.name}`}>
        <img src={friend.picture} width="200px" />
        <span>{friend.name}</span>
      </div>
    );
  });
  
  return (<div>
    <label htmlFor="picture">Picture:</label>
    <input 
      type="text" 
      id="picture" 
      value={picture} 
      onChange={(e) => setPicture(e.target.value)} 
    />

    <label htmlFor="name">Name:</label>
    <input 
      type="text" 
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)} 
    />

    <button type="button" onClick={addFriend}>Add Friend</button>

    {friendInfo}
  </div>);
}
