const { Kafka } = require('kafkajs')

const msg = process.argv[2]

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['${Zookeeper_Server_IP}:9092'],
    })

    const producer = kafka.producer()
    console.log('Connecting...')
    await producer.connect()
    console.log('Connected!')

    const partition = msg[0] < 'N' ? 0 : 1
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    })
    console.log(`Created successfully! ${JSON.stringify(result)}`)
    await producer.disconnect()
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

run()
