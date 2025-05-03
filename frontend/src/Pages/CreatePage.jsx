import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";
import { useProductStore } from "../store/product";

function CreatePage() {
  const [input1, setInput1] = useState(""); 
  const [input2, setInput2] = useState(""); 
  const [input3, setInput3] = useState(""); 

  const { createProduct } = useProductStore(); 

 
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newProduct = {
      name: input1,
      price: input2,
      image: input3,
    };

    try {
      const { success, message } = await createProduct(newProduct);

      if (success) {
        console.log("Success:", success);
        console.log("Message:", message);
        
        setInput1(""); 
        setInput2("");
        setInput3("");
      
        setOpen(true);
      } 
    } catch (error) {
      console.error("An error occurred while adding the product:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Your Products
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            placeholder="Enter product name"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            placeholder="Enter product price"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            placeholder="Enter product image URL"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>

          <Snackbar
            message="Product has been added successfully"
            autoHideDuration={4000}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default CreatePage;
