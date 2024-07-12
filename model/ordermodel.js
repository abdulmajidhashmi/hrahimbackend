const mongoose = require('mongoose');


const mainSchema = new mongoose.Schema(

    {
        "order": {
          "items": {
            "type": [
              "Mixed"
            ]
          },
          "totalPrice": {
            "type": "Number"
          }
        },
        "orderuserdetails": {
          "firstName": {
            "type": "String"
          },
          "lastName": {
            "type": "String"
          },
          "email": {
            "type": "String"
          },
          "phone": {
            "type": "Number"
          },
          "street": {
            "type": "String"
          },
          "city": {
            "type": "String"
          },
          "state": {
            "type": "String"
          },
          "zipCode": {
            "type": "String"
          },
          "cash": {
            "type": "String"
          }
        }
      }
)

const orderModel = mongoose.model('orders',mainSchema);


module.exports = orderModel;