const db_URL = process.env.dbURL;
const mongoose = require('mongoose');
const mongoconnect = function (){


mongoose.connect(db_URL)
.then(()=>{

    console.log("connected");
})
.catch((err)=>{

    console.log("not connected",err);
})
}

module.exports =mongoconnect;