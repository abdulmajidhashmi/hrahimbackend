const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  notification: {
    type: String,
    required: true,
  },
  createdAt: {
    type: "Date",
    default: Date.now,
  },
});

const notificationModel = mongoose.model("notifications", notificationSchema);

module.exports = notificationModel;
