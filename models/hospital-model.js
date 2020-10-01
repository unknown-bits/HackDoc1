const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    googleId:String,
    email:String,
    name:{ type:String ,uppercase:true},
    address:{ type:String, default:"iamaddress" , uppercase:true},
    contact1:{ type:String, default:"0000000000" ,minlength:10},
    contact2:{ type:String, default:"0000000000"},
    facility:{type:booleanArray, default: [0,0,0,0,0]},
    bedavail1:{type:booleanArray, default: [0,0,0]},
    bedavail2:{type:booleanArray, default: [0,0,0]},
    docavail:{type:booleanArray, default:  [0,0,0,0,0]},
    bloodavail1:{type:booleanArray, default: [0,0,0,0]},
    bloodavail2:{type:booleanArray, default: [0,0,0,0]}
});

const Hospital = mongoose.model('hospital',hospitalSchema);

module.exports = Hospital;
