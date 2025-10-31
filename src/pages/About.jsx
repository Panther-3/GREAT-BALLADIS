import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: 'John Anderson',
      role: 'Chief Executive Officer',
      description: 'Leading the company with 25+ years of construction industry experience.',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Chief Engineer',
      description: 'Overseeing technical excellence and innovative engineering solutions.',
    },
    {
      name: 'Michael Chen',
      role: 'Project Director',
      description: 'Managing large-scale projects with precision and efficiency.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Architecture',
      description: 'Designing sustainable and aesthetically stunning structures.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Great Baladis Limited</title>
        <meta name="description" content="Learn about Great Baladis Limited's history, mission, vision, and the expert team behind our construction excellence." />
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
                About <span className="text-gradient">Great Baladis Limited</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Building excellence through innovation, integrity, and unwavering commitment to quality construction.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <img className="rounded-2xl shadow-2xl w-full" alt="Great Baladis Limited company building" src="https://images.unsplash.com/photo-1684470285086-7328c0f6d9d8" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Great Baladis limited is a Ghanaian Incorporated company and locally owned. It was established on 25th day of June, 2021. The company offers Building Construction, Engineering Construction, Affordable Housing Construction, Construction Project Management and General Goods Supplies. We are dedicated to organizations or Individuals seeking construction and supply services.                 </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our area of expertise includes but not limited to building technology, civil and structural engineering. We are committed to providing the best possible Construction expertise & service to ensure cost effective and successful projects. We work closely with our clients to accurately interpret their dreams in drawings and bring them to the desired reality through construction solutions to meet their needs. 
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We communicate with our clients throughout the construction process to keep them informed of progress and to ensure that our project keeps on schedule and within budget. We have the capacity to execute any contract awarded to us to your satisfaction
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Our Mission, Vision & <span className="text-gradient">Values</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Mission',
                  description: 'To deliver exceptional construction solutions that exceed client expectations through innovation, quality, and professionalism.',
                },
                {
                  icon: Eye,
                  title: 'Vision',
                  description: 'To be the most trusted and innovative construction company, setting industry standards for excellence and sustainability.',
                },
                {
                  icon: Heart,
                  title: 'Values',
                  description: 'Integrity, quality, safety, innovation, and client satisfaction guide every decision we make.',
                },
                {
                  icon: Shield,
                  title: 'Pledge',
                  description: 'We pledge to maintain the highest standards of safety, quality, and environmental responsibility in all our projects.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Meet Our <span className="text-gradient">Leadership Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced professionals dedicated to delivering construction excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <img className="w-full h-64 object-cover" alt={`${member.name} - ${member.role}`} src="https://images.unsplash.com/photo-1575383596664-30f4489f9786" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                    <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
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

export default About;