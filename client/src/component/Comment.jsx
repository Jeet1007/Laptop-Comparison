import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
      <Textarea className="w-full p-2 border border-gray-300 rounded-md" placeholder="Type your message here."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
      />
      <Button  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleAddComment}> Send Comment</Button>

      </div>
      <div>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="p-2 bg-white border border-gray-300 rounded-md">
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default Comment;