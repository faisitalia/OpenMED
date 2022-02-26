import React, { useState } from 'react'
import { mediaServer } from '../../api/config'

const AskHelp = () => {
  const [room, setRoom] = useState(null)

  function openTheRoom(e) {
    e.preventDefault()

    const params = {
      data: 'nick',
      sessionname: 'myroom',
    }

    mediaServer
      .post('/session', params)
      .then((response) => {
        setRoom(response.data)
      })
      .catch((error) => {
        console.log(error)
        setRoom(null)
      })
  }

  function renderRoom() {
    console.log(room)
    return <div dangerouslySetInnerHTML={{ __html: room }}></div>
  }

  return (
    <div>
      {room ? (
        renderRoom()
      ) : (
        <a href="#" onClick={openTheRoom}>
          Open the room
        </a>
      )}
    </div>
  )
}

export default AskHelp
