import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import AuthRoutes from '../src/Auth/auth_routes.js'
import UserRoutes from '../src/User/user_routes.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1',AuthRoutes)
    app.use('/v1/user',UserRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}