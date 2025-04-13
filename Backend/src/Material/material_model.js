import { model, Schema } from "mongoose";

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
    },  // Categoría (mecánica, física, informática)
    stock: {
        type:Number,
        required:[true, 'Material stock is required'],
    },  // Cantidad disponible
    subjectArea: {
        type:String,
        required:[true, 'Material subject area is required'],
    },  // Área (por ejemplo, física, química)
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

export default model('Material',materialSchema)