(async () => {
  let Amwal = new Payment("PayTabs", conf).inject;
  let res = await Amwal.checkout({
    amount: 2548,
    orderId: "45849",
  });
  // console.log(res);
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
