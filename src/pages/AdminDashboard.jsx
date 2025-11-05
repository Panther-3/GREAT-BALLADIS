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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'project', 'equipment', or 'projectlist'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    name: '',
    type: '',
    client: '',
    status: '',
    image: null,  // This will store the image file for Project/Equipment
  });

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

  const handleAddItem = () => {
    const newItem = { ...formData, id: Date.now(), image: formData.image ? URL.createObjectURL(formData.image) : '' };
    
    if (modalType === 'project') {
      const updatedProjects = [...projects, newItem];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      toast({
        title: "Project Added",
        description: "The project has been added successfully.",
      });
    } else if (modalType === 'equipment') {
      const updatedEquipment = [...equipment, newItem];
      setEquipment(updatedEquipment);
      localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
      toast({
        title: "Equipment Added",
        description: "The equipment has been added successfully.",
      });
    } else if (modalType === 'projectlist') {
      const updatedProjectList = [...projectList, newItem];
      setProjectList(updatedProjectList);
      localStorage.setItem('projectList', JSON.stringify(updatedProjectList));
      toast({
        title: "Project List Added",
        description: "The project has been added to the list.",
      });
    }

    setIsModalOpen(false);
    setFormData({
      id: '',
      title: '',
      description: '',
      category: '',
      name: '',
      type: '',
      client: '',
      status: '',
      image: null,  // Reset the image
    });
  };

  const handleUpdateItem = () => {
    let updatedItems;

    if (modalType === 'project') {
      updatedItems = projects.map((project) =>
        project.id === formData.id ? { ...formData, image: formData.image ? URL.createObjectURL(formData.image) : '' } : project
      );
      setProjects(updatedItems);
      localStorage.setItem('projects', JSON.stringify(updatedItems));
      toast({
        title: "Project Updated",
        description: "The project has been updated successfully.",
      });
    } else if (modalType === 'equipment') {
      updatedItems = equipment.map((item) =>
        item.id === formData.id ? { ...formData, image: formData.image ? URL.createObjectURL(formData.image) : '' } : item
      );
      setEquipment(updatedItems);
      localStorage.setItem('equipment', JSON.stringify(updatedItems));
      toast({
        title: "Equipment Updated",
        description: "The equipment has been updated successfully.",
      });
    } else if (modalType === 'projectlist') {
      updatedItems = projectList.map((project) =>
        project.id === formData.id ? { ...formData } : project
      );
      setProjectList(updatedItems);
      localStorage.setItem('projectList', JSON.stringify(updatedItems));
      toast({
        title: "Project List Updated",
        description: "The project has been updated successfully.",
      });
    }

    setIsModalOpen(false);
    setFormData({
      id: '',
      title: '',
      description: '',
      category: '',
      name: '',
      type: '',
      client: '',
      status: '',
      image: null,  // Reset the image
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file,
    }));
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      setFormData(item); // Populate form with the item's data for editing
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: '',
      title: '',
      description: '',
      category: '',
      name: '',
      type: '',
      client: '',
      status: '',
      image: null, // Reset the form when closed
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
                  <Button className="bg-red-600 hover:bg-red-700 gap-2" onClick={() => openModal('project')}>
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
                        {project.image && <img src={project.image} alt={project.title} className="mt-2 w-20 h-20 object-cover" />}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openModal('project', project)}>
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
                  <Button className="bg-red-600 hover:bg-red-700 gap-2" onClick={() => openModal('equipment')}>
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
                        {item.image && <img src={item.image} alt={item.name} className="mt-2 w-20 h-20 object-cover" />}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openModal('equipment', item)}>
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

            {/* Modal for adding items */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-96">
                  <h2 className="text-2xl font-bold mb-4">{modalType === 'project' ? 'Add Project' : modalType === 'equipment' ? 'Add Equipment' : 'Add Project List'}</h2>
                  {modalType === 'project' && (
                    <>
                      <div className="mb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Project Title"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          placeholder="Project Category"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Project Description"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="image">Project Image</Label>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                        {formData.image && (
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Project Image Preview"
                            className="mt-2 w-20 h-20 object-cover"
                          />
                        )}
                      </div>
                    </>
                  )}

                  {modalType === 'equipment' && (
                    <>
                      <div className="mb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Equipment Name"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="type">Type</Label>
                        <Input
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          placeholder="Equipment Type"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="image">Equipment Image</Label>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                        {formData.image && (
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Equipment Image Preview"
                            className="mt-2 w-20 h-20 object-cover"
                          />
                        )}
                      </div>
                    </>
                  )}

                  {modalType === 'projectlist' && (
                    <>
                      <div className="mb-4">
                        <Label htmlFor="client">Client</Label>
                        <Input
                          id="client"
                          name="client"
                          value={formData.client}
                          onChange={handleChange}
                          placeholder="Client Name"
                        />
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="status">Status</Label>
                        <Input
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          placeholder="Project Status"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-4">
                    <Button onClick={closeModal} variant="outline" className="text-red-600">Cancel</Button>
                    {formData.id ? (
                      <Button onClick={handleUpdateItem} className="bg-green-600 text-white">Update</Button>
                    ) : (
                      <Button onClick={handleAddItem} className="bg-green-600 text-white">Add</Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
