import express from "express";
import logger from "morgan";
import cron from "node-cron";
import { connect } from "./config/db.js";
import {
	addToDB,
	checkAndArchive,
	retrieve,
} from "./models/police_api_connection.js";
import { ROUTER } from "./routes/routes_index.js";

const APP = express();
const _DB = connect();

cron.schedule("*/10 * * * *", async () => {
	const data = await retrieve();
	await addToDB(data);
	await checkAndArchive();
});

APP.use(
	logger("dev", {
		immediate: true,
		skip: () => process.env.NODE_ENV === "test",
	}),
);

APP.use(express.json());
APP.use(express.static("public"));
APP.use("/", ROUTER);

//TODO: Add eslint 'https://gitlab.com/mikael-roos/node/-/tree/main/src/express5/hello?ref_type=heads#add-a-linter-with-eslint'
//TODO: Look into and potentially add error handler

const PORT = process.env.PORT || 10000; //Different port from .env
APP.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on port ${PORT}`);
});
