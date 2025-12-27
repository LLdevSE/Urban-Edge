import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Building2, Users, LogOut, Plus, Trash2, Edit, LayoutGrid } from 'lucide-react';
import { propertyService, inquiryService, userService, projectService } from '../services/api';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Property State
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProperty, setNewProperty] = useState({
    title: '', description: '', price: '', location: '', size: '', type: 'Land', status: 'Available', images: ['']
  });

  // Project State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    name: '', location: '', description: '', mainImage: '', status: 'Upcoming'
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'properties') {
        const res = await propertyService.getAll();
        setProperties(res.data);
      } else if (activeTab === 'projects') {
        const res = await projectService.getAll();
        setProjects(res.data);
      } else if (activeTab === 'inquiries') {
        const res = await inquiryService.getAll();
        setInquiries(res.data);
      } else if (activeTab === 'users') {
        const res = await userService.getAll();
        setUsers(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.delete(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.delete(id);
        setProperties(properties.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete property');
      }
    }
  };

  const handleEditProperty = (property: any) => {
    setEditingId(property._id);
    setNewProperty({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      size: property.size,
      type: property.type,
      status: property.status,
      images: property.images.length > 0 ? property.images : ['']
    });
    setIsPropertyModalOpen(true);
  };

  const closePropertyModal = () => {
    setIsPropertyModalOpen(false);
    setEditingId(null);
    setNewProperty({ title: '', description: '', price: '', location: '', size: '', type: 'Land', status: 'Available', images: [''] });
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProjectId(project._id);
    setNewProject({
      name: project.name,
      location: project.location,
      description: project.description,
      mainImage: project.mainImage,
      status: project.status
    });
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProjectId(null);
    setNewProject({ name: '', location: '', description: '', mainImage: '', status: 'Upcoming' });
  };

  return (
    <div className="flex min-h-screen bg-lightGray">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-primary font-montserrat">Urban Edge</h2>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'properties' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Building2 size={20} />
            Properties
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'projects' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutGrid size={20} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} />
            Inquiries
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} />
            Customers
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
              {user?.email[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.email}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-montserrat text-textDark">
            {activeTab === 'properties' ? 'Property Management' : activeTab === 'projects' ? 'Project Management' : activeTab === 'inquiries' ? 'Lead Inquiries' : 'Customer Management'}
          </h1>
          {activeTab === 'properties' && (
            <button 
              onClick={() => {
                setEditingId(null);
                setNewProperty({ title: '', description: '', price: '', location: '', size: '', type: 'Land', status: 'Available', images: [''] });
                setIsPropertyModalOpen(true);
              }}
              className="bg-cta text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Plus size={20} />
              Add New Property
            </button>
          )}
          {activeTab === 'projects' && (
            <button 
              onClick={() => {
                setEditingProjectId(null);
                setNewProject({ name: '', location: '', description: '', mainImage: '', status: 'Upcoming' });
                setIsProjectModalOpen(true);
              }}
              className="bg-cta text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Plus size={20} />
              Add New Project
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'properties' ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Property</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Location</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Price</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Status</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map((prop) => (
                    <tr key={prop._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={prop.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <span className="font-bold text-textDark">{prop.title}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-600">{prop.location}</td>
                      <td className="p-6 font-bold">Rs. {(prop.price / 100000).toFixed(1)}M</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${prop.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {prop.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditProperty(prop)}
                            className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(prop._id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'projects' ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Project Name</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Location</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Status</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Total Blocks</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((proj) => (
                    <tr key={proj._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={proj.mainImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <span className="font-bold text-textDark">{proj.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-600">{proj.location}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-6 text-gray-600">{proj.blocks?.length || 0}</td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditProject(proj)}
                            className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(proj._id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'inquiries' ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Date</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Name</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Contact</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Type</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6 text-gray-500 text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                      <td className="p-6 font-bold text-textDark">{inquiry.name}</td>
                      <td className="p-6">
                        <p className="text-sm">{inquiry.email}</p>
                        <p className="text-sm text-gray-500">{inquiry.phone}</p>
                      </td>
                      <td className="p-6">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {inquiry.type}
                        </span>
                      </td>
                      <td className="p-6 text-gray-600 text-sm max-w-xs truncate">{inquiry.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">User</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Email</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Role</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase">Joined</th>
                    <th className="p-6 font-bold text-gray-500 text-sm uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          {u.avatar ? (
                            <img src={u.avatar} alt="" className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                              {u.name ? u.name[0] : u.email[0]}
                            </div>
                          )}
                          <span className="font-bold text-textDark">{u.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-600">{u.email}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-6 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-6 text-right">
                        {u.role !== 'admin' && (
                          <button 
                            onClick={() => handleDeleteUser(u._id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Add Property Modal */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closePropertyModal}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <LogOut size={20} className="rotate-180" /> 
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold font-montserrat text-primary mb-6">
                {editingId ? 'Edit Property' : 'Add New Property'}
              </h2>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (editingId) {
                    await propertyService.update(editingId, newProperty);
                  } else {
                    await propertyService.create(newProperty);
                  }
                  closePropertyModal();
                  fetchData(); // Refresh list
                } catch (error) {
                  alert(editingId ? 'Failed to update property' : 'Failed to create property');
                }
              }} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
                    <input 
                      required 
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Price (LKR)</label>
                    <input 
                      type="number" 
                      required 
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                  <textarea 
                    required 
                    rows={3}
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                    <input 
                      required 
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Size (Perches)</label>
                    <input 
                      type="number" 
                      required 
                      value={newProperty.size}
                      onChange={(e) => setNewProperty({...newProperty, size: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Type</label>
                    <select 
                      value={newProperty.type}
                      onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none"
                    >
                      <option value="Land">Land</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                    <select 
                      value={newProperty.status}
                      onChange={(e) => setNewProperty({...newProperty, status: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Image URL</label>
                  <input 
                    value={newProperty.images[0]}
                    onChange={(e) => setNewProperty({...newProperty, images: [e.target.value]})}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg mt-4">
                  {editingId ? 'Update Property' : 'Create Property'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closeProjectModal}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <LogOut size={20} className="rotate-180" /> 
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold font-montserrat text-primary mb-6">
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (editingProjectId) {
                    await projectService.update(editingProjectId, newProject);
                  } else {
                    await projectService.create(newProject);
                  }
                  closeProjectModal();
                  fetchData(); // Refresh list
                } catch (error) {
                  alert(editingProjectId ? 'Failed to update project' : 'Failed to create project');
                }
              }} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Project Name</label>
                  <input 
                    required 
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                    <input 
                      required 
                      value={newProject.location}
                      onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                    <select 
                      value={newProject.status}
                      onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                  <textarea 
                    required 
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Main Image URL</label>
                  <input 
                    value={newProject.mainImage}
                    onChange={(e) => setNewProject({...newProject, mainImage: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    placeholder="https://example.com/project-image.jpg"
                  />
                </div>

                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg mt-4">
                  {editingProjectId ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;