var axios = require("axios").default;
var md5 = require("md5").default;
class Tasdid {
  url = "https://api.tasdid.net/v1/api/";
  constructor(userName, password) {
    const headers = { "Content-Type": "application/json" };
    let result = await axios.post(
      this.url + "Auth/Token",
      { userName, password },
      headers
    );
    this.Accouunt.token = result.token;
    this.Accouunt.providerId = result.providerId;
  }

  /**
   *
   * @param {"You-Service-Name"} name
   * @param {"Free text"} note
   * @returns service info you need to save serviceId
   */
  addService = async (name, note) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.Accouunt.token,
    };
    let result = await axios.put(
      this.url + "Provider/AddService",
      {
        token: this.Accouunt.token,
        providerId: this.Accouunt.providerId,
        name,
        note,
      },
      headers
    );
    return result;
  };

  /**
   *
   * @param {*} payId
   * @param {*} customerName
   * @param {*} payDate
   * @param {*} status
   * @param {*} clientId
   * @param {*} phoneNumber
   * @param {*} serviceId
   * @param {*} amount
   * @param {*} note
   * @returns
   */
  addBill = async (
    payId,
    customerName,
    payDate,
    status,
    clientId,
    phoneNumber,
    serviceId,
    amount,
    note
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let result = await axios.put(
      this.url + "Provider/AddBill",
      {
        payId,
        customerName,
        dueDate,
        payDate,
        status,
        clientId,
        phoneNumber,
        serviceId,
        amount,
        note,
      },
      headers
    );
    return result;
  };

  /**
   *
   * @param {*} email
   * @param {*} payId
   * @param {*} status
   * @param {*} body
   * @returns
   */
  cheakBill = (email, payId, status, body) => {
    let md5Str = `${email}|${payId}|${status}`;
    md5Str = md5(md5Str).toUpperCase();
    return {
      sucsses: body.key == md5Str && body.status == 3 ? true : false,
      msg: " ",
    };
  };
}

module.exports = Tasdid;
