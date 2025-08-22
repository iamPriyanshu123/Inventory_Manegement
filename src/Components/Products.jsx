import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { PackageOpen } from "lucide-react";
import {
  Box,
  Dialog,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { X } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../api/axiosInstance";
import { Category } from "./Category";
export const Products = () => {
  const [open, setOpen] = useState(false);
  const [getAllProducts, setgetAllProducts] = useState([]);
  const [getAllCategory, setGetAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [ProductName, setProductName] = useState("");
  const [Description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [Price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [recorderLevel, setRecorderLevel] = useState("");
  const [totalQuantityInStock, setTotalQuantityInStock] = useState("");

  async function getUser(data) {
    try {
      const response = await axiosInstance.post("/products/", data);
      setgetAllProducts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setgetAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategory();
  }, []);

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

  useEffect(() => {
    if (getAllCategory.length > 0) {
      setSelectedCategory(getAllCategory[0].name);
    }
  }, [getAllCategory]);

  const data = {
    name: "",
    sku: "",
    description: "",
    category: "",
    category_name: "",
    price: "",
    cost_price: "",
    reorder_level: "",
    quantity_in_stock: "",
  };
  const handleSubmit = (
    ProductName,
    sku,
    Description,
    Category,
    CategoryName,
    Price,
    costPrice,
    recorderLevel,
    totalQuantityInStock
  ) => {
    data.name = ProductName;
    data.sku = sku;
    data.description = Description;
    (data.category = selectedCategory), (data.category_name = CategoryName);
    data.price = Price;
    data.cost_price = costPrice;
    data.reorder_level = recorderLevel;
    data.quantity_in_stock = totalQuantityInStock;
    setOpen(false);
    getUser(data);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredRows = getAllProducts.filter((row) =>
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

    { field: "name", headerName: "Product Name", flex: 1,minWidth: 120 },
    { field: "sku", headerName: "Stock Keeping Unit", flex: 1 ,minWidth: 120},
    { field: "description", headerName: "Description", flex: 1,minWidth: 120 },
    { field: "category_name", headerName: "Category Name", flex: 1 ,minWidth: 120},
    { field: "price", headerName: "Price", flex: 1 ,minWidth: 120},
    { field: "cost_price", headerName: "Cost Price", flex: 1,minWidth: 120 },
    { field: "reorder_level", headerName: "Re-order Level", flex: 1,minWidth: 120 },
    { field: "quantity_in_stock", headerName: "Total Stock", flex: 1,minWidth: 120 },
  ];

  const textFieldStyles = {
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#696cff",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#5a5ee0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#696cff",
      },
    },
  };

  return (
    <>
      <main className="min-h-[100dvh] p-4 md:p-8 ">
        <div className=" flex justify-end ">
          <Button
            sx={{ backgroundColor: "#696cff", marginRight: 0 }}
            variant="contained"
            startIcon={<PackageOpen />}
            onClick={() => setOpen(true)}
          >
            Add Products
          </Button>
          {open ? (
            <Dialog open={open} fullWidth>
              <Box className="flex justify-between">
                <CardHeader title="Add Product" className="ml-15" />

                <X
                  className="text-black/50 cursor-pointer mx-4 my-4 hover:bg-black/20 rounded-full"
                  onClick={() => setOpen(false)}
                  size={25}
                />
              </Box>
              <CardContent className="flex justify-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(
                      ProductName,
                      sku,
                      Description,
                      Category,
                      CategoryName,
                      Price,
                      costPrice,
                      recorderLevel,
                      totalQuantityInStock
                    );
                  }}
                >
                  <Box
                    sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setProductName(e.target.value)}
                        sx={textFieldStyles}
                      />
                      <TextField
                        id="sku"
                        label="Stock Keeping Unit"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setSku(e.target.value)}
                        sx={textFieldStyles}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined"
                        label="Description"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setDescription(e.target.value)}
                        sx={textFieldStyles}
                      />
                      <TextField
                        select
                        label="Category"
                        value={selectedCategory}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          setSelectedCategory(selectedId);
                          const cat = getAllCategory.find(
                            (c) => c.id === selectedId
                          );
                          setCategoryName(cat ? cat.name : "");
                        }}
                        size="small"
                        sx={textFieldStyles}
                      >
                        {getAllCategory.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div>
                      <TextField
                        id="outlined"
                        label="Price"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setPrice(e.target.value)}
                        sx={textFieldStyles}
                      />
                      <TextField
                        id="outlined"
                        label="Cost Price"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setCostPrice(e.target.value)}
                        sx={textFieldStyles}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined"
                        label="Re-Order Level"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setRecorderLevel(e.target.value)}
                        sx={textFieldStyles}
                      />
                      <TextField
                        id="outlined"
                        label="Total Stock"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                          setTotalQuantityInStock(e.target.value)
                        }
                        sx={textFieldStyles}
                      />
                    </div>
                  </Box>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ marginTop: "10px", marginLeft: "10px" }}
                  >
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
            className="shadow-lg"
            sx={{
              border: 0,
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto",
              },
            }}
          />
        </Paper>
      </main>
    </>
  );
};
