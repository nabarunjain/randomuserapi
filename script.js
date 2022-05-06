

window.onload = function() {
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            const dataRes = data.results;
            const name = "Heyy "+dataRes[0].name.first;
            const image = dataRes[0].picture.large;
            const imageContainer = document.querySelector('.visitorImg');
            let img = document.createElement("img");
            img.src = image;
            imageContainer.appendChild(img);
            document.querySelector('.name-container h1').append(name);
        }
    })
}

const SearchButton = document.querySelector('.searchButton');
const SearchBar = document.querySelector('.searchBar');
const cardTemplate = document.querySelector('[data-card-template]')

SearchButton.addEventListener('click', () => {
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture&results='+SearchBar.value,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            const dataRes = data.results;
            for( i=0; i<SearchBar.value; i++)
            {
                const card = cardTemplate.content.cloneNode(true).children[0]; 
                console.log(dataRes[i]);
            }
        }
    })
})