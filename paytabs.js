var axios = require("axios").default;

class paytabs {
  baseUrl = "https://secure-iraq.paytabs.com/payment/request";
  constructor({
    Authorization,
    callback,
    returnUrl,
    profile_id,
    tran_class,
    tran_type,
  }) {
    this.Account = {
      baseUrl: this.baseUrl,
      Authorization,
      callback,
      returnUrl,
      profile_id,
      tran_type,
      tran_class,
    };
  }
  checkout = async ({ orderId, description, amount }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.Account.Authorization, //FROM DEV
      };
      const response = await axios.post(
        this.Account.baseUrl,
        {
          profile_id: this.Account.profile_id,
          tran_type: this.Account.tran_type,
          tran_class: this.Account.tran_class,
          cart_id: orderId,
          cart_description: description,
          cart_currency: "IQD",
          cart_amount: amount,
          callback: this.Account.callback,
          return: this.Account.returnUrl,
        },
        { headers }
      );
      if (response)
        return {
          status: true,
          processId: response.data.tran_ref,
          url: response.data.redirect_url,
        };
    } catch (error) {
      return {
        status: false,
        msg: error.response.data,
      };
    }
  };
}
module.exports = paytabs;
