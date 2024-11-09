import express from 'express'
import { labour, deletelabour, getlabour,labourEntrence , labourCloseTime} from '../controllers/salesmanagerController.js';

const route = express.Router();

route.post('/addlabour',labour);

route.get('/getlabour',getlabour);

route.put('/labourintime',labourEntrence);

route.put('/labourouttime',labourCloseTime);

route.delete('/deletelabour',deletelabour);



export default route;