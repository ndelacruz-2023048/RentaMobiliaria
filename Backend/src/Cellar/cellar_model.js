import { model, Schema } from "mongoose";

const cellarSchema = Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    supervisors:{
        type:[
            {
                    type:Schema.Types.ObjectId,
                    ref:'User',
                    required:[true,'A Supervisor y required']
            
            }
        ]
    }
})

export default model('Cellar',cellarSchema)