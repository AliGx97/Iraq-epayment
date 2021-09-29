const axios = require("axios").default;

class aps {

    static testAccount= {
      userName = "api_thestation",
      password = "8WifwVjaV71J432z8B5j",
      baseUrl = "https://uat-proxy.aps.iq:5443",
      };
  /**
   * @param {string} userName
   * @param {string} password
   * @param {string} redirectUrl
   * @param {string} amount
   * @param {string} orderNumber
   */
    static init = async ({ userName, password },redirectUrl,{ amount, orderNumber }) => {
    const requestOptions = {params: {userName,password,amount,orderNumber,returnUrl: redirectUrl,currency: 368,},};
    try {
      const response = await axios.post(
        baseUrl + "/rest/register.do",
        null,
        requestOptions
      );
      return (!response.data.errorCode)? 
         {
          status: true,
          url: response.data.formUrl,
          processId: response.data.orderId,
        }: { status: false, msg: response.data.errorMessage };
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
  static checkPay = async ({ userName, password }, transactionId) => {
    const requestOptions = {params: {userName,password,orderId: transactionId,}};
    const response = await axios.get(baseUrl + "/payment/rest/getOrderStatusExtended.do",requestOptions);
    return(response.data.orderStatus == 2) ?{ status: true, msg: "DEPOSITED" }: { status: false, msg: "Error not Vaild" };
  }
}
