import axios from 'axios';

const limit = 15;
export const totalPages = Math.ceil(100 / limit);

import { loadPageImg, curentSearch } from '../main';
export async function getPhotos() {
  const baseUrl = 'https://pixabay.com/api/';
  axios.defaults.baseURL = baseUrl;
  const key = '42471453-a4a004408e33f852748a0909e';
  const typeImg = 'photo';
  const orientationImg = 'horizontal';
  const resultSearch = true;
  console.log(loadPageImg);

  try {
    const response = await axios.get(baseUrl, {
      params: {
        page: loadPageImg,
        per_page: limit,
        key: key,
        q: curentSearch,
        image_type: typeImg,
        orientation: orientationImg,
        safesearch: resultSearch,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
