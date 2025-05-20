"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { AuthContext } from "@/app/providers/authprovider";
import Image from "next/image";
import { IconUser, IconLogout } from "@tabler/icons-react";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user, setUser} = useContext(AuthContext);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookie("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-end w-full py-2 px-4 bg-white shadow-sm">
      <div className="flex items-center">
        {/* Avatar and Dropdown */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              type="button"
              className="flex items-center bg-transparent border-none outline-none"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              aria-label="User Menu"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200">
                <Image
                  src={
                    user && user.profileImage
                      ? user.profileImage
                      : "/uploads/1745930609700_man-user.jpg"
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                {user?.name}
              </div>
            </button>

            {/* Dropdown Menu */}
            <ul
              className={`absolute right-0 mt-2 w-56 bg-white z-60 shadow-lg rounded-lg border border-gray-200 ${
                isDropdownOpen ? "block opacity-100" : "hidden opacity-0"
              } transition-opacity duration-200`}
              role="menu"
              aria-orientation="vertical"
            >
              <li className="flex items-center gap-2 p-3 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={
                      user && user.profileImage
                        ? user.profileImage
                        : "/uploads/1745930609700_man-user.jpg"
                    }
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </h6>
                  <small className="text-xs text-gray-500">Admin</small>
                </div>
              </li>
              <li>
                <Link
                  href="/my-profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <IconUser className="size-5" />
                  My Profile
                </Link>
              </li>
              <li className="p-2">
                <a
                  href="#"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <IconLogout className="size-5" />
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex gap-4">
            <li>
              <Link href="/signup" className="text-gray-700 hover:text-purple-600">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-700 hover:text-purple-600">
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}