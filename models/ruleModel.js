import mongoose from "mongoose";


// User Model
export const Rule =  mongoose.model("rules",
    new mongoose.Schema(
        {
            label :         {type: String, required : [true, "Label needed"]},
            description :   {type: String},
        },
        {
            timestamps: true
        }
    )
);