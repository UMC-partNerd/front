import axios from "axios";

const API_BASE_URL = "https://api.partnerd.site";

const getImageUrl = async (thumbnailKeyName) => {
  return `https://www.partnerd.site/${thumbnailKeyName}`;
};
