import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export default function ResourceGroup({ groupedResources, expandedCategory, toggleCategory }) {
  return (
    <div className="space-y-6">
      {Object.keys(groupedResources).length > 0 ? (
        Object.keys(groupedResources).map((category) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              <h2 className="text-lg font-medium text-gray-800">{category}</h2>
              {expandedCategory === category ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {expandedCategory === category && (
              <div className="divide-y divide-gray-200">
                {groupedResources[category].map((resource) => (
                  <div key={resource.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-green-600">{resource.name}</h3>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-green-600 hover:text-green-800"
                      >
                        Visit <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No resources found. Try adjusting your search or filter.
        </div>
      )}
    </div>
  );
}
