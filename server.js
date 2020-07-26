const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const knex = require("knex");

// controlerss imports
const { registerUser } = require("./controllers/register.js");
const { login } = require("./controllers/login.js");
const { user } = require("./controllers/user.js");
const { rank, imageUrl } = require("./controllers/rank.js");
const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "71987Jerry",
		database: "postgres",
	},
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// TODO: / home page
app.get("/", (req, res) => {
	res.json(fakeUser.users);
});

//Sign in to account
app.post("/signin", (req, res) => login(req, res, db, bcrypt));

//Register a user
app.post("/register", (req, res) => registerUser(req, res, db, bcrypt));

//fetch a user
app.get("/user/:id", (req, res) => user(req, res, db));

//get user ranking
app.put("/rank", (req, res) => rank(req, res, db));
app.post("/imageurl", (req, res) => imageUrl(req, res));
app.listen(3001, () => console.log("listening at port 3001"));
