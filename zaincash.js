var axios = require("axios").default;
const jwt = require("jsonwebtoken");
class zaincash {
  constructor({
    production,
    msisdn,
    secret,
    merchantId,
    lang,
    exp,
    redirectUrl,
  }) {
    this.Account = !production
      ? {
          initUrl: "https://test.zaincash.iq/transaction/init",
          requestUrl: "https://test.zaincash.iq/transaction/pay?id=",
          msisdn,
          secret,
          merchantId,
          lang,
          exp,
          redirectUrl,
          time: Date.now(),
        }
      : {
          initUrl: "https://api.zaincash.iq/transaction/init",
          requestUrl: "https://api.zaincash.iq/transaction/pay?id=",
          msisdn,
          secret,
          merchantId,
          lang,
          exp,
          redirectUrl,
          time: Date.now(),
        };
  }
  createTrans = async (serviceType, exp, { amount, orderId }) => {
    //  Building the transaction data to be encoded in a JWT token
    const data = {
      amount,
      serviceType,
      msisdn: this.Account.msisdn,
      orderId,
      redirectUrl: this.Account.redirectUrl,
      iat: this.Account.time,
      exp: this.Account.time + 60 * 60 * exp,
    };

    //  Encoding the datd
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
    return { status: false, msg: response.data.err.msg };
  };
}

module.exports = zaincash;
