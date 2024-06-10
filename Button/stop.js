module.exports = playerStop

async function playerStop(queue, collector, currentMessage) {
   await queue.stop()
   await collector.stop()
   await currentMessage.delete().catch(() => {})
}
