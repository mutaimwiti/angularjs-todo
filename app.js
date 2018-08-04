const app = angular.module('app', []);

app.controller('appController', ($scope)=> {
    const UNDONE = 1;
    const STARTED = 2;
    const DONE = 3;

    $scope.items = [
        {name: 'Cook', status: DONE},
        {name: 'Eat', status: STARTED},
        {name: 'Wash', status: UNDONE},
    ];

    $scope.status = (item) => {
        switch (item.status) {
            case UNDONE:
                return 'undone';
            case STARTED:
                return 'started';
            case DONE:
                return 'done';
        }
    };

    const canAdd = (name) => {
        return (name !== '' && !($scope.items.filter((itm) => itm.name === name).length));
    };

    $scope.add = () => {
        let name = $scope.item;
        if (canAdd(name)) {
            $scope.items.push({name: name, status: UNDONE});
        }
        $scope.item = '';
    };

    $scope.remove = (item) => $scope.items = $scope.items.filter((itm) => itm !== item);

    $scope.nextStateCaption = (item) => {
        switch (item.status) {
            case UNDONE:
                return 'Start';
            case STARTED:
                return 'Finish';
            case DONE:
                return 'Undo';
        }
    };

    const setStatus = (item, status) => {
        $scope.items.map((itm) => {
            if (itm === item) {
                itm.status = status;
            }
            return itm;
        });
    };

    $scope.proceed = (item) => {
        switch (item.status) {
            case UNDONE:
                setStatus(item, STARTED);
                break;
            case STARTED:
                setStatus(item, DONE);
                break;
            case DONE:
                setStatus(item, UNDONE);
                break;
        }
    };
});
