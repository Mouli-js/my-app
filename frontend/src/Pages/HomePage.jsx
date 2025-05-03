import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useProductStore } from '../store/product';
import { ProductCard } from '../Components/ProductCard.jsx';

export default function SimpleContainer() {
  const { products, fetchProducts } = useProductStore();

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <React.Fragment>
      <CssBaseline />

      <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
        <Typography variant="h5">Current Products</Typography>
      </Stack>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {products.length === 0 && (
        <Container maxWidth="sm">
          <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
            <Typography variant="body1">
              No Products Found, please{' '}
              <Link href="/create" underline="hover">
                Create A Product
              </Link>
            </Typography>
          </Stack>
        </Container>
      )}
    </React.Fragment>
  );
}
