import React from 'react'
import InstagramEmbed from 'react-instagram-embed'

export default function InstagramEmbedd() {
    return (
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
    )
}
