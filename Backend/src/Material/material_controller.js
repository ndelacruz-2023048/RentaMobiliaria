import Material from './material_model.js'

export const createMaterial = async(req,res)=>{
    try {
        let data = req.body
        let material = new Material(data)
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
        let materials = new Material.find().skip(skip).limit(limit)
        if(materials.length ===0) return res.status(404).send({success:false,message:'Materials not found'})
        return res.send({success:true,message:materials})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error listing the Material'})
    }
}