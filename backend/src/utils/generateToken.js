const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (userId) => {
  // if (!process.env.JWT_SECRET) {
  //   throw new Error('JWT_SECRET is not defined in environment variables');
  // }
  return jwt.sign({ id: userId }, "c0b1501e23510a08fa9b10f4286daa0ec4ec0595bd2e5abcde79bd42ce63107274d22fc409756844c5f3389660f46cefbd33759b0fc3ac3a421a8a4125bd468c", { expiresIn: "1h" });
};

module.exports = generateToken;
