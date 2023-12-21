const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const mongooseConnect = require('./database/database');
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company/company");

const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use('/company', companyRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.statusCode ? error.statusCode:500).json({"message":error.message});
});
mongooseConnect(() => {
    app.listen(3001, () => {
        console.log(`Server is running on http://localhost:${3001}`);
    });
});