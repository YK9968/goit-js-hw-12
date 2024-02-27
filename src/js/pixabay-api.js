import { inputEL } from '../main';
import axios from 'axios';

export function getPhotos() {
  const key = '42471453-a4a004408e33f852748a0909e';
  const baseUrl = 'https://pixabay.com/api/';
  const query = inputEL.value;
  const typeImg = 'photo';
  const orientationImg = 'horizontal';
  const resultSearch = true;
  const searchLink = `${baseUrl}?key=${key}&q=${query}&image_type=${typeImg}&orientation=${orientationImg}&safesearch=${resultSearch}`;

  return fetch(searchLink)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Problem ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.log(error);
    });
}
