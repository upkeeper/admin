namespace upk {
    class AddGroupController {

        categories: Array<Category>;
        group: Group;

        static $inject = ['$location', 'groupService', 'categoryService'];
        constructor(private $location: ng.ILocationService, private groupService: IGroupService, private categoryService: ICategoryService) {
            categoryService.getCategories().then(data => this.categories = data);
        }
        save() {
            this.groupService.addGroup(this.group).then(() => this.$location.path('/Groups'))
        }
    }
    angular.module('Upkeeper')
        .controller('AddGroupController', AddGroupController);
}
