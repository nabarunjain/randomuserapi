

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
const cardTemplate = document.querySelector('[data-card-template]');
const cardContainer = document.querySelector('[data-card-container]');

let users = [];

document.querySelector('.shBtn').addEventListener('click', () => {
    console.log(users);
})

SearchButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture,email,location&results='+SearchBar.value,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            const dataRes = data.results;
            /*for( i=0; i<SearchBar.value; i++)
            {
                const card = cardTemplate.content.cloneNode(true).children[0]; 
                const cardName = card.querySelector('[data-name]');
                const cardMail = card.querySelector('[data-mail]');
                const cardLocation = card.querySelector('[data-location]');
                const cardImg = card.querySelector('[data-img]')
                cardName.textContent = dataRes[i].name.title +" " +dataRes[i].name.first+" "+dataRes[i].name.last;
                cardMail.textContent = dataRes[i].email;
                cardLocation.textContent = "I am from "+dataRes[i].location.state;
                cardImg.src = dataRes[i].picture.medium;
                cardContainer.append(card);
            }*/
            users = dataRes.map(user => {
                const card = cardTemplate.content.cloneNode(true).children[0]; 
                const cardName = card.querySelector('[data-name]');
                const cardMail = card.querySelector('[data-mail]');
                const cardLocation = card.querySelector('[data-location]');
                const cardImg = card.querySelector('[data-img]')
                cardName.textContent = user.name.title +" " +user.name.first+" "+user.name.last;
                cardMail.textContent = user.email;
                cardLocation.textContent = "I am from "+user.location.state;
                cardImg.src = user.picture.medium;
                cardContainer.append(card);
                return {first:user.name.first, title:user.name.title, last:user.name.last, email:user.email, picture:user.picture.medium, element : card};
            });
        }
    })
})