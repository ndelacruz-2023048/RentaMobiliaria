import { model, Mongoose, Schema } from "mongoose";

const materialSchema = Schema({
    name:{ 
        type:String,
        required:[true, 'Material name is required'],
    },  // Nombre del material
    description: {
        type:String,
        required:[true, 'Material description is required'],
    },  // Descripción del material
    category: {
        type:String,
        required:[true, 'Material category is required'],
        enum:['mechanics','physics','informatics','electronics','chemistry','biology','mathematics','other'],
        default:'general',
    },  // Categoría (mecánica, física, informática)
    stock: {
        type:Number,
        required:[true, 'Material stock is required'],
    },  // Cantidad disponible
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    image:{
        type:String,
        required:[true, 'Material image is required'],
    },
    /*Agregar el id de la bodega*/
    //AGREGADO
    cellar:{
        type:Schema.Types.ObjectId,
        ref:'Cellar',
        required:[true,'Cellar is required']
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

export default model('Material',materialSchema)