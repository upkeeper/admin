namespace upk {
    'use strict';

    class AddPlatformController {

        platform: Platform;

        Architectures: Array<string>;
        PlatformFamily: Array<any>;
        Types: Array<string>;
        SettingFormats: Array<string>;

        static $inject: Array<string> = ['$location', '$routeParams', 'platformService'];
        constructor(private $location, private $routeParams, private platformService: IPlatformService) {
            this.Architectures = [
                '32-bit',
                '64-bit'
            ];

            this.PlatformFamily = [
                {
                    Id: "6174a726-b20b-4163-a402-bf3e1c28d92a",
                    Name: "Windows",
                    Description: "",
                    Platforms: null
                },
                {
                    Id: "292cd435-20f1-451a-aa2a-0e13183d4b73",
                    Name: "OS X"
                }
            ];

            this.Types = [
                'Unattended',
                'Image',
                'Image Capture'
            ];

            this.SettingFormats = [
                'Text',
                'XML'
            ];
        }

        save() {
            this.platformService.addPlatform(this.platform).then(() => {
                this.$location.path('/Platforms');
            })
        };

    }

    angular
        .module('Upkeeper')
        .controller('AddPlatformController', AddPlatformController);
}