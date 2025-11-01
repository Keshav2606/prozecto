import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = await login(formData.email, formData.password);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <Paper
        elevation={24}
        className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full relative z-10 border border-white/20"
        sx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
        }}
      >
        {/* Header Section */}
        <Box className="flex flex-col items-center mb-8">
          <Box className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
            <Box className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <AdminPanelSettingsIcon sx={{ fontSize: 32, color: "white" }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            component="h1"
            className="text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          >
           Prozecto Admin Portal
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-gray-600 font-medium"
          >
            Secure System Access
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            className="mb-6 rounded-xl border-l-4 border-red-500"
            sx={{
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              "& .MuiAlert-icon": { color: "#dc2626" },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <TextField
              name="email"
              type="email"
              label="Admin Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#4b5563",
                  "&.Mui-focused": {
                    color: "#3b82f6",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#1f2937",
                },
              }}
            />
          </div>

          <div>
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#4b5563",
                  "&.Mui-focused": {
                    color: "#3b82f6",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#1f2937",
                },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="rounded-xl py-3 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                transform: "translateY(-1px)",
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
              },
              "&:disabled": {
                background: "#9ca3af",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Box className="flex text-white items-center gap-2">
                <LockOpenIcon sx={{ fontSize: 20 }} />
                <span>Access Dashboard</span>
              </Box>
            )}
          </Button>
        </form>

        <div className="mt-4">
          {/* Security Note */}
          <Typography
            variant="caption"
            className="block text-center text-gray-500 mt-6"
          >
            🔒 Secure admin access • Activity monitored
          </Typography>
        </div>
      </Paper>
    </Box>
  );
};

export default Login;
