import React, { useEffect, useState } from 'react'
import {
  CSpinner,
  CListGroup,
  CListGroupItem,
  CLink,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CButton,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { getFacilities, getNearestFacilities, getCoordinatesByAddress } from '../../api/facility'

// import { apiServer } from '../../api/config'

/**
 *
 * @returns
 */
const Facilities = () => {
  const [address, setAddress] = useState('')
  const [facilities, setFacilities] = useState([])
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    function fetchFacilities() {
      getFacilities()
        .then((facilities) => {
          setFacilities(facilities)
        })
        .catch((err) => {
          const errors = err.response.data.errors[0].message
          setErrors(errors)
        })
    }

    fetchFacilities()
  }, [])

  /**
   *
   */
  async function getNearestFacilityByAddress() {
    const coordinates = await getCoordinatesByAddress(address)
    setAddress(coordinates.address)

    const facilities = await getNearestFacilities(coordinates.latitude, coordinates.longitude)
    setFacilities(facilities)
  }

  /**
   *
   * @returns
   */
  function renderFacilities() {
    return (
      <span>
        <CForm
          onSubmit={(e) => {
            e.preventDefault()
            getNearestFacilityByAddress()
          }}
        >
          <CFormGroup>
            <CInputGroup className={'mb-3 px-0 col-6'}>
              <CInput
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
                placeholder="Cerca per indirizzo"
              />
              <CInputGroupAppend>
                <CButton color="primary" type="submit" disabled={facilities.length === 0}>
                  {facilities.length === 0 ? (
                    <CSpinner color="white" size="sm" />
                  ) : (
                    <CIcon name="cil-arrow-right" />
                  )}
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
        </CForm>
        {facilities.length === 0 ? (
          <CSpinner color="primary" />
        ) : (
          <CListGroup>
            {facilities.map((facility, idx) => (
              <CListGroupItem key={idx}>
                <CLink
                  to={{
                    pathname: `/facilities/${facility.id}`,
                  }}
                >
                  {facility.name}
                </CLink>
              </CListGroupItem>
            ))}
          </CListGroup>
        )}
      </span>
    )
  }

  return <div>{errors ? <CAlert color="warning">{errors}</CAlert> : renderFacilities()}</div>
}

export default Facilities
