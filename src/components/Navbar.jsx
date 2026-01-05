import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
    //   <div className="text-2xl font-bold text-indigo-600"><Link to='/'>Career.</Link></div>
    //   <ul className="flex gap-6">
    <div className="flex items-center px-10 py-4 shadow-md bg-white">

      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">Career.</Link>
      </div>

      {/* Menu - shifted slightly to the right + bigger spacing */}
      <ul className="flex gap-14 ml-44 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-indigo-500">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-indigo-500">About</Link>
        </li>
        {/* <li className="relative group">
          <span className="cursor-pointer hover:text-indigo-500 select-none">
            Services ▾
          </span>
          <ul className="absolute left-0 hidden group-hover:block group-focus-within:block hover:block bg-white shadow-lg rounded-lg mt-2 p-2 z-10 min-w-[140px] text-left pointer-events-auto">
            <li><Link to="/stories" className="block px-4 py-2 hover:bg-indigo-100">Stories</Link></li>
            <li><Link to="/mentor" className="block px-4 py-2 hover:bg-indigo-100">Mentor</Link></li>
            <li><Link to="/courses" className="block px-4 py-2 hover:bg-indigo-100">Courses</Link></li>
          </ul>
        </li> */}

        <li>
          <Link to="/mental-health" className="hover:text-indigo-500">
            Wellness & Support
          </Link>
        </li>
        
        <li>
          <Link to="/register" className="hover:text-indigo-500">Register</Link>
        </li>
        <li>
          <Link to="/contactus" className="hover:text-indigo-500">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
