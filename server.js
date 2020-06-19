const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passportSetup = require('./config/passport.setup');
const path = require('path');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const bodyParser= require('body-parser');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname + '/Public')));
// app.set('views', path.join(__dirname, 'views'));


//cookie
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.cookieKey]
}));

//initialise passort
app.use(passport.initialize());
app.use(passport.session());

//login and signup
app.use('/auth',authRoutes);
app.use('/dashboard-hospital',dashboardRoutes);

//db connection
const uri = process.env.dbURL;
mongoose.connect(uri, {useNewUrlParser: true ,useUnifiedTopology: true}, () =>{
    console.log('Connected to db');
})



mongoose.set('useFindAndModify', false);
const Hospital = require('./models/hospital-model');
const authCheck = (req,res,next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }
    else{
        next();
    }
};


app.get('/search',function(req,res){
    var y= Hospital.find({name:req.query.searchhos})
    y.exec(function (err, data) {
    if(data.length==0) res.render('error');
    else res.render('dashboard-user',{hospital:data[0]});
   });
})



// *************update for general information
app.post('/dashboard/update/geninfo',authCheck,function(req,res){
            Hospital.findByIdAndUpdate({_id:req.user._id},
                             {
                            name:req.body.name,
                            address:req.body.address,
                            contact1:req.body.contact1,
                            contact2:req.body.contact2

                             },function(err, docs){
                                if(err) res.json(err);
                               else
                               { 
                                res.redirect('/dashboard-hospital');
                                }
                            });
        });

        
// *************update for facilities available
        app.post('/dashboard/update/facavail',authCheck,function(req,res){
            Hospital.findByIdAndUpdate({_id:req.user._id},
                             {
                            facility:req.body.fac
                             },function(err, docs){
                                if(err) res.json(err);
                               else
                               { 
                                res.redirect('/dashboard-hospital');
                                }
                            });
        });

// *************update for doctors available
app.post('/dashboard/update/docavail',authCheck,function(req,res){
    Hospital.findByIdAndUpdate({_id:req.user._id},
                     {
                    docavail:req.body.doc

                     },function(err, docs){
                        if(err) res.json(err);
                       else
                       { 
                        res.redirect('/dashboard-hospital');
                        }
                    });
});

// *************update for blood available
app.post('/dashboard/update/bloodavail',authCheck,function(req,res){
    Hospital.findByIdAndUpdate({_id:req.user._id},
                     {
                        bloodavail1:req.body.blood1,
                        bloodavail2:req.body.blood2

                     },function(err, docs){
                        if(err) res.json(err);
                       else
                       { 
                        res.redirect('/dashboard-hospital');
                        }
                    });
});

// *************update for bed available
app.post('/dashboard/update/beds',authCheck,function(req,res){
    Hospital.findByIdAndUpdate({_id:req.user._id},
                     {
                         bedavail1:req.body.avail,
                        bedavail2:req.body.total
                     },function(err, docs){
                        if(err) res.json(err);
                       else
                       {
                           res.redirect('/dashboard-hospital');
                        }
                    });
});


app.get('/',function(req,res)
{
    res.render('home');
});

app.get('/team',function(req,res){
    res.render('team');
});

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});
