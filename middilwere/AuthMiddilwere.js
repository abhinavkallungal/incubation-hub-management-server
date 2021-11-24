const jwt =require('jsonwebtoken');
const JwtDecode=require('jwt-decode')


module.exports={
    verifyUser:(req,res,next)=>{

        if(req.headers.authorization){


            jwt.verify(req.headers.authorization, 'secret', (err, authorizedData) => {
                if(err){
                    console.log('ERROR: Could not connect to the protected route');
                    
                    res.status(403).json({ error: err })


                } else {

                  

                    next()
                }
            })

        }else{
            console.log("dfads");
            res.status(403).json({ error: "no token availabel" })

        }

    },
    verifyAdmin:(req,res,next)=>{
        console.log(req.headers);

        if(req.headers.authorization){

            const user=JwtDecode(req.headers.authorization)

            if(user.isAdmin){

                jwt.verify(req.headers.authorization, 'secret', (err, authorizedData) => {

                    if(err){
                        console.log('ERROR: Could not connect to the protected route');
                        
                        res.status(403).json({ error: err })
    
    
                    } else {
    
                      
    
                        next()
                    }
                })

            }else{

                res.status(403).json({ error: "user not a admin" })

            }
        }else{
            console.log("dfads");
            res.status(403).json({ error: "no token available" })

        }

    }
}