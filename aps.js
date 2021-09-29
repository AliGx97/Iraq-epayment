const axios = require("axios").default;

class aps {
  // userName = "api_thestation";
  // password = "8WifwVjaV71J432z8B5j";
  // baseUrl =  "https://uat-proxy.aps.iq:5443";

  constructor(userName, password, baseUrl,redirectUrl,production) {
    this.Account= production?
    {
      userName="api_thestation",
      password= "8WifwVjaV71J432z8B5j",
      baseUrl="https://uat-proxy.aps.iq:5443",
      redirectUrl="http://localhost:3000/",
    }:
    {
      userName,
      password,
      baseUrl,
      redirectUrl,
    };
  }
  /**
   * @param {string} userName
   * @param {string} password
   * @param {string} redirectUrl
   * @param {string} amount
   * @param {string} orderNumber
   */
    static init = async ({ amount, orderNumber }) => {
    const requestOptions = {params: {
      userName:this.Account.userName,
      password:this.Account.password,
      amount,
      orderNumber,
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
  static checkPay = async ( transactionId) => {
    const requestOptions = {params: {
      userName:this.Account.userName ,
      password: this.Account.password,
      orderId: transactionId,
    }};
    const response = await axios.get(this.Account.baseUrl + "/payment/rest/getOrderStatusExtended.do",requestOptions);
    return(response.data.orderStatus == 2) ?{ status: true, msg: "DEPOSITED" }: { status: false, msg: "Error not Vaild" };
  }
}
