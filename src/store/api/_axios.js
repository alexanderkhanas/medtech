import axios from "axios";

export default axios.create({
  baseURL: "https://medtechnika-te.herokuapp.com/api/v1",
});
