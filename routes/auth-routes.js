const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res) => {
    if(req.user){
        res.redirect('/dashboard-hospital');
    }
    else
    res.render('login');
});

router.get('/signup',(req,res) => {
    res.render('signup');
});

router.get('/logout',(req,res) => {
    //res.send('looging out');
    req.logout();
    res.redirect('/');
});

router.get('/google',passport.authenticate('google',{
    scope : ['profile','email']
}));

// callback function after login
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    //res.send(req.user);
    res.redirect('/dashboard-hospital');
});

module.exports = router;