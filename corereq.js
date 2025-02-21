const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.linkedin.com/jobs/search/?currentJobId=4161089207&f_F=eng&f_TPR=r604800&f_WT=2&geoId=92000000&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true&sortBy=DD";

const headers = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-US,en;q=0.9",
  "cache-control": "max-age=0",
  priority: "u=0, i",
  "sec-ch-prefers-color-scheme": "light",
  "sec-ch-ua":
    '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  cookie:
    'bcookie="v=2&36cd4016-1ae8-4e9e-819a-7cee8a463241"; bscookie="v=1&20250213120356974dcf4b-d383-421a-8be8-3ad56f9b2dfaAQHZxOOyl02eQQ_vE5X8OgqzVU81ygjb"; aam_uuid=75983108220819406361007401556149341176; _uetvid=abee3320ea0211ef8e6f0146405f31de; _gcl_au=1.1.931884217.1739448270; li_gc=MTswOzE3Mzk1Mjg1NzY7MjswMjHc1kdC30uxKLM2oPAyp2lTmsiDuD69fXkKreOcvsgVIg==; li_sugr=3f17ec3b-62f1-4ed3-9ef2-b433326bafc4; li_at=AQEDAVa-J0ECZD3hAAABlRm6M-8AAAGVPca3700A0mCPeKm20wzJQZBudbHj8418xe3oBrcklWYL_KYZJvqmr5TifBQx_93CB12EdnoqwllNZMqKZ1HWPOVaKnyhGIeKmVMdZd_KYCN2vRahz-ERN4Eb; liap=true; JSESSIONID="ajax:2345377508670815278"; timezone=Europe/Paris; li_theme=light; li_theme_set=app; _guid=74630b59-552b-40a3-91ff-b7897af0c6d2; dfpfpt=0c0bcc83285c41229aaae6eb4c4771a1; fid=AQFwpjhjYBv7MQAAAZUg_Io9fAzPNyTyLCVOZjn3voh-VEDvC7URyP1336Wwwu-BvoVtN_zBUqKBgg; lang=v=2&lang=en-us; fptctx2=taBcrIH61PuCVH7eNCyH0K%252fD9DJ44Cptuv0RyrXgXCscFQpVQSXX7jd70qLEoRP6Y0vW6CQgrqZsi1dIVgpPX0PV8gKb0wbtJONExy5z1sg4cRtK0D0i%252fZ5AFSMMWJ3ZsKIlZXerWLZ336oub%252fSNGaUmbN9xb98eOVRcouBTjVy29OL95mlJvp1wkySDI3iWoFfmTPdXIxaYyFwgfN4XwEya6fYb7cFtQ9lduYZKlQaBXKyl1DPRt08XdnMYBJJgnNo%252bZNU44TCO%252fWr1217LlWADtZqV%252bRRS4yQrSOuGsYKJO1xAyZf4vdnx62Z8keAg41M6sZDQeEU5XbKapVu%252fOixqm7pd2ek8MDguzCZQnG4%253d; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AnalyticsSyncHistory=AQIMh0v7GJyjMgAAAZUpONxQ1zIE5c0DlBoForr9MM2LYuiGLiwdA_bPBkoCA28rLa5iNqjVLeufRd6ikIdIVQ; lms_ads=AQG9PvJQYauSfwAAAZUpON5qjfeKHnbOvgSC1YrpsF7sBNP9JZusNDksS8tr3PZcjG6ocG0G0xxMULQdk94sqAMsuOzktAuP; lms_analytics=AQG9PvJQYauSfwAAAZUpON5qjfeKHnbOvgSC1YrpsF7sBNP9JZusNDksS8tr3PZcjG6ocG0G0xxMULQdk94sqAMsuOzktAuP; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20141%7CMCMID%7C76194400188635380070951435294451169331%7CMCAAMLH-1740758149%7C9%7CMCAAMB-1740758149%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1740160549s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C-119627840; UserMatchHistory=AQJRBVSvrCe9jgAAAZUpnkQVqDPYbqLoS6Sdjj2oNDUOgp56rO0mjwJ29ok0CbhhQ3-GL9Eic1pUgFDQjdqJYz9B7nJOCGiUp6chSd44hi3LM3WTImXg3p_vrcF14weBCW-gtzrl8Uz8etT0_xlHMcw-nV29x0fDibdywdQOCinQ7N8DxxZZitnFCe3V8UTOBHcVjGnKKOGJC9pyh3rGtbkzN5riSfg0_jQsdF83AIIRMVN8jeDZwb1fiKuXxfFGC-lpnM8kKvXPl3Sf6DSkb7xa3Ouzpr9VrLCBca0sLTzAbush188neDQH1NEBb0gF8x0jRicX77qx_LeLYXg9T_xEGE1LpEE7ztrovEieyn_7mysrcQ; lidc="b=VB65:s=V:r=V:a=V:p=V:g=5009:u=14:x=1:i=1740159995:t=1740232559:v=2:sig=AQHlWTjjHadjmFh4bX8JvlquVTYUnE3T"',
};

// Function to extract JSON from code blocks inside HTML
const extractJsonFromHtml = (html) => {
  const $ = cheerio.load(html);
  const jsonList = [];

  // Loop through all <code> blocks
  $("code").each((i, element) => {
    let codeText = $(element).text().trim();
    console.log(codeText);
  });

  console.log(jsonList);
  return jsonList; // List of extracted JSON objects
};

// Function to extract and format job descriptions
const extractJobDescriptions = (jsonDataList) => {
  let jobsOutput = "";

  jsonDataList.forEach((jsonData) => {
    if (jsonData.jobs && Array.isArray(jsonData.jobs)) {
      jobsOutput += jsonData.jobs
        .map(
          (job) => `
          **Job Title:** ${job.title}
          **Company:** ${job.company}
          **Location:** ${job.location}
          **Description:** ${job.description}
          **Apply Here:** ${job.apply_link}
          ------------------------------
        `
        )
        .join("\n");
    }
  });

  return jobsOutput || "No valid job listings found.";
};

const getJobs = async () => {
  return axios
    .get(url, { headers })
    .then((response) => {
      const extractedJsonList = extractJsonFromHtml(response.data);

      if (extractedJsonList.length > 0) {
        const jobDescriptions = extractJobDescriptions(extractedJsonList);
        console.log("\n=== Job Descriptions ===\n", jobDescriptions);
      } else {
        console.log("No job descriptions found in the response.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

module.exports = { getJobs };
