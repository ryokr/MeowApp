module.exports = async (queue, collector, currentMessage) => {
   await queue.stop()
   await collector.stop()
   await currentMessage.delete().catch(() => {})
}
