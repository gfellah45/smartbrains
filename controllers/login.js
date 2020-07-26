const login = (req, res, db, bcrypt) => {
	db.select("email", "hash")
		.from("login")
		.where("email", "=", req.body.email)
		.then((data) => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				db.select("*")
					.from("users")
					.where("email", "=", req.body.email)
					.then((data) => {
						res.status(200).json(data[0]);
					})
					.catch((err) => {
						console.log(err);
						res.status(400).json({ message: "enter a response" });
					});
			} else {
				res.status(401).json({ message: "wrong credentilas" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "wrong credentials" });
		});
};

module.exports = {
	login,
};
