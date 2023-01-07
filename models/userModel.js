import mongoose from "mongoose";


// User Model
export const User =  mongoose.model("users",
    new mongoose.Schema(
        {
            id :            {type: String},
            login :         {type: String, required : [true, "Login needed"]},
            password :      {type: String, required : [true, "Password needed"]},
            passwordVis :   {type: String},

            firstname :     {type: String, required : [true, "Firstname needed"]},
            lastname :      {type: String, required : [true, "Lastname needed"]},

            email :         {type: String, required : [true, "Email needed"]},
            phone :         {type: String,  required : [true, "Phone needed"]},

            rules :         [],
            attributions :  [],
            isAutonomous :  {type: Boolean, default: false},
            refreshTokenFamily : [String],

            taskPersistentList : [],
        },
        {
            timestamps: true
        }
    )
);