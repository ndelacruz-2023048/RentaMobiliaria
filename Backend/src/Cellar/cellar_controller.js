import Cellar from './cellar_model.js'

export const createCellar = async(req,res)=>{
    try {
        let data = req.body
        let cellar = new Cellar(data)
        cellar.save()
        return res.send({success:true,message:'Cellar added'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error creating the cellar'})
        
    }
}
export const getCellars = async(req,res)=>{
    try {
        const {skip=0,limit=20} = req.query
        const cellars = Cellar.find().skip(skip).limit(limit)
        if(cellars.length === 0) return res.status(404).send({success:false,message:'Cellars not found'})
        return res.send({success:true,message:cellars})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error listing the cellar'})
    }
}

/* Falta:
editar bodega
eliminar bodega
eliminar supervisor de bodega
 */