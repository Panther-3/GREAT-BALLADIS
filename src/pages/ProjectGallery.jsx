import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectGallery = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const defaultProjects = [
        {
          id: 1,
          title: 'Modern Office Complex',
          category: 'commercial',
          description: 'State-of-the-art office building with sustainable design features.',
        },
        {
          id: 2,
          title: 'Luxury Residential Tower',
          category: 'residential',
          description: '30-story residential tower with premium amenities.',
        },
        {
          id: 3,
          title: 'University Campus',
          category: 'institutional',
          description: 'Complete campus development including academic and recreational facilities.',
        },
        {
          id: 4,
          title: 'Shopping Mall',
          category: 'commercial',
          description: 'Multi-level retail complex with modern architecture.',
        },
        {
          id: 5,
          title: 'Suburban Housing Development',
          category: 'residential',
          description: 'Eco-friendly housing community with 200+ homes.',
        },
        {
          id: 6,
          title: 'Hospital Expansion',
          category: 'institutional',
          description: 'Medical facility expansion with advanced infrastructure.',
        },
      ];
      setProjects(defaultProjects);
      localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const categories = ['all', 'residential', 'commercial', 'institutional'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Project Gallery - Great Baladis Limited</title>
        <meta name="description" content="Explore our portfolio of completed construction projects including residential, commercial, and institutional developments." />
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
                Project <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Explore our portfolio of successfully completed construction projects.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="mb-12">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Filter className="w-5 h-5 text-gray-600" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setFilter(category)}
                    variant={filter === category ? 'default' : 'outline'}
                    className={filter === category ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" alt={project.title} src="https://images.unsplash.com/photo-1594231240264-a1588d397402" />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectGallery;