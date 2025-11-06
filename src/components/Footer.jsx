import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import LOGO from '@/assets/LOGO_Great2.png'
const Footer = () => {
  return (
    <footer className="bg-[#001f3d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4 flex space-x-2">  
              <img src= {LOGO} alt="" className="w-8 h-8 object-contain" />            
              <span className="text-white">GreatBaladis</span>
              <span className="text-red-600"> Ltd</span>
            </div>
            <p className="text-sm mb-4">
              Building excellence through quality construction and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className=" hover:text-red-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-red-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-red-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-red-600">Quick Links</p>
            <div className="space-y-2">
              <Link to="/" className="block   hover:text-red-600 transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="block hover:text-red-600 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="blockhover:text-red-600 transition-colors text-sm">
                Services
              </Link>
              <Link to="/contact" className="block hover:text-red-600 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-red-600">Gallery</p>
            <div className="space-y-2">
              <Link to="/gallery/projects" className="block  hover:text-red-600 transition-colors text-sm">
                Project Gallery
              </Link>
              <Link to="/gallery/equipment" className="block hover:text-red-600 transition-colors text-sm">
                Equipment Gallery
              </Link>
              <Link to="/gallery/project-list" className="block  hover:text-red-600 transition-colors text-sm">
                Project List
              </Link>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-red-600">Contact Info</p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className=" text-sm">P.O.BOX 9, SUSUANSO - AHAFO REGION</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className=" text-sm">0245748390 / 0204188328</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm">greatbaladislimited@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className=" text-sm">
            © {new Date().getFullYear()} Great Baladis Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
