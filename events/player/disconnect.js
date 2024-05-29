module.exports = async (client, queue) => {
   try {
      if (client.config.opt.currentMessage != null) {
         client.config.opt.currentMessage.delete().catch((e) => console.log('D\n' + e))
         client.config.opt.currentMessage = null
      }
   } catch {
      console.log('D\n' + e)
   }
}
