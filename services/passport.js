const passport = require('passport');
const User = require('../models/user');
const config =require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//creating local Strategy
const localOptions = { usernameField:'email',passwordField:"password"};

const localLogin = new LocalStrategy(localOptions,function(email,password,done){

User.findOne({email:email},function(err,user){

    if(err){return done(err);}
    if(!user) {return done(null,false);}

    user.comparePasswords(password,function(err,isMatch){

        if(err) {return done(err);}
        if(!isMatch){return done(null,false);}

        return done(null,user);
    });
  });
});


//setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest:ExtractJwt.fromHeader('authorization'),
  secretOrKey:config.secret
};


//create Jwt Startegy
const jwtLogin = new JwtStrategy(jwtOptions,function(err,user){
  User.findById(payload.sub,function(err,user){
    if(err){ return done(err,false); }

    if(user){
      done(null,user);
    }else{
      done(null,false);
    }
  });

});

passport.use(jwtLogin);
passport.use(localLogin);
