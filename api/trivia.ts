import axios from 'axios';

export const triviaBaseInstance = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});
export const triviaCategoryInstance = axios.create({
  baseURL: 'https://opentdb.com/api_category.php',
  params: { encode: 'base64' },
});
