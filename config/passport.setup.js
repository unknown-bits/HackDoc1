const passport = require('passport');
const GoogleStradegy = require('passport-google-oauth20');
//const keys = require('./keys');
const Hospital = require('../models/hospital-model');
require('dotenv').config();



passport.serializeUser((hospital,done) => {
    done(null,hospital.id);
});


passport.deserializeUser((id,done) => {
    Hospital.findById(id).then((hospital) => {
        done(null,hospital);
    });
});


passport.use(
    new GoogleStradegy({
        //option for google strategy
        callbackURL : '/auth/google/redirect',
        clientID : process.env.clientID,
        clientSecret : process.env.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //check if user exists

        Hospital.findOne({googleId:profile.id}).then((currentHospital) => {
            if(currentHospital){
                //already have
                //console.log('user is:',currentHospital);
                done(null,currentHospital);
            }
            else{
                //create one
                new Hospital({
                    googleId:profile.id,
                    email:profile.emails[0].value,
                    name:profile.emails[0].value,
                    // address:"allahabad",
                    // contact1:"7425034595",
                    // contact2:"7453636335",
                    // facility1:['ambu','blood','venti','chair'],
                    // // facility2:[true,true,false,true],
                    // bedavail:['general','icu'],
                    // bedavail1:[100,80],
                    // bedavail2:[50,20],
                    // docavail1:['sergen','physician','ortho','gyro'],
                    // docavail2:[true,false,true,false]
                    
                }).save().then((newHospital) => {
                    //console.log('new hospital added: '+newHospital);
                    done(null,newHospital);
                });
            }
        });
    })
);