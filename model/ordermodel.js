const mongoose = require('mongoose');


const mainSchema = new mongoose.Schema(

    {
        order: {
          items: {
            type: [
              "Mixed"
            ]
          },
          totalPrice: {
            type: Number,
            required:true
          }
        },
        orderuserdetails: {
          firstName: {
            type: String,
            required:true
          },
          lastName: {
            type: String,
            required:true
          },
          email: {
            type: String,
            required:true
          },
          phone: {
            type: Number,
            required:true
          },
          street: {
            type: String,
            required:true
          },
          city: {
            type: String,
            required:true
          },
          state: {
            type: String,
            required:true
          },
          zipCode: {
            type: String,
            required:true
          },
          cash: {
            type: String,
            required:true
          }
        }
      }
)

const orderModel = mongoose.model('orders',mainSchema);


module.exports = orderModel;