/// <reference path="../lib/extjs/dist/js/ext-6.2.0-modern-all.d.ts" />

var buttons = [
    {
        xtype: 'button',
        name: 'A',
        text: 'A',
        height: '20px',
        width: '20px', margin: "5", padding: 0,
        handler: function () {
        }
    },
    {
        xtype: 'button',
        name: 'B',
        text: 'B',
        height: '20px',
        width: '20px', margin: "5", padding: 0,
        handler: function () {
        }
    },
    {
        xtype: 'button',
        name: 'C',
        text: 'C',
        height: '20px',
        width: '20px', margin: "5", padding: 0,
        handler: function () {
        }
    }
];
Ext.define('TreeButtons', {
    extend: 'Ext.Panel',
    height: "100%",
    layout: 'vbox',
    bodyPadding: '10px',
    items: buttons
})
Ext.application({
    name: 'MyApp',
    launch: () => {


        var container = Ext.get('KSExtApp');
        console.log(container);
        container.setStyle({
            width: '100%',
            height: '100%'
        });
        var leftUpForm = Ext.create('Ext.form.Panel',
            {
                width: '70%',
                layout: 'vbox',
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'code',
                        fieldLabel: 'Код',
                        width:'100%'
                    },
                    {
                        xtype: 'textarea',
                        name: 'name',
                        fieldLabel: 'Наименование',
                        width: '100%'
                    }
            ]
        });
        var rightUpForm = Ext.create('Ext.form.Panel',
            {
            layout: 'vbox',
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

        var tree = Ext.create('Ext.Panel', {
            title: 'Логическая структура',
            height: '100%', flex: 1,
            layout: 'hbox',
            items: [
                Ext.create('TreeButtons'),
                Ext.create('Ext.tree.Panel', {
                    flex:1,
                    height: "100%", 
                    rootVisible: true,
                    store:
                        Ext.create('Ext.data.TreeStore', {
                            root: {
                                text: "Логическая структура",
                                expanded: true,
                                children: [
                                    { text: "Data подписания ЭП", leaf: true },
                                    { text: "Подписанты", leaf: true },
                                    { text: "Уровни ЭП", leaf: true },
                                    { text: "Бюджет", leaf: true },
                                    { text: "Версия", leaf: true },
                                ]
                            }
                        })
            })
            ]
        });

        var unknownPanel = Ext.create('Ext.form.Panel', {
            title: 'Свойства атрибутов', flex: 1,
            items: [Ext.create('Ext.form.Panel', {
                layout: 'hbox',
                items: buttons,
            }),
                Ext.create('Ext.grid.Panel', {
                store: Ext.create('Ext.data.Store', {
                    fields: ['name', 'value'],
                    data: [
                        { 'name': 'Атрибут1', 'value': 'Значение1' },
                        { 'name': 'Атрибут2', 'value': 'Значение2' }
                    ]
                }),
                columns: [
                    { text: 'Attribute', dataIndex: 'name' },
                    { text: 'Value', dataIndex: 'value', flex: 1 }
                ],
            })]
        })
            
        var detailsPanel = Ext.create('Ext.form.Panel', {
            title: 'Контроль уникальности',
            flex: 1,
            bodyPadding: 10,
            defaultType: 'checkbox',
            items: [
                {
                    boxLabel: 'Комбинации',
                    name: 'combination',
                    inputValue: '1'
                }
            ]
        });
        var upPanel = Ext.create('Ext.form.Panel', {
            items: buttons,
        })
        //раскидывание элементов по местам
        Ext.create('Ext.Panel', {
            height: '100%',
            layout: 'vbox',
            renderTo: container,
            items: [upPanel,
                Ext.create('Ext.Panel', {
                layout: 'hbox',
                width: "100%",
                items: [leftUpForm, rightUpForm]
            }),
                Ext.create('Ext.Panel', {
                    layout: 'hbox',
                    width: "100%",
                    flex: 1,
                    items: [tree, unknownPanel, detailsPanel]
                })
            ]
        })
    }

});