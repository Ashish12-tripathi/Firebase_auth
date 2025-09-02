import { useState } from "react";
import API from "../api/axios";

export default function AdminPanel() {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("admin");
  const [me, setMe] = useState(null);

  const setUserRole = async () => {
    try {
      await API.post("/admin/set-role", { uid, role });
      alert("Role updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMe = async () => {
    try {
      const res = await API.get("/admin/me");
      setMe(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-bold">Admin Panel</h2>

      <div className="my-2">
        <input
          type="text"
          placeholder="Target UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={setUserRole} className="bg-blue-500 text-white px-3 py-2 rounded">
          Set Role
        </button>
      </div>

      <button onClick={fetchMe} className="bg-purple-500 text-white px-3 py-2 rounded">
        Who Am I?
      </button>

      {me && (
        <pre className="bg-gray-200 p-2 mt-2">{JSON.stringify(me, null, 2)}</pre>
      )}
    </div>
  );
}
