import { getPhotos } from './js/pixabay-api';
import {
  createMarkup, // function create Markup
  showBigImgLibrary, // function library SimpleLightbox
  showErrorCustom, // function library iziToast
  galleryListEl, // DOM element list
  loadMoreImgBtn, // DOM element button load more img
  loaderEl, // DOM element icon loading before img
  // loadingEl, // DOM element icon loading after click button loadMoreImgBtn
} from './js/render-functions';

// ================================================================ ^ import ^ ======================
const loadingEl = document.querySelector('.loading');
const inputEL = document.querySelector('input');
const formSearchImg = document.querySelector('form');
let loadPageImg = 1;
let curentSearch;

// ================================================================= ^ var ^ =========================
loadMoreImgBtn.classList.add('hidden');

formSearchImg.addEventListener('submit', handleSearchImg);

function handleSearchImg(event) {
  event.preventDefault();
  curentSearch = inputEL.value;
  galleryListEl.innerHTML = '';

  if (inputEL.value.trim() === '') {
    loadMoreImgBtn.classList.add('hidden');
    showErrorCustom('Sorry, input is emty. Please try again!');
    return;
  }
  loaderEl.classList.add('loader');

  // ================================================================= ^ button check ^ =====================
  getPhotos(loadPageImg, curentSearch).then(data => {
    if (data.total === 0) {
      showErrorCustom(
        'Sorry, there are no images matching your search query. Please try again!'
      );

      loaderEl.classList.remove('loader');
      loadMoreImgBtn.classList.add('hidden');
      return;
    }
    // ======================================================================= ^ pixabay.API ^ =============
    createMarkup(data.hits);
    // ======================================================================= ^ markup ^ ===================
    loadMoreImgBtn.addEventListener('click', addMoreImg);

    function addMoreImg() {
      loadingEl.classList.add('loader');
      loadMoreImgBtn.classList.add('hidden');
      loadPageImg += 1;
      getPhotos().then(data => {
        createMarkup(data.hits);
        loadingEl.classList.remove('loader');
        loadMoreImgBtn.classList.remove('hidden');
        if (data.hits.length < 15) {
          loadMoreImgBtn.classList.add('hidden');
          return showErrorCustom(
            "We're sorry, but you've reached the end of search results."
          );
        }
        showBigImgLibrary();
      });
    }
    showBigImgLibrary();
    // ======================================================================= ^ load more img ^ ============
  });
  // ======================================================================= ^ librarys ^ ======================
  formSearchImg.reset();
}
