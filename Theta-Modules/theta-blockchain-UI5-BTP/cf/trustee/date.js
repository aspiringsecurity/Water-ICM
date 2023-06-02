/*eslint no-console: 0*/
"use strict";

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.binance.com/api/v3/time',
  'headers': {
    'Content-Type': 'application/json'
  }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("server time: " + (JSON.parse(response.body)).serverTime);
    let now = new Date();
    console.log(" local time: " + now.getTime());
    // https://javascript.info/date
    // new Date(year, month-1, date, hours, minutes, seconds, ms)
    let start = 1;
    let limit = 500;
    let s_ago = new Date(2021, 0, start-1);
    let start_time = s_ago.getTime();
    console.log(" s_ago time: " + start_time);
    // let e_ago = new Date(2022, 0, start+limit-1);
    let e_ago = new Date();
    let end_time = e_ago.getTime();
    console.log(" e_ago time: " + end_time);

    console.log("");

    var request2 = require('request');
    let key1 = 'BTC';
    // let key1 = 'ETH';
    //let key1 = 'THETA';
    //let key1 = 'TFUEL';
    let key2 = 'USDT';
    let symbol = key1 + key2;
    //let symbol = 'THETAUSDT';
    var options2 = {
        'method': 'GET',
        'url': 'https://api.binance.com/api/v3/klines?symbol='+symbol+'&interval=1d&startTime='+start_time+'&endTime='+end_time+'&limit='+limit+'',
        'headers': {
          'Content-Type': 'application/json'
        }
      };

      const zeroPad = (num, places) => String(num).padStart(places, '0')

      request2(options2, function (error, response) {
        if (error) throw new Error(error);
          var results = JSON.parse(response.body);
          var rates = [];
          results.forEach(result => {
              let rate_date = new Date(result[0]);
              console.log("  ===: " + rate_date.getUTCFullYear() + "-" + zeroPad((rate_date.getUTCMonth() + 1),2) + "-" + zeroPad((rate_date.getUTCDate()),2) + " ");
            //   console.log(" open: " + result[1]);
            //   console.log(" high: " + result[2]);
            //   console.log("  low: " + result[3]);
              console.log("close: " + result[4]);
              console.log("");
            //   {
            //     "providerCode": "Binance",
            //     "marketDataSource": "Binance",
            //     "marketDataCategory": "01",
            //     "key1": "BTC",
            //     "key2": "USD",
            //     "marketDataProperty": "C",
            //     "effectiveDate": "2018-05-01",
            //     "effectiveTime": "00:00:00",
            //     "marketDataValue": 1.231,
            //     "securityCurrency": null,
            //     "fromFactor": null,
            //     "toFactor": null,
            //     "priceQuotation": null,
            //     "additionalKey": null
            //   },

            // https://help.sap.com/viewer/64e0eccf2d424543be76606dd5e5e460/LATEST/en-US/da46af643f31402d9002145ed0a7fe71.html
            // Restrictions
            // If you make a call with a date range specified, you must wait until that request is processed before making another call with date ranges, whether or not they are for latest rates or other date ranges. Daily calls with no dates will work concurrently.
            
            // To download data from SAP S/4HANA systems, ensure that the<key1> and <key2> fields combined do not exceed 15 characters while you upload data.
            
            // The tilde ( ~ ) and the colon ( : ) are reserved characters. Do not use these characters in your upload payloads.
            
            // If a market data type contains values for both the key1 and key2 fields, the download request must be written in the following format: <key1>~<key2>:<market data category>. If the request does not have a key2 field, the format must be as follows: <key1>:<market data category>. To see code samples for individual market data types, see Market Data Types.

              let rate = {
                "providerCode": "Binance",
                "marketDataSource": "Binance",
                "marketDataCategory": "01",
                "key1": key1,
                "key2": key2,
                "marketDataProperty": "M",
                "effectiveDate": rate_date.getUTCFullYear() + "-" + zeroPad((rate_date.getUTCMonth() + 1),2) + "-" + zeroPad((rate_date.getUTCDate()),2),
                "effectiveTime": "00:00:00",
                "marketDataValue": parseFloat(result[4]),
                "securityCurrency": null,
                "fromFactor": null,
                "toFactor": null,
                "priceQuotation": null,
                "additionalKey": null
              }
              rates.push(rate);
        });
        // console.log(JSON.stringify((JSON.parse(response.body)),null,2));
          
        var request3 = require('request');
        var options3 = {
          'method': 'GET',
          'url': 'https://theta.authentication.eu10.hana.ondemand.com/oauth/token?grant_type=client_credentials&response_type=token',
          'headers': {
            'Accept': 'application/json',
            'Authorization': 'Basic c2ItODY0MThjMmQtNzhmMi00MzM2LTk0MzEtMDBhYWIyMzIxMzE4IWI5NDI3MnxtYXJrZXQtZGF0YS1NUk0tTVJNX0JZT0QhYjQyMjU6TlNLeUtwYlhlRWdCUmUxM3NtS0svY2Frb25jPQ=='
          }
        };
        request3(options3, function (error, response) {
          if (error) throw new Error(error);
            // console.log(response.body);
            var access_token = (JSON.parse(response.body)).access_token;
            // console.log(access_token);
            // console.log(JSON.stringify(rates,null,2));
            
            var request4 = require('request');
            var options4 = {
                'method': 'POST',
                'url': 'https://mrmawseu10-mrm-mrm-byod-market-data-upload.cfapps.eu10.hana.ondemand.com/uploadMarketData?async=false',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + access_token + ''
                },
                'body': JSON.stringify(rates)
            };

            //console.log(JSON.stringify(options4,null,2));

            request4(options4, function (error, response) {
              if (error) throw new Error(error);
                //console.log(response.statusCode + ":" + response.statusMessage);
                if (response.statusCode == 201) {
                    console.log("Rates Inserted OK.")
                }
                else {
                    console.log("Problem Inserting Rates. " + response.statusCode + ":" + response.statusMessage);
                }
            });

        });        
          
      });

    

});

