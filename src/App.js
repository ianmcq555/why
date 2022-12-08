import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Breweries from './views/Breweries';
import Brew from './Brew';

export default function App() {
  const getUserFromLS = () => {
    const found = localStorage.getItem('brew_user');
    if (found) {
      return JSON.parse(found)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLS());
  const [brews, setBrews] = useState([]);
  const [brew, setBrew] = useState({ size: 0 });

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const createPopup = async () => {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    localStorage.setItem('brew_user', JSON.stringify(user))
    setUser(user)
    getBrew(user)
  };

  const logOut = () => {
    localStorage.removeItem('brew_user')
    setUser({})
    setBrew({ size: 0 })
  };

  const getBrews = async () => {
    const res = await fetch('https://api.openbrewerydb.org/breweries/random?size=10')
    const data = await res.json();
    console.log(data)
    setBrews(data)
  };

  useEffect(() => { getBrews() }, [])
  useEffect(() => { if (user.uid) { getBrew(user) } }, [user])

  const showBrews = () => {
    return brews.map(p => <div key={p.id} style={{ width: "18rem", border: '1px solid grey' }}>
      <h1>{p.name}</h1>
      <p>{p.brewery_type}</p>
      <button onClick={() => { addToBrew(p) }}>Add To Saved List</button>
      <button onClick={() => { removeFromBrew(p) }}>Remove From Saved List</button>
    </div>)
  };

  const addToDB = (brew) => {
    const db = getDatabase();
    set(ref(db, `/brew/${user.uid}`), brew)
  };

  const getBrew = async (user) => {
    const dbRef = ref(getDatabase())
    const snapshot = await get(child(dbRef, `/brew/${user.uid}`))
    if (snapshot.exists()) {
      setBrew(snapshot.val())
    }
  }

  const addToBrew = (item) => {
    const newBrew = { ...brew };
    if (item.id in newBrew) {
      newBrew[item.id].qty++;
    }
    else {
      newBrew[item.id] = item
      newBrew[item.id].qty = 1
    }
    newBrew.size++

    setBrew(newBrew)
    if (user.uid) {
      // updateDB
      addToDB(newBrew)
    }

  };

  const removeFromBrew = (item) => {
    const newBrew = {...brew};
    if (item.id in newBrew) {
      newBrew[item.id].qty--;
    }
    else {
      newBrew[item.id] = item
      newBrew[item.id].qty = 1
    }
    newBrew.size--

    setBrew(newBrew)
    if (user.uid){
      // updateDB
      addToDB(newBrew)
    }

  };

  return (

    <Router>
      <Nav />
      <div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/breweries' element={<Breweries />} />
          <Route path='/brew' element={<Brew />} />
        </Routes>
      </div>

      <div>
        <h1>{user.uid ? user.displayName : "GUEST"} | {brew.size}</h1>

        <div className='row'>
          {showBrews()}
        </div>

        {user.uid ?
          <button onClick={logOut}>Log Out</button>
          :
          <button onClick={createPopup}>Sign In With Google</button>
        }

        <Brew brew={brew} />

      </div>
    </Router>

  )
}