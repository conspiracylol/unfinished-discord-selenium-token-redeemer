const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const urls = require("./webdata/urls.json")
const htmlids = require("./webdata/webids.json")
const readline = require('readline');
const captcha = require("./utils/discord/captcha")
const fs = require("fs");
const path = require("path");
const logging = require("./utils/logging")
const login = require("./utils/discord/login")
const config = require("./config.json")
const usewebhook = config.usewebhook;
const webhookurl = config.webhookurl;
const tokens = require("./utils/parsing/tokens")
const info = require("./utils/parsing/info")
const changetoken = config.shouldchangetoken;
let custommethod = "";
const changemethod = custommethod;
const debugmode = false;
let newpass = "";
const newtokenpass = newpass;
process.title = "Discord Token Redeemer | discord.gg/omari | https://github.com/auwii "

if(config.capmonsterkey == "") {
    logging.warnlog("you havent provided a capmonster.cloud key. this means the program may fail if theres captchas. the program will attempt to work but may fail.");
} else {
    logging.infolog("Capmonster key provided.")
}
if(usewebhook == "true") {
if(config.webhookurl == "") {
    logging.warnlog("use webhook is enabled but no webhook url is provided.");
} else {
    logging.infolog("webhook url logging enabled with the webhook: " + webhookurl)
}
}
if(debugmode == true) { logging.debuglog("checking token change method and status.")}
if(changetoken == "true") {
    if(config.oldtokenchangemethod == "false") {
        if(config.newtokenchangemethod == "false") {
            logging.infolog("tokens wont be changed! token should be changed is enabled but no method is provided.");
        } else {
            custommethod = "new";
            logging.warnlog("the new token change method will not change the tokens password and may not work at all. please use caution... The tokens still have to be email:pass:token to work.")
        }
    } else {
        if(config.newpassword == "") {
            logging.infolog("token password changing was enabled but no password was specified, defaulting to NitroToken123!")
            newpass = "NitroToken123!";
        } else {
        custommethod = "old";
        newpass = config.newpassword;
        logging.warnlog("the token password changing method was enabled and is setup correctly, the tokens must be email:pass:token for this to work otherwise it cannot reset.")
        }
    }
}

if(debugmode == true) { logging.debuglog("attempting to gather file paths for: tokens, vccs, promos.")}

const tokenpath = __dirname + '/data/tokens.txt';
const vccpath = __dirname + '/data/vccs.txt';
const promopath = __dirname + '/data/promos.txt';
const redeemedpath = __dirname + "/data/redeemed.txt";

if(debugmode == true) { logging.debuglog("gathered file paths for: tokens, vccs, promos. tokenpath: " + tokenpath + ". vccpath: " + vccpath + ". promopath: " + promopath)}

if(debugmode == true) { logging.debuglog("attempting to create paths if they dont exist for: promos, vccs, and tokens.")};
let paths = require("./utils/paths");const { By } = require('selenium-webdriver');
 paths.createpaths(tokenpath, vccpath, promopath, redeemedpath);
if(debugmode == true) { logging.debuglog("created paths if they dont exist for: promos, vccs, tokens, and redeemed tokens!")};


console.log("Thank you for using!\nMade By conspiracy#0002!\n discord.gg/omari\nhttps://github.com/auwii")
sleep(2500);

async function sleep(time) {
    await sleep(time);
  }



fs.readFile(__dirname + "/data/vccs.txt", 'utf8', (err, data) => {
if(err) {
    logging.errorlog(err)
}
if(data == "") {
logging.errorlog("vccs.txt contains 0 vccs. cant continue!")
sleep(5000);
process.exit();
}
})
fs.readFile(__dirname + "/data/tokens.txt", 'utf8', (err, data) => {
    if(err) {
        logging.errorlog(err)
    }
    if(data == "") {
    logging.errorlog("tokens.txt contains 0 tokens. cant continue!")
    sleep(5000);
    process.exit();
    }
    })
    fs.readFile(__dirname + "/data/promos.txt", 'utf8', (err, data) => {
        if(err) {
            logging.errorlog(err)
        }
        if(data == "") {
        logging.errorlog("promos.txt contains 0 tokens. cant continue!")
        sleep(5000);
        process.exit();
        }
        })
logging.infolog("vcc format is: cardnumber:expiration:cvc! (this is NOT an error!)")

logging.infolog("attempting to start shit!")
let driver;
try {
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

driver = new Builder()
    .withCapabilities(driver.Capabilities.chrome())
    .forBrowser('chrome')
    .build();
    logging.infolog("built driver shit!")
} catch(error) {
    logging.errorlog("Unable to make chrome builder shit! error: " + error)
}
logging.infolog("going to discord login page!")
try {
await driver.get(urls.loginurl);
} catch(error) {
    logging.errorlog("unable to go to login page! error: " + error)
}
async function getelement(driver, xpath) {
    try {
        return driver.findElement(By.xpath(xpath));
    } catch(error) {
        logging.errorlog("Please report this to discord.gg/omari! Element: " + xpath + " Needs updated! Thank you. Error: " + error);
    }
}
async function typetext(driver, element, xpath, text) {
    if(xpath) {
        driver.findElement(By.xpath(xpath)).sendKeys(text, Key.RETURN);
    } else {
        element.sendKeys(text, Key.RETURN)
    }

}
async function clickbutton(driver, element, xpath) {
if(xpath) {
    driver.findElement(By.xpath(xpath)).click();
} else {
    element.click();
}
}
async function readtext(driver, element, xpath) {
    if(xpath) {
        return driver.findElement(By.xpath(xpath)).getText();
    } else {
        return element.getText();
    }
}
async function checkforcaptcha(driver) {
    if(driver.findElement(By.xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div[2]/div"))) {
        try { captcha.get_captcha_key("\"\"", "a9b5fb07-92ff-493f-86fe-352a2803b3df", driver.getCurrentUrl(), info.getrandomuseragent()); } catch {logging.errorlog("failed to solve captcha!!")}
    }
}

let token = "";
let loggedin = false;
try {
token = tokens.gettoken();
const loginscript = tokens.getloginscript();
driver.executeScript(loginscript);
loggedin = true;

}
catch {
    logging.errorlog("failed to login to token: " + token);
}
function executepromostuff() {
    try {
    var promolink = info.getrandompromo();
    driver.get(promolink)
    } catch {
        logging.errorlog("failed to go to promo link!")
    }
}