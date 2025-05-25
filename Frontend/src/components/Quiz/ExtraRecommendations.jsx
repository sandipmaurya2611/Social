import React from 'react';

const ExtraRecommendations = ({ results }) => {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Discover More</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.slice(0, 6).map((cause, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg p-6 border border-gray-100 transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{cause.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{cause.description}</p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {cause.tags?.slice(0, 5).map((tag, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Community / Link */}
            <div className="mt-4">
              <a
                href={cause.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline"
              >
                Learn more / Join community →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraRecommendations;
