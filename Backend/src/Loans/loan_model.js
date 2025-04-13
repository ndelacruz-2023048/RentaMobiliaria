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
        required:[true, 'Returned product image is required'],
    },
    deliveryConditionNotes:{
        type:String,
        required:[true, 'Delivery condition notes are required'],
    },
    returnConditionNotes:{
        type:String,
        required:[true, 'Return condition notes are required'],
    },
    status:{
        type:String,
        enum:['active', 'borrow','lost','broken','unavailable'],
        default:'active',
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