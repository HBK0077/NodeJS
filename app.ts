const express = require("express");

import bodyParser from "body-parser";

import todosRoutes from "./routes/todos";

const app = express();
app.use(todosRoutes);
app.use(bodyParser.json());
app.listen(6000);