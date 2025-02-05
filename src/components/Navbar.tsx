import { useState } from "react";
import { Link, useLocation } from "react-router";
import { colors } from "../configs/colors";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      style={{ backgroundColor: colors.navbar.background, color: colors.navbar.text }}
      className="p-4 shadow-lg font-Montserrat">
      <div className="container mx-auto flex justify-between items-center">
        {/* โลโก้ */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="TrustFinance Logo"
            className="h-8 w-8"
          />
          <Link
            to="/"
            className="text-xl tracking-wide"
          >
            TrustFinance Yearbook
          </Link>
        </div>

        {/* เมนูปกติ (Desktop) */}
        <div className="hidden md:flex text-xl uppercase gap-16">

          {/* <Link
            to="/admin"
            style={{
              textDecorationColor:
                location.pathname === "/admin"
                  ? colors.navbar.yellow
                  : "transparent",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/admin"
              ? "underline"
              : "hover:underline"
              }`}
          >
            Admin
          </Link> */}

          <Link
            to="/timeline"
            style={{
              textDecorationColor:
                location.pathname === "/timeline"
                  ? colors.navbar.yellow
                  : "transparent",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/timeline"
              ? "underline"
              : "hover:underline"
              }`}
          >
            Timeline
          </Link>

          <Link
            to="/squad"
            style={{
              textDecorationColor:
                location.pathname === "/squad"
                  ? colors.navbar.yellow
                  : "transparent",
            }}
            className={`underline-offset-8 decoration-2 ${location.pathname === "/squad"
              ? "underline"
              : "hover:underline"
              }`}
          >
            Squad
          </Link>
        </div>

        {/* Burger Menu (Mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* เมนู Mobile */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-blue-800 p-4 rounded-lg">
          <Link
            to="/timeline"
            className={`block p-2 rounded ${location.pathname === "/timeline"
              ? "bg-blue-700"
              : "hover:bg-blue-700"
              }`}
          >
            Timeline
          </Link>
          <Link
            to="/squad"
            className={`block p-2 rounded ${location.pathname === "/squad"
              ? "bg-blue-700"
              : "hover:bg-blue-700"
              }`}
          >
            Squad
          </Link>
        </div>
      )}
    </nav>
  );
}
