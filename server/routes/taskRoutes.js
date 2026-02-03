const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/taskController');


router.use(auth);
router.get('/', ctrl.getTasks);
router.post('/', ctrl.createTask);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);


module.exports = router;