import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data 
const mockUser = {
  id: 1,
  name: 'Mock User',
  email: 'mock@example.com',
  isAdmin: false, // Change to 'true' to mock an admin user
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  // Simulate API call delay (remove in real implementation)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser); 
    }, 500); 
  });
});

// --- Real Signup Functionality (Keep for when you need it) ---
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('/your-api-endpoint/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      return data; // Assuming your backend sends user data on successful signup
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Real Logout Functionality (Keep for when you need it) ---
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await fetch('/your-api-endpoint/logout', {
      method: 'POST', // Or appropriate method for your backend
      headers: {
        // Include any necessary headers (like authorization)
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    // Optionally return data (e.g., success message) if your backend sends any
  } catch (error) {
    // Handle logout errors, perhaps log them
    console.error('Error during logout:', error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    // You might not need any reducers if using async thunks for all auth actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error from rejectWithValue
      })
      // ... Add cases for signup and logout (pending, fulfilled, rejected) 
      .addCase(signup.pending, (state) => {
        // ... handle signup pending
      })
      .addCase(signup.fulfilled, (state, action) => {
        // ... handle signup fulfilled
      })
      .addCase(signup.rejected, (state, action) => {
        // ... handle signup rejected
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        // ... other logout state updates (e.g., clear tokens from local storage)
      });
  },
});

export default authSlice.reducer; 