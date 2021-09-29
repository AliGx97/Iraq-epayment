var axios = require("axios").default;
var md5 = require("md5").default;
class tasded {
  static url = "https://api.tasdid.net/v1/api/";

  /**
   *
   * @param {"user name"} userName
   * @param {"password"} password
   * @returns token and info
   */
  static init = async (userName, password) => {
    const headers = { "Content-Type": "application/json" };
    let result = await axios.post(
      this.url + "Auth/Token",
      { userName, password },
      headers
    );
    return result;
  };
  /**
   *
   * @param {"Your token  form func init "} token
   * @param {"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"} providerId
   * @param {"You-Service-Name"} name
   * @param {"Free text"} note
   * @returns service info you need to save serviceId
   */
  static addService =async (token, providerId, name, note) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let result = await axios.put(
      this.url + "Provider/AddService",
      { token, providerId, name, note },
      headers
    );
    return result;
  };
  /**
   *
   * @param {*} token
   * @param {*} payId
   * @param {*} customerName
   * @param {*} dueDate
   * @param {*} payDate
   * @param {*} status
   * @param {*} clientId
   * @param {*} phoneNumber
   * @param {*} phoneNumber
   * @param {*} serviceId
   * @param {*} amount
   * @param {*} note
   * @returns
   */
  static addService = async (
    token,
    payId,
    customerName,
    dueDate,
    payDate,
    status,
    clientId,
    phoneNumber,
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
      this.url + "Provider/AddService",
      {
        payId,
        customerName,
        dueDate,
        payDate,
        status,
        clientId,
        phoneNumber,
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
  static addBill = async(
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
  static cheakBill = (email, payId, status, body) => {
    let md5Str = `${email}|${payId}|${status}`;
    md5Str = md5(md5Str).toUpperCase();
    return {
         sucsses: body.key == md5Str&& body.status == 3  ? true : false,
         msg :" "
    }
  };
}

module.exports = tasded;
