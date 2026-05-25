import express from "express";

// +----------+ New imports go here +---------+

import { ROUTER as CRUDROUTER } from "./routes_CRUD.js";
import { ROUTER as LOGINROUTER } from "./routes_login.js";
import { ROUTER as WEBPAGEROUTER } from "./routes_webpages.js";

// +------------------------------------------+

const ROUTER = express.Router();

// +----------+ New routes from imports go here +---------+

ROUTER.use("/login", LOGINROUTER);
ROUTER.use("/CRUD", CRUDROUTER);
ROUTER.use("/", WEBPAGEROUTER);

// +------------------------------------------------------+
export { ROUTER };
