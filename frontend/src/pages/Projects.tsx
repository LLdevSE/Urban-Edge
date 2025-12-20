import React, { useState, useEffect } from 'react';
import { LayoutGrid, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { projectService } from '../services/api';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={64} />
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, idx) => (
              <div key={project._id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={project.mainImage} alt={project.name} className="w-full h-[400px] object-cover" />
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
                      <p className="text-2xl font-bold text-textDark">{project.blocks?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase mb-1">Available</p>
                      <p className="text-2xl font-bold text-primary">
                        {project.blocks?.filter((b: any) => b.status === 'Available').length || 0} Plots
                      </p>
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
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl font-medium">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
