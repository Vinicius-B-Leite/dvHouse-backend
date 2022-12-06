import { Router } from 'express'
import HouseController from './controllers/HouseController'
import SessionController from './controllers/SessionController'
import multer from 'multer'
import uploadConfig from './config/upload'


const routes =  new Router()
const upload = multer(uploadConfig)

routes.get('/houses', HouseController.index)
routes.post('/sessions', SessionController.store)
routes.post('/houses', upload.single('thumbnail'), HouseController.store)
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update )

export default routes