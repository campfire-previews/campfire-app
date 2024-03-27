import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

const NameModal = ({
  isVisible,
  onSubmit,
  defaultName,
  onClose = () => {},
}) => {
  const [name, setName] = useState(defaultName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(defaultName);
    setIsEditing(!!localStorage.getItem("userName"));
    setError("");
  }, [defaultName, isVisible]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name is required");
      return;
    }

    const sanitized = DOMPurify.sanitize(trimmedName);
    if (trimmedName !== sanitized) {
      setError("Please enter a valid username without special characters");
      return;
    }

    onSubmit(sanitized);
    window.dispatchEvent(new CustomEvent("username-set"));
  };

  return (
    <div className="name-modal-overlay">
      <div id="name-modal-content" className="name-modal-content">
        <form onSubmit={handleSubmit}>
          <h1>
            {isEditing ? "thanks for using campfire!" : "welcome to campfire!"}
          </h1>
          <h2>
            {isEditing
              ? "please update your name:"
              : "what is your name? (for comments)"}
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(""); // clear error when user starts typing
            }}
          />
          {error && <div className="name-modal-error-message">{error}</div>}
          <button type="submit">
            {isEditing ? "save changes" : "join the campfire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
