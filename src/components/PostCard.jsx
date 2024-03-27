import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    const fetchFilePreview = async () => {
      try {
        const preview = await appwriteService.getFilePreview(featuredImage);
        setFilePreview(preview);
      } catch (error) {
        console.error("Error fetching file preview:", error);
      }
    };

    fetchFilePreview();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {filePreview && (
            <img src={filePreview} alt={title} className="rounded-xl" />
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
