const router = require('express').Router();
const Hospital = require('../models/hospital-model');



const authCheck = (req,res,next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }
    else{
        next();
    }
};

router.get('/',authCheck,(req,res) => {
    res.render('dashboard-hospital',{hospital:req.user},);
});

// router.post('/update/beds',authCheck,(req,res) => {
//     const hos =  Hospital.findOneAndUpdate(req.user,{
//         bedavail1[1]:req.body.totalbeds[1];
//     });
//     //hos.name="xyz";
    
//     //hos.bedavail2[1]=req.body.totalbeds[1];
//     console.log(hos._conditions);

// const doc = hos.save();

//     res.render('dashboard-aman',{hospital:req.user});
//     //res.redirect('/dashboard-aman',{hospital:req.user});

//     //console.log(req.body);
// });


// router.put('/update/beds',function(req,res){
//     Hospital.update({email:req.param.email},
//                      {
                        
//                         //  bedavail2:req.body.bedavail[0],
//                      },function(err, docs){
//                         if(err) res.json(err);
//                        else
//                        { 
//                           console.log(docs);
//                         //   res.redirect('/user/'+req.params.id);
//                         }
//                     });
// });
// const methodOverride = require('method-override');
// router.use(methodOverride('_method'));
// router.put('/update/beds',function(req,res){
//     Hospital.findByIdAndUpdate({_id:req.user._id},
//                      {
//                         // for(i=0;i<req.bedavail2.length;i++)
//                         //  bedavail2:req.body.bedavail[0],4[1]
//                      bedavail2:req.body.availbeds
                        
//                      },function(err, docs){
//                         if(err) res.json(err);
//                        else
//                        { 
//                         //   console.log(docs);
//                         console.log(req.body.availbeds[0]),
//                           res.redirect('/dashboard-aman');
//                         }
//                     });
// });


module.exports = router;