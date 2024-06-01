const express = require('express')

function serverStart() {
   const PORT = 4000
   const app = express()

   app.get('/', (req, res) => {
      res.sendFile('./z.html', { root: __dirname })
   })

   app.listen(PORT, () => {
      console.log('\x1b[32;33m%s\x1b[0m', `⭕    🍕 ⬪ http://localhost:${PORT}`)
   })

   process.env.YTDL_NO_UPDATE = true
   process.env.YTSR_NO_UPDATE = true
}

module.exports = serverStart