const express = require('express')
require('./db/mongoose') //run mongoose...
const User = require('./models/user')
const Task = require('./models/task')
const userRouter= require('./routers/user')
const taskRouter= require('./routers/task')


const app = express()
const port = process.env.PORT || 3000


app.use((req,res,next)=>{
        res.status(503).send('site down :-) ')  
})
//format results as json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('server is up on port ' + port)
})
