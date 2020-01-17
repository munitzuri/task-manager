const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const ObjectID = mongodb.ObjectID
const id = new ObjectID()


mongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(error)
    }
    const db = client.db(databaseName)
    //
    db.collection('tasks').deleteOne({
        description:"eat lunch"
    }).then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })

})
