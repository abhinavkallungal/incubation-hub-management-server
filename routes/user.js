const express = require('express')
const userControllers =require('../controllers/userControllers')

const {verifyUser} =require('../middilwere/AuthMiddilwere')

const router=express.Router()

router.post('/signup' ,userControllers.signup)

router.post('/login',userControllers.Login)

router.post('/register',verifyUser,userControllers.register)




module.exports =router