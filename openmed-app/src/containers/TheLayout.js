import React, { useState, useEffect } from 'react'
import { CSpinner } from '@coreui/react'
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'

import { apiServer } from '../api/config'
import { Redirect } from 'react-router-dom'

const TheLayout = () => {
  const [logged, isLogged] = useState(null)

  useEffect(() => {
    function fetchCurrentUser() {
      apiServer
        .get('/v1/users/currentUser')
        .then((response) => {
          if (!response.data.currentUser) {
            sessionStorage.clear()
            isLogged(false)
          } else {
            isLogged(true)
          }
        })
        .catch((error) => {
          console.log(error)
          sessionStorage.clear()
        })
    }

    fetchCurrentUser()
  }, [])

  // eslint-disable-next-line no-lone-blocks
  {
    /* <Suspense fallback={<CSpinner color="primary" />}> */
  }

  return logged === null ? (
    <CSpinner color="primary" />
  ) : !logged ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </div>
  )
}

export default TheLayout
