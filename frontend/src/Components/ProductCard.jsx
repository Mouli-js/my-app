
import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProductStore } from '../store/product';

export const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    const { success, message } = await updateProduct(product._id, form);
    setSnackbar({
      open: true,
      message: success ? 'Product updated!' : `Update failed: ${message}`,
      severity: success ? 'success' : 'error'
    });
    if (success) handleEditClose();
  };

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setSnackbar({
      open: true,
      message: success ? 'Deleted successfully' : `Delete failed: ${message}`,
      severity: success ? 'success' : 'error'
    });
  };

  const handleCloseSnackbar = () =>
    setSnackbar(s => ({ ...s, open: false }));

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h8">{product.name}</Typography>
        <Typography variant="body1">${product.price}</Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditOpen}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
