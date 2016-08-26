namespace upk {
    class ConfigurationController {

        usageMetering: any;
        ar: any;
        config: Config;

        static $inject = ['$location', 'configurationService', 'applicationService', 'usageMeteringService'];
        constructor(private $location, private configurationService: IConfigurationService, applicationService: IApplicationService, private usageMeteringService: IUsageMeteringService) {
            usageMeteringService.getUsageMetering().then(data => this.usageMetering = data);
            configurationService.getConfig().then(res => this.config = res.data);
            applicationService.getApplicationRequests().then(data => this.ar = data);
        }

        resetUsageMetering() {
            this.usageMeteringService.resetUsageMetering().then(() => {
                this.usageMeteringService.getUsageMetering().then(data => this.usageMetering = data);
            });
        };

        save() {
            this.configurationService.updateConfig(this.config).then((res) => {
                console.log(res);
            });
        }

    }
    angular.module('Upkeeper')
        .controller('ConfigurationController', ConfigurationController);
}