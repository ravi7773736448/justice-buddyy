import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/blogs`);
        const data = await res.json();
        if (res.ok) setBlogs(data);
        else setError(data.message || "Failed to fetch blogs");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-16 text-gray-500 text-lg">Loading blogs...</p>;

  if (error)
    return <p className="text-center mt-16 text-red-500 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Legal Insights
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No blogs available.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Legal Insight
                </span>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{blog.title}</h2>
                <p className="text-gray-700 text-base leading-relaxed">{blog.content}</p>
              </div>
              <p className="text-sm text-gray-500 mt-5">
                By <span className="font-medium">{blog.createdBy}</span> |{" "}
                {new Date(blog.createdAt).toLocaleDateString()}{" "}
                {new Date(blog.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
