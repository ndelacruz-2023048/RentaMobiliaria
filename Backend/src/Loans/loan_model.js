import { model, Schema } from "mongoose";

const loanSchema = Schema({
    borrowDate:{
        type:Date,
        required:[true, 'Day delivery is required'],
    },
    estimatedDeliveryDate:{
        type:Date,
        required:[true, 'Day return is required'],
    },
    realDeliveryDate:{
        type:Date,
        required:[true, 'Day return is required'],
    },
    initialProductImage:{
        type:String,
        required:[true, 'Initial product image is required'],
    },
    returnedProductImage:{
        type:String,
    },
    deliveryConditionNotes:{
        type:String,
        required:[true, 'Delivery condition notes are required'],
    },
    returnConditionNotes:{
        type:String,
    },
    status:{
        type:String,
        enum:['completed', 'pending'],
        default:'pending',
    },
    /*Atributo de estado de material */
    materialStatus:{
        type:String,
        lowercase:true,
        enum:['good','bad']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'User is required'],
    },
    supervisor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Supervisor is required'],
    }
})

export default model('Loan',loanSchema)