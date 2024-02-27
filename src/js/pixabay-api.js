import axios from 'axios';
import { inputEL, loadMoreImgBtn } from '../main';
import { createMarkup } from './render-functions';

export async function getPhotos() {
  const baseUrl = 'https://pixabay.com/api/';
  axios.defaults.baseURL = baseUrl;
  const limit = 15;
  let loadPageImg = 1;
  console.log(loadPageImg);
  const key = '42471453-a4a004408e33f852748a0909e';
  const query = inputEL.value;
  const typeImg = 'photo';
  const orientationImg = 'horizontal';
  const resultSearch = true;

  try {
    const response = await axios.get(baseUrl, {
      params: {
        page: loadPageImg,
        per_page: limit,
        key: key,
        q: query,
        image_type: typeImg,
        orientation: orientationImg,
        safesearch: resultSearch,
      },
    });

    loadMoreImgBtn.addEventListener('click', updateImgList);

    function updateImgList() {
      console.log(response.data.hits);
      loadPageImg += 1;
      createMarkup(response.data.hits);
    }
    console.log(response.data.hits);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
