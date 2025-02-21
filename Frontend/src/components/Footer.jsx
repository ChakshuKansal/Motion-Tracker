import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Website & Address */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">FitTrack</h2>
          <p className="mt-2 text-gray-400">
            123 Fitness Street, Workout City, USA
          </p>
          <p className="text-gray-400">Email: support@fittrack.com</p>
          <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Useful Links</h3>
          <ul className="mt-3 text-gray-400 space-y-2">
            <li>📞 Chakshu Kansal - +1 987 654 3210</li>
            <li>📞 Ali - +1 876 543 2109</li>
            <li>📞 Mike Johnson - +1 765 432 1098</li>
            <li>📞 Emily Brown - +1 654 321 0987</li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Our Services</h3>
          <ul className="mt-3 text-gray-400 space-y-2">
            <li>🏋️ Multiple Gym Centers</li>
            <li>📊 Activity Tracker</li>
            <li>🥗 Diet Recommendation</li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-yellow-400">Follow Us</h3>
        <div className="flex justify-center space-x-4 mt-3">
          <FaFacebook className="text-xl cursor-pointer hover:text-blue-500" />
          <FaInstagram className="text-xl cursor-pointer hover:text-pink-500" />
          <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
          <FaLinkedin className="text-xl cursor-pointer hover:text-blue-600" />
        </div>
        <p className="mt-4 text-gray-500 text-sm">© 2025 FitTrack. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
