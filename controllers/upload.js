export const postUploadImage = async (req, res) => {
  const { location } = req.file;
  res.send(location);
};
