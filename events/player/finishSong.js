module.exports = async (client, queue) => {
   try {
      if (client.config.opt.currentMessage != null) {
         await new Promise((resolve) => setTimeout(resolve, 1000))
   
         client.config.opt.currentMessage.delete().catch((e) => console.log('FS\n' + e))
         client.config.opt.currentMessage = null
      }
   } catch (e) {
      console.log('FS\n' + e)
   }
}
