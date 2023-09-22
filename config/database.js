const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect("mongodb+srv://riteshmeshram0503:1234@cluster0.h4eqko0.mongodb.net/?retryWrites=true&w=majority")
        .then((con) => {
            console.log(
                `MongoDB Database connected with HOST: ${con.connection.host}`
            );
        });
};

module.exports = connectDatabase;
