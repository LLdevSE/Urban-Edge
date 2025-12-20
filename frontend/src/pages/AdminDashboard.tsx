import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Building2, Users, LogOut, Plus, Trash2 } from 'lucide-react';
import { propertyService, inquiryService, userService } from '../services/api';

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'properties') {
        const res = await propertyService.getAll();
        setProperties(res.data);
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
            {activeTab === 'properties' ? 'Property Management' : activeTab === 'inquiries' ? 'Lead Inquiries' : 'Customer Management'}
          </h1>
          {activeTab === 'properties' && (
            <button className="bg-cta text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20">
              <Plus size={20} />
              Add New Property
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
                        <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
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
    </div>
  );
};

export default AdminDashboard;
