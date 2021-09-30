const Aps = require("./aps");
const zaincash = require("./zaincash");
const amwal = require("./paytabs");

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
      case "Amwal":
        this.inject = new amwal(conf[method]);
        break;
      default:
        this.inject = null;
    }
  }
}

// class Payment {
//   methods = ["aps"];
//   userName = "api_thestation";
//   password = "8WifwVjaV71J432z8B5j";
//   constructor(obj) {
//     this.methods.forEach((e) => {
//       if (e in obj) {
//         this.class[e](obj[e].cred);
//       }
//     });
//   }

//

// let check = new Payment("Amwal", { Amwal: cred }).inject;

// (async () => {
//   let res = await check.checkout({
//     amount: 2548,
//     orderId: "45849",
//   });
//   console.log(res);
// })();

module.exports = Payment;
