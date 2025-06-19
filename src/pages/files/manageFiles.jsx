import { useState, useEffect } from "react";
import { formatDate } from "../../utils/format";
import { useNavigate } from "react-router-dom";
import { useGetDocumentsQuery } from "../../api/fileApi";
import { CircularProgress } from "@mui/material";
import FileTable from "../../components/tables/fileTable";
import FileFilter from "../../components/filters/fileFilter";
import UploadFileModal from "../../components/modals/uploadFileModal";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DocumentViewer from "../../components/files/DocumentViewer";

const ManageFile = () => {
  const [showUploadFile, setShowUploadFile] = useState(false);
  const navigate = useNavigate();
  const { data: files, isLoading, error } = useGetDocumentsQuery();
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [currentViewingFile, setCurrentViewingFile] = useState(null); // Track which file is being viewed

  useEffect(() => {
    if (files && files.length) {
      setFilteredFiles(files);
    }
  }, [files]);

  const handleFilter = (filters) => {
    let filtered = [...files]; // Create a copy of the original array
    // Filter by category
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(
        (u) => u.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by uploaded date
    if (filters.uploadedDate && filters.uploadedDate !== "Any date") {
      const today = new Date();
      let targetDate = new Date();
      switch (filters.uploadedDate) {
        case "Today":
          targetDate.setDate(today.getDate() - 1);
          break;
        case "Past 7 days":
          targetDate.setDate(today.getDate() - 7);
          break;
        case "This month":
          targetDate.setMonth(today.getMonth() - 1);
          break;
        case "This year":
          targetDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          targetDate = null;
          break;
      }

      if (targetDate) {
        filtered = filtered.filter(
          (file) => new Date(file.uploaded_at) >= targetDate
        );
      }
    }

    setFilteredFiles(filtered);
  };

  const handleFileClick = (id) => {
    navigate(`/files/${id}/edit`);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    setShowUploadFile(true);
  };

  const handleViewFile = (fileUrl) => {
    setCurrentViewingFile(fileUrl);
  };

  const handleCloseViewer = () => {
    setCurrentViewingFile(null);
  };

  const columns = [
    {
      label: "File Name",
      renderCell: (item) => (
        <span
          onClick={() => handleFileClick(item.id)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {item.name}
        </span>
      ),
    },
    { label: "Category", renderCell: (item) => item.category },
    { label: "Uploaded_by", renderCell: (item) => item.uploaded_by.username },
    {
      label: "Department",
      renderCell: (item) => item.department.name || "N/A",
    },
    {
      label: "Description",
      renderCell: (item) => item.description,
    },
    {
      label: "UploadedAt",
      renderCell: (item) => formatDate(item.uploaded_at),
    },
    {
      label: "UpdatedAt",
      renderCell: (item) => formatDate(item.updated_at),
    },
    {
      label: "File",
      renderCell: (item) => {
        return (
          <div className="flex items-center">
            {item.file_url ? (
              <button
                onClick={() => handleViewFile(item.file_url)}
                className="text-blue-600 hover:underline flex items-center"
              >
                <InsertDriveFileIcon className="w-4 h-4 mr-2" />
                View File
              </button>
            ) : (
              <span className="text-gray-400">No file</span>
            )}
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-red-500 p-4">
        Error fetching Files: {error.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4 text-lg font-semibold">
        <h1>File Management</h1>
        <button
          onClick={handleUploadFile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center cursor-pointer"
        >
          Upload File <span className="text-xl ml-2">+</span>
        </button>
      </div>

      {/* Layout Container */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-4/5">
          {!error && filteredFiles.length > 0 && !isLoading ? (
            <FileTable data={{ nodes: filteredFiles }} columns={columns} />
          ) : (
            <div className="p-4 text-gray-500">No Files found</div>
          )}
        </div>

        {/* Filter */}
        <div className="w-full lg:w-1/5">
          <FileFilter onFilter={handleFilter} />
        </div>
      </div>

      {showUploadFile && (
        <UploadFileModal onClose={() => setShowUploadFile(false)} />
      )}

      {currentViewingFile && (
        <DocumentViewer
          fileUrl={currentViewingFile}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};

export default ManageFile;