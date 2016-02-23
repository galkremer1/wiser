import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'lodash';

import routing from './app.config';
import home from './home';

angular.module('wiser', [uirouter, home])
    .config(routing);

angular.module('wiser').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});
