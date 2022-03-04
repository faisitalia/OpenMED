import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { mediaServer } from '../../api/config'

const AskHelp = () => {
  const [room, setRoom] = useState(null)
  const [stopSession, setStopSession] = useState(false)

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

  function leaveSession(e) {
    e.preventDefault()

    const params = {
      sessionname: document.getElementById('openviduSession').value,
      token: document.getElementById('openviduToken').value,
    }

    mediaServer
      .post('/leave-session', params)
      .then((response) => {
        console.log(response)
        // TODO check session id
        setStopSession(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function renderRoom() {
    console.log(room)

    const externalJS = 'https://localhost:5000/openmed-session.js'
    const script = document.createElement('script')
    script.src = externalJS
    document.body.appendChild(script)

    const externalJS2 = 'https://code.jquery.com/jquery-3.3.1.min.js'
    const script2 = document.createElement('script')
    script2.src = externalJS2
    // script2.integrity = 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8='
    script2.crossorigin = 'anonymous'
    document.body.appendChild(script2)

    // update username
    room.userName = `${room.userName}-publisher`

    return (
      <div id="opendivu-container">
        <div id="main-container" className="container">
          <div id="logged">
            <div id="session">
              <div id="session-header">
                <h1 id="session-title">{room.sessionName}</h1>
                <form method="post">
                  <input
                    id="openviduSession"
                    type="hidden"
                    name="sessionname"
                    value={room.sessionName}
                  />
                  <input id="openviduToken" type="hidden" name="token" value={room.token} />
                  <input
                    id="openviduNickName"
                    type="hidden"
                    name="nickName"
                    value={room.nickName}
                  />
                  <input
                    id="openviduUserName"
                    type="hidden"
                    name="userName"
                    value={room.userName}
                  />
                  <button
                    id="buttonLeaveSession"
                    className="btn btn-large btn-danger"
                    type="submit"
                    onClick={leaveSession}
                  >
                    Leave session
                  </button>
                </form>
              </div>
              <div id="main-video" className="col-md-6">
                <p className="nickName"></p>
                <p className="userName"></p>
                <video autoPlay={true} playsInline={true}></video>
              </div>
              <div id="video-container" className="col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {stopSession ? (
        <Redirect to="/" />
      ) : room ? (
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
