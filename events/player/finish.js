module.exports = async (client, queue) => {
   try {
      if (client.config.opt.currentMessage != null) {
         client.config.opt.currentMessage.delete().catch((e) => console.log('F\n' + e))
         client.config.opt.currentMessage = null
      }
   } catch (e) {
      console.log('F\n' + e)
   }
}
