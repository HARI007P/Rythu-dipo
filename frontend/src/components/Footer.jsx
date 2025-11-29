import React from 'react';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Rythu Dipo</h3>
                <p className="text-sm text-gray-300">Agricultural Products</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for high-quality agricultural products, 
              pesticides, and farming tools. Supporting farmers, growing together.
            </p>
          </div>

          {/* Contact Info */}
          <div>
  <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
  <div className="space-y-2">
    {/* Email */}
    <div className="flex items-center space-x-2 text-gray-300">
      <Mail className="h-4 w-4" />
      <a
        href="mailto:rythudipo12@gmail.com"
        className="text-sm hover:underline"
      >
        rythudipo12@gmail.com
      </a>
    </div>

    {/* Phone */}
    <div className="flex items-center space-x-2 text-gray-300">
      <Phone className="h-4 w-4" />
      <a
        href="tel:+917416219267"
        className="text-sm hover:underline"
      >
        +91 7416219267
      </a>
    </div>

    {/* Address with Google Maps */}
    <div className="flex items-center space-x-2 text-gray-300">
      <MapPin className="h-4 w-4" />
      <a
        href="https://maps.app.goo.gl/aFcxPc4BX5kJWM5o9"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm hover:underline"
      >
        Address: rythu-dipo, Srikakulam, Andhra Pradesh 532001
      </a>
    </div>
  </div>
</div>


          {/* Payment & Delivery */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Info</h4>
            <div className="space-y-2">
              <div className="text-gray-300 text-sm">
                <strong className="text-green-400">Payment:</strong> Cash on Delivery (COD)
              </div>
              <div className="text-gray-300 text-sm">
                <strong className="text-green-400">Delivery:</strong> All over UttraAndhra
              </div>
              <div className="text-gray-300 text-sm">
                <strong className="text-green-400">Support:</strong> 24/7 Customer Service
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-5">
          <div className="  items-center justify-between"> 
            <p className="text-gray-300 ">
              © 2024 Rythu Dipo. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
