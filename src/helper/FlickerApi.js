export function searchPhotos(keyword) {
  const apiKey = 'a6d819499131071f158fd740860a5a88'
  const coordinate = '&lat=40.93&lon=-73.88' // new york 
  const photosSearchURL1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey 
                          + coordinate 
                          + '&format=json&extras=url_m,description&per_page=500&text=' 
                          + keyword + '&nojsoncallback=1'

  const photosSearchURL2 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey 
                          + coordinate 
                          + '&format=json&extras=url_m,description&per_page=500&text=' 
                          + keyword + '&nojsoncallback=1&safe_search=3&radius=32'

  // const photosSearchURL = photosSearchURL1;
  const photosSearchURL = photosSearchURL2;


  return fetch(photosSearchURL)
    .then(response => response.json())
    .then(jsonData => {
      const results = jsonData['photos'] 
      const photos = results['photo'] // photos array 
      console.log(photosSearchURL)
      return photos 
    })
    .catch(err => console.error(err))
}