import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Route as Road, Hammer, ClipboardCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      icon: Building,
      title: 'Civil Engineering',
      description: 'Comprehensive civil engineering solutions for complex infrastructure projects.',
      details: 'Our civil engineering services include structural design, site development, drainage systems, and foundation engineering. We utilize advanced technology and proven methodologies to ensure structural integrity and long-term durability.',
    },
    {
      icon: Road,
      title: 'Road Construction',
      description: 'Expert road construction and infrastructure development services.',
      details: 'We specialize in highway construction, urban road development, pavement design, and traffic management systems. Our team ensures smooth, durable road surfaces that meet all safety and quality standards.',
    },
    {
      icon: Hammer,
      title: 'Building Construction',
      description: 'Residential, commercial, and institutional building construction.',
      details: 'From residential homes to commercial complexes and institutional facilities, we deliver turnkey construction solutions. Our services include design-build, general contracting, and construction management.',
    },
    {
      icon: ClipboardCheck,
      title: 'Project Management',
      description: 'End-to-end project management ensuring timely and budget-friendly delivery.',
      details: 'Our project management services cover planning, scheduling, cost control, quality assurance, and risk management. We ensure your project is completed on time, within budget, and to the highest standards.',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Great Baladis Limited</title>
        <meta name="description" content="Explore Great Baladis Limited's comprehensive construction services including civil engineering, road construction, building construction, and project management." />
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
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive construction solutions tailored to meet your unique project requirements.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full">
                          <service.icon className="w-7 h-7 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                      </div>
                      <button
                        onClick={() => setExpandedService(expandedService === index ? null : index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <ChevronDown className={`w-6 h-6 transition-transform ${expandedService === index ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    
                    {expandedService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed">{service.details}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Why Choose Our <span className="text-gradient">Services?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Expert Team',
                  description: 'Highly skilled professionals with decades of combined experience.',
                },
                {
                  title: 'Quality Assurance',
                  description: 'Rigorous quality control processes ensuring superior results.',
                },
                {
                  title: 'Timely Delivery',
                  description: 'Proven track record of completing projects on schedule.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                >
                  <h3 className="text-xl font-bold text-black mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get <span className="text-gradient">Started?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your construction project and receive a customized solution.
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Request a Consultation
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;