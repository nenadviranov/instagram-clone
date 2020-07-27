import React, {useState} from 'react'
import { Input, Button, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { auth} from '../firebase'

export default function ModalSignUp({open, setOpen, email, password, username, setUsername, setPassword, setEmail}) {

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

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle)

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


    return (
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
    )
}
