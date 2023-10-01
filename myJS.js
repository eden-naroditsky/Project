document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '00b5bc3025c06669c4aecf0a745e058b';
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    let searchResults = document.getElementById("search-results");

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchFlickr(apiKey, searchTerm);
        }
    });

    function searchFlickr(apiKey, searchTerm) {
        // Make a request to the Flickr API
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&per_page=10&sort=relevance&format=json&nojsoncallback=1`)
            .then(response => response.json())
            .then(data => {
                const photos = data.photos.photo;
                searchResults.innerHTML = ""; // Clear previous results
                photos.forEach(photo => {
                    const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    searchResults.appendChild(img);

                });

            })
            .catch(error => console.error("Error fetching data from Flickr:", error));
    }

});
