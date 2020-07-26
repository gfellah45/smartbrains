const user = (req, res, db) => {
	db.select("*")
		.from("users")
		.where({ id: req.params.id })
		.then((resp) => {
			if (resp.length > 0) {
				res.status(200).json(resp[0]);
			} else {
				res.status(400).json({ message: "user not found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(401).json({ messgae: "user not found" });
		});
};

module.exports = { user };
