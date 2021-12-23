const User = require('../schemas/user');
const ErrorResponse = require('../utils/errorResponse');
exports.registerprofile = async (req, res) => {
	// res.send('<h1>Hello From Express</h1>');
	try {
        console.log(req.body);
		const { name, email, password } = req.body;
		console.log('BEFOREajdhajknghfcdxj');
        console.log(name,email,password);
		//create user
		const user = await User.create({
			name,
			email,
			password,
		});
		res.status(200).json({ success: true ,name: name});
	} catch (err) {
		res.status(404).json({ success: false, error: err });
	}
};
exports.loginprofile = async (req, res, next) => {
	try {
		console.log('TRy');

		const { email, password } = req.body;

		//Validate email & password
		if (!email || !password) {
			return next(
				new ErrorResponse('Please provide an email and password', 400)
			);
		}

		//Check for User
		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorResponse('User not found', 404));
		}

		//Create token
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse('Invalid credentials', 401));
		}
        res.status(200).json({ success: true ,name: user.name});
	} catch (err) {
		console.log(err);
		res.status(404).json({ success: false, error: String(err) });
	}
};
