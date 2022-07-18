const API_KEY = '27574969-e5fa37593c412d62423f6ba4e';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const fetchImages = (name, page) => {
  const headers = {
    image_type: 'photo',
    orientation: 'horizontal',
  };

  return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&per_page=${PER_PAGE}`, headers)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Wrong image name'));
    })
    .then(data =>
      data.hits.map(({ tags, webformatURL, largeImageURL, id }) => ({
        tags,
        webformatURL,
        largeImageURL,
        id,
      }))
    )
    .catch(error => console.log(error));
};
export default fetchImages;
