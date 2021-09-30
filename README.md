# Documentation

<p float="left">
  <img src="https://i.ibb.co/X36LnW4/amwal-Logo.png" width="150" />
  <img src="https://i.ibb.co/30MpmJv/apsLogo.png" width="150" /> 
  <img src="https://i.ibb.co/3SrYdbj/zain-Cash-Logo-1.png" width="150" />
  <img src="https://i.ibb.co/42FBytV/switch-Logo.png" width="150" />
  <img src="https://i.ibb.co/mHcBNGq/Tasdid-Logo.png" width="150" />
</p>

This package will make the integration of online payment in iraq much easier than before.

## Overview

To integrate any payment method (from the ones that are already supported) , all you have to do is the following:

1 - Create a `.json` file that has the account information needed for each payment gateway (merchants information) so the json files will look as follows :

```javascript
{
    "ZainCash":{
        "production":true OR false,
        "serviceType": "Any text", // This will appear to the customer in the payment page.
        "secret":"XXXXXXXXXXXXXX" //Your ZAIN SECRET
        "msisdn": "96478########", // The merchant wallet number
        "merchantId":"XXXX" //Merchant ID
        "redirectUrl": "https://YOUR-WEBSITE.com/PATH", // Your GET URL that the customer will be redirected to after the payment
        "lang":"ar" OR "en"
        'exp': 3 // days for the JWT token expiration
    },
    "PayTabs":{
        "Authorization":"TOKEN AUTH",
        "callback":"https://YOUR-WEBSITE.com/POSTPATH" //paytabs(AMWAL) will send a POST request to that route after payment process with information about the transaction",
        "returnUrl":"https://YOUR-WEBSITE.com/PATH" //Your GET URL that the customer will be redirected to after the payment ,
        "profile_id":"XXXX", //Your Profile ID given by paytabs(Amwal)
        "tran_class": "ecom" OR "moto" OR "cont",//Depends on bank account type
        "tran_type":"sale",
    },
    "Tasdid":{
        "userName":"YOUR USERNAME",
        "password":"YOUR PASSWORD"
    },
    "Aps":{
        "production":true OR false,
        "userName":"YOUR USERNAME",
        "password":"YOUR PASSWORD",
        "redirectUrl":"URL" //Your route that they will send GET request to it.
    }

}
```

### <span style='color:red'>NOTE: The structure and keys must be identical to the above.</span>

<br/>

### <span style='color:skyblue'>NOTE: You only need to put the payments information that you need and support in your application.</span>

<br/>
