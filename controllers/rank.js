const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "b4416a599cfe4accb7436228c677d29f",
});

const imageUrl = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((resp) => {
			res.status(200).json(resp);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "unable to reach api" });
		});
};

const rank = (req, res, db) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entires", 1)
		.returning("entires")
		.then((resp) => {
			if (resp.length > 0) {
				res.status(200).json(resp[0]);
			} else {
				res.status(400).json({ message: "bad request" });
			}
		})
		.catch((err) => {
			res.status(500).json({ messsage: "error not found" });
		});
};

module.exports = { rank, imageUrl };
