import { getPhotos } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import cross from './img/error.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryListEl = document.querySelector('.gallery-list');
export const inputEL = document.querySelector('input');
const formSearchImg = document.querySelector('form');
export const loadMoreImgBtn = document.querySelector('.load-more-img');
export const loaderEl = document.querySelector('.form-container div');
loadMoreImgBtn.classList.add('hidden');

formSearchImg.addEventListener('submit', handleSearchImg);

function handleSearchImg(event) {
  event.preventDefault();

  galleryListEl.innerHTML = '';

  if (inputEL.value.trim() === '') {
    return;
  }
  loaderEl.classList.add('loader');
  getPhotos().then(data => {
    if (data.total === 0) {
      iziToast.error({
        iconUrl: cross,
        messageColor: '#ffffff',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#EF4040',
        position: 'topRight',
        messageSize: 16,
        layout: 2,
        maxWidth: 380,
        theme: 'dark',
      });
    }

    createMarkup(data.hits);
    const lightbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  });

  formSearchImg.reset();
}
