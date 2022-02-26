import axios from 'axios'

/**
 * Server configuration for the REST APIs
 */
axios.defaults.withCredentials = true
const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
})
apiServer.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  // checking if accessToken exists
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
apiServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    // extracting response and config objects
    const { response, config } = error
    // checking if error is Aunothorized error
    if (response.status === 401) {
      config.headers.Authorization = ``
      sessionStorage.clear()
    }
    // if none above worked clear local storage and log user out
    // sessionStorage.clear()
    return error
  }
)

const mediaServer = axios.create({
  baseURL: 'https://localhost:5000',
})
mediaServer.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  // checking if accessToken exists
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export { apiServer, mediaServer }
