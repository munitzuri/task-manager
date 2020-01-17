const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, {
    useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true
})
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true
    },
    age: {
        type: Number,
        default:0,
        validate(val) {
            if (val < 0) {
                throw new Error('age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('not a valid email')
            }

        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(val){
            if (val.length<6 ){
                throw new Error('password too short')
            }
            if (val.toLowerCase().includes('password')){
                throw new Error('password not valid')
            }

        }
    }

})
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim:true,
        required: true
    },
    completed: {
        type: Boolean,
        default:false
    }
})

const myTask = new Task({
    description: "go to sleep!!  "
})

myTask.save().then(() => {
    console.log(myTask)
}).catch((error) => {
    console.log(error)
})
// const me = new User({
//     name: ' uri ',
   
//     email: 'munitzURI@gmail.com',
//     password:'passworD'

// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })