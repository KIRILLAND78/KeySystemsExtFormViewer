﻿/// <reference path="../lib/extjs/dist/js/ext-all-debug.js" />
/// <reference path="../lib/extjs/dist/js/ext-all-debug.d.ts" />
Ext.application({
    name: 'MyApp',
    launch: () => {
        var container = Ext.getBody();
        container.setStyle({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        });
        Ext.create('Ext.Button', {
            text: 'Завершить работу (удалить куки)',
            renderTo: Ext.getBody(),
            margin: 40,
            handler: () => {
                Ext.Ajax.request({
                    url: 'https://localhost:7004/token/delete',
                    method: 'POST',
                }).then(() => {
                    window.location.reload();
                });
            }
        });
        Ext.Ajax.request({
            url: '/isToken',
            method: 'GET',
            success: (response) => {
                var hasToken = response.responseText === 'true';

                if (!hasToken) {
                    var passwordWindow = Ext.create('Ext.window.Window', {
                        title: 'Введите пароль',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Пароль',
                            id: 'passwordField',
                        }, {
                            xtype: 'button',
                            text: 'OK',
                            handler: () => {
                                let password = {
                                    jwtKey: Ext.getCmp('passwordField').getValue()
                                };
                                var json = JSON.stringify(password);

                                Ext.Ajax.request({
                                    url: '/token',
                                    method: 'POST',
                                    jsonData: json
                                }).then(() => {
                                    window.location.reload();
                                    passwordWindow.close();
                                });
                            }
                        }],
                        padding: 20
                    });
                    passwordWindow.show();
                }
            },
            failure: (response) => {
                console.error('Ошибка при проверке наличия токена:', response);
            }
        });

        Ext.define('Report', {
            extend: 'Ext.data.Model',
            fields: [
                'ReportId', 'Server', 'DataBase', 'UserName', 'UserPassword', 'DataSourceType',
                'FileQueryColName', 'FileQueryOutputColName', 'FileQueryTempPath',
                'DefaultComplex', 'PivotCol', 'PivotCols', 'PivotData', 'PivotRows',
                'UsePivotData'
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            sorters: [{
                property: 'ReportId'
            }],
            model: 'Report',
            proxy: {
                type: 'rest',
                url: '/xml/api/Reports',
                reader: {
                    type: 'json',
                    rootProperty: 'DataList'
                },
                wrter: {
                    type: 'json'
                }
            },
            autoLoad: true
        });


        var grid = Ext.create('Ext.grid.Panel', {
            title: 'Reports',
            store: store,
            columns: [
                { text: 'ReportId', dataIndex: 'ReportId', editor: 'textfield', flex: 1 },
                { text: 'Server', dataIndex: 'Server', editor: 'textfield', flex: 1 },
                { text: 'DataBase', dataIndex: 'DataBase', editor: 'textfield', flex: 1 },
                { text: 'UserName', dataIndex: 'UserName', editor: 'textfield', flex: 1 },
                { text: 'UserPassword', dataIndex: 'UserPassword', editor: 'textfield', flex: 1 },
                { text: 'DataSourceType', dataIndex: 'DataSourceType', editor: 'textfield', flex: 1 },
                { text: 'FileQueryColName', dataIndex: 'FileQueryColName', editor: 'textfield', flex: 1 },
                { text: 'FileQueryOutputColName', dataIndex: 'FileQueryOutputColName', editor: 'textfield', flex: 1 },
                { text: 'FileQueryTempPath', dataIndex: 'FileQueryTempPath', editor: 'textfield', flex: 1 },
                { text: 'DefaultComplex', dataIndex: 'DefaultComplex', editor: 'textfield', flex: 1 },
                { text: 'PivotCol', dataIndex: 'PivotCol', editor: 'textfield', flex: 1 },
                { text: 'PivotCols', dataIndex: 'PivotCols', editor: 'textfield', flex: 1 },
                { text: 'PivotData', dataIndex: 'PivotData', editor: 'textfield', flex: 1 },
                { text: 'PivotRows', dataIndex: 'PivotRows', editor: 'textfield', flex: 1 },
                { text: 'UsePivotData', dataIndex: 'UsePivotData', editor: 'textfield', flex: 1 },
                {
                    xtype: 'actioncolumn',
                    text: 'Удаление',
                    items: [{
                        iconCls: 'x-fa fa-trash-o',
                        tooltip: 'Методы',
                        handler: (grid, rowIndex, colIndex) => {
                            var record = grid.getStore().getAt(rowIndex);
                            var reportId = record.get('ReportId');

                            Ext.Ajax.request({
                                url: '/xml/DeleteNode/' + reportId,
                                method: 'DELETE',
                                success: (response, opts) => {
                                    if (reportId === 0) {
                                        alert("Так нельзя делать")
                                    }
                                    if (response.StatusCode === 401) {
                                        alert("Произведите заново вход")
                                    }
                                    else {
                                        alert("Запись с ReportId " + reportId + " удалена");
                                        store.remove(record);
                                    }
                                },
                                failure: (response, opts) => {
                                    alert("Произошла ошибка при удалении записи");
                                }
                            });
                        }
                    }]
                }
            ],
            viewConfig: {
                getRowClass: (rec) => {
                    var id = rec.get('ReportId');
                    if (id === 0) {
                        return 'green-row';
                    }
                    else {
                        return 'white-row';
                    }
                }
            },
            selType: 'rowmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    saveBtnText: 'Сохранить',
                    cancelBtnText: 'Отменить',
                    listeners: {
                        edit: (edit, context) => {
                            var record = context.record;
                            var reportId = record.get("ReportId");
                            var changes = record.getChanges();

                            function replaceEmptyWithNull(value) {
                                return value === '' ? null : value;
                            }

                            for (var key in changes) {
                                if (changes.hasOwnProperty(key)) {
                                    changes[key] = replaceEmptyWithNull(changes[key]);
                                }
                            }

                            Ext.Ajax.request({
                                url: '/xml/api/EditNode',
                                method: 'PUT',
                                jsonData: changes,
                                success: (response) => {
                                    alert(changes)
                                    alert("Успешно")
                                },
                                failure: (response) => {
                                    alert("Приозошла ошибка, обновите страницу")
                                    window.location.reload();
                                }
                            })


                        }
                    }
                })
            ],
            flex: 1,
            height: 1500,
            width: '800',


            renderTo: Ext.getBody()
        });

    }

});