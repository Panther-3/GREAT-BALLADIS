import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }

    setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
    setEquipment(JSON.parse(localStorage.getItem('equipment') || '[]'));
    setProjectList(JSON.parse(localStorage.getItem('projectList') || '[]'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin/login');
  };

  const handleDeleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
    toast({
      title: "Project Deleted",
      description: "The project has been removed successfully.",
    });
  };

  const handleDeleteEquipment = (id) => {
    const updated = equipment.filter(e => e.id !== id);
    setEquipment(updated);
    localStorage.setItem('equipment', JSON.stringify(updated));
    toast({
      title: "Equipment Deleted",
      description: "The equipment has been removed successfully.",
    });
  };

  const handleDeleteProjectList = (id) => {
    const updated = projectList.filter(p => p.id !== id);
    setProjectList(updated);
    localStorage.setItem('projectList', JSON.stringify(updated));
    toast({
      title: "Project Deleted",
      description: "The project has been removed from the list.",
    });
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

            <TabsContent value="projects">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Projects</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>

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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="equipment">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Equipment</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Add Equipment
                  </Button>
                </div>

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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEquipment(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projectlist">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Manage Project List</h2>
                  <Button className="bg-red-600 hover:bg-red-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>

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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProjectList(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;