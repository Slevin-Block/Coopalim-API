import mongoose from "mongoose";


// User Model
export const Task =  mongoose.model("tasks",
    new mongoose.Schema(
        {
            id :                    {type: String},
            label :                 {type: String/* , required : [true, "Label needed"] */},
            description :           {type: String/* , required : [true, "Label needed"] */},

            createdBy :             {type: String},
            taskModel :             {type: String},

            startTime :             {type: Date},
            endTime :               {type: Date},

            numberOfParticipators : {type: Number},
            numberOfNovice :        {type: Number},
            numberOfAutonomous :    {type: Number},
            neededAttributions :    [String],

            participators :      [String],

            isUrgent : {type : Boolean},
        },
        {
            timestamps: true
        }
    )
);