var axios = require("axios").default;

class paytabs {
  constructor({
    Authorization,
    callback,
    returnUrl,
    profile_id,
    baseUrl = "https://secure-iraq.paytabs.com/payment/request",
  }) {
    this.Account = {
      baseUrl,
      Authorization,
      callback,
      returnUrl,
      profile_id,
    };
  }
  createPayment = async ({
    tran_type,
    tran_class,
    cart_id,
    cart_description,
    cart_currency,
    cart_amount,
  }) => {
    try {
      const headers = {
        Authorization: this.Account.Authorization, //FROM DEV
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        this.Account.baseUrl,
        {
          profile_id: this.Account.profile_id,
          tran_type,
          tran_class,
          cart_id,
          cart_description,
          cart_currency,
          cart_amount,
          callback: this.Account.callback,
          return: this.Account.returnUrl,
        },
        headers
      );
      if (response)
        return {
          status: true,
          processId: response.tran_ref,
          url: response.redirect_url,
        };
    } catch (error) {
      return {
        status: false,
        msg: error.response.data.message,
        code: error.response.data.code, // مو مهم اعتقد ؟؟؟
      };
    }
  };
}
module.exports = paytabs;
