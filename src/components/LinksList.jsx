"use client";
import React, { useState, useEffect } from "react";

const LinksList = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(links);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/link");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setLinks(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-blue-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Links</h1>
      {links.length > 0 ? (
        <ul className="space-y-3">
          {links.map((link) => (
            <li
              key={link.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{link.title}</p>
                {/* <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {link.link}
                </a> */}
              </div>
              <button
                onClick={() => openInNewTab(link.link)}
                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No links found.</p>
      )}
    </div>
  );
};

export default LinksList;
