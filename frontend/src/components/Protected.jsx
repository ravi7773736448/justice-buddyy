import React, { useEffect, useState } from "react";

const Protected = () => {
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/admin/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setAdmin(data.admin);
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch protected data.");
      }
    };

    fetchProtected();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>{message}</p>
      {admin && (
        <div>
          <p>ID: {admin._id}</p>
          <p>Username: {admin.username}</p>
        </div>
      )}
    </div>
  );
};

export default Protected;
