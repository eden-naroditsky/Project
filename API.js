const cacheMemory={}
const apiKey = '00b5bc3025c06669c4aecf0a745e058b';

async function searchFlickr(searchTerm, page, perPage) {

    if (cacheMemory[page]) {
        return cacheMemory[page];
    }
    // Make a request to the Flickr API
    try {
        const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&per_page=${perPage}&page=${page}&sort=relevance&format=json&nojsoncallback=1`);
        // Assuming cacheMemory is available in the scope
        cacheMemory[page] = await response.json();

    } catch (error) {
        console.error("Error fetching data from Flickr:", error);
    }

    return cacheMemory[page];
}