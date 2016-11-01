namespace upk {
    'use strict';

    export interface ICategoryService {
        getCategories(): ng.IPromise<Category[]>;
        getCategory(id: string): ng.IPromise<Category>;
        addCategory(category: Category): ng.IPromise<{}>;
        updateCategory(category: Category): ng.IPromise<{}>;
        deleteCategory(id: string): ng.IPromise<{}>;
    }

    class CategoryService implements ICategoryService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG',];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService:IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getCategories(): ng.IPromise<Category[]> {
            return this.$http.get(this.apiUrl + 'Categories').then(res => res.data);
        }

        getCategory(id: string): ng.IPromise<Category> {
            return this.$http.get(this.apiUrl + 'Category/' + id).then(res => res.data);
        }

        addCategory(category: Category): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'Category', category);
        }

        updateCategory(category: Category): ng.IPromise<{}> {
            return this.$http.put(this.apiUrl + 'Category', category);
        }

        deleteCategory(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'Category/' + id);
        }
    }


    angular.module('Upkeeper')
        .service('categoryService', CategoryService);
}
