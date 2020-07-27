import React, { useState, useEffect } from 'react';
import Post from './components/Post'
import {db, auth} from './firebase'
import './App.css';
import ImageUpload from './components/Imageupload'
import InstagramEmbed from './components/InstagramEmbed'
import Header from './components/Header'
import ModalSignUp from './components/ModalSignUp'
import ModalSignIn from './components/ModalSignIn'

function App() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)


  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user has loged in
        setUser(authUser)
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //performe some clean-up actions
      unSubscribe();
    }
  },[user, username]);


  useEffect(() => {
    //takes snapshot on every change in the database, it is ordered by timestamp
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        //makes object with unique id, and post has content like username, caption, img
        id: doc.id,
        post : doc.data()
      })));
    })
  }, [])


  return (
    <div className="app">

      {/* modal popup form for sign up */}
      <ModalSignUp open={open} setOpen={setOpen} email={email} password={password} username={username} setEmail={setEmail} setPassword={setPassword} setUsername={setUsername} />


      {/* modal popup form to sign in */}
      <ModalSignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} setEmail={setEmail} email={email} password={password} setPassword={setPassword}/>

      <Header user={user} setOpenSignIn={setOpenSignIn} setOpen={setOpen}/>

      <div className="app__posts">
        <div className="app__postLeft">
          {/* looping thru database and rendering it, the key prop is to render the new added files, and ignoring the existing ones */}
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} imageUrl={post.imageUrl} user={user} usename={post.username} caption={post.caption}/>
            ))
          }
        </div>
          <InstagramEmbed/>
      </div>



      {/* the ? is optional it says dont freak out if its not there */}
      {user?.displayName ? 
        (
          <ImageUpload username={user.displayName}/>
        ) 
      : 
        (<h3>Sorry u need to login</h3>)
      }
    </div>
  );
}

export default App;
