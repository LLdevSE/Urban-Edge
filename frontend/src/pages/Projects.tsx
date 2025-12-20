import React from 'react';
import { LayoutGrid, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 'p1',
      name: 'Victoria Heights',
      location: 'Kandy',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'A premium block development overlooking the Mahaweli River, featuring 24 luxury plots with full infrastructure.',
      blocks: 24,
      available: 5,
      status: 'Ongoing'
    },
    {
      id: 'p2',
      name: 'Metro Link Residency',
      location: 'Malabe',
      image: 'https://images.unsplash.com/photo-1590001158193-79cd7c986f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Modern urban living with excellent connectivity. Just 2 minutes to the SLIIT campus and expressway.',
      blocks: 40,
      available: 12,
      status: 'Ongoing'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="bg-lightGray py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-textDark mb-4 text-center">Our Land Development Projects</h1>
          <p className="text-xl text-gray-500 text-center max-w-2xl mx-auto">
            Explore planned land block developments with clear deeds and modern infrastructure across prime locations.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {projects.map((project, idx) => (
            <div key={project.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                <img src={project.image} alt={project.name} className="w-full h-[400px] object-cover" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-2 text-cta font-bold uppercase tracking-wider text-sm">
                  <LayoutGrid size={18} />
                  <span>{project.status} Project</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat">{project.name}</h2>
                <div className="flex items-center text-gray-500 gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-lg">{project.location}</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase mb-1">Total Blocks</p>
                    <p className="text-2xl font-bold text-textDark">{project.blocks}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase mb-1">Available</p>
                    <p className="text-2xl font-bold text-primary">{project.available} Plots</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                    View Project Details
                    <ArrowRight size={20} />
                  </button>
                  <button className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    Download Layout Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
