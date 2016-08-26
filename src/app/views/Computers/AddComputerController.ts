module upk {
    class AddComputerController {
        computer: Computer;

        static $inject = ['$location', 'computerService'];

        constructor(private $location: ng.ILocationService, private computerService: IComputerService) {

        }

        save() {
            this.computerService.addComputer(this.computer).then(() => this.$location.path('/Computers'));
        };
    }

    angular.module('Upkeeper')
        .controller('AddComputerController', AddComputerController);
}
