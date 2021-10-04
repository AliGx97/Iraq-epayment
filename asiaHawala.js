var soap = require("soap");
class AsiaHawala {
  constructor({
    MSISDN,
    MPIN,
    USERNAME,
    PASSWORD,
    MERCHANTCODE,
    Authorization,
    url,
  }) {
    this.Account = {
      TYPE: "RMPREQ",
      MSISDN,
      PROVIDER: "101",
      MPIN,
      LANGUAGE1: "1",
      LANGUAGE2: "1",
      PAYID: "12",
      PROVIDER2: "101",
      PAYID2: "12",
      USERNAME,
      PASSWORD,
    };
    this.auth = Authorization;
    this.url = url;
    this.checkInfo = {
      TYPE: "FTXNENQ",
      SYSTEM: "MERCHANT",
      USERTYPE: "PAYEE",
      MERCHANTCODE,
      USERNAME,
      PASSWORD,
    };
  }
  checkout = async ({ MSISDN2, amount, orderId }) => {
    const data = { ...this.Account, MSISDN2, AMOUNT: amount, FTXNID: orderId };
    const auth = this.auth;
    const promise = new Promise((resolve, reject) => {
      try {
        soap.createClient(this.url, function (err, client) {
          if (err != null && err != "") reject(err);
          var soapHeader = {
            Authorization: auth,
          };
          // Setting the Header
          //   console.log({ soapHeader });
          client.addSoapHeader(soapHeader);
          // Sending the Transaction
          client.merchantPayment(data, function (err, result) {
            if (err) reject(err);
            resolve(result);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  };

  checkPay = async ({ orderId }) => {
    const data = { ...this.checkInfo, FTXNID: orderId };
    const auth = this.auth;
    const promise = new Promise((resolve, reject) => {
      // Createing the Client
      try {
        soap.createClient(this.url, function (err, client) {
          if (err) reject(err);
          var soapHeader = {
            Authorization: auth,
          };
          // Setting the Header
          client.addSoapHeader(soapHeader);
          // Sending the Transaction
          client.fTxnEnquiry(data, function (err, result) {
            if (err) reject(err);
            resolve(result);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  };
}
module.exports = AsiaHawala;
