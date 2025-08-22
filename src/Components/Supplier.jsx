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
export const Supplier = () => {
  const [open, setOpen] = useState(false);
  const [SuppliersName, setSuppliersName] = useState("");
  const [ContactInfo, setContactInfo] = useState("");
  const [Address, setAddress] = useState("");
  const [GstNumber, setGstNumber] = useState("");
  const [getAllSuppliers, setGetAllSuppliers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const paginationModel = { page: 0, pageSize: 5 };
  async function getSupplier(data) {
    try {
      const response = await axiosInstance.post("/suppliers/", data);
      setGetAllSuppliers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await axiosInstance.get("/suppliers");
        setGetAllSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSuppliers();
  }, []);

  const data = {
    name: "",
    contact_info: "",
    address: "",
    gst_number: "",
  };
  const handleSubmit = (SuppliersName, ContactInfo, Address, GstNumber) => {
    data.name = SuppliersName;
    data.contact_info = ContactInfo;
    data.address = Address;
    data.gst_number = GstNumber;
    setOpen(false);
    getSupplier(data);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredRows = getAllSuppliers.filter((row) =>
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
    { field: "name", headerName: "Supplier Name", flex: 1 },
    { field: "contact_info", headerName: "Contact", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "gst_number", headerName: "GST Number", flex: 1 },
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
            Add Supplier
          </Button>
          {open ? (
            <Dialog open={open} sx={{width:'35%',marginX:'auto',marginY:0}}>
              <Box className="flex justify-between">
                <CardHeader title="Supplier Details" />

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
                    handleSubmit(SuppliersName, ContactInfo,Address,GstNumber);
                  }}
                >
                  <TextField
                    label="Supplier Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    onChange={(e) => setSuppliersName(e.target.value)}
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
                  <TextField
                    label="GST Number"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    onChange={(e) => setGstNumber(e.target.value)}
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
