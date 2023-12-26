const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./Routes/User.routes");
const noticeRoutes = require("./Routes/Notice.routes");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(`${process.env.MONGODB_URI}/evaluation2`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));


app.use(express.json());


app.use('/users', userRoutes);
app.use('/notices', noticeRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
})