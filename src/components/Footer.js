import React from 'react';

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Sorting Algorithm Visualizer</h3>
            <p>Created by Gargi Goel</p>
            <p>Roll No: 01101022021</p>
          </div>
          <div className="md:text-right">
            <h3 className="text-xl font-semibold mb-2">Project Details</h3>
            <p>Internshala Trainings</p>
            <p>Data Structures and Algorithms</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gargi Goel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;