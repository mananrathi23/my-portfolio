const router = require('express').Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const protect = require('../middleware/auth');

router.get('/', getProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
