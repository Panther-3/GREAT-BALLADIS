import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, TrendingUp } from 'lucide-react';

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const savedProjectList = localStorage.getItem('projectList');
    if (savedProjectList) {
      setProjectList(JSON.parse(savedProjectList));
    } else {
      const defaultProjectList = [
        {
          id: 1,
          name: 'Skyline Tower',
          client: 'Metro Development Corp',
          duration: '24 months',
          progress: 100,
          status: 'Completed',
          description: 'Luxury residential tower with 40 floors and premium amenities.',
        },
        {
          id: 2,
          name: 'Green Valley Homes',
          client: 'Valley Estates Ltd',
          duration: '18 months',
          progress: 85,
          status: 'In Progress',
          description: 'Sustainable housing development with 150 eco-friendly homes.',
        },
        {
          id: 3,
          name: 'City Center Mall',
          client: 'Retail Ventures Inc',
          duration: '30 months',
          progress: 100,
          status: 'Completed',
          description: 'Modern shopping complex with entertainment facilities.',
        },
        {
          id: 4,
          name: 'Tech Park Campus',
          client: 'Innovation Hub',
          duration: '36 months',
          progress: 60,
          status: 'In Progress',
          description: 'State-of-the-art technology park with office spaces.',
        },
      ];
      setProjectList(defaultProjectList);
      localStorage.setItem('projectList', JSON.stringify(defaultProjectList));
    }
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Project List - Great Baladis Limited</title>
        <meta name="description" content="Detailed list of our construction projects with progress updates, timelines, and client information." />
      </Helmet>

      <div className="pt-16">
        <section className="hero-gradient py-20 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Project <span className="text-gradient">List</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive overview of our construction projects and their progress.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              {projectList.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-2">{project.name}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <div className={`mt-4 lg:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-semibold text-black">{project.client}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-black">{project.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="font-semibold text-black">{project.progress}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="bg-red-600 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;