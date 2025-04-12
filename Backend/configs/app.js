import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = ()=>{

}

export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
    } catch (error) {
        console.error('Server init failed',error)
    }
}