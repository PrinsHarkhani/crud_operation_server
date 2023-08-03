const express = require("express");
const userModel = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ dest: "uploads/" });

app.post(
  "/api/upload/:userId",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const { filename } = req.file;

      const profile = await userModel.findById({ _id: userId });

      if (!profile) {
        return res.status(404).json({ error: "User not found" });
      }

      profile.profilePhoto = filename;
      await profile.save();

      res.status(200).json({
        message: "Profile photo uploaded successfully",
        profilePhoto: filename,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

app.post("/api/add", async function (req, res) {
  const newData = new userModel(req.body);
  try {
    const result = await newData.save();
    console.log(result);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Saving items" });
  }
});

app.get("/api/view", async function (req, res) {
  try {
    const result = await userModel.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching items" });
  }
});

app.get("/api/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const result = await userModel.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching perticular items" });
  }
});

app.put("/api/update/:id", async function (req, res) {
  try {
    const result = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Updating items" });
  }
});

app.delete("/api/delete/:id", async function (req, res) {
  try {
    const result = await userModel.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Deleting items" });
  }
});

const port = 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
