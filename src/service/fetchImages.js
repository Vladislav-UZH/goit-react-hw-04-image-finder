import axios from 'axios';
const params = {
  key: '31547025-6e47633566ca913046836177e',
  options: '&image_type=photo&orientation=horizontal&safesearch=true',
};
axios.defaults.baseURL = 'https://pixabay.com/api/';
export async function fetchImages(query, page) {
  const resp = await axios.get(
    `?key=${params.key}&q=${query}${params.options}&per_page=12&page=${page}`
  );
  return resp.data;
}
