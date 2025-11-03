import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick'; 
const Home = () => {
  const stats = [
    { icon: Building2, value: '500+', label: 'Projects Completed' },
    { icon: Users, value: '200+', label: 'Expert Team Members' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: TrendingUp, value: '25+', label: 'Years Experience' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };
 // Slider images
  const sliderImages = [
    "https://images.unsplash.com/photo-1654302861319-849671c254cf",
   "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=60&auto=format&fit=crop",
   "https://images.unsplash.com/photo-1654302861319-849671c254cf",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=60&auto=format&fit=crop",
    
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true, 
  };

  return (
    <>
      <Helmet>
        <title>Great Baladis Limited - Premier Construction Company</title>
        <meta name="description" content="Great Baladis Limited is a leading construction company specializing in civil engineering, road construction, and building projects. Quality construction services you can trust." />
      </Helmet>

      <div className="pt-16">
        <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xNiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Building Your <span className="text-gradient">Dreams</span> Into Reality
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Great Baladis Limited delivers exceptional construction solutions with unmatched quality, innovation, and professionalism.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white group">
                      Contact Us
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/gallery/projects">
                    <Button size="lg" variant="outline" className="border-white text-black hover:bg-red hover:text-red">
                      View Projects
                    </Button>
                  </Link>
                </div>
              </motion.div>

            {/* Image Slider */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden w-full"
              >
                <Slider {...sliderSettings}>
                  {sliderImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <img
                        className="rounded-2xl shadow-2xl w-full h-full object-cover"
                        alt={`Construction site ${index + 1}`}
                        src={image}
                      />
                    </motion.div>
                  ))}
                </Slider>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Why Choose <span className="text-gradient">Great Baladis</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine expertise, innovation, and dedication to deliver construction excellence that exceeds expectations.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-600 transition-colors">
                    <stat.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-4xl font-bold text-black mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Our Core <span className="text-gradient">Values</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality Excellence',
                  description: 'We maintain the highest standards in every project, ensuring superior craftsmanship and lasting results.',
                },
                {
                  title: 'Innovation & Technology',
                  description: 'Leveraging cutting-edge construction methods and technologies to deliver modern, efficient solutions.',
                },
                {
                  title: 'Client Satisfaction',
                  description: 'Your vision is our mission. We work closely with clients to bring their dreams to life.',
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-black mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-300 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <img className="rounded-2xl shadow-2xl w-full" alt="Construction team reviewing blueprints" src="https://images.unsplash.com/photo-1581093196867-ca3dba3c721b" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl text-black font-bold mb-6">
                  Ready to Start Your <span className="text-gradient">Project?</span>
                </h2>
                <p className="text-xl text-black mb-8 leading-relaxed">
                  Let's discuss how we can bring your construction vision to life with our expertise and dedication.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white group">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;