const Aps = require("./aps");
const zaincash = require("./zaincash");
const amwal = require("./paytabs");
const Switch = require("./switch");

userName = "api_thestation";
password = "8WifwVjaV71J432z8B5j";
baseUrl = "https://uat-proxy.aps.iq:5443";
cred = {
  Authorization: "SGJNZGZL9R-J2H6DJZRBM-WTKBLM96RH",
  profile_id: "79870",
  tran_type: "sale",
  tran_class: "ecom",
  callback: "https://yourdomain.com/ll",
  return: "https://yourdomain.com/yourpage",
};
class Payment {
  constructor(method, conf) {
    switch (method) {
      case "Aps":
        this.inject = new Aps(conf[method]);
        break;
      case "ZainCash":
        this.inject = new zaincash(conf[method]);
        break;
      case "PayTabs":
        this.inject = new amwal(conf[method]);
        break;
      case "Switch":
        this.inject = new Switch(conf[method]);
        break;
      default:
        this.inject = null;
    }
  }
}

module.exports = Payment;
