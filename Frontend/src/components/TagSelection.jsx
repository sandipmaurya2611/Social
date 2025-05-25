import React, { useState } from "react";
import axios from "axios";

const tagOptions = {
  education: ["Engineer", "BSc", "Arts"],
  environment: ["Climate Change", "Sustainability"],
  health: ["Nutrition", "Mental Health"],
  tech: ["AI", "Blockchain"],
  finance: ["Investing", "Crypto"],
  profession: ["Doctor", "Software Engineer"]
};

const TagSelection = ({ userId, onSave }) => {
  const [selectedTags, setSelectedTags] = useState({
    education: [],
    environment: [],
    health: [],
    tech: [],
    finance: [],
    profession: []
  });

  const handleToggleTag = (category, tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [category]: prev[category].includes(tag)
        ? prev[category].filter((t) => t !== tag)
        : [...prev[category], tag]
    }));
  };

  const saveTags = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/update", {
        userId,
        selectedTags
      });
      onSave();
    } catch (err) {
      console.error("Error saving tags", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Select Your Interests</h2>
      {Object.entries(tagOptions).map(([category, tags]) => (
        <div key={category} className="mt-4">
          <h3 className="font-semibold">{category.toUpperCase()}</h3>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(category, tag)}
                className={`px-3 py-1 rounded border ${
                  selectedTags[category].includes(tag) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={saveTags} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default TagSelection;
