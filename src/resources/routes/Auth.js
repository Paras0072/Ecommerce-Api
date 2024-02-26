const express = require("express");
const { register, login } = require("../../authorization/jwt");

const router = express.Router();

router.post("/", register).post("/login", login);
exports.router = router;
