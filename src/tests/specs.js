import expect from 'expect.js';

import HomeController from '../home/home.controller';

describe('home-controller', () => {
    it('should verify component loads correctly ', () => {
        const component = new HomeController();
        expect(component).to.be.ok();
    });

    it('should verify items are defined', () => {
        const component = new HomeController();
        expect(component.items).to.be.ok();
        expect(component.items.length).to.be(1000);
    });
    it('should verify items properties are defined correctly', () => {
        const component = new HomeController();
        expect(typeof(component.items[1].name)).to.be('string');
        expect(typeof(component.items[1].sku)).to.be('number');
        expect(typeof(component.items[1].price)).to.be('number');
        expect(typeof(component.items[1].category)).to.be('string');
    });

    it('should verify pages are defined correctly', () => {
        const component = new HomeController();
        expect(component.currentPage).to.be(1);
        expect(component.getPages().length).to.be(5);
    });

    it('should verify table sorting is defined correctly', () => {
        const component = new HomeController();
        component.sortTableBy('key');
        expect(component.sortKey).to.be('key');
        component.sortTableBy('key');
        expect(component.sortDirection).to.be(-1);
        component.sortTableBy('key2');
        expect(component.sortDirection).to.be(1);

    });

    it('should verify item editing is defined correctly', () => {
        const component = new HomeController();
        expect(component.items[1].editing).to.be(false);
        component.editItem(component.items[1]);
        expect(component.items[1].editing).to.be(true);
        component.doneEditing(component.items[1]);
        expect(component.items[1].editing).to.be(false);
    });

    it('should verify setting pages is defined correctly', () => {
        const component = new HomeController();
        component.getPages();
        component.setPage(component.numPages);
        expect(component.currentPage).to.be(component.numPages);
        component.setPage(component.numPages+10);
        expect(component.currentPage).to.be(component.numPages);
        component.setPage(-5);
        expect(component.currentPage).to.be(1);
    });

});
