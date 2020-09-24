const express = require(`express`);
const cors = require(`cors`);
const mongoose = require(`mongoose`);

//configures to have environmental variables
require(`dotenv`).config();

//create a express server
const app = express();
const port = process.env.PORT || 5000;

//create a middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once(`open`, () => {
    console.log(`MongoDB connection established`);
});

const usersRouter = require(`./routes/router`);

app.use(`/users`, usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});