// import React, { useState, useEffect } from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { FileText, ChevronDown, Eye } from 'lucide-react';

// const PDFManagement = () => {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(null);

//   // Categories available for selection
//   const categories = [
//     "Personal",
//     "Finance",
//     "Work",
//     "Academic"
//   ];

//   // Format date to readable string
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString('default', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     }).replace(',', '');
//   };

//   // Fetch documents on component mount
//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await fetch('/api/documents');
//       const data = await response.json();
//       setDocuments(data);
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = async (documentId, newCategory) => {
//     setSaving(documentId);
//     try {
//       const response = await fetch(`/api/documents/${documentId}/category`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ category: newCategory }),
//       });

//       if (!response.ok) throw new Error('Failed to update category');

//       setDocuments(docs =>
//         docs.map(doc =>
//           doc.modelId === documentId ? { ...doc, category: newCategory } : doc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating category:', error);
//     } finally {
//       setSaving(null);
//     }
//   };

//   const handleViewPDF = (modelId) => {
//     window.open(`/api/documents/${modelId}/view`, '_blank');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin">
//           <FileText className="h-8 w-8 text-gray-400" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           <h2 className="text-2xl font-semibold mb-6">PDF Documents</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
//                     File Name
//                   </th>
//                   <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
//                     Category
//                   </th>
//                   <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
//                     Model ID
//                   </th>
//                   <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">
//                     Date Created
//                   </th>
//                   <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {documents.map((doc) => (
//                   <tr key={doc.modelId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       {doc.fileName}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <Select
//                         value={doc.category}
//                         onValueChange={(value) => handleCategoryChange(doc.modelId, value)}
//                         disabled={saving === doc.modelId}
//                       >
//                         <SelectTrigger className="w-32">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {doc.modelId}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {formatDate(doc.dateCreated)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-right">
//                       <Button
//                         variant="secondary"
//                         className="bg-green-500 hover:bg-green-600 text-white"
//                         onClick={() => handleViewPDF(doc.modelId)}
//                       >
//                         View PDF
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFManagement;


// import React, { useState, useEffect } from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { FileText, ChevronDown, Eye } from 'lucide-react';

// const PDFManagement = () => {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(null);

//   // Categories available for selection
//   const categories = [
//     "Personal",
//     "Finance",
//     "Work",
//     "Academic"
//   ];

//   // Format date to readable string
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString('default', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     }).replace(',', '');
//   };

//   // Fetch documents on component mount
//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await fetch('/api/documents');
//       const data = await response.json();
//       setDocuments(data);
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = async (documentId, newCategory) => {
//     setSaving(documentId);
//     try {
//       const response = await fetch(`/api/documents/${documentId}/category`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ category: newCategory }),
//       });

//       if (!response.ok) throw new Error('Failed to update category');

//       setDocuments(docs =>
//         docs.map(doc =>
//           doc.modelId === documentId ? { ...doc, category: newCategory } : doc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating category:', error);
//     } finally {
//       setSaving(null);
//     }
//   };

//   const handleViewPDF = (modelId) => {
//     // Implement PDF viewing logic here
//     window.open(`/api/documents/${modelId}/view`, '_blank');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin">
//           <FileText className="h-8 w-8 text-gray-400" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           <h2 className="text-2xl font-semibold mb-6">PDF Documents</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>File Name</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Model ID</TableHead>
//                 <TableHead>Date Created</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {documents.map((doc) => (
//                 <TableRow key={doc.modelId}>
//                   <TableCell className="font-medium">{doc.fileName}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={doc.category}
//                       onValueChange={(value) => handleCategoryChange(doc.modelId, value)}
//                       disabled={saving === doc.modelId}
//                     >
//                       <SelectTrigger className="w-32">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories.map((category) => (
//                           <SelectItem key={category} value={category}>
//                             {category}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                   <TableCell className="text-gray-500">{doc.modelId}</TableCell>
//                   <TableCell>{formatDate(doc.dateCreated)}</TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       variant="secondary"
//                       className="bg-green-500 hover:bg-green-600 text-white"
//                       onClick={() => handleViewPDF(doc.modelId)}
//                     >
//                       View PDF
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFManagement;


import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const PDFManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(null);

  const categories = [
    "Personal",
    "Finance",
    "Work",
    "Academic"
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(',', '');
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('/api/documents');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data is an array
      setDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents. Please try again later.');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (documentId, newCategory) => {
    setSaving(documentId);
    try {
      const response = await fetch(`/api/documents/${documentId}/category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory }),
      });

      if (!response.ok) throw new Error('Failed to update category');

      setDocuments(docs =>
        docs.map(doc =>
          doc.modelId === documentId ? { ...doc, category: newCategory } : doc
        )
      );
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const handleViewPDF = (modelId) => {
    window.open(`/api/documents/${modelId}/view`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">PDF Documents</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {documents.length === 0 && !error ? (
            <div className="text-center py-6 text-gray-500">
              No documents found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Model ID</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.modelId}>
                    <TableCell className="font-medium">{doc.fileName}</TableCell>
                    <TableCell>
                      <Select
                        value={doc.category}
                        onValueChange={(value) => handleCategoryChange(doc.modelId, value)}
                        disabled={saving === doc.modelId}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-gray-500">{doc.modelId}</TableCell>
                    <TableCell>{formatDate(doc.dateCreated)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleViewPDF(doc.modelId)}
                      >
                        View PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFManagement;