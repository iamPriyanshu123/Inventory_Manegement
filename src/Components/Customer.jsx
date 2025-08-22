import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CategoryIcon from "@mui/icons-material/Category";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Dialog,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { X, Truck } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
export const Customer = () => {
  const [open, setOpen] = useState(false);
  const [CustomerName, setCustomerName] = useState("");
  const [ContactInfo, setContactInfo] = useState("");
  const [Address, setAddress] = useState("");
  const [getAllCustomers, setgetAllCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const paginationModel = { page: 0, pageSize: 5 };
  async function getCustomer(data) {
    try {
      const response = await axiosInstance.post("/customers/", data);
      setgetAllCustomers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        setgetAllCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCustomers();
  }, []);

  const data = {
    name: "",
    contact_info: "",
    address: "",
  };
  const handleSubmit = (CustomerName, ContactInfo, Address) => {
    data.name = CustomerName;
    data.contact_info = ContactInfo;
    data.address = Address;
    setOpen(false);
    getCustomer(data);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredRows = getAllCustomers.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  const columns = [
    {
      field: "serial",
      headerName: "S.No.",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const visibleRows = params.api.getAllRowIds();
        const rowIndex = visibleRows.indexOf(params.id);
        return rowIndex + 1;
      },
    },
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "contact_info", headerName: "Contact", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
  ];

  return (
    <>
      <main className="min-h-[100dvh] p-4 md:p-8 ">
        <div className=" flex justify-end ">
          <Button
            sx={{ backgroundColor: "#696cff", marginRight: 0 }}
            variant="contained"
            startIcon={<Truck />}
            onClick={() => setOpen(true)}
          >
            Add Customer
          </Button>
          {open ? (
            <Dialog open={open} sx={{width:'35%',marginX:'auto',marginY:0}}>
              <Box className="flex justify-between">
                <CardHeader title="Customer Details" />

                <X
                  className="text-black/50 cursor-pointer mx-4 my-4 hover:bg-black/20 rounded-full"
                  onClick={() => setOpen(false)}
                  size={25}
                />
              </Box>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(CustomerName, ContactInfo,Address);
                  }}
                >
                  <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setCustomerName(e.target.value)}
                    sx={{ marginY: "10px" }}
                  />
                  <TextField
                    label="Contact Number"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={(e) =>setContactInfo(e.target.value)}
                  />
                     <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ marginY: "10px" }}
                  />
                  <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
                    <Button
                      variant="outlined"
                      sx={{ borderColor: "#696cff", color: "#696cff" }}
                      onClick={() => setOpen(close)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: "#696cff" }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Dialog>
          ) : (
            ""
          )}
        </div>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchValue}
          size="small"
          onChange={(e) => handleSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              " &.Mui-focused fieldset": {
                borderColor: "#696cff",
              },
            },
          }}
        />
        <br />
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            className="shadow-lg"
          />
        </Paper>
      </main>
    </>
  );
};
