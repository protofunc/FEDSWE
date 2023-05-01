import React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { visuallyHidden } from "@mui/utils";
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import SelectRegion from "./SelectRegion";

function createData(jid, jOrg, jTitle, jDate, jMinPay, jMaxPay, jLink) {
  return {
    jid,
    jOrg,
    jTitle,
    jDate,
    jMinPay,
    jMaxPay,
    jLink,
  };
}

// Format date
function formatDate(dString) {
  const date = new Date(dString);
  const newDate = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", newDate);
}

// MUI sorting functionality
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// MUI sorting functionality
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// MUI sorting functionality
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Column headers
const headCells = [
  {
    id: "jOrg",
    numeric: false,
    disablePadding: true,
    label: "Organization",
  },
  {
    id: "jTitle",
    numeric: false,
    disablePadding: false,
    label: "Job Title",
  },
  {
    id: "jDate",
    numeric: false,
    disablePadding: false,
    label: "Application Deadline",
  },
  {
    id: "jMaxPay",
    numeric: false,
    disablePadding: false,
    label: "Salary Range",
  }
];

// Default order variables
const DEFAULT_ORDER = "desc";
const DEFAULT_ORDER_BY = "jMaxPay";
const DEFAULT_ROWS_PER_PAGE = 5;

// MUI order functionality
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
            // Select all functionality hidden right now until fully built in
            sx={{ display: 'none' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// MUI order functionality
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// Datatable toolbar display and functionality
function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  const handleOpenInNewTab = () => {
    Object.keys(jData).forEach(key => {
      window.open(jData[key], '_blank');
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ 
            flex: "1 1 100%",
            fontWeight: "bold",
            textAlign: "center",
            color: "#113E6A",
            fontSize: "24px",
            marginTop: ".8em"
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Federal Software Engineering Jobs
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Save to Favorites">
            <IconButton>
              <StarBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open listing in New Tab">
            <IconButton onClick={handleOpenInNewTab}>
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

// Props and variables for table functionality (refactor later to make my lets props)
EnhancedTableToolbar.propTypes = {numSelected: PropTypes.number.isRequired};
let rows = [];
let jData = {}


// DataTable and API functionality
export default function EnhancedTable() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  // USA Jobs API creds
  const host = process.env.REACT_APP_HOST;
  const userAgent = process.env.REACT_APP_USER_AGENT;
  const authKey = process.env.REACT_APP_AUTH_KEY;

  // Get job information from API
  const getData = async (regionStr) => {
    try {
      // Define header using credentials
      const headers = {
        Host: host,
        "User-Agent": userAgent,
        "Authorization-Key": authKey,
      };
      // Pass header to access API
      const response = await fetch(
        `https://data.usajobs.gov/api/search?ResultsPerPage=75&JobCategoryCode=2210&Keyword=Software&LocationName=${regionStr}`,
        {
          headers: headers,
        }
      );
      // Store and return response
      const data = await response.json();
      console.log(data.SearchResult)
      return data.SearchResult;
      
    } catch (error) {
      // Error handling
      return error;
    }
  };

  // Store data
  const setData = async (regionStr) => {
    // Reset array and dictionary values whenever setData
    rows = [];

    if (regionStr !== '') {
      // Retrieve object from getData() and set loading status of button
      setIsLoading(true)
      let jInfo = await getData(regionStr);
      // Add job information to rows array
      for (let i = 0; i < jInfo.SearchResultCount; i++) {
        rows.push(
          createData(
            jInfo.SearchResultItems[i].MatchedObjectId,
            jInfo.SearchResultItems[i].MatchedObjectDescriptor.OrganizationName,
            jInfo.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle,
            jInfo.SearchResultItems[i].MatchedObjectDescriptor.PositionEndDate,
            parseInt(jInfo.SearchResultItems[i].MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange),
            parseInt(jInfo.SearchResultItems[i].MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange),
            jInfo.SearchResultItems[i].MatchedObjectDescriptor.ApplyURI[0]
          )
        );
      }
    }
    setIsLoading(false)
  };

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.jid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSearchClick = (event) => {
    // Reset selection values if new search initiated
    jData = {};
    setPage(0);

    const sortedRows = stableSort(rows, getComparator(order, orderBy));
    const updatedRows = sortedRows.slice(
      0 * rowsPerPage,
      0 * rowsPerPage + rowsPerPage
    );
    setVisibleRows(updatedRows);    
  };

  const handleRowSelect = (event, row) => {
    const { jid, jLink } = row;
    const isSelected = event.target.checked;
    if (isSelected) {
      jData[jid] = jLink;
    } else {
      delete jData[jid];
    }
    console.log("handlerowselect:")
    console.log(jData)
    console.log(jData[jid])
  };

  return (
    <div>
      <Box sx={{ m: 3, display: "flex", alignItems: "center", justifyContent: "center" }}> 
        <Stack direction="row" spacing={2}>
          <SelectRegion onSelectArea={setData} />
          <LoadingButton variant="contained" onClick={handleSearchClick} loading={isLoading}>
            <span>Search</span>
          </LoadingButton>
        </Stack>
      </Box>
      <Box className="container" sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.jid);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.jid}
                          selected={isItemSelected}
                          // sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onChange={(event) => handleRowSelect(event, row)}
                              onClick={(event) => handleClick(event, row.jid)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.jOrg}
                          </TableCell>
                          <TableCell align="left">{row.jTitle}</TableCell>
                          <TableCell align="left">{formatDate(row.jDate)}</TableCell>
                          <TableCell align="left">{`$${row.jMinPay.toLocaleString()} - $${row.jMaxPay.toLocaleString()}`}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  );
}
