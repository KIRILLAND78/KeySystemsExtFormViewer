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
    },
    {
        xtype: 'button',
        name: 'd',
        text: 'd',
        height: '20px',
        width: '20px', margin: "5", padding: 0,
        handler: function () {
        }
    },
    {
        xtype: 'button',
        name: 'E',
        text: 'E',
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
                        width: '100%'
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

        var treeStore = Ext.create('Ext.data.TreeStore', {
            root: {
                text: "Логическая структура",
                expanded: true,
                children: [
                    { checked: false, text: "Дата подписания ЭП", leaf: true },
                    { checked: true, text: "Подписанты", leaf: true },
                    { checked: false, text: "Уровни ЭП", leaf: true },
                    { checked: false, text: "Бюджет", leaf: true },
                    { checked: false, text: "Версия", leaf: true },
                    { checked: false, text: "Больше элементов", leaf: true },
                    { checked: false, text: "Больше элементов!", leaf: true },
                    { checked: false, text: "Больше элементов!!", leaf: true },
                    { checked: false, text: "Больше элементов!!!", leaf: true },
                ]
            }
        });
        var treePanel = Ext.create('Ext.tree.Panel', {
            flex: 1,
            frame: true,
            height: '100%',
            rootVisible: true,
            store: treeStore
        });
        var tree = Ext.create('Ext.Panel', {
            title: 'Логическая структура',
            height: '100%', flex: 1,

            frame: true,
            layout: 'vbox',
            items: [
                Ext.create('Ext.Panel', {
                    flex: 1,
                    width: '100%',
                    layout: 'hbox',
                    items: [
                        Ext.create('TreeButtons'),
                        //Ext.create('Ext.Panel', {flex:1})
                        treePanel
                    ]
                }),
                Ext.create('Ext.Panel', {
                    frame: true,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            labelWidth: false,
                            name: 'search',
                            fieldLabel: 'Найти:',
                        },
                        ...buttons.slice(0, 2),
                    ]
                })
            ]
        });


        var unknownPanel = Ext.create('Ext.form.Panel', {
            title: 'Свойства атрибутов', flex: 1, height: '100%',
            layout: 'vbox',
            frame: true,
            items: [Ext.create('Ext.form.Panel', {
                layout: 'hbox',
                items: buttons.slice(0,3),
            }),
                Ext.create('Ext.grid.Panel', {
                    flex: 5,
                    frame: true,
                    width: '100%',
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
                }),
                Ext.create('Ext.Panel', {
                    flex: 1,
                    width: '100%', frame: true
                })
            ]
        })
        var detailsPanel = Ext.create('Ext.tab.Panel', {
            flex: 1,
            height: '100%',
            renderTo: document.body,
            items: [{
                title: 'Контроль уникальности',
                layout: 'vbox',
                tooltip: 'Контроль уникальности',
                frame: true,
                items: [Ext.create('Ext.form.Panel', {
                    layout: 'hbox',
                    items: [...buttons.slice(0, 3),
                    {
                        xtype: 'textfield',
                        labelWidth: false,
                        name: 'filter',
                        fieldLabel: 'Фильтр:',
                    },]
                }),
                        Ext.create('Ext.form.Panel', {
                            width: '100%',
                            flex: 5,
                            frame: true,
                            defaultType: 'checkbox',
                            items: [
                                {
                                    boxLabel: 'Комбинации',
                                    name: 'combination',
                                    inputValue: '1',
                                    margin: '0 0 0 0',
                                },
                                {
                                    boxLabel: 'Комбинации2',
                                    name: 'combination2',
                                    inputValue: '1',
                                    margin: '0 0 0 0',
                                },
                                {
                                    boxLabel: 'Комбинации3',
                                    name: 'combination3',
                                    inputValue: '1',
                                    margin: '0 0 0 0',//вроде как есть defaultMargin
                                }
                            ]
                        }),
                        Ext.create('Ext.form.Panel', {
                            width: '100%',
                            layout: 'vbox',
                            flex: 3,
                            frame: true,
                            items: [
                                Ext.create('Ext.form.Panel', {
                                    layout: 'hbox',
                                    items: buttons.slice(0, 3)
                                }),
                                Ext.create('Ext.form.Panel', {
                                    flex: 3,
                                    width: '100%',
                                    frame: true,
                                }),
                                Ext.create('Ext.form.Panel', {
                                    flex: 2,
                                    width: '100%',
                                    frame: true,
                                }),
                            ]
                        })
                    ]
            }, {
                title: 'Bar',
                tabConfig: {
                    height: '100%',
                    title: 'Протокол',
                    tooltip: 'Протокол',
                    frame: true,
                }
            }]
        });
        
        //раскидывание элементов по местам
        Ext.create('Ext.form.Panel', {
            items: buttons,
            renderTo: container,
        })
        Ext.create('Ext.Panel', {
            height: '100%',
            layout: 'vbox',
            bodyPadding: 10,
            renderTo: container,
            items: [
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