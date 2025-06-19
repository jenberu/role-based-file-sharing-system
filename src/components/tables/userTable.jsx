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
import MaterialButton from "@mui/material/Button";
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
            "Role",
            "Email",
            "Department",
            "Created At",
            "Last Login",
          ],
        ];

        exportToPDF(pdfdata, head, "Departments");
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
  const resize = { minWidth: 60, resizerHighlight: "#dde2eb" };

  return (
    <>
      <div className="action-search-container">
        <div className="search-container">
          <label htmlFor="search">
            Search :&nbsp;
            <input
              id="search"
              type="text"
              placeholder=" Search by Name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </label>
        </div>
        <div className="action-container">
          <label htmlFor="action-select"> Actions: </label>
          <select
            id="action-select"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="" disabled selected>
              Select Action
            </option>
            <option value="export_csv">Export to CSV</option>
            <option value="export_pdf">Export to PDF</option>
            <option value="delete">Delete Selected</option>
          </select>
          <button className="action-button" onClick={handleAction}>
            Go
          </button>
          <span>
            {`${selectedItems.length} of ${data.nodes.length} Selected`}{" "}
          </span>
        </div>
      </div>
      <div style={{ overflow: "visible" }}>
        <Table
          data={filteredData}
          theme={theme}
          sort={sort}
          layout={layout}
          select={select}
          pagination={pagination}
        >
          {/* function as child of table component */}
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSelect />

                  {columns.map((column, index) => (
                    <HeaderCell resize={resize} key={index}>
                      <MaterialButton
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon(column.label)}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: column.label,
                          })
                        }
                      >
                        {column.label}
                      </MaterialButton>
                    </HeaderCell>
                  ))}
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <CellSelect item={item} />

                    {columns.map((column, colIndex) => (
                      <Cell key={colIndex}>{column.renderCell(item)}</Cell>
                    ))}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <span>
            Total Pages: {pagination.state.getTotalPages(filteredData.nodes)}
          </span>

          <span>
            Page:{" "}
            {Array(pagination.state.getTotalPages(filteredData.nodes))
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    fontWeight:
                      pagination.state.page === index ? "bold" : "normal",
                    margin: "0 4px",
                    padding: "4px 8px",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor:
                      pagination.state.page === index ? "lightblue" : "#fff",
                  }}
                  onClick={() => pagination.fns.onSetPage(index)}
                >
                  {index + 1}
                </button>
              ))}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserTable;
