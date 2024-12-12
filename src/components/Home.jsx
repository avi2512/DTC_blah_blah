import React from "react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center bg-green-900 text-white p-4">
        <div className="flex items-center">
          <img src="data:image/png;base64,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" alt="DTC Logo" className="h-12 mr-4" />
          <div>
            <h1 className="text-lg font-bold">Delhi Transport Corporation</h1>
            <h2 className="text-sm">Government of NCT of Delhi</h2>
          </div>
        </div>
        <div className="flex items-center">
          <Link to="/login">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded mr-4">Login</button>
          </Link>
          <Link to="/register">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded">Register</button>
          </Link>

        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-800 text-white">
        <ul className="flex justify-around p-3 text-sm">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">About Us</li>
          <li className="hover:underline cursor-pointer">Services</li>
          <li className="hover:underline cursor-pointer">Other Links</li>
          <li className="hover:underline cursor-pointer">RTI</li>
          <li className="hover:underline cursor-pointer">Notice Board</li>
          <li className="hover:underline cursor-pointer">Contact Us</li>
        </ul>
      </nav>

      {/* News Section */}
      <div className="flex items-center bg-green-400 text-black p-2">
        <div className="font-bold mr-4">Latest News</div>
        <marquee className="flex-1">
          <span className="mx-4">सुलख प्रतियोगिता</span>
          <span className="mx-4">Grant of Dearness Allowance to Central Government Employees</span>
          <span className="mx-4">Endorsement for Leave Travel Concession (LTC)</span>
          <span className="mx-4">Revision of Recruitment Rules</span>
        </marquee>
      </div>

      {/* Main Section */}
      <main className="flex items-center justify-center min-h-screen">
        <img src="https://dtc.delhi.gov.in/sites/default/files/styles/home_banner/public/DTC/banner-images/delhi_transport_corporation_web_banner-1.png?itok=-owYFwNz" alt="DTC Building 1" className="w-full h-full object-cover" />
      </main>

      {/* Footer */}
      <footer className="text-center bg-blue-900 text-white py-4">
        <p>&copy; 2024 Delhi Transport Corporation</p>
      </footer>
    </div>
  );
};

export default HomePage;