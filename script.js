

window.onload = function() {
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture',
        dataType: 'json',
        success: function(data) {
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

function displayShorted() {
    cardContainer.innerHTML = '';
    users.forEach(user => {
        const card = cardTemplate.content.cloneNode(true).children[0]; 
        const cardName = card.querySelector('[data-name]');
        const cardMail = card.querySelector('[data-mail]');
        const cardLocation = card.querySelector('[data-location]');
        const cardImg = card.querySelector('[data-img]')
        cardName.textContent = user.title +" " +user.first+" "+user.last;
        cardMail.textContent = user.email;
        cardLocation.textContent = "I am from "+user.location;
        cardImg.src = user.picture;
        cardContainer.append(card);
    })
}

function shortMail(a,b){
    const mailA = a.email.toUpperCase();
    const mailB = b.email.toUpperCase();
    if(mailA<mailB){
        return -1;
    }
    if(mailA>mailB){
        return 1;
    }

    return 0;
}

function shortName(a,b){
    const nameA = a.first.toUpperCase();
    const nameB = b.first.toUpperCase();
    if(nameA<nameB) {
        return -1;
    }
    if(nameA>nameB) {
        return 1;
    }

    return 0;
}

document.querySelector('.mailshBtn').addEventListener('click', () => {
    console.log(users);
    users.sort(shortMail);
    displayShorted();
    console.log(users);
})

document.querySelector('.mailshZBtn').addEventListener('click', () => {
    users.sort(shortMail);
    users.reverse();
    displayShorted();
})

document.querySelector('.shBtn').addEventListener('click', () => {
    users.sort(shortName);
    displayShorted();
})

document.querySelector('.shZBtn').addEventListener('click', () => {
    users.sort(shortName);
    users.reverse();
    displayShorted();
})

SearchButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    $.ajax({
        url: 'https://randomuser.me/api/?inc=name,picture,email,location&results='+SearchBar.value,
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            const dataRes = data.results;
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
                return {first:user.name.first, title:user.name.title, last:user.name.last, location:user.location.state, email:user.email, picture:user.picture.medium, element : card};
            });
        }
    })
})