import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch admin dashboard & blogs
  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchDashboardAndBlogs = async () => {
      setLoading(true);
      try {
        // Dashboard fetch
        const dashRes = await fetch(`${BACKEND_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dashData = await dashRes.json();
        if (dashRes.ok) setAdminData(dashData);
        else {
          setError(dashData.message || "Failed to fetch dashboard");
          if (dashRes.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            navigate("/login");
          }
        }

        // Blogs fetch
        setBlogsLoading(true);
        const blogRes = await fetch(`${BACKEND_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blogData = await blogRes.json();
        if (blogRes.ok) setBlogs(blogData);
        else console.error(blogData.message);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard or blogs");
      } finally {
        setLoading(false);
        setBlogsLoading(false);
      }
    };

    fetchDashboardAndBlogs();
  }, [navigate, token]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  }, [navigate]);

  const handleSaveBlog = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setBlogSaving(true);
    try {
      const url = editingBlogId
        ? `${BACKEND_URL}/api/blogs/${editingBlogId}`
        : `${BACKEND_URL}/api/blogs`;
      const method = editingBlogId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: blogTitle, content: blogContent }),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingBlogId) {
          setBlogs((prev) =>
            prev.map((b) => (b._id === editingBlogId ? data : b))
          );
          setEditingBlogId(null);
        } else {
          setBlogs((prev) => [data, ...prev]);
        }
        setBlogTitle("");
        setBlogContent("");
      } else {
        alert(data.message || "Failed to save blog");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    } finally {
      setBlogSaving(false);
    }
  };

  const handleEditBlog = useCallback((blog) => {
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setEditingBlogId(blog._id);
  }, []);

  const handleDeleteBlog = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this blog?")) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setBlogs((prev) => prev.filter((b) => b._id !== id));
        else {
          const data = await res.json();
          alert(data.message || "Failed to delete blog");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete blog");
      }
    },
    [token]
  );

  if (loading)
    return (
      <p className="text-center mt-16 text-gray-600 text-lg font-medium">
        Loading dashboard...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-16 text-red-500 text-lg font-medium">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome, <span className="font-semibold">{adminData?.admin?.username}</span>
          </p>
          {adminData?.message && (
            <p className="mt-2 text-green-600 font-medium">{adminData.message}</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-md transition-all"
        >
          Logout
        </button>
      </header>

      {/* Add / Edit Blog */}
      <section className="mb-12 max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">
          {editingBlogId ? "Edit Blog" : "Add New Blog"}
        </h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Blog Content"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={5}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSaveBlog}
            disabled={blogSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg shadow-md transition-all flex-1"
          >
            {blogSaving
              ? editingBlogId
                ? "Updating..."
                : "Adding..."
              : editingBlogId
              ? "Update Blog"
              : "Add Blog"}
          </button>
          {editingBlogId && (
            <button
              onClick={() => {
                setEditingBlogId(null);
                setBlogTitle("");
                setBlogContent("");
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md transition-all flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
        {blogsLoading ? (
          <p className="text-gray-600">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600">No blogs found.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => {
              const isExpanded = expandedBlogId === blog._id;
              return (
                <li
                  key={blog._id}
                  className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() =>
                    setExpandedBlogId(isExpanded ? null : blog._id)
                  }
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{blog.title}</h3>
                      <p className="text-gray-700 mb-2">
                        {isExpanded
                          ? blog.content
                          : blog.content.length > 100
                          ? blog.content.slice(0, 100) + "..."
                          : blog.content}
                      </p>
                      <p className="text-sm text-gray-500">
                        By: <span className="font-medium">{blog.createdBy}</span> |{" "}
                        {new Date(blog.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="flex md:flex-col justify-center items-center md:ml-4 mt-4 md:mt-0 space-x-2 md:space-x-0 md:space-y-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBlog(blog);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg shadow-md transition-all w-full md:w-auto text-center"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBlog(blog._id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg shadow-md transition-all w-full md:w-auto text-center"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
