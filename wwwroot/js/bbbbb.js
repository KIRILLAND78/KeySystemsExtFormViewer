/// <reference path="../lib/extjs/dist/js/ext-all-debug.js" />
Ext.onReady(function () {
    var panel = Ext.create('Ext.Panel', {
        title: 'Test Panel',
        html: 'Hello, Ext JS!'
    });
    panel.render(document.body);
});
