// File: /frontend/components/ResourceList.js

export default function ResourceList({ resources }) {
    return (
      <ul className="space-y-4">
        {resources.map((resource, index) => (
          <li
            key={index}
            className="border p-4 rounded-md shadow hover:shadow-md transition"
          >
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-bold text-lg"
            >
              {resource.name}
            </a>
            <p className="text-gray-700 mt-1">{resource.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  