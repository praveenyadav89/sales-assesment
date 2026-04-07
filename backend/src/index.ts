import express from "express";
import cors from "cors";

import { loadData } from "./config/dataStore";
import { notFoundHandler, errorHandler } from "./middleware";
import stateRoutes from "./routes/stateRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

//Load JSON data before anything else
loadData();

const app = express();
const PORT = process.env.PORT || 3001;

//Global middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", stateRoutes);
app.use("/api", dashboardRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start
/*app.listen(PORT, () => {
  console.log(`\n Sales Dashboard API → http://localhost:${PORT}`);
  
 
});*/

export default app;
