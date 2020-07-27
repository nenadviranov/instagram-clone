import React from 'react'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'

export default function Header({user, setOpenSignIn, setOpen}) {
    return (
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
    )
}