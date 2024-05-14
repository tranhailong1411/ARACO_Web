let handleLogin = async (req, res) => {
  let email = req.body.email;
  return res.status(200).json({
    message: "Success",
    yourEmail: email,
  });
};
module.exports = {
  handleLogin: handleLogin,
};
