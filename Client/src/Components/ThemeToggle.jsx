import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800 transition flex items-center gap-2"
    >
      {theme === "dark" ? (
        <>
          <FaSun />
        </>
      ) : (
        <>
          <FaMoon />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
