const mongoose = require('mongoose');

//database connection
const connectDatabse = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecom');
        console.log("Database connected sucessfully");    
    }catch (err) {
        console.log("error occoured" + err)
    }
};

module.exports = connectDatabse
