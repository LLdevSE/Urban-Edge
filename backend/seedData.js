const properties = [
  {
    title: 'Emerald Gardens - Gampaha',
    description: 'This prime land is ideally located with easy access to main roads, utilities, and essential services. Suitable for residential or investment purposes. Just 5 minutes from Gampaha town center and 10 minutes to the highway entrance.',
    price: 4500000,
    location: 'Gampaha Town, Western Province',
    size: 10,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1516156008625-3a9d6051fab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available',
    features: ['Clear Deeds', 'Electricity', 'Water Supply', 'Wide Roads', 'Security Provided']
  },
  {
    title: 'Silver Line Residency',
    description: 'Perfect for building your dream home in a quiet, residential neighborhood. Clear deeds and all approvals obtained. Close to schools and supermarkets.',
    price: 8200000,
    location: 'Kottawa, Colombo District',
    size: 6.5,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1449156003053-c3d8c0f11273?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available',
    features: ['Gated Community', 'Swimming Pool Access', 'Gym', '24/7 Security']
  },
  {
    title: 'Pine Hills Development',
    description: 'Breathtaking mountain views and fresh air. Ideal for a holiday home or eco-resort development. Surrounded by lush greenery and tea plantations.',
    price: 3500000,
    location: 'Kandy, Central Province',
    size: 15,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: true,
    status: 'Available',
    features: ['Mountain View', 'Natural Spring Water', 'Electricity', 'Paved Roads']
  },
  {
    title: 'Coastal Breeze Blocks',
    description: 'Walking distance to the beach. High tourism potential. Ideal for a boutique hotel or vacation villa. Rare opportunity in a rapidly developing area.',
    price: 6000000,
    location: 'Negombo, Western Province',
    size: 8,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: false,
    status: 'Available',
    features: ['Beach Access', 'Tourism Zone', 'Flat Land', 'Municipal Water']
  },
  {
    title: 'Urban Living - Malabe',
    description: 'Located in the tech hub of Sri Lanka. Walking distance to SLIIT and other universities. High rental yield potential.',
    price: 5500000,
    location: 'Malabe, Colombo District',
    size: 7,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isFeatured: false,
    status: 'Available',
    features: ['Close to Highway', 'University Area', 'Commercial Potential', '3 Phase Electricity']
  },
  {
    title: 'Green Valley Estate',
    description: 'Spacious plot in a serene environment. Perfect for retirement or a quiet family life. Rich soil suitable for home gardening.',
    price: 2800000,
    location: 'Kurunegala, North Western Province',
    size: 20,
    type: 'Land',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
    isFeatured: false,
    status: 'Sold',
    features: ['Fruit Trees', 'Well Water', 'Boundary Walls', 'Clear Title']
  }
];

const projects = [
  {
    name: 'Victoria Heights',
    location: 'Kandy',
    description: 'A premium block development overlooking the Mahaweli River, featuring 24 luxury plots with full infrastructure.',
    mainImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    status: 'Ongoing',
    blocks: [
      { blockNumber: 'A1', size: 10, price: 5000000, status: 'Available' },
      { blockNumber: 'A2', size: 12, price: 6000000, status: 'Sold' },
      { blockNumber: 'A3', size: 10, price: 5200000, status: 'Available' },
      { blockNumber: 'A4', size: 15, price: 7500000, status: 'Reserved' }
    ]
  },
  {
    name: 'Metro Link Residency',
    location: 'Malabe',
    description: 'Modern urban living with excellent connectivity. Just 2 minutes to the SLIIT campus and expressway.',
    mainImage: 'https://images.unsplash.com/photo-1590001158193-79cd7c986f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    status: 'Ongoing',
    blocks: [
      { blockNumber: 'B1', size: 6, price: 4000000, status: 'Available' },
      { blockNumber: 'B2', size: 6.5, price: 4500000, status: 'Available' },
      { blockNumber: 'B3', size: 7, price: 4800000, status: 'Sold' }
    ]
  },
  {
    name: 'Ocean View Villas',
    location: 'Matara',
    description: 'Exclusive gated community near the southern expressway exit. Walking distance to Polhena beach.',
    mainImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    status: 'Upcoming',
    blocks: [
      { blockNumber: 'C1', size: 10, price: 8000000, status: 'Available' },
      { blockNumber: 'C2', size: 10, price: 8000000, status: 'Available' }
    ]
  }
];

module.exports = { properties, projects };
