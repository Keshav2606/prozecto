require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./lib/db");

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://frontend:5173",
  "http://admin_frontend:5174",
];

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(
      new Error(`CORS policy: origin ${origin} not allowed`),
      false
    );
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const exampleRoutes = require("./routes/exampleRoutes");
const testimonialRoutes = require("./routes/testimonial.route");
const faqRoutes = require("./routes/faq.route");
const blogRoutes = require("./routes/blog.route");
const termsRoutes = require("./routes/termsAndConditions.route");
const quoteRequestRoutes = require("./routes/quoteRequest.route");
const privacyPolicyRoutes = require("./routes/privacyPolicy.route");
const userAgreementRoutes = require("./routes/userAgreement.route");
const refundPolicyRoutes = require("./routes/refundPolicy.route");
const settingsRoutes = require("./routes/settings.route");
const contactRoutes = require("./routes/contact.route");
const authRoutes = require("./routes/auth.route");

app.use("/api", exampleRoutes);
app.use("/api", testimonialRoutes);
app.use("/api", faqRoutes);
app.use("/api", blogRoutes);
app.use("/api", termsRoutes);
app.use("/api", quoteRequestRoutes);
app.use("/api", privacyPolicyRoutes);
app.use("/api", userAgreementRoutes);
app.use("/api", refundPolicyRoutes);
app.use("/api", settingsRoutes);
app.use("/api", contactRoutes);
app.use("/api", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Prozecto Backend API" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`Received ${signal}. Closing server...`);
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
      process.exit(1);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
