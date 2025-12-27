const Project = require('../models/Project');
const path = require('path');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    if (req.file) {
      projectData.mainImage = req.file.path.startsWith('http') 
        ? req.file.path 
        : 'uploads/' + path.basename(req.file.path);
    }
    
    if (typeof projectData.blocks === 'string') {
      try {
        projectData.blocks = JSON.parse(projectData.blocks);
      } catch (e) {
        // If parsing fails, it might be better to throw error or handle gracefully
        console.error('Error parsing blocks:', e);
      }
    }

    const project = new Project(projectData);
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.mainImage = req.file.path.startsWith('http') 
        ? req.file.path 
        : 'uploads/' + path.basename(req.file.path);
    }
    
    if (typeof updateData.blocks === 'string') {
      try {
        updateData.blocks = JSON.parse(updateData.blocks);
      } catch (e) {
        console.error('Error parsing blocks:', e);
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
