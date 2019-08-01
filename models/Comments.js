var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    
    name: {
      type: String,
 
    },
    
    body: {
      type: String,
      required: true
    },
   
    
  });
  
  // This creates our model from the above schema, using mongoose's model method
  var Comment = mongoose.model("Comment", CommentSchema);

  module.exports = Comment;