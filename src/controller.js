// import axios for making api call to the required external api
const axios = require("axios");

const getDataController = async (req, res) => {
  try {
    // make the required api call and send the response
    let resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.send({
      message: "Fetched All The Posts Successfully",
      data: resp.data,
      error: null,
    });
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "An Error occured", error: e, data: null });
  }
};
module.exports = { getDataController };
