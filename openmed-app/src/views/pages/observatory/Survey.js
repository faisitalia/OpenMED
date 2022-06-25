import React from 'react'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import 'survey-core/modern.min.css'

/** 
const SurveyPage = () => {
  // eslint-disable-next-line no-undef
  Survey.StylesManager.applyTheme('modern')

  const surveyJson = {
    elements: [
      {
        name: 'FirstName',
        title: 'Enter your first name:',
        type: 'text',
      },
      {
        name: 'LastName',
        title: 'Enter your last name:',
        type: 'text',
      },
    ],
  }

  // eslint-disable-next-line no-undef
  const survey = new Survey.Model(surveyJson)
  document.addEventListener('DOMContentLoaded', function () {
    survey.render('surveyContainer')
  })

  return <div id="surveyContainer"></div>
}
**/

import { Survey } from 'survey-react-ui'
import { StylesManager, Model } from 'survey-core'

StylesManager.applyTheme('modern')

const surveyJson = {
  elements: [
    {
      name: 'FirstName',
      title: 'Enter your first name:',
      type: 'text',
    },
    {
      name: 'LastName',
      title: 'Enter your last name:',
      type: 'text',
    },
  ],
}

const SurveyPage = () => {
  const survey = new Model(surveyJson)

  const alertResults = React.useCallback((sender) => {
    const results = JSON.stringify(sender.data)
    alert(results)
  }, [])

  survey.onComplete.add(alertResults)

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Survey model={survey} />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default SurveyPage
