import 'dotenv/config';
import express from "express";
import logger from "morgan";
import * as path from "path";
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", (req, res) => {
    res.send("Helllo World!");
});
