import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPage() {
  const [me, setMe] = useState(null);
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    api.getMe().then(setMe);
  }, []);

  const handleSetRole = async () => {
    await api.setRole(uid, role);
    alert("Role updated!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <pre className="bg-gray-100 p-3 rounded mb-4">{JSON.stringify(me, null, 2)}</pre>
      
      <input
        type="text"
        placeholder="Target UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mr-2">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSetRole} className="bg-green-600 text-white px-4 py-2 rounded">
        Set Role
      </button>
    </div>
  );
}
