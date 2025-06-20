import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";
import {
  HeaderCellSelect,
  CellSelect,
  SelectTypes,
  useRowSelect,
} from "@table-library/react-table-library/select";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useDeleteDocumentsMutation } from "../../api/fileApi";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { TABLETHEME } from "../../utils/TableThem";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../modals/deleteConfirmationModal";
const FileTable = ({ data, columns }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [deleteDocuments, { isLoading: isDeleting }] =
    useDeleteDocumentsMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState("");
  const select = useRowSelect(
    data,
    {
      onChange: (action, state) => console.log(action, state),
    },
    {
      rowSelect: SelectTypes.MultiSelect,
      buttonSelect: SelectTypes.MultiSelect,
      isCarryForward: false,
    }
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = {
    nodes: data.nodes.filter(
      (item) =>
        item.department?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };
  const pagination = usePagination(filteredData, {
    state: {
      page: 0, // Initial page
      size: 10, // Number of rows per page
    },
  });
  const selectedItems = select.state.ids.map((id) =>
    filteredData.nodes.find((item) => item.id === id)
  );

  const handleAction = () => {
    if (selectedItems.length === 0) {
      toast.warning("No items selected.");
      return;
    } else if (action) {
      if (action === "download") {
        selectedItems.forEach((item) => {
          if (item.file_url && item.name) {
            handleDownload(item.file_url, item.name);
          } else {
            toast.error(`Missing file info for: ${item.name || "Unknown"}`);
          }
        });
      } else if (action === "delete") {
        setIsDeleteDialogOpen(true);
      }
    } else {
      toast.warning("Please select an action.");
      return;
    }
    setAction("");
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName); // optional
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDeleteConfirmation = async () => {
    try {
      const ids = selectedItems.map((item) => item.id);
      await deleteDocuments(ids).unwrap();
      toast.success("Selected documents deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete documents");
    }
  };

  const getIcon = (sortKey) => {
    if (sort.state.sortKey === sortKey && sort.state.reverse) {
      return <KeyboardArrowDownOutlinedIcon />;
    }

    if (sort.state.sortKey === sortKey && !sort.state.reverse) {
      return <KeyboardArrowUpOutlinedIcon />;
    }

    return <UnfoldMoreOutlinedIcon />;
  };

  const layout = {
    custom: true, // Enable custom layout
    horizontalScroll: true, // Enable horizontal scrolling
    fixedHeader: true, // Fix the header row
  };

  const theme = useTheme(TABLETHEME);
  const sort = useSort(
    data,
    {
      state: {
        sortKey: "name", // Default sort key
        reverse: false, // Default sort order
      },
      onChange: (action, state) => {
        console.log("Sorting Action:", action);
        console.log("Sorting State:", state);
      },
    },
    {
      sortIcon: {
        margin: "0px",
        iconDefault: <UnfoldMoreOutlinedIcon />,
        iconUp: <KeyboardArrowUpOutlinedIcon />,
        iconDown: <KeyboardArrowDownOutlinedIcon />,
      },
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)), // Sort by name
        CATEGORY: (array) =>
          array.sort((a, b) => a.category.localeCompare(b.category)), // Sort by category
        UPLOADEDAT: (array) =>
          array.sort((a, b) => a.uploaded_at.localeCompare(b.uploaded_at)), // Sort by uploaded_at
      },
    }
  );
  const resize = { minWidth: 100, resizerHighlight: "#dde2eb" };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center w-[50%]  gap-2">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              Search:
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300  w-[100%] rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="action-select"
              className="text-sm font-medium text-gray-700"
            >
              Actions:
            </label>
            <select
              id="action-select"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="" disabled>
                Select Action
              </option>
              <option value="download">Download Selected</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              onClick={handleAction}
              className="bg-blue-600 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Go
            </button>
            <span className="text-sm text-gray-600">
              {`${selectedItems.length} of ${data.nodes.length} Selected`}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <Table
            data={filteredData}
            theme={theme}
            sort={sort}
            layout={layout}
            select={select}
            pagination={pagination}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow className="bg-gray-100">
                    <HeaderCellSelect />

                    {columns.map((column, index) => (
                      <HeaderCell resize={resize} key={index}>
                        <button
                          className="w-full flex justify-start items-center gap-1 font-medium text-sm text-left"
                          onClick={() =>
                            sort.fns.onToggleSort({ sortKey: column.label })
                          }
                        >
                          {column.label}
                          {getIcon(column.label)}
                        </button>
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item) => (
                    <Row key={item.id} item={item} className="hover:bg-gray-50">
                      <CellSelect item={item} />
                      {columns.map((column, colIndex) => (
                        <Cell
                          key={colIndex}
                          style={{
                            padding: "8px 16px", // Adjust cell padding
                            verticalAlign: "middle", // Center content vertically
                            borderBottom: "1px solid #e0e0e0", // Add subtle border
                          }}
                        >
                          <Tooltip
                            title={column.renderCell(item)}
                            placement="top"
                            arrow
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: "#333", // Dark background
                                  color: "#fff", // White text
                                  fontSize: "0.875rem", // 14px
                                  maxWidth: 400, // Maximum tooltip width
                                  boxShadow: "0px 2px 10px rgba(0,0,0,0.2)", // Subtle shadow
                                  "& .MuiTooltip-arrow": {
                                    color: "#333", // Match tooltip background
                                  },
                                },
                              },
                            }}
                          >
                            <Typography
                              noWrap
                              sx={{
                                maxWidth: column.maxWidth || 200, // Column-specific widths
                                fontSize: "0.875rem", // 14px
                                color: "text.primary", // Use theme text color
                                lineHeight: 1.5, // Better line spacing
                                transition: "all 0.2s ease", // Smooth hover effects
                                "&:hover": {
                                  color: "primary.main", // Change color on hover
                                },
                              }}
                            >
                              {column.renderCell(item)}
                            </Typography>
                          </Tooltip>
                        </Cell>
                      ))}
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span>
              Total Pages: {pagination.state.getTotalPages(filteredData.nodes)}
            </span>

            <div className="flex items-center gap-1">
              Page:
              {Array(pagination.state.getTotalPages(filteredData.nodes))
                .fill()
                .map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`px-2 py-1 border rounded ${
                      pagination.state.page === index
                        ? "font-bold bg-blue-100 border-blue-400"
                        : "bg-white border-gray-300"
                    }`}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
       {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirmation}
        isLoading={isDeleting}
        title="Document"
      />
    </>
  );
};

export default FileTable;
