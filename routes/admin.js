const express = require("express")

const router=express.Router()
const {getApplications,SetApplicationPending,addSlot,getSlots, setSlot} =require("../controllers/adminControllers")
const {verifyAdmin} =require('../middilwere/AuthMiddilwere')


router.get('/',(req,res)=>{
    res.send("sdfasdfasdfas")
    res.end()
})

router.get('/getapplications',verifyAdmin,getApplications)

router.patch('/SetApplicationPending',verifyAdmin,SetApplicationPending)

router.post('/addSlot',verifyAdmin,addSlot)

router.get('/getslots',verifyAdmin,getSlots)

router.patch("/setSlot",verifyAdmin,setSlot)

module.exports =router