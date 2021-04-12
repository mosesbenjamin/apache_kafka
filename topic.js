const { Kafka } = require('kafkajs')

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['${Zookeeper_Server_IP}:9092'],
    })

    const admin = kafka.admin()
    console.log('Connecting...')
    await admin.connect()
    console.log('Connected!')

    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
        },
      ],
    })
    console.log('Created successfull y')
    await admin.disconnect()
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

run()
