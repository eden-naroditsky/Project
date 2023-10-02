document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '00b5bc3025c06669c4aecf0a745e058b';
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    let currPage=1;
    const perPage=10;

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            currPage=1
            searchFlickr(apiKey, searchTerm);
        }
    });

    function searchFlickr(apiKey, searchTerm) {
        // Make a request to the Flickr API
        const page=currPage;
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&per_page=${perPage}&page=${page}&sort=relevance&format=json&nojsoncallback=1`)
            .then(response => response.json() )
            .then(data => {
                console.log(data);
                const photos = data.photos.photo;
                searchResults.innerHTML = ""; // Clear previous results
                photos.forEach(photo => {
                    const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    searchResults.appendChild(img);
                    img.classList.add("photo");
                    img.classList.add("search-result")
                    addPaginationControls(data.photos.pages);

                });

            })
            .catch(error => console.error("Error fetching data from Flickr:", error));
    }

    function addPaginationControls(totalPages) {
        // Create pagination controls (Next and Previous buttons)
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        if (currPage > 1) {
            const prevButton = document.createElement("button");
            prevButton.id="prev"
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => {
                currPage--;
                searchFlickr(apiKey, searchInput.value.trim());
            });

            paginationContainer.appendChild(prevButton);
        }

        if (currPage < totalPages) {
            const nextButton = document.createElement("button");
            nextButton.id="next";
            nextButton.textContent = "Next";
            nextButton.addEventListener("click", () => {
                currPage++;
                searchFlickr(apiKey, searchInput.value.trim());
            });
            paginationContainer.appendChild(nextButton);
        }
    }

});
