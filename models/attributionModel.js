import mongoose from "mongoose";


// User Model
export const Attribution =  mongoose.model("attributions",
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