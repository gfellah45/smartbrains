const registerUser = (req, res, db, bcrypt) => {
	if (req.body.name.trim() === "" || req.body.email.trim() === "") {
		return res.json({ message: "field cannot be empty" });
	} else {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		db.transaction((trx) => {
			trx
				.insert({
					hash: hash,
					email: req.body.email,
				})
				.into("login")
				.returning("email")
				.then((loginemail) => {
					return trx("users")
						.returning("*")
						.insert({
							name: req.body.name,
							email: loginemail[0],
							joinedat: new Date().toISOString(),
						})
						.then((data) => res.status(201).json(data[0]));
				})
				.then(trx.commit)
				.catch(trx.rollback);
		}).catch((err) => {
			res.status(404).json({ message: "user already exist" });
		});
	}
};

module.exports = {
	registerUser,
};
