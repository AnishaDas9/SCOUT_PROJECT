import express from 'express'
import { deletelabour, deletesalesmanager, getlabours, getlocation, getsalesmanagers, makesalesmanager } from '../controllers/adminController.js';

const route = express.Router();


route.post('/makesalesmanager', makesalesmanager);

route.delete('/deletesalesmanager',deletesalesmanager);

route.get('/getlocation', getlocation);

route.get('/getsalesmanagers',getsalesmanagers);

route.get('/getlabours',getlabours);

route.delete('/deletelabour',deletelabour)


export default route;