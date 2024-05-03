const router = require('express').Router();
const {createTask,getAllTask,getTaskById,updateTask,deleteTask} = require('./crud.controller');
const {verifyJwtToken} = require('../../utils/Token/jwtMiddleware');
const {trycatch} = require('../../utils/Error/trycatch');

router.post('/create-task',verifyJwtToken,trycatch(createTask));
router.get('/get-all-task',verifyJwtToken,trycatch(getAllTask));
router.get('/get-task-by-id',verifyJwtToken,trycatch(getTaskById));
router.put('/update-task',verifyJwtToken,trycatch(updateTask));
router.delete('/delete-task',verifyJwtToken,trycatch(deleteTask));

module.exports = router;