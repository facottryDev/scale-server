import axios from "axios";

export const checkAuth = async (req, res, next) => {
  try {
    const result = await axios({
      method: "GET",
      url: process.env.AUTH_SERVER_URL,
      headers: req.headers,
      withCredentials: true,
    });

    req.user = result.data;
    next();
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
