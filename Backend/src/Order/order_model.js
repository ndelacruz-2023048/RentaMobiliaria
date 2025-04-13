import { model, Schema } from "mongoose";

const orderSchema = Schema({
    descriptionOrder:{
        type:String,
        required:[true, 'Description is required'],
    },
    estimatedDeliveryDate:{
        type:Date,
        required:[true, 'Day return is required'],
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low',
    },
    status:{
        type:String,
        enum:['pending', 'approved', 'denied'],
        default:'pending',
    },
    requestor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Requestor is required'],
    },
    supervisor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Supervisor is required'],
    },
    materialId:{
        type:Schema.Types.ObjectId,
        ref:'Material',
        required:[true, 'Material is required'],
    },

})

export default model('order',orderSchema)