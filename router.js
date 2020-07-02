import express from 'express';
import Login from './controllers/Login';


const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.post('/api/login', (req, res) => {
    const loginObj = new Login(req, res);
    loginObj.validateLogin();
});


export default router;