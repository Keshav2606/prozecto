const getExample = (req, res) => {
  res.json({ message: "Example controller" });
};

const postExample = (req, res) => {
  res.json({ message: "Data received", data: req.body });
};

module.exports = {
  getExample,
  postExample,
};
