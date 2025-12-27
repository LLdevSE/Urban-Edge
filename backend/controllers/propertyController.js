const Property = require('../models/Property');
const path = require('path');

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => 'uploads/' + path.basename(file.path)); // Store as uploads/filename
    }
    
    // If images are also sent in body (e.g. URLs), merge them
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      images = [...images, ...bodyImages];
    }
    
    // Handle features if sent as stringified JSON or comma-separated
    let features = req.body.features;
    if (typeof features === 'string') {
        try {
            features = JSON.parse(features);
        } catch (e) {
            features = features.split(',').map(f => f.trim());
        }
    }

    const propertyData = {
      ...req.body,
      images: images,
      features: features
    };

    const property = new Property(propertyData);
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => 'uploads/' + path.basename(file.path));
    }

    // If existing images are sent in body, add them
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      images = [...bodyImages, ...images]; // Keep existing order or append new ones? Appending new usually.
    }
    
    // Handle features if sent as string
    let features = req.body.features;
    if (typeof features === 'string') {
        try {
            features = JSON.parse(features);
        } catch (e) {
            features = features.split(',').map(f => f.trim());
        }
    }

    const updateData = {
      ...req.body,
      features: features
    };
    
    // Only update images if there are any new ones or if explicit images list provided
    // If the user wants to delete all images, they might send empty array?
    // If req.files is empty and req.body.images is empty, should we clear images?
    // Let's assume if images are provided (either via files or body), we update the field.
    if (images.length > 0 || (req.body.images && req.body.images.length === 0)) {
        updateData.images = images;
    }

    const property = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
