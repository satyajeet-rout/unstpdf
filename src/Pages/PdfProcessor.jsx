// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Loader2, FileText, CheckCircle, Trash2, X } from 'lucide-react';

// const PDFProcessor = () => {
//   const [files, setFiles] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [results, setResults] = useState({});
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleFileChange = (e) => {
//     setSuccessMessage('');
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
//     const newFiles = validFiles.map(file => ({
//       file,
//       isMultiPage: false,
//       startingPages: '',
//       id: Math.random().toString(36).substr(2, 9)
//     }));

//     setFiles(prev => [...prev, ...newFiles]);
    
//     if (validFiles.length !== selectedFiles.length) {
//       setError('Some files were skipped. Only PDF files are allowed.');
//     }
//   };

//   const removeFile = (id) => {
//     setFiles(files.filter(f => f.id !== id));
//     setResults(prev => {
//       const newResults = { ...prev };
//       delete newResults[id];
//       return newResults;
//     });
//   };

//   const updateFileSettings = (id, settings) => {
//     setFiles(files.map(f => 
//       f.id === id ? { ...f, ...settings } : f
//     ));
//   };

//   const resetForm = () => {
//     const failedFiles = files.filter(file => 
//       results[file.id]?.status === 'error'
//     ).map(file => file.file.name);

//     if (failedFiles.length > 0) {
//       setError(`Following files did not process: ${failedFiles.join(', ')}`);
//       setSuccessMessage('Some PDFs processed with errors');
//     } else {
//       setError(null);
//       setSuccessMessage('All PDFs Processed successfully');
//     }

//     setFiles([]);
//     setResults({});
//     const fileInput = document.getElementById('pdf-upload');
//     if (fileInput) fileInput.value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError(null);

//     const processPromises = files.map(async ({ file, isMultiPage, startingPages, id }) => {
//       const formData = new FormData();
//       formData.append('pdfs', file);
//       if (isMultiPage) {
//         formData.append('multi_page_invoice', 'true');
//         if (startingPages) {
//           formData.append('starting_pages', startingPages);
//         }
//       } else {
//         formData.append('multi_page_invoice', 'false');
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/pdfs/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error(`Error processing ${file.name}`);
//         }

//         const data = await response.json();
        
//         setResults(prev => ({
//           ...prev,
//           [id]: { 
//             status: 'completed', 
//             data: data[0].externalResponse,
//             savedPDF: data[0]
//           }
//         }));
//       } catch (err) {
//         setResults(prev => ({
//           ...prev,
//           [id]: { status: 'error', error: err.message }
//         }));
//       }
//     });

//     await Promise.all(processPromises);
//     setProcessing(false);
//     resetForm();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-6 w-6" />
//             Multiple PDF OCR Processor
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="pdf-upload">Upload PDFs</Label>
//               <Input
//                 id="pdf-upload"
//                 type="file"
//                 accept=".pdf"
//                 multiple
//                 onChange={handleFileChange}
//                 className="mt-1"
//               />
//             </div>

//             {successMessage && (
//               <div className="bg-green-50 p-4 rounded-md">
//                 <p className="text-green-600">{successMessage}</p>
//               </div>
//             )}

//             <div className="space-y-3">
//               {files.map(({ file, isMultiPage, startingPages, id }) => (
//                 <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <div className="font-medium">{file.name}</div>
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         id={`multi-page-${id}`}
//                         checked={isMultiPage}
//                         onCheckedChange={(checked) => 
//                           updateFileSettings(id, { isMultiPage: checked })
//                         }
//                       />
//                       <Label htmlFor={`multi-page-${id}`}>Multi-page</Label>
//                     </div>
                    
//                     {isMultiPage && (
//                       <div className="flex items-center gap-2">
//                         <Input 
//                           type="text"
//                           placeholder="1,3,4"
//                           value={startingPages}
//                           onChange={(e) => 
//                             updateFileSettings(id, { startingPages: e.target.value })
//                           }
//                           className="w-32"
//                         />
//                       </div>
//                     )}
                    
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFile(id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {files.length > 0 && (
//               <Button 
//                 type="submit" 
//                 disabled={processing}
//                 className="w-full"
//               >
//                 {processing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing PDFs...
//                   </>
//                 ) : (
//                   `Process ${files.length} PDF${files.length !== 1 ? 's' : ''}`
//                 )}
//               </Button>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-between">
//                 {error}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setError(null)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}
//           </form>
//         </CardContent>
//       </Card>

//       {/* {Object.entries(results).length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//               Processing Results
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {Object.entries(results).map(([id, result]) => {
//                 const file = files.find(f => f.id === id);
//                 if (!file) return null;

//                 return (
//                   <div key={id} className="space-y-4">
//                     <div className="font-medium text-lg">{file.file.name}</div>
//                     {result.status === 'completed' ? (
//                       <div>
//                         <div className="bg-green-50 p-4 rounded-md mb-4">
//                           <p className="text-green-700 font-medium">
//                             {result.data.message || "PDF processed successfully"}
//                           </p>
//                           <p className="text-sm text-green-600 mt-1">
//                             Processed {result.data.result?.length || 0} pages
//                           </p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {result.data.result?.map((item, index) => (
//                             <Card key={index} className="overflow-hidden">
//                               <CardHeader className="bg-gray-50 py-3">
//                                 <div className="flex justify-between items-center">
//                                   <span className="font-semibold">Page {item.page_number}</span>
//                                   <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
//                                     {item.category}
//                                   </span>
//                                 </div>
//                               </CardHeader>
//                               <CardContent className="p-4">
//                                 <div className="space-y-2">
//                                   <div className="text-sm text-gray-600">
//                                     <div className="font-medium text-gray-700 mb-2">
//                                       Extracted Text:
//                                     </div>
//                                     <div className="max-h-48 overflow-y-auto">
//                                       {item.ocr_text}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </CardContent>
//                             </Card>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="bg-red-50 p-4 rounded-md">
//                         <p className="text-red-600">{result.error}</p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       )} */}
//     </div>
//   );
// };

// export default PDFProcessor;






// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Loader2, FileText, CheckCircle, Trash2, X, Eye } from 'lucide-react';

// const PDFProcessor = () => {
//   const [files, setFiles] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [results, setResults] = useState({});
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [processedCategories, setProcessedCategories] = useState({});

//   const analyzePDF = async (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const typedArray = new Uint8Array(e.target.result);
//         try {
//           // Use PDF.js to get page count
//           const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
//           resolve(pdf.numPages > 1);
//         } catch (error) {
//           console.error('Error analyzing PDF:', error);
//           resolve(false);
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleFileChange = async (e) => {
//     setSuccessMessage('');
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
//     const newFiles = await Promise.all(validFiles.map(async file => {
//       const isMultiPagePDF = await analyzePDF(file);
//       return {
//         file,
//         isMultiPage: isMultiPagePDF,
//         startingPages: '',
//         id: Math.random().toString(36).substr(2, 9)
//       };
//     }));

//     setFiles(prev => [...prev, ...newFiles]);
    
//     if (validFiles.length !== selectedFiles.length) {
//       setError('Some files were skipped. Only PDF files are allowed.');
//     }
//   };

//   const viewPDF = (file) => {
//     const url = URL.createObjectURL(file);
//     window.open(url, '_blank');
//   };

//   const removeFile = (id) => {
//     setFiles(files.filter(f => f.id !== id));
//     setResults(prev => {
//       const newResults = { ...prev };
//       delete newResults[id];
//       return newResults;
//     });
//     setProcessedCategories(prev => {
//       const newCategories = { ...prev };
//       delete newCategories[id];
//       return newCategories;
//     });
//   };

//   const updateFileSettings = (id, settings) => {
//     setFiles(files.map(f => 
//       f.id === id ? { ...f, ...settings } : f
//     ));
//   };

//   const resetForm = () => {
//     const failedFiles = files.filter(file => 
//       results[file.id]?.status === 'error'
//     ).map(file => file.file.name);

//     if (failedFiles.length > 0) {
//       setError(`Following files did not process: ${failedFiles.join(', ')}`);
//       setSuccessMessage('Some PDFs processed with errors');
//     } else {
//       setError(null);
//       setSuccessMessage('All PDF processing completed');
//     }

//     // Keep the results visible but clear the upload form
//     const fileInput = document.getElementById('pdf-upload');
//     if (fileInput) fileInput.value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError(null);

//     const processPromises = files.map(async ({ file, isMultiPage, startingPages, id }) => {
//       const formData = new FormData();
//       formData.append('pdfs', file);
//       if (isMultiPage) {
//         formData.append('multi_page_invoice', 'true');
//         if (startingPages) {
//           formData.append('starting_pages', startingPages);
//         }
//       } else {
//         formData.append('multi_page_invoice', 'false');
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/pdfs/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error(`Error processing ${file.name}`);
//         }

//         const data = await response.json();
        
//         // Extract unique categories from the response
//         const categories = [...new Set(data[0].externalResponse.result.map(item => item.category))];
//         setProcessedCategories(prev => ({
//           ...prev,
//           [id]: categories
//         }));

//         setSuccessMessage(`${file.name} processed successfully`);
        
//         setResults(prev => ({
//           ...prev,
//           [id]: { 
//             status: 'completed', 
//             data: data[0].externalResponse,
//             savedPDF: data[0]
//           }
//         }));
//       } catch (err) {
//         setResults(prev => ({
//           ...prev,
//           [id]: { status: 'error', error: err.message }
//         }));
//       }
//     });

//     await Promise.all(processPromises);
//     setProcessing(false);
//     resetForm();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-6 w-6" />
//             Multiple PDF OCR Processor
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="pdf-upload">Upload PDFs</Label>
//               <Input
//                 id="pdf-upload"
//                 type="file"
//                 accept=".pdf"
//                 multiple
//                 onChange={handleFileChange}
//                 className="mt-1"
//               />
//             </div>

//             {successMessage && (
//               <div className="bg-green-50 p-4 rounded-md">
//                 <p className="text-green-600">{successMessage}</p>
//               </div>
//             )}

//             <div className="space-y-3">
//               {files.map(({ file, isMultiPage, startingPages, id }) => (
//                 <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <div className="font-medium">{file.name}</div>
//                     {processedCategories[id] && (
//                       <div className="text-sm text-gray-600 mt-1">
//                         Categories: {processedCategories[id].join(', ')}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         id={`multi-page-${id}`}
//                         checked={isMultiPage}
//                         onCheckedChange={(checked) => 
//                           updateFileSettings(id, { isMultiPage: checked })
//                         }
//                       />
//                       <Label htmlFor={`multi-page-${id}`}>Multi-page</Label>
//                     </div>
                    
//                     {isMultiPage && (
//                       <div className="flex items-center gap-2">
//                         <Input 
//                           type="text"
//                           placeholder="1,3,4"
//                           value={startingPages}
//                           onChange={(e) => 
//                             updateFileSettings(id, { startingPages: e.target.value })
//                           }
//                           className="w-32"
//                         />
//                       </div>
//                     )}
                    
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => viewPDF(file)}
//                       className="text-blue-600"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFile(id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {files.length > 0 && (
//               <Button 
//                 type="submit" 
//                 disabled={processing}
//                 className="w-full"
//               >
//                 {processing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing PDFs...
//                   </>
//                 ) : (
//                   `Process ${files.length} PDF${files.length !== 1 ? 's' : ''}`
//                 )}
//               </Button>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-between">
//                 {error}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setError(null)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PDFProcessor;






// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Loader2, FileText, CheckCircle, Trash2, X, Eye } from 'lucide-react';

// const PDFProcessor = () => {
//   const [files, setFiles] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [results, setResults] = useState({});
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [processedCategories, setProcessedCategories] = useState({});

//   const analyzePDF = async (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const typedArray = new Uint8Array(e.target.result);
//         try {
//           const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
//           resolve(pdf.numPages > 1);
//         } catch (error) {
//           console.error('Error analyzing PDF:', error);
//           resolve(false);
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleFileChange = async (e) => {
//     setSuccessMessage('');
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
//     const newFiles = await Promise.all(validFiles.map(async file => {
//       const isMultiPagePDF = await analyzePDF(file);
//       return {
//         file,
//         isMultiPage: isMultiPagePDF,
//         startingPages: '',
//         id: Math.random().toString(36).substr(2, 9)
//       };
//     }));

//     setFiles(prev => [...prev, ...newFiles]);
    
//     if (validFiles.length !== selectedFiles.length) {
//       setError('Some files were skipped. Only PDF files are allowed.');
//     }
//   };

//   const viewPDF = (file) => {
//     const url = URL.createObjectURL(file);
//     window.open(url, '_blank');
//   };

//   const removeFile = (id) => {
//     setFiles(files.filter(f => f.id !== id));
//     setResults(prev => {
//       const newResults = { ...prev };
//       delete newResults[id];
//       return newResults;
//     });
//     setProcessedCategories(prev => {
//       const newCategories = { ...prev };
//       delete newCategories[id];
//       return newCategories;
//     });
//   };

//   const updateFileSettings = (id, settings) => {
//     setFiles(files.map(f => 
//       f.id === id ? { ...f, ...settings } : f
//     ));
//   };

//   const resetForm = () => {
//     const failedFiles = files.filter(file => 
//       results[file.id]?.status === 'error'
//     ).map(file => file.file.name);

//     if (failedFiles.length > 0) {
//       setError(`Following files did not process: ${failedFiles.join(', ')}`);
//       setSuccessMessage('Some PDFs processed with errors');
//     } else {
//       setError(null);
//       setSuccessMessage('All PDF processing completed');
//     }

//     // Clear all uploaded files
//     setFiles([]);
//     // Clear the file input
//     const fileInput = document.getElementById('pdf-upload');
//     if (fileInput) fileInput.value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError(null);

//     const processPromises = files.map(async ({ file, isMultiPage, startingPages, id }) => {
//       const formData = new FormData();
//       formData.append('pdfs', file);
//       if (isMultiPage) {
//         formData.append('multi_page_invoice', 'true');
//         if (startingPages) {
//           formData.append('starting_pages', startingPages);
//         }
//       } else {
//         formData.append('multi_page_invoice', 'false');
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/pdfs/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error(`Error processing ${file.name}`);
//         }

//         const data = await response.json();
        
//         // Extract unique categories from the response
//         const categories = [...new Set(data[0].externalResponse.result.map(item => item.category))];
//         setProcessedCategories(prev => ({
//           ...prev,
//           [id]: categories
//         }));

//         setSuccessMessage(prev => {
//           const newMessage = `${file.name} processed successfully (Categories: ${categories.join(', ')})`;
//           return prev ? `${prev}\n${newMessage}` : newMessage;
//         });
        
//         setResults(prev => ({
//           ...prev,
//           [id]: { 
//             status: 'completed', 
//             data: data[0].externalResponse,
//             savedPDF: data[0]
//           }
//         }));
//       } catch (err) {
//         setResults(prev => ({
//           ...prev,
//           [id]: { status: 'error', error: err.message }
//         }));
//       }
//     });

//     await Promise.all(processPromises);
//     setProcessing(false);
//     resetForm();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-6 w-6" />
//             Multiple PDF OCR Processor
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="pdf-upload">Upload PDFs</Label>
//               <Input
//                 id="pdf-upload"
//                 type="file"
//                 accept=".pdf"
//                 multiple
//                 onChange={handleFileChange}
//                 className="mt-1"
//               />
//             </div>

//             {successMessage && (
//               <div className="bg-green-50 p-4 rounded-md whitespace-pre-line">
//                 <p className="text-green-600">{successMessage}</p>
//               </div>
//             )}

//             <div className="space-y-3">
//               {files.map(({ file, isMultiPage, startingPages, id }) => (
//                 <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <div className="font-medium">{file.name}</div>
//                     {processedCategories[id] && (
//                       <div className="text-sm text-gray-600 mt-1">
//                         Categories: {processedCategories[id].join(', ')}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         id={`multi-page-${id}`}
//                         checked={isMultiPage}
//                         onCheckedChange={(checked) => 
//                           updateFileSettings(id, { isMultiPage: checked })
//                         }
//                       />
//                       <Label htmlFor={`multi-page-${id}`}>Multi-page</Label>
//                     </div>
                    
//                     {isMultiPage && (
//                       <div className="flex items-center gap-2">
//                         <Input 
//                           type="text"
//                           placeholder="1,3,4"
//                           value={startingPages}
//                           onChange={(e) => 
//                             updateFileSettings(id, { startingPages: e.target.value })
//                           }
//                           className="w-32"
//                         />
//                       </div>
//                     )}
                    
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => viewPDF(file)}
//                       className="text-blue-600"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFile(id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {files.length > 0 && (
//               <Button 
//                 type="submit" 
//                 disabled={processing}
//                 className="w-full"
//               >
//                 {processing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing PDFs...
//                   </>
//                 ) : (
//                   `Process ${files.length} PDF${files.length !== 1 ? 's' : ''}`
//                 )}
//               </Button>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-between">
//                 {error}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setError(null)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PDFProcessor;





// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Loader2, FileText, CheckCircle, Trash2, X, Eye } from 'lucide-react';

// const PDFProcessor = () => {
//   const [files, setFiles] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [results, setResults] = useState({});
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [processedCategories, setProcessedCategories] = useState({});

//   const analyzePDF = async (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const typedArray = new Uint8Array(e.target.result);
//         try {
//           const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
//           resolve(pdf.numPages > 1);
//         } catch (error) {
//           console.error('Error analyzing PDF:', error);
//           resolve(false);
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleFileChange = async (e) => {
//     setSuccessMessage('');
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
//     const newFiles = await Promise.all(validFiles.map(async file => {
//       const isMultiPagePDF = await analyzePDF(file);
//       return {
//         file,
//         isMultiPage: isMultiPagePDF,
//         startingPages: '',
//         id: Math.random().toString(36).substr(2, 9)
//       };
//     }));

//     setFiles(prev => [...prev, ...newFiles]);
    
//     if (validFiles.length !== selectedFiles.length) {
//       setError('Some files were skipped. Only PDF files are allowed.');
//     }
//   };

//   const viewPDF = (file) => {
//     const url = URL.createObjectURL(file);
//     window.open(url, '_blank');
//   };

//   const removeFile = (id) => {
//     setFiles(files.filter(f => f.id !== id));
//     setResults(prev => {
//       const newResults = { ...prev };
//       delete newResults[id];
//       return newResults;
//     });
//     setProcessedCategories(prev => {
//       const newCategories = { ...prev };
//       delete newCategories[id];
//       return newCategories;
//     });
//   };

//   const updateFileSettings = (id, settings) => {
//     setFiles(files.map(f => 
//       f.id === id ? { ...f, ...settings } : f
//     ));
//   };

//   const resetForm = () => {
//     const failedFiles = files.filter(file => 
//       results[file.id]?.status === 'error'
//     ).map(file => file.file.name);

//     if (failedFiles.length > 0) {
//       setError(`Following files did not process: ${failedFiles.join(', ')}`);
//     } else {
//       setError(null);
//     }

//     // Clear all uploaded files
//     setFiles([]);
//     // Clear the file input
//     const fileInput = document.getElementById('pdf-upload');
//     if (fileInput) fileInput.value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError(null);

//     const processPromises = files.map(async ({ file, isMultiPage, startingPages, id }) => {
//       const formData = new FormData();
//       formData.append('pdfs', file);
//       if (isMultiPage) {
//         formData.append('multi_page_invoice', 'true');
//         if (startingPages) {
//           formData.append('starting_pages', startingPages);
//         }
//       } else {
//         formData.append('multi_page_invoice', 'false');
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/pdfs/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error(`Error processing ${file.name}`);
//         }

//         const data = await response.json();
        
//         // Extract unique categories from the response
//         const categories = [...new Set(data[0].externalResponse.result.map(item => item.category))];
//         setProcessedCategories(prev => ({
//           ...prev,
//           [id]: categories
//         }));

//         setSuccessMessage(prev => {
//           const newMessage = `${file.name} processed successfully (Categories: ${categories.join(', ')})`;
//           return prev ? `${prev}\n${newMessage}` : newMessage;
//         });
        
//         setResults(prev => ({
//           ...prev,
//           [id]: { 
//             status: 'completed', 
//             data: data[0].externalResponse,
//             savedPDF: data[0]
//           }
//         }));
//       } catch (err) {
//         setResults(prev => ({
//           ...prev,
//           [id]: { status: 'error', error: err.message }
//         }));
//       }
//     });

//     await Promise.all(processPromises);
//     setProcessing(false);
//     resetForm();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-6 w-6" />
//             Multiple PDF OCR Processor
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="pdf-upload">Upload PDFs</Label>
//               <Input
//                 id="pdf-upload"
//                 type="file"
//                 accept=".pdf"
//                 multiple
//                 onChange={handleFileChange}
//                 className="mt-1"
//               />
//             </div>

//             <div className="space-y-3">
//               {files.map(({ file, isMultiPage, startingPages, id }) => (
//                 <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <div className="font-medium">{file.name}</div>
//                     {processedCategories[id] && (
//                       <div className="text-sm text-gray-600 mt-1">
//                         Categories: {processedCategories[id].join(', ')}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         id={`multi-page-${id}`}
//                         checked={isMultiPage}
//                         onCheckedChange={(checked) => 
//                           updateFileSettings(id, { isMultiPage: checked })
//                         }
//                       />
//                       <Label htmlFor={`multi-page-${id}`}>Multi-page</Label>
//                     </div>
                    
//                     {isMultiPage && (
//                       <div className="flex items-center gap-2">
//                         <Input 
//                           type="text"
//                           placeholder="1,3,4"
//                           value={startingPages}
//                           onChange={(e) => 
//                             updateFileSettings(id, { startingPages: e.target.value })
//                           }
//                           className="w-32"
//                         />
//                       </div>
//                     )}
                    
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => viewPDF(file)}
//                       className="text-blue-600"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFile(id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {files.length > 0 && (
//               <Button 
//                 type="submit" 
//                 disabled={processing}
//                 className="w-full"
//               >
//                 {processing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing PDFs...
//                   </>
//                 ) : (
//                   `Process ${files.length} PDF${files.length !== 1 ? 's' : ''}`
//                 )}
//               </Button>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-between">
//                 {error}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setError(null)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}

//             {successMessage && (
//               <div className="mt-4 space-y-2">
//                 <div className="font-medium text-gray-700">Processing Results:</div>
//                 <div className="bg-green-50 p-4 rounded-md">
//                   {successMessage.split('\n').map((message, index) => (
//                     <div key={index} className="flex items-center gap-2 text-green-600 mb-2">
//                       <CheckCircle className="h-4 w-4 flex-shrink-0" />
//                       <p>{message}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PDFProcessor;



import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, FileText, CheckCircle, Trash2, X, Eye } from 'lucide-react';

const PDFProcessor = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [processedCategories, setProcessedCategories] = useState({});

  const analyzePDF = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
          resolve(pdf.numPages > 1);
        } catch (error) {
          console.error('Error analyzing PDF:', error);
          resolve(false);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e) => {
    setSuccessMessage('');
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    const newFiles = await Promise.all(validFiles.map(async file => {
      const isMultiPagePDF = await analyzePDF(file);
      return {
        file,
        isMultiPage: isMultiPagePDF,
        startingPages: '',
        id: Math.random().toString(36).substr(2, 9)
      };
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were skipped. Only PDF files are allowed.');
    }
  };

  const viewPDF = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
    setResults(prev => {
      const newResults = { ...prev };
      delete newResults[id];
      return newResults;
    });
    setProcessedCategories(prev => {
      const newCategories = { ...prev };
      delete newCategories[id];
      return newCategories;
    });
  };

  const updateFileSettings = (id, settings) => {
    setFiles(files.map(f => 
      f.id === id ? { ...f, ...settings } : f
    ));
  };

  const resetForm = () => {
    const failedFiles = files.filter(file => 
      results[file.id]?.status === 'error'
    ).map(file => file.file.name);

    if (failedFiles.length > 0) {
      setError(`Following files did not process: ${failedFiles.join(', ')}`);
    } else {
      setError(null);
    }

    // Clear all uploaded files
    setFiles([]);
    // Clear the file input
    const fileInput = document.getElementById('pdf-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    const processPromises = files.map(async ({ file, isMultiPage, startingPages, id }) => {
      const formData = new FormData();
      formData.append('pdfs', file);
      if (isMultiPage) {
        formData.append('multi_page_invoice', 'true');
        if (startingPages) {
          formData.append('starting_pages', startingPages);
        }
      } else {
        formData.append('multi_page_invoice', 'false');
      }

      try {
        const response = await fetch('http://localhost:8000/api/pdfs/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error processing ${file.name}`);
        }

        const data = await response.json();
        
        // Extract unique categories from the response
        const categories = [...new Set(data[0].externalResponse.result.map(item => item.category))];
        setProcessedCategories(prev => ({
          ...prev,
          [id]: categories
        }));

        setSuccessMessage(prev => {
          const newMessage = `${file.name} processed successfully (Categories: ${categories.join(', ')})`;
          return prev ? `${prev}\n${newMessage}` : newMessage;
        });
        
        setResults(prev => ({
          ...prev,
          [id]: { 
            status: 'completed', 
            data: data[0].externalResponse,
            savedPDF: data[0]
          }
        }));
      } catch (err) {
        setResults(prev => ({
          ...prev,
          [id]: { status: 'error', error: err.message }
        }));
      }
    });

    await Promise.all(processPromises);
    setProcessing(false);
    resetForm();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Multiple PDF OCR Processor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="pdf-upload">Upload PDFs</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>

            <div className="space-y-3">
              {files.map(({ file, isMultiPage, startingPages, id }) => (
                <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{file.name}</div>
                    {processedCategories[id] && (
                      <div className="text-sm text-gray-600 mt-1">
                        Categories: {processedCategories[id].join(', ')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`multi-page-${id}`}
                        checked={isMultiPage}
                        onCheckedChange={(checked) => 
                          updateFileSettings(id, { isMultiPage: checked })
                        }
                      />
                      <Label htmlFor={`multi-page-${id}`}>Multi-page</Label>
                    </div>
                    
                    {isMultiPage && (
                      <div className="flex items-center gap-2">
                        <Input 
                          type="text"
                          placeholder="1,3,4"
                          value={startingPages}
                          onChange={(e) => 
                            updateFileSettings(id, { startingPages: e.target.value })
                          }
                          className="w-32"
                        />
                      </div>
                    )}
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => viewPDF(file)}
                      className="text-blue-600"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {files.length > 0 && (
              <Button 
                type="submit" 
                disabled={processing}
                className="w-full"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing PDFs...
                  </>
                ) : (
                  `Process ${files.length} PDF${files.length !== 1 ? 's' : ''}`
                )}
              </Button>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-between">
                {error}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 space-y-2">
                <div className="font-medium text-gray-700">Processing Results:</div>
                <div className="bg-green-50 p-4 rounded-md">
                  {successMessage.split('\n').map((message, index) => (
                    <div key={index} className="flex items-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      <p>{message}</p>
                    </div>
                  ))}
                </div>
                {!processing && files.length === 0 && (
                  <div className="bg-green-100 p-4 rounded-md text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                      <CheckCircle className="h-5 w-5" />
                      <p>All PDFs processed successfully!</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFProcessor;