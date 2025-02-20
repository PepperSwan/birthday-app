import axios from "axios";

const AIRTABLE_BASE_ID = "appigcwnmVUYrxFDm";  // Replace with your actual Base ID
const AIRTABLE_ACCESS_TOKEN = "path2oRCJolHrTKBS.258a39190ed8b62a5a4eb7ed2e7a99b478b881cc1ab48b0290e88bf1738e10b0";  // Replace with your token
const TABLE_NAME = "Results";

export const saveResults = async (userName, results) => {
  try {
    const records = results.map(result => ({
      fields: {
        "ImageID": result.id,
        "Player": userName,
        "Guess": parseInt(result.guess),
        "Actual": result.age
      }
    }));
    
    await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      { records },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving results:", error);
  }
};
