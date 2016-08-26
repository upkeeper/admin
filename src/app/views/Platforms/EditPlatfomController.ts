namespace upk {
    'use strict';

    export class EditPlatformController {
        Architectures = ['32-bit', '64-bit'];
        PlatformFamily = [
            { Id: "6174a726-b20b-4163-a402-bf3e1c28d92a", Name: "Windows", Description: "", Platforms: null },
            { Id: "292cd435-20f1-451a-aa2a-0e13183d4b73", Name: "OS X" }
        ];
        Types = ['Unattended', 'Image', 'Image Capture'];
        SettingFormats = ['XML', 'Text'];

        categories: Category[];
        cmModel: any;
        platform: Platform;

        static $inject: Array<string> = ['$location', '$routeParams', 'platformService', 'categoryService'];
        constructor(private $location: ng.ILocationService, private $routeParams: any, private platformService: IPlatformService, categoryService: ICategoryService) {
            categoryService.getCategories().then(res => this.categories = res);
            platformService.getPlatformSettings($routeParams.id).then(res => this.cmModel = res.data);
            platformService.getPlatformDetail($routeParams.id).then(res => this.platform = res.data);
        }

        update_mirror() {
            var codeMirrorContainer = $(".CodeMirror")[0];
            codeMirrorContainer.CodeMirror.refresh();
        }
        initSettings() {
            setTimeout(this.update_mirror, 300);
        }

        save() {
            this.platformService.updatePlatform(this.$routeParams.id, this.platform).then(() => {
                this.$location.path('/Platforms')
            })
        };

        delete() {
            this.platformService.removePlatform(this.platform.Id).then(() => {
                this.$location.path('/Platforms');
            })
        };

        saveSettings(settings) {
            this.platformService.updateSettings(this.$routeParams.id, settings);
        };

    }

    angular
        .module('Upkeeper')
        .controller('EditPlatformController', EditPlatformController);
}