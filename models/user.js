const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');




//defining our model
const userSchema = new Schema({
  email: {type:String,unique:true,lowercase:true},
  password:String
});

//Create the model class

//on save hook run this function
//Before saving a model , runthis function
userSchema.pre('save',function(next){
  //get access to the usermodel
  
  const user = this;
    //generate a salt then run callback
  bcrypt.genSalt(10,function(err,salt){
    if(err){ return next(err);}

    //hash (encrypt) our password using the salt
    bcrypt.hash(user.password,salt,null,function(err,hash){
       if(err){return next(err);}

      // overwrite plain text pasword with encrypted password
       user.password = hash;

       next(); //go ahead and save the model
    })
  });
});

userSchema.methods.comparePasswords = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if(err) {return callback(err);}

    callback(null,isMatch);

  });
}

const ModelClass = mongoose.model('user',userSchema); //loads the schema into mongoose


//export the model

module.exports = ModelClass;
