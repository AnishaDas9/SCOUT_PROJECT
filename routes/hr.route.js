import express from 'express'
import { getlabours, getsalesmanagers, labourattendance, laboursalary, makelabourattendance, makesmattendance, salesmanagerattendance, salesmanagersalary } from '../controllers/hrController.js';


const route = express.Router();


route.post('/makesmattendance', makesmattendance);

route.get('/laboutsalary',laboursalary);

route.get('/getsalesmanager', getsalesmanagers);

route.get('/getlabours',getlabours);

route.get('/salesmanagerattendance',salesmanagerattendance);

route.get('/salesmanagersalary',salesmanagersalary);

route.get('/labourattendance',labourattendance);

route.post('/makelabourattendance', makelabourattendance);


export default route;