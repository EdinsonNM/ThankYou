
define(['mongoose'],function(mongoose){
	var Schema   = mongoose.Schema;

	var UserSchema = new mongoose.Schema({
		email:    { type: String, unique:true },
		password: { type: String },
		birthday: {
			day: { type: Number, min: 1, max: 31, required: false },
			month: { type: Number, min: 1, max: 12, required: false },
			year: { type: Number }
		},
		photoUrl: { type: String },
	});
	return mongoose.model('user', UserSchema);

});
