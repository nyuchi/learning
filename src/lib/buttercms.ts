import Butter from "buttercms";

const apiKey = import.meta.env.ASTRO_APP_BUTTER_CMS_API_KEY;

if (!apiKey) {
  console.warn("ButterCMS API token not set - blog posts from CMS will not be available");
}

const butter = apiKey ? Butter(apiKey) : null;

export default butter;
