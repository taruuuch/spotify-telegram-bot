const axios = require('axios').default

const apiConfig = {
    baseURL: `https://api.spotify.com/v1`,
    timeout: 3000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const apiClientInstance = axios.create(apiConfig)

const setAuthHeaderToApiClient = token => apiClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${body.access_token}`
    return config
})

module.exports = {
    apiClient: apiClientInstance,
    setAuthHeaderToApiClient
}
