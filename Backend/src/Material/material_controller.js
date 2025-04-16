import Material from './material_model.js'
import { join} from 'path'
import { unlink } from 'fs/promises'
import { log } from 'console'
export const createMaterial = async(req,res)=>{
    try {
        let data = req.body
        let material = new Material(data)
        material.image = req.file.filename ?? null
        material.save()
        return res.send({success:true,message:'Material added'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error creating the Material'})
    }
}
export const getMaterials = async(req,res)=>{
    try {
        const {skip=0,limit=20} = req.query
        let materials = await Material.find().skip(skip).limit(limit).populate({path:'cellar',select:'-_id name'})
        if(materials.length ===0) return res.status(404).send({success:false,message:'Materials not found'})
        return res.send({success:true,message:materials})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error listing the Material'})
    }
}

export const getMaterial = async(req,res)=>{
    try {
        const {id}=req.params
        const material = await Material.findById(id).populate({path:'cellar',select:'-_id name'})
        if(!material) return res.status(404).send({success:false,message:'Material not found'})
        return res.send({success:true,message:material})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error searching the material'})
    }
}

export const updateMaterial = async(req,res,error)=>{
    try {
        const {id} = req.params
        const data = req.body
        let material = await Material.findByIdAndUpdate(id,
            {name:data.name, description:data.description,category:data.category,stock:data.stock,
                cellar:data.cellar,updatedAt:Date.now()
            },
            {new:true}
        )
        if(!material) return res.send({success:false,message:'Material not found'})
        if(req.file && req.filePath){
            material = await Material.findOne({_id:id})
            const filePath = join(req.filePath, material.image)
            try{
                console.log(filePath);
                await unlink(filePath)
                material.image = req.file.filename
                await material.save()
                return res.send({success:true,message:'Profile picture changed'})
            }catch(unlinkErr){
                console.error('Error deleting file', unlinkErr)
            }
        }
        if(error.status === 400 || error.errors){ // === estricto | == abstracto
            return res.status(400).send(
                {
                    success: false,
                    message: 'Error registering user',
                    error
                }
            )
        }
        return res.status(500).send(
            {
                success: false,
                message: error.message
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send({succcess:false,message:'General error updating the material'})
        
    }
}

export const deleteMaterial = async(req,res)=>{
    try {
        const {id} = req.params
        const material = await Material.findByIdAndDelete(id)
        if(!material) return res.status(404).send({success:false,message:'Material not found'})
        return res.send({success:true,message:'Material Deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error deleting the material'})
    }
}

export const calcularStock = async(req,res)=>{
    try {
        let material = await Material.findOne({})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error calculating the stock'})
    }
}

/* const {id} = req.params
        let material = await Material.findById(id)
        let fecha = new Date(material.createdAt)
        let fechaLimpia
        if(fecha.getMonth +1 <10){
            fechaLimpia = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
        }else{
            fechaLimpia = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
        }
        console.log(fechaLimpia);
        
        let total = new Date(fechaLimpia) - new Date('2025-04-10')
        total = total / (1000 * 60 * 60 * 24)
        return res.send({success:true,message:'VAMOS',total}) */