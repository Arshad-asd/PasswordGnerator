import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = true;
  const { userInfo } = useSelector((state) => state.auth);

  const handleNav = () => {
    setNav(!nav);
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    showToast("Logout successfully", "success");
  };

  // Array containing navigation items
  const navItems = [{ id: 1, text: "Home" }];

  return (
    <div className="bg-black flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4 text-white">
      {/* Logo */}
      <div>
        {" "}
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">
          Password Generator
        </h1>
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            {item.text}
          </li>
        ))}
        {userInfo ? (
          <li className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <button
              className="logout-buttons rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4 md:hidden">
          Password Generator
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
        {userInfo ? (
          <li>
            <button
              className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
