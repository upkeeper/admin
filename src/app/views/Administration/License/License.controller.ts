namespace upk {
    'use strict';

    class LicenseController {
        settings: GeneralSettings;

        static $inject: Array<string> = ['$location', 'SettingsService'];
        constructor(private $location: ng.ILocationService, private SettingsService: ISettingsService) {
            SettingsService.getGeneralSettings().then(data => this.settings = data);
        }

        save() {
            this.SettingsService.saveGeneralSettings(this.settings);
        }

    }
    angular
        .module('Upkeeper')
        .controller('LicenseController', LicenseController);
}