import React, { useState, useEffect } from 'react';
import Post from './components/Post'
import {db, auth} from './firebase'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/Imageupload'
import InstagramEmbed from 'react-instagram-embed'


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

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

  const signUp = (e) => {
    e.preventDefault();
    //authentication for email and password

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName : username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }


  return (
    <div className="app">

      

      {/* modal popup form for sign up */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              onClick={signUp}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              onClick={signIn}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img alt="react" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="app_headerImage"/>
        {user ? 
      (<Button onClick={() => auth.signOut()}>Log Out</Button>) 
      : 
      (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )
      }
      </div>

      <div className="app__posts">
        <div className="app__postLeft">
          {/* looping thru database and rendering it, the key prop is to render the new added files, and ignoring the existing ones */}
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} imageUrl={post.imageUrl} user={user} usename={post.username} caption={post.caption}/>
            ))
          }
        </div>
        <div className="app__postRight">
          <InstagramEmbed 
            url='https://www.instagram.com/p/CC--HROpXF4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
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
