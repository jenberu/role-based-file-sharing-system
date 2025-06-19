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

import { TABLETHEME } from "../../utils/TableThem";
import { toast } from "react-toastify";
import { exportToCSV, exportToPDF } from "../../utils/exportUtils";
import { formatDate } from "../../utils/format";
const UserTable = ({ data, columns }) => {
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
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
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
      if (action === "export_csv") {
        const csvdata = selectedItems.map((item) => ({
          Username: item.username,
          Frist_Name: item.first_name,
          Last_Name: item.last_name,
          Email: item.email,
          Department: item.department.name,
          Role: item.role,
          Created_AT: formatDate(item.date_joined),
          Last_Login: formatDate(item.last_login),
        }));

        exportToCSV(csvdata, "employees");
      } else if (action === "export_pdf") {
        const pdfdata = selectedItems.map((item) => [
          item.username,
          item.first_name,
          item.last_name,
          item.email,
          item.department.name,
          item.role,
          formatDate(item.date_joined),
          formatDate(item.last_login),
        ]);
        const head = [
          [
            "Username",
            "FirstName",
            "LastName",
            "Email",
            "Role",
            "Department",
            "Created At",
            "Last Login",
          ],
        ];

        exportToPDF(pdfdata, head, "Users");
      } else if (action === "delete") {
        deleteSelectedItems();
      }
    } else {
      toast.warning("Please select an action.");
      return;
    }

    setAction("");
  };

  const deleteSelectedItems = () => {
    alert(
      "Deleting selected items: " +
        selectedItems.map((item) => item.username).join(", ")
    );
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
        sortKey: "username", // Default sort key
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
        USERNAME: (array) =>
          array.sort((a, b) => a.username.localeCompare(b.username)), // Sort by username
        FIRSTNAME: (array) =>
          array.sort((a, b) => a.first_name.localeCompare(b.first_name)), // Sort by name
        LASTNAME: (array) =>
          array.sort((a, b) => a.last_name.localeCompare(b.last_name)), // Sort by last name
      },
    }
  );
  const resize = { minWidth: 40, resizerHighlight: "#dde2eb" };

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
              <option value="export_csv">Export to CSV</option>
              <option value="export_pdf">Export to PDF</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              onClick={handleAction}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Go
            </button>
            <span className="text-sm text-gray-600">
              {`${selectedItems.length} of ${data.nodes.length} Selected`}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible mt-4">
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
                        <Cell key={colIndex} className="text-sm">
                          {column.renderCell(item)}
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
    </>
  );
};

export default UserTable;
