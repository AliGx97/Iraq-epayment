const axios = require("axios").default;

class Switch {
  constructor({
    production,
    Authorization,
    entityId,
    bankBic,
    bankIban,
    bankCountry,
    redirectUrl,
  }) {
    this.Account = {
      Authorization,
      entityId,
      "bankAccount.bic": bankBic,
      "bankAccount.iban": bankIban,
      "bankAccount.country": bankCountry,
      currency: "EUR",
      paymentBrand: "GIROPAY",
      paymentType: "DB",
      shopperResultUrl: redirectUrl,
    };
    if (!production) {
      this.Account.baseUrl = "https://test.oppwa.com:443/";
    } else {
      this.Account.baseUrl = "https://oppwa.com:443/";
    }
  }
  /**
   * @param {string} userName
   * @param {string} password
   * @param {string} redirectUrl
   * @param {string} amount
   * @param {string} orderNumber
   */
  checkout = async ({ amount }) => {
    const requestOptions = {
      params: {
        entityId: this.Account.entityId,
        "bankAccount.bic": this.Account["bankAccount.bic"],
        "bankAccount.iban": this.Account["bankAccount.iban"],
        "bankAccount.country": this.Account["bankAccount.country"],
        currency: "EUR",
        paymentBrand: "GIROPAY",
        paymentType: "DB",
        shopperResultUrl: this.Account.redirectUrl,
        amount,
      },
      headers: {
        Authorization: this.Account.Authorization,
      },
    };
    try {
      const response = await axios.post(
        this.Account.baseUrl + "v1/payments",
        null,
        requestOptions
      );
      return response.data.resultDetails
        ? {
            status: true,
            transactionId: response.data.resultDetails?.OrderId,
          }
        : { status: false, error: response };
    } catch (e) {
      return { status: false, error: e.response.data.result };
    }
  };
}
module.exports = Switch;
