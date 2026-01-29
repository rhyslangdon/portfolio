const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { body, validationResult } = require('express-validator');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { featured, category, status } = req.query;
    let filter = {};

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// POST /api/projects - Create new project (admin only - you can add auth later)
router.post('/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('technologies').isArray().notEmpty().withMessage('Technologies are required'),
    body('image').trim().notEmpty().withMessage('Image URL is required'),
    body('githubUrl').trim().notEmpty().withMessage('GitHub URL is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Error creating project' });
    }
  }
);

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('technologies').isArray().notEmpty().withMessage('Technologies are required'),
    body('image').trim().notEmpty().withMessage('Image URL is required'),
    body('githubUrl').trim().notEmpty().withMessage('GitHub URL is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'Error updating project' });
    }
  }
);

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router;