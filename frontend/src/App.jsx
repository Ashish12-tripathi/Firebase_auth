import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import TaskList from "./components/TaskList";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const { idToken, setToken, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email and password");

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setToken(token); // store in context
      alert("Logged in successfully!");
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.message);
    }
    setLoading(false);
  };

  if (!idToken) {
    return (
      <div className="p-6 border rounded w-96 mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4 text-center">CuriousVault Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CuriousVault Frontend</h1>
      <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded mb-4">Logout</button>
      <TaskList />
      <AdminPanel />
    </div>
  );
}
