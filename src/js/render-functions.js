import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import cross from '../img/error.svg';
// ================================================================ ^ import ^ ======================

export function createMarkup(images, domEl) {
  const markupImg = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-search">
        <a href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
        </a>
        <ul class="gallery-image-info">
          <li class="image-items">
            <p class="image-info-items"><span class="image-items-text">Likes</span>${likes}</p>
            <p class="image-info-items"><span class="image-items-text">Views</span>${views}</p>
            <p class="image-info-items"><span class="image-items-text">Comments</span>${comments}</p>
            <p class="image-info-items"><span class="image-items-text">Downloads</span>${downloads}</p>
          </li>
        </ul>
      </li>`;
      }
    )
    .join('');
  domEl.insertAdjacentHTML('beforeend', markupImg);
}

export function showBigImgLibrary() {
  const lightbox = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function showErrorCustom(message) {
  iziToast.error({
    position: 'topRight',
    message: message,
    iconUrl: cross,
    messageColor: '#ffffff',
    backgroundColor: '#EF4040',
    messageSize: 16,
    layout: 2,
    maxWidth: 380,
    theme: 'dark',
  });
}
