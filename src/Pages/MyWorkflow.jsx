import { ChevronDown } from 'lucide-react';

const Myworkflow = () => {
  const sampleFiles = [
    {
      id: 1,
      name: "Project-invoice.pdf",
      category: "Personal",
      modelId: "model-2bw07r",
      dateCreated: "19/12/2024, 20:22:15"
    },
    {
      id: 2,
      name: "Q4 Financial Report 2024.pdf",
      category: "Finance",
      modelId: "model-3cx92m",
      dateCreated: "19/12/2024, 20:45:30"
    },
    {
      id: 3,
      name: "Project Proposal Draft.pdf",
      category: "Work",
      modelId: "model-7ky14p",
      dateCreated: "19/12/2024, 21:10:45"
    },
    {
      id: 4,
      name: "Research Paper Analysis.pdf",
      category: "Academic",
      modelId: "model-9hz25q",
      dateCreated: "19/12/2024, 21:30:20"
    },
    {
      id: 5,
      name: "Meeting Minutes Dec 2024.pdf",
      category: "Work",
      modelId: "model-5vn83t",
      dateCreated: "19/12/2024, 22:05:10"
    },
    {
      id: 6,
      name: "Tax Documents 2024.pdf",
      category: "Finance",
      modelId: "model-4wp67s",
      dateCreated: "19/12/2024, 22:15:40"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Workflow</h1>
        
        <div className="flex gap-3">
          {/* Category Filter */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:border-blue-500 min-w-[120px]"
              defaultValue="All"
            >
              <option>All</option>
              <option>Personal</option>
              <option>Work</option>
              <option>Finance</option>
              <option>Academic</option>
              <option>Other</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>

         
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">File Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Model ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date Created</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {file.name}
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="text-sm bg-gray-50 border rounded px-3 py-1 text-gray-700 focus:outline-none focus:border-blue-500"
                    defaultValue={file.category}
                  >
                    <option>Personal</option>
                    <option>Work</option>
                    <option>Finance</option>
                    <option>Academic</option>
                    <option>Other</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {file.modelId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {file.dateCreated}
                </td>
                <td className="px-6 py-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myworkflow;