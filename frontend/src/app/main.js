/*global requirejs*/
(function () {
    'use strict';

    requirejs.config({
        paths: {
            'h': '/bower_components/JSnoX/jsnox',
            '_': '/bower_components/lodash/lodash',
            'react': '/bower_components/react/react-with-addons'
        }
    });

    define(function (require) {
        var React = require('react');
        var h = require('h');

        React.render(
            h('div', 'test'),
            document.getElementById('app')
        );
    });
}());
