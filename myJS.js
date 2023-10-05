


document.addEventListener("DOMContentLoaded", function () {


    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    let currPage=1;
    const perPage=10;
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");


    searchForm.addEventListener("submit", async e=> {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const data=await searchFlickr(searchTerm,currPage,perPage);
            displayPhotos(data);

        }
    });


    prevButton.addEventListener("click", async () => {
        if (currPage > 1) {
            currPage--;
            const data = await searchFlickr(searchInput.value.trim(), currPage, perPage);
            displayPhotos(data);
        }
    });

    nextButton.addEventListener("click", async () => {
        currPage++;
        const data=await searchFlickr(searchInput.value.trim(), currPage, perPage);
        displayPhotos(data);
    });

    function ButtonsControl(totalPages) {
        if (currPage > 1) {
            prevButton.style.display = "block";
        } else {
            prevButton.style.display = "none";
        }

        if (currPage < totalPages) {
            nextButton.style.display = "block";
        } else {
            nextButton.style.display = "none";
        }
    }


    function displayPhotos(data){

        const photosArray=data.photos.photo;
        searchResults.innerHTML="";
        photosArray.forEach(photo => {
            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            const img = document.createElement("img");
            img.src = imageUrl;
            searchResults.appendChild(img);
            img.classList.add("photo" ,"search-result");




        });
        ButtonsControl(data.photos.pages);

    }

    // Function to show search results
    function showSearchResults() {
        document.getElementById("search-results").style.display = "block";
        document.getElementById("favorites").style.display = "none";
    }

    // Function to show favorite photos
    function showFavorites() {
        document.getElementById("search-results").style.display = "none";
        document.getElementById("favorites").style.display = "block";
        updateFavoriteUI(); // Update the favorite photos display
    }

    // Event listener for the "Search" link
    const searchLink = document.getElementById("nav-search");
    searchLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSearchResults();
    });

    // Event listener for the "Favorites" link
    const favoritesLink = document.getElementById("nav-favorites");
    favoritesLink.addEventListener("click", (e) => {
        e.preventDefault();
        showFavorites();
    });



});
