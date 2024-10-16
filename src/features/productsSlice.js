import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../services/productService'; 

const initialState = {
  products: [],          // Array to store all products
  loading: false,       // Loading state (true when fetching data)
  error: null,          // Error message if fetching fails
  selectedProduct: null // To store a single product fetched by ID
};

// 1. Fetch All Products (used in Home page, Admin product list, etc.)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getProducts();
      return products; 
    } catch (error) {
      return rejectWithValue(error.response.data); // Pass error data for handling
    }
  }
);

// 2. Fetch a Single Product by ID (used in ProductDetails page)
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await productService.getProductById(productId); 
      return product; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 3. Add a New Product (Admin functionality)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const newProduct = await productService.addProduct(productData);
      return newProduct; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 4. Update an Existing Product (Admin functionality)
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => { // productData includes the ID
    try {
      const { id, ...updatedProduct } = productData; // Extract ID
      const updated = await productService.updateProduct(id, updatedProduct);
      return updated; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 5. Delete a Product (Admin functionality)
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(productId);
      return productId; // Return ID to update state efficiently
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // You likely won't need reducers here if all your actions are async thunks 
  },
  extraReducers: (builder) => {
    builder
      // --- Cases for fetching all products ---
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      // --- Cases for fetching a single product ---
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      // --- Cases for adding a product ---
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the new product to the array
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      // --- Cases for updating a product ---
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated product and replace it in the array
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      // --- Cases for deleting a product ---
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted product from the array
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  }
});

export default productsSlice.reducer; 