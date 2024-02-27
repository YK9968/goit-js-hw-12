import { galleryListEl, loaderEl } from '../main';

export function createMarkup(images) {
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
  galleryListEl.innerHTML = markupImg;
  loaderEl.classList.remove('loader');
}
