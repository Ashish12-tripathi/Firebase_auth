const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

function authHeader() {
  const token = localStorage.getItem("id_token");
  return { Authorization: `Bearer ${token}` };
}

export default {
  async getTasks() {
    const res = await fetch(`${API_URL}/tasks`, { headers: authHeader() });
    return res.json();
  },

  async createTask(task) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(task),
    });
    return res.json();
  },

  async updateTask(id, updates) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
  },

  async getMe() {
    const res = await fetch(`${API_URL}/admin/me`, { headers: authHeader() });
    return res.json();
  },

  async setRole(uid, role) {
    const res = await fetch(`${API_URL}/admin/set-role`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ uid, role }),
    });
    return res.json();
  },
};
