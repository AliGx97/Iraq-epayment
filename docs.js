module.exports = {
  ZainCash: {
    production: true, //OR false,
    serviceType: "Any text", // This will appear to the customer in the payment page.
    secret: "XXXXXXXXXXXXXX", //Your ZAIN SECRET
    msisdn: "96478########", // The merchant wallet number
    merchantId: "XXXX", //Merchant ID
    redirectUrl: "https://YOUR-WEBSITE.com/PATH", // Your GET URL that the customer will be redirected to after the payment
    lang: "ar", //OR "en"
    exp: 3, // days for the JWT token expiration
  },
  PayTabs: {
    Authorization: "TOKEN AUTH",
    callback: "https://YOUR-WEBSITE.com/POSTPATH", //paytabs(AMWAL) will send a POST request to that route after payment process with information about the transaction",
    returnUrl: "https://YOUR-WEBSITE.com/PATH", //Your GET URL that the customer will be redirected to after the payment ,
    profile_id: "XXXX", //Your Profile ID given by paytabs(Amwal)
    tran_class: "ecom", //OR "moto" OR "cont",//Depends on bank account type
    tran_type: "sale",
  },
  Tasdid: {
    userName: "YOUR USERNAME",
    password: "YOUR PASSWORD",
  },
  Aps: {
    production: true, //OR false,
    userName: "YOUR USERNAME",
    password: "YOUR PASSWORD",
    redirectUrl: "URL", //Your route that they will send GET request to it.
  },
  Switch: {
    Switch: {
      production: false,
      Authorization:
        "Bearer OGE4Mjk0MTc0ZDA1OTViYjAxNGQwNWQ4MjllNzAxZDF8OVRuSlBjMm45aA==",
      entityId: "8a8294174d0595bb014d05d82e5b01d2",
      bankBic: "TESTDETT421",
      bankIban: "DE14940593100000012346",
      bankCountry: "DE",
      redirectUrl: "https://google.com",
    },
    AsiaHawala: {
      MSISDN: "XXX", // Merchant Phone number
      MPIN: "XXX", // Merchant Wallet
      USERNAME: "XXX", // Merchant Username
      PASSWORD: "XXX", // Merchant Password
      MERCHANTCODE: "XXX", // Merchant Code
      Authorization: "XXX", // Auth token
      url: "XXX", // Merchant URL
    },
  },
};
