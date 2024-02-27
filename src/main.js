import { getPhotos, totalPages } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import cross from './img/error.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ================================================================ ^ import ^ ======================
export const galleryListEl = document.querySelector('.gallery-list');
export const inputEL = document.querySelector('input');
const formSearchImg = document.querySelector('form');
export const loadMoreImgBtn = document.querySelector('.load-more-img');
export const loaderEl = document.querySelector('.form-container div');
export let loadPageImg = 1;
export let curentSearch;

// ================================================================= ^ var ^ =========================
loadMoreImgBtn.classList.add('hidden');

formSearchImg.addEventListener('submit', handleSearchImg);

function handleSearchImg(event) {
  event.preventDefault();
  curentSearch = inputEL.value;
  galleryListEl.innerHTML = '';

  if (inputEL.value.trim() === '') {
    loadMoreImgBtn.classList.add('hidden');
    return;
  }
  loaderEl.classList.add('loader');

  // ================================================================= ^ button check ^ =====================
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
      loaderEl.classList.remove('loader');
      loadMoreImgBtn.classList.add('hidden');
      return;
    }
    // ======================================================================= ^ pixabay.API ^ =============
    createMarkup(data.hits);
    // ======================================================================= ^ markup ^ ===================
    loadMoreImgBtn.addEventListener('click', addMoreImg);

    function addMoreImg() {
      if (loadPageImg > totalPages) {
        loadMoreImgBtn.classList.add('hidden');
        return iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
          iconUrl: cross,
          messageColor: '#ffffff',
          backgroundColor: '#EF4040',

          messageSize: 16,
          layout: 2,
          maxWidth: 380,
          theme: 'dark',
        });
      }
      loadPageImg += 1;
      getPhotos().then(data => {
        createMarkup(data.hits);
      });
    }
    // ======================================================================= ^ download more img ^ ============
    const lightbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  });
  // ======================================================================= ^ librarys ^ ======================
  formSearchImg.reset();
}
