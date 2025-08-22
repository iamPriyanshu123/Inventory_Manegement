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
import { X } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
export const Category = () => {
  const [open, setOpen] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [Description, setDescription] = useState("");
  const [getAllCategory, setGetAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const paginationModel = { page: 0, pageSize: 5 };
  async function getUser(data) {
    try {
      const response = await axiosInstance.post("/categories/", data);
      setGetAllCategory((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setGetAllCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategory();
  }, []);

  const data = {
    name: "",
    description: "",
  };
  const handleSubmit = (CategoryName, Description) => {
    data.name = CategoryName;
    data.description = Description;
    setOpen(false);
    getUser(data);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredRows = getAllCategory.filter((row) =>
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
    { field: "name", headerName: "Category Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
  ];

  return (
    <>
      <main className="min-h-[100dvh] p-4 md:p-8 ">
        <div className=" flex justify-end ">
          <Button
            sx={{ backgroundColor: "#696cff", marginRight: 0 }}
            variant="contained"
            startIcon={<CategoryIcon />}
            onClick={() => setOpen(true)}
          >
            Add Category
          </Button>
          {open ? (
            <Dialog open={open} fullWidth>
              <Box className="flex justify-between">
                <CardHeader title="Category" />

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
                    handleSubmit(CategoryName, Description);
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setCategoryName(e.target.value)}
                    sx={{ marginY: "10px" }}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
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
        <Paper sx={{ height: 400, width: "100%", overflow:'auto' }}>
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
