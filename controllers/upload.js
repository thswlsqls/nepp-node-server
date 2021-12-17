export const postUploadImage = async (req, res) => {
  //   console.log(req.file);
  const { location } = req.file;
  res.send(location);
};
