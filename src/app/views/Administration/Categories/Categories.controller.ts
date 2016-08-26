namespace upk {
    'use strict';

    class CategoriesController {

        categories: Array<Category>;

        static $inject: Array<string> = ['categoryService', '$location'];
        constructor(private CategoryService: ICategoryService, private $location: ng.ILocationService) {
            CategoryService.getCategories().then(data => this.categories = data);
        }

        create() {
            this.$location.path('/Administration/Categories/Create');
        }

        editCategory(category: Category) {
            this.$location.path('/Administration/Categories/Detail/' + category.Id)
        }

    }
    angular
        .module('Upkeeper')
        .controller('CategoriesController', CategoriesController);
}