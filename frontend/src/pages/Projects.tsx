import { useState, useEffect } from 'react';
import { LayoutGrid, MapPin, ArrowRight, Loader2, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white min-h-screen pb-0">
      {/* Header */}
      <section className="bg-lightGray py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-textDark mb-4 text-center">Our Land Development Projects</h1>
          <p className="text-xl text-gray-500 text-center max-w-2xl mx-auto">
            Explore planned land block developments with clear deeds and modern infrastructure across prime locations.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                <Filter size={20} className="text-gray-400 hidden md:block" />
                {['All', 'Upcoming', 'Ongoing', 'Completed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            statusFilter === status 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={64} />
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
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
                    <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                      Inquire Now
                      <ArrowRight size={20} />
                    </Link>
                    <button className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                      Download Layout Plan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl font-medium">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
              <h2 className="text-4xl font-bold font-montserrat">Can't find what you're looking for?</h2>
              <p className="text-xl text-gray-300">
                  Our team is constantly working on new developments. Get in touch with us to know about our upcoming projects before anyone else.
              </p>
              <Link to="/contact" className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg text-lg inline-block">
                  Contact Us Today
              </Link>
          </div>
      </section>
    </div>
  );
};

export default Projects;
