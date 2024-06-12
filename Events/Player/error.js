module.exports = async (client, textChannel, error) => {
   try {
      if (textChannel) console.log('❌    Error\n', error)
   } catch {
      console.log('❌    Error')
   }
}