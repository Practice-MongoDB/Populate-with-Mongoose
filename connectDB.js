const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Nodemy");

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: String,
    password: String,
    age: Number,
    salary: Number,
    courseId: {
      type: String,
      ref: "Course",
    },
  },
  {
    collection: "Account",
  }
);

const courseSchema = new Schema(
  {
    name: String,
    teacherId: {
      type: String,
      ref: "Teacher",
    },
    lesson: [],
    salary: {},
  },
  {
    collection: "Course",
  }
);

const teacherSchema = new Schema(
  {
    name: String,
    age: Number,
    address: String,
  },
  {
    collection: "Teacher",
  }
);

const accountModel = mongoose.model("Account", accountSchema);
const courseModel = mongoose.model("Course", courseSchema);
const teacherModel = mongoose.model("Teacher", teacherSchema);

//Find Data
accountModel
  .find({ username: "tintt" })
  .populate("courseId")
  .populate({
    path: "courseId",
    populate: { path: "teacherId" },
  })
  .then((data) => console.log("Log :  data", data))
  .catch((err) => console.log("Log :  err", err));

// courseModel
//   .find({})
//   .then((data) => console.log("Log :  data", data))
//   .catch((err) => console.log("Log :  err", err));
