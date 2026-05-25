import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {type: String, required: true, default: "User"}
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema);

export { User };
