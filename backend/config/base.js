const PORT = process.env.PORT
const NAME = process.env.BOT_NAME
const TOKEN = process.env.TELEGRAM_TOKEN
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID
const REDIRECT_URL = process.env.SPOTIFY_REDIRECT_URL
const AUTH_SCOPE = process.env.SPOTIFY_SCOPES

const BOT_HELP_TEXT = `
Commands:
/start - Restart bot
/help - Help information about bot
/auth - Link for generate access token for use bot. Need to paste in chat for use!

Before auth you send me song from spotify and i'm add song to playlist :)
`

const BOT_AUTH_TEXT = `Type this to your browser and send me your accessToken:
https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&scope=${AUTH_SCOPE}`

const REPLY_TRACK_INFO = trackInfo => `Spotify track successful added to playlist!\n\nTrack info:\n${trackInfo.artists} - ${trackInfo.title}\nAlbum: ${trackInfo.album}\nRelease date: ${trackInfo.release}\nDuration: ${trackInfo.duration}\n\nSuccessful added to playlist!`

module.exports = {
    PORT,
    NAME,
    TOKEN,
    CLIENT_ID,
    CLIENT_SECRET,
    PLAYLIST_ID,
    REDIRECT_URL,
    AUTH_SCOPE,
    BOT_HELP_TEXT,
    BOT_AUTH_TEXT,
    REPLY_TRACK_INFO
}
