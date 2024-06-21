/// <reference path="../lib/extjs/dist/js/ext-6.2.0-modern-all.d.ts" />
Ext.application({
    name: 'MyApp',
    launch: () => {


        var container = Ext.getBody();
        //container.setStyle({
        //    width: '100%',
        //    height: '100%',
        //    overflow: 'hidden'
        //});
        var leftUpForm = Ext.create('Ext.form.Panel',
            {
                width: '50%',
                items: [
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Код'
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Наименование'
                }
            ]
        });
        var rightUpForm = Ext.create('Ext.form.Panel',
            {
            items: [
                {
                    xtype: 'checkbox',
                    name: 'safeDeletion',
                    fieldLabel: 'Безопасное удаление'
                },
                {
                    xtype: 'checkbox',
                    name: 'ESign',
                    fieldLabel: 'Электронная подпись',
                },
                {
                    xtype: 'checkbox',
                    name: 'SyncStates',
                    fieldLabel: 'Статусы синхронизации',
                    disabled: true
                }
            ]
        });

        Ext.create('Ext.Panel', {
            renderTo: container,
            layout: 'hbox',
            items: [leftUpForm, rightUpForm,]
        });
        var tree = Ext.create('Ext.tree.Panel', {
            title: 'TreeGrid',
            width: '33%',
            fields: ['name', 'description'],
            columns: [{
                xtype: 'treecolumn',
                text: 'Name',
                dataIndex: 'name',
                width: 150,
                sortable: true
            }, {
                text: 'Description',
                dataIndex: 'description',
                flex: 1,
                sortable: true
            }],
            root: {
                name: 'Root',
                description: 'Root description',
                expanded: true,
                children: [{
                    name: 'Child 1',
                    description: 'Description 1',
                    leaf: true
                },
                    {
                    name: 'Child 2',
                    description: 'Description 2',
                    leaf: true
                }]
            }
        });
        var unknownPanel = Ext.create('Ext.form.Panel', {
            width: '33%',
            items: [
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Блаблабла 1'
                }
            ]
        });
        var detailsPanel = Ext.create('Ext.form.Panel', {
            width: '33%',
            items: [
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Блаблабла 2'
                }
            ]
        });
        Ext.create('Ext.Panel', {
            renderTo: container,
            layout: 'hbox',
            items: [tree, unknownPanel, detailsPanel,]
        });
    }

});