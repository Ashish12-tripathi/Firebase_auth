import { useState } from "react";

export default function LoginPage() {
  const [token, setToken] = useState("");

  const handleLogin = () => {
    localStorage.setItem("id_token", token);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="text"
        placeholder="Paste JWT here"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border rounded p-2 w-80"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Token & Login
      </button>
    </div>
  );
}
