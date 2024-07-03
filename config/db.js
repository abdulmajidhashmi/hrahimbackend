const dbURL =`mongodb+srv://majid_hashmi7:2OMeNuZwBWEpmYcw@scaler-cluster.33z31ho.mongodb.net/`;
const mongoose = require('mongoose');
const mongoconnect = function (){


mongoose.connect(dbURL)
.then(()=>{

    console.log("connected");
})
.catch((err)=>{

    console.log("not connected",err);
})
}

module.exports =mongoconnect;