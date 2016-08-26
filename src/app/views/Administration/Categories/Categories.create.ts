namespace upk {
    'use strict';

    class CreateCategoryController {

        category: Category;
        static $inject: Array<string> = ['categoryService', '$location'];
        constructor(private categoryService: ICategoryService, private $location: ng.ILocationService) {

        }

        save() {
            this.categoryService.addCategory(this.category).then((res) => {
                this.$location.path('/Administration/Categories')
            })
        }
    }
    angular
        .module('Upkeeper')
        .controller('CreateCategoryController', CreateCategoryController);
}