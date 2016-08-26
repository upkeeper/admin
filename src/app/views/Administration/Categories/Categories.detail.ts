namespace upk {
    'use strict';

    class DetailCategoryController {

        category: Category;

        static $inject: Array<string> = ['categoryService', '$location', '$routeParams'];
        constructor(private categoryService: ICategoryService, private $location, private $routeParams) {
            categoryService.getCategory($routeParams.id).then(data => this.category = data);
        }

        save() {
            this.categoryService.updateCategory(this.category).then(res => this.$location.path('/Administration/Categories'));
        }

        delete() {
            this.categoryService.deleteCategory(this.category.Id).then(res => this.$location.path('/Administration/Categories'));
        }
    }

    angular
        .module('Upkeeper')
        .controller('DetailCategoryController', DetailCategoryController);
}