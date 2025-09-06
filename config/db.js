const {MongoClient} = require('mongodb')

const uri = `mongodb+srv://shamil:urcx5298@mysnapgram.zq2yd.mongodb.net/`

const client =  new MongoClient(uri)

async function connectMongodb() {
    try{
        await client.connect()
        console.log('connection success')
    }catch(e){
        console.log("there is an error while connecting")
        console.log(e)
    }
    
}


