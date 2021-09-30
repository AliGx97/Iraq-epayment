const axios = require("axios").default;
const jwt = require("jsonwebtoken");
class ZainCash {
  constructor({
    production,
    msisdn,
    secret,
    merchantId,
    lang,
    exp,
    redirectUrl,
    serviceType,
  }) {
    this.Account = {
      msisdn,
      secret,
      merchantId,
      lang,
      exp,
      redirectUrl,
      time: Date.now(),
      serviceType,
    };

    if (production) {
      this.Account.initUrl = "https://api.zaincash.iq/transaction/init";
      this.Account.requestUrl = "https://api.zaincash.iq/transaction/pay?id=";
    } else {
      this.Account.initUrl = "https://test.zaincash.iq/transaction/init";
      this.Account.requestUrl = "https://test.zaincash.iq/transaction/pay?id=";
    }
  }
  checkout = async ({ amount, orderId }) => {
    //  Building the transaction data to be encoded in a JWT token
    const data = {
      serviceType: this.Account.serviceType,
      amount,
      msisdn: this.Account.msisdn,
      orderId,
      redirectUrl: this.Account.redirectUrl,
      iat: this.Account.time,
      exp: this.Account.time + 60 * 60 * this.Account.exp,
    };

    //  Encoding the data
    const token = jwt.sign(data, this.Account.secret);

    //  Preparing the payment data to be sent to ZC api
    const postData = {
      token: token,
      merchantId: this.Account.merchantId,
      lang: this.Account.lang,
    };

    //  Initilizing a ZC order by sending a request with the tokens
    let response = await axios.post(this.Account.initUrl, postData);
    const OperationId = response.data.id;
    if (OperationId) {
      return {
        status: true,
        url: this.Account.requestUrl + OperationId,
        transactionId: OperationId,
      };
    }
    return { status: false, error: { mesage: response.data.err } };
  };
}

module.exports = ZainCash;
