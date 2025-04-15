import { model, Schema } from "mongoose";

const orderSchema = Schema({
    descriptionOrder:{
        type:String,
        required:[true, 'Description is required'],
    },
    deliveryDate:{
        type:Date,
        required:[true, 'Day return is required'],
    },
    returnDate:{
        type:Date,
        required:[true, 'Day return is required'],
    },
    /*Fecha de entrega de entrega y devolucion*/
    //AGREGADO
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
    materialId:{
        /*Array */
        //AGREGADO
        type:[
            {
                material:{
                    type:Schema.Types.ObjectId,
                    ref:'Material',
                    required:[true, 'Material is required'],
                },
                amount:{
                    type:Number,
                    required:[true,'Amount is required']
                }
            }
        ]
    },
})

export default model('order',orderSchema)