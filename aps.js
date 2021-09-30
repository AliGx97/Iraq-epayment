const axios = require("axios").default;

class Aps {
  // userName = "api_thestation";
  // password = "8WifwVjaV71J432z8B5j";
  // baseUrl =  "https://uat-proxy.aps.iq:5443";
  constructor({ production, userName, password, redirectUrl }) {
    this.Account = !production
      ? {
          userName,
          password,
          baseUrl: "https://uat-proxy.aps.iq:5443",
          redirectUrl: redirectUrl,
        }
      : {
          userName,
          password,
          baseUrl: "https://ecommerce.aps.iq:4443",
          redirectUrl: redirectUrl,
        };
  }
  /**
   * @param {string} userName
   * @param {string} password
   * @param {string} redirectUrl
   * @param {string} amount
   * @param {string} orderNumber
   */
  checkout = async ({ amount, orderId }) => {
    const requestOptions = {
      params: {
        userName: this.Account.userName,
        password: this.Account.password,
        amount,
        orderNumber: orderId,
        returnUrl: this.Account.redirectUrl,
        currency: 368,
      },
    };
    try {
      const response = await axios.post(
        this.Account.baseUrl + "/rest/register.do",
        null,
        requestOptions
      );
      return !response.data.errorCode
        ? {
            status: true,
            url: response.data.formUrl,
            transactionId: response.data.orderId,
          }
        : { status: false, msg: response.data };
    } catch (e) {
      return e;
    }
  };
  /**
   *
   * @param {*} userName
   * @param {*} password
   * @param {*} processId
   * @returns
   */
  checkPay = async (transactionId) => {
    const requestOptions = {
      params: {
        userName: this.Account.userName,
        password: this.Account.password,
        orderId: transactionId,
      },
    };
    const response = await axios.get(
      this.Account.baseUrl + "/payment/rest/getOrderStatusExtended.do",
      requestOptions
    );
    return response.data.orderStatus == 2
      ? { status: true, msg: "DEPOSITED" }
      : {
          status: false,
          error: {
            message: response.data.errorMessage,
            code: response.data.errorCode,
          },
        };
  };
}
module.exports = Aps;
