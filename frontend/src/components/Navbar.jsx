import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">CuriousVault</h1>
      <div>
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <p className="text-sm italic">Not logged in</p>
        )}
      </div>
    </nav>
  );
}
