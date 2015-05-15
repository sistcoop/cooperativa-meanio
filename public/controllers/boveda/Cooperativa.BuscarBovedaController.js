'use strict';

/* jshint -W098 */
angular.module('mean.cooperativa').controller('Cooperativa.BuscarBovedaController',
    function ($scope, $state, sucursalSession, agenciaSession, SGSucursal, SGBoveda) {

        $scope.view = {};

        //si tiene agencia y sucursal definida
        $scope.view.session = {
            sucursal: sucursalSession,
            agencia: agenciaSession
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function () {

            //CARGAR LOS COMBOS CON TODAS LAS SUCURSALES Y AGENCIAS
            /*$scope.combo.sucursal = SGSucursal.$search().$object;
             $scope.$watch('combo.selected.sucursal', function () {
             if (angular.isDefined($scope.combo.selected.sucursal)) {
             $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
             }
             }, true);*/

            //Cargar los combos solo con las sucursales y agencias del usuario que esta en session
            $scope.combo.sucursal = [$scope.view.session.sucursal];
            $scope.combo.agencia = [$scope.view.session.agencia];
        };
        $scope.loadCombo();


        $scope.filterOptions = {
            filterText: undefined,
            firstResult: 0,
            maxResults: 10
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            columnDefs: [
                {field: 'moneda', displayName: 'Moneda'},
                {field: 'denominacion', displayName: 'Denominacion'},
                {field: 'abierto', displayName: 'Abierto', cellFilter: 'si_no : "abierto" | uppercase'},
                {
                    field: 'estadoMovimiento',
                    displayName: 'Estado movimiento',
                    cellFilter: 'si_no : "congelado" | uppercase'
                },
                {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.search = function () {
            angular.extend($scope.filterOptions, {agencia: $scope.combo.selected.agencia.codigo});
            $scope.gridOptions.data = SGBoveda.$search($scope.filterOptions).$object;
        };

        $scope.nuevo = function () {
            $state.go('^.crearBoveda');
        };

        $scope.gridActions = {
            edit: function (row) {
                $state.go('^.editarBoveda.resumen', {id: row.id});
            }
        };

    }
);
