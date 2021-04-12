const { Kafka } = require('kafkajs')

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['${Zookeeper_Server_IP}:9092'],
    })

    const consumer = kafka.consumer({ groupId: 'test' })
    console.log('Connecting...')
    await consumer.connect()
    console.log('Connected!')

    consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    })

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message: ${result.message.value} on partition ${result.partition}`
        )
      },
    })
  } catch (error) {
    console.error(error)
  }
}

run()
