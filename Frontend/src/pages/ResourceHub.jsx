import { useState } from "react";
import resourceData from "../components/data/resources";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ResourceGroup from "../components/ResourceGroup";

export default function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [...new Set(resourceData.map((item) => item.category))];

  const filteredResources = resourceData.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const groupedResources = {};
  filteredResources.forEach((resource) => {
    if (!groupedResources[resource.category]) {
      groupedResources[resource.category] = [];
    }
    groupedResources[resource.category].push(resource);
  });

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-6 md:px-8 md:py-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Header />

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 space-y-10">

          {/* Top Section - Filters */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Search & Filter</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <CategoryFilter
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                categories={categories}
              />
            </div>
          </section>

          {/* Results Summary */}
          <section>
            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 inline-block">
              <span className="font-semibold text-blue-700">{filteredResources.length}</span> resources found
              {categoryFilter && (
                <> in <span className="font-medium text-blue-600">"{categoryFilter}"</span></>
              )}
              {searchTerm && (
                <> matching <span className="font-medium text-blue-600">"{searchTerm}"</span></>
              )}
            </div>
          </section>

          {/* Grouped Resource List */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Resources</h2>
            <ResourceGroup
              groupedResources={groupedResources}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
