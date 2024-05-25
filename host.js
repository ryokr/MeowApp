const path = require('path')
const express = require('express')

function serverStart() {
   const app = express()
   const port = 3000

   app.get('/', (req, res) => {
      const view = path.join(__dirname, 'z.html')
      res.sendFile(view)
   })

   app.listen(port, () => {
      console.log('\x1b[32;33m%s\x1b[0m', `⭕    🍕 Listening: http://localhost:${port}`)
   })

   process.env.YTDL_NO_UPDATE = true
   process.env.YTSR_NO_UPDATE = true
}

module.exports = serverStart