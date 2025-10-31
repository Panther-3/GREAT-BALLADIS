import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const EquipmentGallery = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const savedEquipment = localStorage.getItem('equipment');
    if (savedEquipment) {
      setEquipment(JSON.parse(savedEquipment));
    } else {
      const defaultEquipment = [
        {
          id: 1,
          name: 'Excavator CAT 320',
          type: 'Heavy Machinery',
          description: 'High-performance excavator for large-scale earthmoving operations.',
        },
        {
          id: 2,
          name: 'Concrete Mixer Truck',
          type: 'Concrete Equipment',
          description: 'Industrial-grade concrete mixer for on-site mixing and delivery.',
        },
        {
          id: 3,
          name: 'Tower Crane',
          type: 'Lifting Equipment',
          description: 'Heavy-duty tower crane for high-rise construction projects.',
        },
        {
          id: 4,
          name: 'Bulldozer D8T',
          type: 'Heavy Machinery',
          description: 'Powerful bulldozer for grading and land clearing operations.',
        },
        {
          id: 5,
          name: 'Asphalt Paver',
          type: 'Road Equipment',
          description: 'Advanced paver for smooth and precise asphalt laying.',
        },
        {
          id: 6,
          name: 'Dump Truck Fleet',
          type: 'Transport',
          description: 'Fleet of heavy-duty dump trucks for material transportation.',
        },
      ];
      setEquipment(defaultEquipment);
      localStorage.setItem('equipment', JSON.stringify(defaultEquipment));
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
        <title>Equipment Gallery - Great Baladis Limited</title>
        <meta name="description" content="View our extensive fleet of modern construction equipment and machinery used in our projects." />
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
                Equipment <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                State-of-the-art machinery and equipment powering our construction projects.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipment.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} src="https://images.unsplash.com/photo-1676286400589-7500c069ac25" />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{item.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
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

export default EquipmentGallery;