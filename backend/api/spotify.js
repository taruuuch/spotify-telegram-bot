const { apiClient } = require('./api')
const { CLIENT_ID, CLIENT_SECRET } = require('../config/base')
const { parse, formatURI } = require('spotify-uri')

const getAccessToken = autorizationCode => {

}

const getActiveDeviceId = () => {
    let activeDeviceId = null

    apiClient.get('https://api.spotify.com/v1/me/player/devices')
        .then(({ devices }) => {
            console.log(devices)
        })
        .catch(error => console.error(error))

    return activeDeviceId
}

const trackInfo = info => {
    const { name, duration_ms, artists, album } = info
    const { name: albumName, release_date } = album

    const trackInfo = {
        artists: '',
        title: name,
        album: albumName,
        release: release_date,
        duration: dayjs(duration_ms).format('mm:ss')
    }

    artists.forEach(artist => {
        const { length } = trackInfo.artists

        if (length > 0) {
            trackInfo.artists += `, ${artist.name}`
        } else {
            trackInfo.artists = artist.name
        }
    })

    return trackInfo
}

const getTrack = () => {
    apiClient.get('/tracks/:trackId')

}

const addTrackToQueue = (trackUri = 'spotify:track:2xOJpBdKDPTiiCw2YsMMtB') => {
    // spotify:track:2xOJpBdKDPTiiCw2YsMMtB
    const activeDevice = getActiveDeviceId()
    apiClient.post(`/me/player/queue?device_id=${activeDevice}&uri=${trackUri}`)
}

const createPlaylist = userId => {
    apiClient.post(`/users/${userId}/playlists`, {
        name: 'Share songs from telegram',
        public: false,
        description: 'Playlist for songs from TG bot'
    })
}

const addTrackToPlaylist = trackUri => {
    apiClient.post(`/playlists/${PLAYLIST_ID}/tracks`, )
}

module.exports = {
    authentication,
    getActiveDeviceId,
    addTrackToQueue
}
