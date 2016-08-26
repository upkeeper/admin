namespace upk {
    class AddHardwareController {
        hardware: Hardware;
        categories: Array<Category>;

        static $inject = ['$location', '$routeParams', 'hardwareService', 'categoryService'];
        constructor(private $location, private $routeParams, private hardwareService, private categoryService: ICategoryService) {
            categoryService.getCategories().then(data => this.categories = data);
            this.hardware.Deleted = false;
        }

        save() {
            this.hardwareService.addHardware(this.hardware).then(() => this.$location.path('/Hardware'));
        }
    }
    angular.module('Upkeeper')
        .controller('AddHardwareController', AddHardwareController);
}

