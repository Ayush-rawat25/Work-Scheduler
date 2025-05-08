const express = require("express");
const router = express.Router();
const Tasks = require("../models/AddTask");
const { addEventToGoogleCalendar } = require("../calendar");
const fetchUser = require("../middleware/fetchuser");


//Add Task using POST : api/tasks/addtask Login Required
router.post(
    '/addtask',
    fetchUser,
    async(req,res)=>{
        const { summary, description, start, end, priority } = req.body;
        console.log("User:", req.user);
        try{
            const googleEvent = await addEventToGoogleCalendar(req.user.accessToken, {
                summary,
                description,
                start,
                end,
            });

            const task = new Tasks({
                user: req.user.id,
                summary,
                description,
                start,
                end,
                priority,
                googleEventId: googleEvent.id,
            }) 
            const saveTask = await task.save()
            res.status(201).json({ message: "Task added", task });
        }catch(error){
            console.error(error.message);
            res.status(500).json({message:"Failed to add Task"});
        }
    }
)

router.post(
    '/deletetask/:id',
    fetchUser,
    async(req,res)=>{
        try{
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({ Success: "Note has been deleted" });
        }catch(error){
            console.error(error.message);
            res.status(500).json({message:"Failed to add Task"});
        }
    }
)
module.exports = router;