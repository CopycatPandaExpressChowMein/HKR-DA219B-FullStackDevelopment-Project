import path from "node:path";
import express from "express";

const ROUTER = express.Router();

// +----------+ New routes from imports go here +---------+

ROUTER.get("/*splat", (req, res) => {
	res.sendFile(path.resolve("./public/index.html"));
});

// +------------------------------------------------------+

export { ROUTER };
