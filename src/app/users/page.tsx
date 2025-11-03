"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (!name || !role) return;
    setLoading(true);
    if (editingId) {
      const res = await fetch(`/api/user/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });
      const updated = await res.json();
      setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      setEditingId(null);
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }
    setName("");
    setRole("");
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/user/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };
  const handleEdit = async (user: User) => {
    setName(user.name);
    setRole(user.role);
    setEditingId(user.id);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
          User Management (CRUD)
        </h2>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {editingId ? "Edit User" : "Add User"}
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              className="flex-1 border border-gray-300 rounded-lg p-2"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded-lg transition`}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
