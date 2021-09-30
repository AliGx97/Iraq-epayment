const Payment = require("./index");
let conf = require("./test.json");
(async () => {
  let Amwal = new Payment("PayTabs", conf).inject;
  let res = await Amwal.checkout({
    amount: 2548,
    orderId: "456849",
    description: "asda",
  });
  console.log(res);
})();
(async () => {
  let Aps2 = new Payment("Aps", conf).inject;
  console.log(Aps2.Account);
  let res = await Aps2.checkout({
    amount: 2548,
    orderId: "458491",
  });
  console.log(res);
})();
(async () => {
  let ZainCash = new Payment("ZainCash", conf).inject;
  let res = await ZainCash.checkout({
    amount: 2548,
    orderId: "45849",
  });
  console.log(res);
})();
(async () => {
  let Switch = new Payment("Switch", conf).inject;
  let res = await Switch.checkout({
    amount: 2548,
  });
  console.log(res);
})();
