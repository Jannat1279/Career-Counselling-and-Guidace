import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="bg-gray-200 py-10" id="QuickLinks">
        <div className="container mx-auto flex justify-around items-start px-6 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">Career.</h2>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-2 text-gray-900">Quick Links</h3>
            <Link to="/resources" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700">Resources</Link>
            <Link to="/stories" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700">Stories</Link>
            <Link to="/mental-health" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700" >Wellness & Support</Link>
          </div>

          {/* Others */}
          <div>
            <h3 className="font-bold mb-2 text-gray-900">Others</h3>
            <Link to="/" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700">Home</Link>
            <Link to="/faq" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700">FAQ's</Link>
            <Link to="/contactus" className="block hover:text-indigo-500 text-[15px] font-bold text-gray-700">Feedback</Link>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-2 text-gray-900">Contact</h3>
            <p className="hover:text-indigo-500 cursor-pointer font-bold text-gray-700">careers4guidance@gmail.com
</p>
            <div className="flex gap-3 mt-2">
              <Link><i className="bx bxl-facebook text-xl"></i></Link>
              <Link><i className="bx bxl-twitter text-xl"></i></Link>
              <Link><i className="bx bxl-instagram text-xl"></i></Link>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center py-4">
        <h3>© All Rights Reserved</h3>
      </div>
    </>
  );
}