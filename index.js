//const axios = require('axios');
class MuseumExhibit {
    constructor(id, name, department, year, imageURL, credit = 'Source unkown') {
        this.itemId = id;
        this.exhibitName = name;
        this.exhibitDepartment = department;
        this.exhibitYear = year;
        this.exhibitImg = imageURL;
        // this.exhibitCredit = credit;
        if (typeof credit != 'undefined') {
            this.exhibitCredit = credit;
        } else {
            this.exhbitCredit = 'Source unkown'
        }
    }

    populateExhibitItem() {
        if (this.exhibitImg.length > 0 && !(exhibitItems.includes(this.itemId))) {
            exhibitItems.push(this.itemId);
            let exhibitContainer = document.getElementById('exhibitItems');
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'exhibitItem');
            exhibitContainer.appendChild(newDiv);
            let itemName = document.createElement('h3');
            itemName.innerHTML = this.exhibitName;
            newDiv.appendChild(itemName);
            let newImg = document.createElement('img');
            newImg.setAttribute('src', this.exhibitImg);
            newImg.setAttribute('alt', 'Picture of Exhibit Item');
            newDiv.appendChild(newImg);
            let itemDescription = document.createElement('ul');
            itemDescription.setAttribute('id', 'description');
            let itemDepartment = document.createElement('li')
            itemDepartment.textContent = this.exhibitDepartment;
            itemDescription.appendChild(itemDepartment)
            let itemYear = document.createElement('li');
            itemYear.textContent = this.exhibitYear;
            itemDescription.appendChild(itemYear);
            let itemCredit = document.createElement('li');
            itemCredit.textContent = this.exhibitCredit;
            itemDescription.appendChild(itemCredit);
            newDiv.appendChild(itemDescription);
            newDiv.addEventListener('click', () => {
                this.populateVisitItem()
            })
        }
    }

    populateVisitItem() {
        if (this.exhibitImg.length > 0 && !(visitItems.includes(this.itemId))) {
            if (!(visitItems.includes(this.itemId))) {
                visitItems.push(this.itemId);
                visitCounter.innerHTML++;
            }
            let exhibitContainer = document.getElementById('visitItems');
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'visitItem');
            exhibitContainer.appendChild(newDiv);
            let itemName = document.createElement('h3');
            itemName.innerHTML = this.exhibitName;
            newDiv.appendChild(itemName);
            let newImg = document.createElement('img');
            newImg.setAttribute('src', this.exhibitImg);
            newImg.setAttribute('alt', 'Picture of Visit Item');
            newDiv.appendChild(newImg);
            let itemDescription = document.createElement('ul');
            itemDescription.setAttribute('id', 'description');
            let itemDepartment = document.createElement('li')
            itemDepartment.textContent = this.exhibitDepartment;
            itemDescription.appendChild(itemDepartment)
            let itemYear = document.createElement('li');
            itemYear.textContent = this.exhibitYear;
            itemDescription.appendChild(itemYear);
            let itemCredit = document.createElement('li');
            itemCredit.textContent = this.exhibitCredit;
            itemDescription.appendChild(itemCredit);
            newDiv.appendChild(itemDescription);
            let visitButton = document.createElement('button')
            visitButton.setAttribute('type', 'submit');
            visitButton.textContent = 'Visited';
            visitButton.addEventListener('click', () => {
                newDiv.remove()
                this.populateVisitedItem()
                visitCounter.innerHTML--;
            })
            newDiv.appendChild(visitButton);
            let removeButton = document.createElement('button')
            removeButton.setAttribute('type', 'submit');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                visitItems.pop(this.itemId)
                newDiv.remove()
                visitCounter.innerHTML--;
            })
            newDiv.appendChild(removeButton);
           
        }
    }

    populateVisitedItem() {
        if (this.exhibitImg.length > 0 && !(visitedItems.includes(this.itemId))) {
            if (!(visitedItems.includes(this.itemId))) {
                visitedItems.push(this.itemId);
                visitedCounter.innerHTML++;
            }
            let visitedContainer = document.getElementById('visitedItems');
            let visitedDiv = document.createElement('div');
            visitedDiv.setAttribute('class', 'exhibitItem');
            visitedContainer.appendChild(visitedDiv);
            let itemName = document.createElement('h3');
            itemName.innerHTML = this.exhibitName;
            visitedDiv.appendChild(itemName);
            let newImg = document.createElement('img');
            newImg.setAttribute('src', this.exhibitImg);
            newImg.setAttribute('alt', 'Picture of Visit Item');
            visitedDiv.appendChild(newImg);
            let itemDescription = document.createElement('ul');
            itemDescription.setAttribute('id', 'description');
            let itemDepartment = document.createElement('li')
            itemDepartment.textContent = this.exhibitDepartment;
            itemDescription.appendChild(itemDepartment)
            let itemYear = document.createElement('li');
            itemYear.textContent = this.exhibitYear;
            itemDescription.appendChild(itemYear);
            let itemCredit = document.createElement('li');
            itemCredit.textContent = this.exhibitCredit;
            itemDescription.appendChild(itemCredit);
            visitedDiv.appendChild(itemDescription);
            let visitedButton = document.createElement('button')
            visitedButton.setAttribute('type', 'submit');
            visitedButton.textContent = 'Remove';
            visitedDiv.appendChild(visitedButton);
            visitedButton.addEventListener('click', () => {
                visitedItems.pop(this.itemId)
                visitedDiv.remove()
                visitedCounter.innerHTML--;
            })

        }
    }
}

let newExhibitItem;
let exhibitItems = [];
let visitItems = [];
let visitedItems = [];
let visitCounter = document.getElementById('visitCounter')
visitCounter.innerHTML = 0;
let visitedCounter = document.getElementById('visitedCounter')
visitedCounter.innerHTML = 0;

function getObjectIds() {

    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
        .then(rawData => rawData.json())
        .then(data => data.objectIDs)
        .then(ids => ids.slice(0, 50))
        .then(firstIds => firstIds.forEach(index => createExhibitObject(index)))
}

function createExhibitObject(index) {
    let newExhibitItem;
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${index}`)
    .then(rawData => rawData.json())
    .then(data => {
        //console.log(data);
        //console.log(data.objectID, data.title, data.primaryImageSmall, data.objectEndDate);
        newExhibitItem = new MuseumExhibit(data.objectID, data.title, data.department, data.objectEndDate, data.primaryImageSmall)
        newExhibitItem.populateExhibitItem();
        })
}

getObjectIds()

let searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', () => {
    let searchId = document.getElementById('itemSearch').value;
    console.log(searchId);
    createExhibitObject(searchId);
})

// let visitLink = document.getElementById('visitLink')
// visitLink.addEventListener('Click', () => {
//     visitItems.forEach(id => {
//         createExhibitObject(id);
//         this.populateVisitItem();
//     })
// })