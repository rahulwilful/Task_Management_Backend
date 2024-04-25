const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const MongoDBURI = process.env.MONGOURL;

const connectToMongo = async () => {
  try {
    const connect = await mongoose.connect(MongoDBURI);

    console.log("Connected To MongoDB", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error({ message: "Connection Faild", error: err });
  }
};

module.exports = connectToMongo;
