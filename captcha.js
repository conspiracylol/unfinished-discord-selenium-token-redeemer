const axios = require('axios');
const configfile = require("../../config.json")
const config = { capmonster_key: configfile.capmonsterkey };

async function get_captcha_key(rqdata, site_key, websiteURL, useragent) {
  try {
    const task_payload = {
      clientKey: config.capmonster_key,
      task: {
        type: 'HCaptchaTaskProxyless',
        isInvisible: true,
        data: rqdata,
        websiteURL: websiteURL,
        websiteKey: site_key,
        userAgent: useragent
      }
    };
    const createTaskResponse = await axios.post('https://api.capmonster.cloud/createTask', task_payload);
    const taskId = createTaskResponse.data.taskId;
    
    while (true) {
      const get_task_payload = {
        clientKey: config.capmonster_key,
        taskId: taskId
      };
      const getTaskResponse = await axios.post('https://api.capmonster.cloud/getTaskResult', get_task_payload);
      if (getTaskResponse.data.status === 'ready') {
        const solution = getTaskResponse.data.solution.gRecaptchaResponse;
        return solution;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = get_captcha_key;