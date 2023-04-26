const fs = require("fs");
const path = require("path");
const logging = require("./logging");

function createpaths(token, vcc, promo, redeemed) {
    fs.open(token, 'w', (err, file) => {
      if (err) {
        logging.errorlog(err);
        logging.debuglog("at: tokenpath")
        logging.debuglog("path: " + token)
      } else {
        logging.infolog(`File '${filename}' created because it doesn't exist.`);
      }
    });
    fs.open(vcc, 'w', (err, file) => {
        if (err) {
            logging.errorlog(err);
            logging.debuglog("at: vccpath")
            logging.debuglog("path: " + vcc)
        } else {
          logging.infolog(`File '${filename}' created because it doesn't exist.`);
        }
      });
      fs.open(promo, 'w', (err, file) => {
        if (err) {
            logging.errorlog(err);
            logging.debuglog("at: promopath")
            logging.debuglog("path: " + promo)
        } else {
          logging.infolog(`File '${filename}' created because it doesn't exist.`);
        }
      });
      fs.open(redeemed, 'w', (err, file) => {
        if (err) {
            logging.errorlog(err);
            logging.debuglog("at: redeemedpath")
            logging.debuglog("path: " + redeemed)
        } else {
          logging.infolog(`File '${filename}' created because it doesn't exist.`);
        }
      });
    }

module.exports = createpaths;