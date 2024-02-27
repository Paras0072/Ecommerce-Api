const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {models} = require("../resources/model/index");


// function for registring user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // for checking email specification
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;  // for checking strong password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Weak password. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);  // for hashing the password
    const user = await models.User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//function use for login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) { // comparing password coming from req  from password stored in database
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res
      .status(200)
      .header("x-auth-token", token)
      .json({ message: "Login successful", token });
    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
