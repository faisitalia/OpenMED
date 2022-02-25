import React, { useState } from 'react'
import { mediaServer } from '../../api/config'

const AskHelp = () => {
  const [roomLoaded, isRoomtoLoad] = useState(null)

  function openTheRoom(e) {
    e.preventDefault()

    const params = {
      data: 'nick',
      sessionname: 'myroom',
    }

    mediaServer
      .post('/session', params)
      .then((response) => {
        console.log(response)
        isRoomtoLoad(true)
      })
      .catch((error) => {
        console.log(error)
        isRoomtoLoad(false)
      })
  }

  function renderRoom() {
    return (
      <object data="https://localhost:5000/" width="800" height="800" type="text/html"></object>
    )
  }

  return (
    <div>
      <a href="#" onClick={openTheRoom}>
        Open the room
      </a>
      {roomLoaded ? renderRoom() : ''}
    </div>
  )
}

export default AskHelp
