import express from 'express';
import Login from './controllers/Login';
import Studentdetails from './controllers/Studentdetails'
import Studentmarks from './controllers/Studentmarks'
import UpdateStudentDetails from './controllers/UpdateStudentDetails'
import Teacherdetails from './controllers/Teacherdetails'
import UpdateTeacherDetails from './controllers/UpdateTeacherDetails'
import DeleteStudent from './controllers/DeleteStudent'
import DeleteTeacher from './controllers/DeleteTeacher';
import UpdateStudentMarks from './controllers/UpdateStudentMarks';

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.post('/api/login', (req, res) => {
    const loginObj = new Login(req, res);
    loginObj.validateLogin();
});

router.get('/api/studentdetails', (req, res) => {
    const student = new Studentdetails(req, res);
    student.doProcess();
});

router.get('/api/studentmarks', (req, res) => {
    const student = new Studentmarks(req, res);
    student.doProcess();
});

router.post('/api/updatestudent', (req, res) => {
    const student = new UpdateStudentDetails(req, res);
    student.doProcess();
});

router.get('/api/teacherdetails', (req, res) => {
    const teacher = new Teacherdetails(req,res);
    teacher.doProcess();
});

router.post('/api/updateteacher', (req, res) => {
    const up = new UpdateTeacherDetails(req,res);
    up.doProcess();
});

router.delete('/api/deletestudent/:student_id', (req, res) => {
    const dlt = new DeleteStudent(req,res);
    dlt.doProcess();
});

router.post('/api/updatestudentmarks', (req, res) => {
    const update = new UpdateStudentMarks(req,res);
    update.doProcess();
});

router.delete('/api/deleteteacher/:teacher_id', (req, res) => {
    const dlt = new DeleteTeacher(req,res);
    dlt.doProcess();
});



export default router;