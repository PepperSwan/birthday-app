import axios from "axios";

const AIRTABLE_BASE_ID = "appH8tdoGoGypaTDG";  // Replace with your actual Base ID
const AIRTABLE_ACCESS_TOKEN = "patmKgJJByVLLzw24.bea8f05ab4ee6c2f893a67451e648450b639ae9037f1f2fcc3626b5f69b8f982";  // Replace with your token
const TABLE_NAME = "Scores";

export const saveScore = async (userName, score) => {
  try {
    await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        records: [
          {
            fields: {
              "Player": userName,
              "Score": score,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving score:", error);
  }
};
