import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token.trim()) {
      login(token);
      alert("Logged in!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold">Login with Token</h2>
      <input
        type="text"
        placeholder="Paste your ID token here"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
        Login
      </button>
    </form>
  );
}
