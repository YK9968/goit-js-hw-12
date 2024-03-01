import { getPhotos, limit } from './js/pixabay-api';
import {
  renderMarkup, // function create Markup
  showErrorCustom, // function library iziToast
} from './js/render-functions';
import cross from './img/error.svg';
import { lightbox } from './js/create-modal-img';

// ================================================================ ^ import ^ ======================
const loadingAfterImgEl = document.querySelector('.loading');
const loadingBeforeImgEl = document.querySelector('.form-container div');
const inputEL = document.querySelector('input');
const formSearchImg = document.querySelector('form');
const loadMoreImgBtn = document.querySelector('.load-more-img');
const galleryListEl = document.querySelector('.gallery-list');
let loadPageImg = 1;
let curentSearch;

// ================================================================= ^ var ^ =========================
loadMoreImgBtn.classList.add('hidden');

formSearchImg.addEventListener('submit', handleSearchImg);

function handleSearchImg(event) {
  event.preventDefault();
  loadPageImg = 1;
  curentSearch = inputEL.value;
  galleryListEl.innerHTML = '';

  if (inputEL.value.trim() === '') {
    loadMoreImgBtn.classList.add('hidden');
    showErrorCustom('Sorry, input is emty. Please try again!', '#FFA000');
    return;
  }
  loadingBeforeImgEl.classList.add('loader');

  // ================================================================= ^ button check ^ =====================

  async function fetchData() {
    try {
      const data = await getPhotos(loadPageImg, curentSearch);
      if (data.total === 0) {
        showErrorCustom(
          'Sorry, there are no images matching your search query. Please try again!',
          '#EF4040',
          cross
        );
        loadingBeforeImgEl.classList.remove('loader');
        loadMoreImgBtn.classList.add('hidden');
        return;
      }
      renderMarkup(data.hits, galleryListEl);
      loadingBeforeImgEl.classList.remove('loader');
      loadMoreImgBtn.classList.remove('hidden');

      lightbox.refresh();
    } catch (error) {
      showErrorCustom('Something went wrong.Please try later');
    }
  }
  fetchData();
  // ======================================================================= ^ librarys ^ ======================
  formSearchImg.reset();
}

loadMoreImgBtn.addEventListener('click', addMoreImg);

async function addMoreImg() {
  loadPageImg += 1;
  loadingAfterImgEl.classList.add('loader');
  loadMoreImgBtn.classList.add('hidden');
  try {
    const data = await getPhotos(loadPageImg, curentSearch);
    renderMarkup(data.hits, galleryListEl);
    loadingBeforeImgEl.classList.remove('loader');
    loadingAfterImgEl.classList.remove('loader');
    loadMoreImgBtn.classList.remove('hidden');
    // const galleryListItemEl = document.querySelector('.image-items');
    // let rect = galleryListItemEl.getBoundingClientRect();
    window.scrollBy({
      top: 575.6666870117188,
      behavior: 'smooth',
    });
    if (data.hits.length < limit) {
      loadMoreImgBtn.classList.add('hidden');
      return showErrorCustom(
        "We're sorry, but you've reached the end of search results.",
        '#0071BD'
      );
    }
    lightbox.refresh();
  } catch (error) {
    loadingAfterImgEl.classList.remove('loader');
    showErrorCustom('You have more 100 requests per minute.Please try later');
  }
}
