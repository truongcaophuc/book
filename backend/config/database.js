const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("http://127.0.0.1:27017/shopit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
