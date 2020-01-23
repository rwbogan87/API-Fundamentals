const baseURL = 'https://api.spacexdata.com/v3/rockets';

const searchForm = document.querySelector('form');
const spaceships = document.querySelector('ul');

searchForm.addEventListener('submit', fetchRockets);

function fetchRockets(event) {
    event.preventDefault();
    // console.log(event);

    fetch(baseURL)
        .then(results => results.json())
        .then(json => displayRockets(json))
}

function displayRockets(json) {
    console.log("Results:", json);
    json.forEach(rocket => {
        // console.log(rocket);
        let rocketName = document.createElement('li');
        let rocketWiki = document.createElement('a');
        rocketWiki.innerText = rocket.rocket_name;
        rocketWiki.setAttribute('href', `${rocket.wikipedia}`);
        rocketName.appendChild(rocketWiki);
        spaceships.appendChild(rocketName);
    })
}