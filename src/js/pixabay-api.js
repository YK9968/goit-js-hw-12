import axios from 'axios';

export const limit = 15;

export async function getPhotos(pageImg, curentImg) {
  const baseUrl = 'https://pixabay.com/api/';
  axios.defaults.baseURL = baseUrl;
  const key = '42471453-a4a004408e33f852748a0909e';
  const typeImg = 'photo';
  const orientationImg = 'horizontal';
  const resultSearch = true;

  const response = await axios.get(baseUrl, {
    params: {
      page: pageImg,
      per_page: limit,
      key: key,
      q: curentImg,
      image_type: typeImg,
      orientation: orientationImg,
      safesearch: resultSearch,
    },
  });
  return response.data;
}
