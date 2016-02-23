import _ from 'lodash';

const categories = [
    'Cell Phones & Accessories',
    'Sports and Outdoors',
    'Electronics',
    'Toys And Hobbies',
    'Clothing and Apparel',
    'Bags and shoes',
    'Home and garden',
    'Jewelry and Watches'
];

const products =  [
    "Chair",
    "Car",
    "Computer",
    "Keyboard",
    "Mouse",
    "Bike",
    "Ball",
    "Gloves",
    "Pants",
    "Shirt",
    "Table",
    "Shoes",
    "Hat",
    "Towels",
    "Soap",
    "Tuna",
    "Chicken",
    "Fish",
    "Cheese",
    "Bacon",
    "Pizza",
    "Salad",
    "Sausages",
    "Chips"
];

function getRandomItems(count = 1000) {
    const items = [];
    for (let i = 1; i<= count; ++i) {
        const sku = i;
        const name = _.sample(products);
        const price = _.random(1, 10000);
        const category = _.sample(categories);
        const editing = false;
        items.push({
            sku, name, price, category, editing
        });
    }
    return items;
}

function countItems (arr, selectedCategory) {
    var count = 0;
    for (var i=0; i<arr.length; i++) {
        if (arr[i].category === selectedCategory) count++;
    }
    return count;
}


function sortArray(a, par, direction) {
    var swapped;
    if (par === 'name' || par === 'category') {
        if (direction===1) {
            a.sort(function(f,s){return f[par].localeCompare(s[par]); });
        }
        else {
            a.sort(function(f,s){return s[par].localeCompare(f[par]); });
        }
    }
    else {
        if (direction===1) {
            a.sort(function(f, s) {
                return parseFloat(f[par]) - parseFloat(s[par]);
            });
        }
        else {
            a.sort(function(f, s) {
                return parseFloat(s[par]) - parseFloat(f[par]);
            });
        }
    }

}


export default class HomeController {
    constructor() {
        this.items = getRandomItems(1000);
        this.sortKey =  'name';
        this.categories = categories;
        this.pageSize = 20;
        this.currentPage = 1;
        this.sortDirection = 1;
        sortArray(this.items, this.sortKey, this.sortDirection);
    }

    sortTableBy(key) {

        if (this.sortKey === key) {
             this.sortDirection *= -1 ;
        }
        else {
            this.sortDirection = 1;
        }

        sortArray(this.items, key, this.sortDirection);

        this.sortKey = key;

    }

    getPages() {
        var numPages;
        if (this.selectedCategory) {
            numPages = Math.ceil(countItems(this.items, this.selectedCategory)/this.pageSize-1);
        }
        else {
             numPages = Math.ceil(this.items.length / this.pageSize-1);
        }
        if (numPages<this.currentPage) {
            this.currentPage = 1;
        }
        var pages = [];
        var startPage = Math.max(this.currentPage-2,1);
        var endPage = Math.min(numPages, startPage+4);
        this.numPages = numPages;
        for (var i = startPage; i<=endPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    setPage(page) {
        if (page <= (this.numPages)) {
            this.currentPage = Math.max(page,1);
        }
    }

    editItem(item) {
        if (!this.editing) {
            item.editing = true;
            this.editing = true;
        }

    }

    doneEditing(item) {
        item.editing = false;
        this.editing = false;
    }

    setItemsPerPage(itemsPerPage) {
        this.pageSize = itemsPerPage;
    }


}
