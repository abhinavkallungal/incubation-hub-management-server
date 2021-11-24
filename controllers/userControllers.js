const db =require('../config/connection')
const {USER_COLLECTION,REGISTER_COLLECTION} =require('../config/collection')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')


module.exports={

    signup:async(req,res)=>{

        console.log(req.body);
        const {email ,password}=req.body
        try{

            
            let userExist = await db.get().collection(USER_COLLECTION).findOne({ email })
            
            if(userExist) return res.status(400).json({ errors: 'User already exists' })
            
            const hashedPassword = await bcrypt.hash(password, 10)
            
            
            let result = await db.get().collection(USER_COLLECTION).insertOne({ email, password: hashedPassword})
            
            let user = await db.get().collection(USER_COLLECTION).findOne({ _id: result.insertedId })
            
            const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: "1h" })
            
            return res.status(200).json({ user, token })

        }catch(error){

            console.log(error);

            res.status(500).json({error:error.message})
        }

    },
    Login:async(req,res)=>{
        const {email,password}=req.body

        try{

            
            let user = await db.get().collection(USER_COLLECTION).findOne({ email })
            
            if(!user)  return res.status(400).json({ errors: "Invalid User Name Or Password" })
            
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            
            if (!isPasswordCorrect) return res.status(404).json({ errors: 'Invalid Password' })
            
            let token;

            if(user.isAdmin){

                 token = jwt.sign({ email: user.email, id: user._id,isAdmin:user.isAdmin }, 'secret', { expiresIn: "1h" })

            }else{
                
                 token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: "1h" })
            }
            
            
            res.status(200).json({ user, token })
        }catch(error){
            console.log(error);

            res.status(500).json({error:error.message})


        }
    },
    register:async(req,res)=>{
        try{            
            
            let result = await db.get().collection(REGISTER_COLLECTION).insertOne({...req.body,status:"new"})
            
            return res.status(200).json({ message:"registration success" ,result })

        }catch(error){

            console.log(error);

            res.status(500).json({error:error.message})
        }

    }
    
}