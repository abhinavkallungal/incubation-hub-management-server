const db = require('../config/connection')
const { USER_COLLECTION, REGISTER_COLLECTION, SLOT_COLLECTION } = require('../config/collection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId



module.exports = {

    Login: async (req, res) => {
        const { email, password } = req.body

        try {


            let user = await db.get().collection(USER_COLLECTION).findOne({ email })

            if (!user) return res.status(400).json({ errors: "Invalid User Name Or Password" })

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) return res.status(404).json({ errors: 'Invalid Password' })

            const token = jwt.sign({ email: user.email, id: user._id }, 'adminSecret', { expiresIn: "1h" })

            res.status(200).json({ user, token })
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: error.message })


        }
    },
    getApplications: async (req, res) => {

        try {
            let Applications = await db.get().collection(REGISTER_COLLECTION).find().toArray()


            if (Applications) {

                return res.status(200).json({ Applications })

            }
            else {
                return res.status(500).json({ error: error.message })


            }

        } catch (error) {

            res.status(500).json({ error: error.message })

        }


    },
    SetApplicationPending:  (req, res) => {
        return new Promise(async(resolve, reject) => {
            const { id ,status } = req.body

            try {
               await db.get().collection(REGISTER_COLLECTION).updateOne({ _id: ObjectId(id) }, {$set :{status: status}  }).then((data) => {
                   
                return res.status(200).json({ data })

                }).catch((error) => {
                    console.log(error);
                })

            } catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message })


            }

        })
    },
    addSlot:(req,res)=>{
        console.log(req.headers);
        return new Promise(async(resolve,reject)=>{
            try{
                await db.get().collection(SLOT_COLLECTION).insertOne({slot:null}).then((data)=>{

                    return res.status(200).json({ data })

                })
            }catch(error){

                res.status(500).json({ error: error.message })

            }
        })
    },
    getSlots:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                let slots= await db.get().collection(SLOT_COLLECTION).find().toArray()

                if(slots){
                    return res.status(200).json({slots})
                } else {
                    return res.status(500).json({ error: "server error" })
                }



            }catch(error){

                res.status(500).json({ error: error.message })

            }
        })
    },
    setSlot:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(req.body);
            const{slotId,userId}=req.body
            try{
                await db.get().collection(SLOT_COLLECTION).updateOne({_id:ObjectId(slotId)},{$set:{slot:ObjectId(userId)}}).then((data)=>{
                    
                    return res.status(200).json({data})

                }).catch((error)=>{

                    res.status(500).json({ error: error.message })

                })

            }catch(error){

                res.status(500).json({ error: error.message })

            }
        })

    }

}