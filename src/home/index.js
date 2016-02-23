import angular from 'angular';
import uirouter from 'angular-ui-router';

import './home.less';
import routing from './home.routes';
import HomeController from './home.controller';

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
function startFrom() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
}

export default angular.module('wiser.home', [uirouter])
  .config(routing)
  .controller('HomeController', HomeController)
  .filter('startFrom', startFrom)
  .name;
