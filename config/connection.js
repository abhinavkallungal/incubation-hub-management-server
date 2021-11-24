const mongoClient = require('mongodb').MongoClient

const state = {
    db:null

}

module.exports.connect=function(done){
     const url ="mongodb://localhost:27017/"
     const dbName="incubationHub"
     mongoClient.connect(url,(err,data)=>{
        if(err){
            console.log("err",err);
            return done(err);
        } 

        if(data){
            console.log("db connected");
        }
        state.db=data.db(dbName)
        done()
     })
}

module.exports.get= function(){
    return state.db
}