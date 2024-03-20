import { Strategy as JwtStrategy,ExtractJwt } from "passport-jwt";
import Keys from "./keys.js";
import User from '../models/user.js'


export default function(passport) {
    let opts ={}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = Keys.secretOfKey
   
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=> {
        //ngambil di controler infoke model 
        User.findById(jwt_payload.id,(err,user)=> {
            if(err){
                return done(err,false)
            }
            if(user){
                return done(null,user)
            } else {
                return done(null,false)
            }
        })
    }))

}





/*
coding asli js biasa gak pakai pacakge module dgn cara import 
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const User = require('../models/user');

//pasport dibawah ini adalah 
module.exports = (passport) => {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
        User.findById(jwt_payload.id, (err, user) => {

            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }

        });

    }));

}

bantuan dari chat gpt utk pasport argument:
In summary, (passport) => { ... } is a function that configures Passport with a JWT strategy, 
and passport is the instance of Passport.js that is passed into this function as an argument




*/