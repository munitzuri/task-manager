const express = require('express')
const Task = require('../models/task')

const router = new express.Router()


router.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const allowedUpdates = ['description','completed']
    const updates = Object.keys(req.body)
    const IsValidUpdate = updates.every((key)=>allowedUpdates.includes(key))
    if (!IsValidUpdate){
        return res.status(400).send('illigal field update')
    }
    try{
        const task =await Task.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true })
        if (!task) return res.status(400).send(e)
        res.send(task)
    } catch(e){
        if ( e.name="ValidationError") {
             return res.status(400).send(e)
        }
    res.status(500).send(e)
    } 

})

router.delete('/tasks/:id',async (req, res)=>{
    try{
        const task =await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        return res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router