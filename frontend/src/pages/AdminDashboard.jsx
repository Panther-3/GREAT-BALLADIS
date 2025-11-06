import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/auth/AuthProvider';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { apiFetch, logout, user } = useAuth(); // Using the Auth context for API calls and logout
  const [projects, setProjects] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    } else {
      fetchData();
    }
  }, [navigate, user]);

  // Fetch data for projects, equipment, and project list from the backend
  const fetchData = async () => {
    try {
      const projectRes = await apiFetch('/api/projects/', { method: 'GET' });
      const equipmentRes = await apiFetch('/api/equipment/', { method: 'GET' });
      const projectListRes = await apiFetch('/api/project-list/', { method: 'GET' });

      if (!projectRes.ok || !equipmentRes.ok || !projectListRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const projectData = await projectRes.json();
      const equipmentData = await equipmentRes.json();
      const projectListData = await projectListRes.json();

      setProjects(projectData);
      setEquipment(equipmentData);
      setProjectList(projectListData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an issue loading the data from the server.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: error.message || 'Failed to log out.',
        variant: 'destructive',
      });
    }
  };

  // Handle delete action
  const handleDelete = async (type, id) => {
    let deleteUrl = '';
    switch (type) {
      case 'Project':
        deleteUrl = `/api/projects/${id}/`;
        break;
      case 'Equipment':
        deleteUrl = `/api/equipment/${id}/`;
        break;
      case 'Project List':
        deleteUrl = `/api/project-list/${id}/`;
        break;
      default:
        return;
    }

    try {
      const res = await apiFetch(deleteUrl, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      // After successful delete, refetch data
      fetchData();
      toast({
        title: `${type} Deleted`,
        description: `${type} has been removed successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete the item.',
        variant: 'destructive',
      });
    }
  };

  // Handle add new item
  const handleAdd = (type) => {
    // Example: redirect to add new project, equipment, or project list page
    toast({
      title: `Add New ${type}`,
      description: `Redirecting to add a new ${type}.`,
    });
    // You can implement a modal or redirect to an add new page
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Great Baladis Limited</title>
        <meta name="description" content="Admin dashboard for managing Great Baladis Limited website content." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-black"
            >
              Admin Dashboard
            </motion.h1>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="projects">Project Gallery</TabsTrigger>
              <TabsTrigger value="equipment">Equipment Gallery</TabsTrigger>
              <TabsTrigger value="projectlist">Project List</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Projects</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2" onClick={() => handleAdd('Project')}>
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>
                {loading ? (
                  <p>Loading projects...</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete('Project', project.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Equipment</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2" onClick={() => handleAdd('Equipment')}>
                    <Plus className="w-4 h-4" />
                    Add Equipment
                  </Button>
                </div>
                {loading ? (
                  <p>Loading equipment...</p>
                ) : (
                  <div className="space-y-4">
                    {equipment.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete('Equipment', item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Project List Tab */}
            <TabsContent value="projectlist">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Project List</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2" onClick={() => handleAdd('Project')}>
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>
                {loading ? (
                  <p>Loading project list...</p>
                ) : (
                  <div className="space-y-4">
                    {projectList.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.client} - {project.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete('Project List', project.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
