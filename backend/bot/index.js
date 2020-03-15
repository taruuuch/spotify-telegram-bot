const Telegraf = require('telegraf')
const { TOKEN, BOT_AUTH_TEXT, BOT_HELP_TEXT } = require('../config/base')

const bot = new Telegraf(TOKEN)

bot.start(({ reply }) => reply('Welcome to spotify playlist bot'))
bot.help(({ reply }) => reply(BOT_HELP_TEXT))

bot.url(({ reply, message }) => {
  const parsed = parse(message.text)

  if(parsed.type !== 'track') {
    ctx.reply('Only track type spotify links are supported!')
    return
  }

  const track = formatURI(parsed)

  if (spotifyApi.getAccessToken()) {
    spotifyApi.addTracksToPlaylist(
      PLAYLIST_ID,
      [ track ]
    )
    .then(data => {
      getTrackInfo({
        spotifyApi,
        trackId: parsed.id,
        reply
      })
    })
    .catch(err => {
      console.log('Add to playlist error: ', err)
      reply('Spotify track add error!')
    })
  } else {
    reply('Сначала установи токен /auth')
    return
  }
})

bot.command('auth', ({ reply }) => reply(BOT_AUTH_TEXT))
bot.command('top', ({ reply }) => {
  spotifyApi.getMyTopTracks({
    limit: 10
  })
    .then(res => {
      const { items: topSongs } = res.body
      let top = ''

      for (let i = 0; i < topSongs.length; i++) {
        const trackInfo = setTrackInfo(topSongs[i])
        top += `\n${i+1}.${trackInfo.artists} - ${trackInfo.title}`
      }

      reply(`Top:\n${top}`)
    })
    .catch(err => console.error(err))
})

bot.on('text', ({ reply, deleteMessage, message, update }) => {
  const { id: userId } = update.message.from
  const { text: token, message_id: msgId } = message

  if (token.includes('Token')) {
    const authorizationCode = token.split('Token ')[1]

    spotifyApi.authorizationCodeGrant(authorizationCode)
      .then(({ body }) => {
        spotifyApi.setAccessToken(body['access_token'])
        // saveUserToken(userId,body)
      })
      .catch(err => {
        console.error(err)
      })

    deleteMessage(msgId - 1)
    deleteMessage(msgId)
    reply('Токен успешно сохранён!')
    return
  }

  deleteMessage(msgId)
  reply('Отправь мне ссылку на песню!')
})

bot.inlineQuery('add', async ({ answerInlineQuery }) => {
  await answerInlineQuery([{
    type: 'article',
    id: 1,
    title: '123',
    message_text: 'message_text',
    description: 'description'
  }])
})

module.exports = bot
