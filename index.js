//const axios = require('axios');
class MuseumExihibit {
    constructor(id, name, department, year, imageURL) {
        const itemId = id;
        const exhibitName = name;
        const exhibitDepartment = department;
        const exhibitYear = year;
        const exhibitImg = imageURL;
        const listItem = "exhibitItem"
    }
}

fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/111`)
.then(rawData => rawData.json())
.then(data => {
    console.log(data);
    console.log(data.objectID, data.title, data.primaryImageSmall, data.objectEndDate);
    const newExhibitItem = new MuseumExihibit(data.objectID, data.title, data.department, data.objectEndDate, data.primaryImageSmall)
    console.log(newExhibitItem);
    })

function getObjectIds() {
    var objectIdArray;
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
    .then(rawData => rawData.json())
    .then(data => data.objectIDs)
    .then(ids => ids.slice(0, 50))
    .then(firstIds => {
        firstIds.forEach(index => {
            let itemNumber = 1;
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${index}`)
            .then(newData => newData.json())
            .then(jsonData => createExhibitItem(jsonData))
        })
    })
}

function createExhibitItem(apiData) {
    if (apiData.primaryImageSmall.length > 0) {
        let exhibitContainer = document.getElementById('exhibitItems');
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'exhibitItem');
        //newDiv.setAttribute('id', `${itemNumber}`)
        exhibitContainer.appendChild(newDiv);
        let itemName = document.createTextNode(`${apiData.title}`)
        newDiv.appendChild(itemName)
        let newImg = document.createElement('img');
        newImg.setAttribute('src', apiData.primaryImageSmall);
        newImg.setAttribute('alt', 'Picture of Exhibit Item');
        newDiv.addEventListener('click', () => {
            let visitContainer = document.getElementById('visitItems');
            let newerDiv = document.createElement('div');
            newerDiv.setAttribute('class', 'visitItem');
            visitContainer.appendChild(newDiv);
            newerDiv.innerHTML = newDiv.innerHTML;
            let newerImg = document.createElement('img');
            newerImg.setAttribute('src', apiData.primaryImageSmall)
            newerImg.setAttribute('alt', 'Picture of Exhibit Item')
            newerDiv.appendChild(newerImg)
            newerDiv.addEventListener('click', () => {
                newerDiv.remove();
            })
        })
        newDiv.appendChild(newImg);
        //itemNumber++;
    }
}

    // var exhibitItems = document.getElementsByClassName('exhibitItem');
    // console.log(exhibitItems);

    // for (let i = 0; i < exhibitItems.length; i++) {
    // console.log(exhibitItems[i]);
    // exhibitItems[i].addEventListener('click', () => {
    //     console.log('ExhibitItem was clicked');
    //     if (exhibitItems[i].id == 'nonListItem') {
    //         let container = document.getElementsById('visitItems')
    //         let newDiv = document.createElement('div');
    //         newDiv.setAttribute('class', 'visitItem');
    //         newDiv.setAttribute('id', `${exhibitItems[i].id}`);
    //         container.appendchild(newDiv);
    //         newDiv.innerHTML = exhibitItems[i].innerHTML;
    //         let newImg = document.createElement('img')
    //         let imgSrcDiv = exhibitItems[i].querySelector('img')
    //         let imgUrl = imgSrcDiv.src;
    //         console.log(imgUrl);
    //         newImg.setAttribute
    //     }
    //     })
    // }

getObjectIds()