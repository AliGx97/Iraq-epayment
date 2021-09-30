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
        "Content-Type": "application/json",
        Authorization: this.Account.Authorization, //FROM DEV
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
        {headers}
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
        msg: error.response.data.message,
        code: error.response.data.code, // مو مهم اعتقد ؟؟؟
      };
    }
  };
}
module.exports = paytabs;
