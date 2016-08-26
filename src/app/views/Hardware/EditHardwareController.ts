namespace upk {
    class EditHardwareController {

        categories: Array<Category>;
        config: Config;
        hardware: Hardware;
        applications: any;
        cmModel: any;

        addApplications: Array<Application>;

        static $inject = ['$location', '$routeParams', 'hardwareService', 'categoryService'];
        constructor(private $location, private $routeParams, private hardwareService: IHardwareService, private categoryService: ICategoryService) {
            categoryService.getCategories().then(data => this.categories = data);
            hardwareService.getConfiguration($routeParams.id).then(res => this.config = res.data);
            hardwareService.getHardwareDetail($routeParams.id).then(res => this.hardware = res.data);
            hardwareService.getSettings($routeParams.id).then(res => this.cmModel = res.data);
            hardwareService.getHardwareApplications($routeParams.id, "True").then(res => this.applications = res.data);
        }
        save() {
            this.hardwareService.updateHardware(this.$routeParams.id, this.hardware).then(res => this.$location.path('/Hardware'))
        };

        delete() {
            this.hardwareService.removeHardware(this.$routeParams.id).then(res => this.$location.path('/Hardware'));
        };

        update_mirror() {
            var codeMirrorContainer = $(".CodeMirror")[0];
            codeMirrorContainer.CodeMirror.refresh();
        };
        initSettings() {
            console.log('Settings loaded');
            setTimeout(this.update_mirror, 200);
        };
        
        saveSettings(){
            this.hardwareService.saveSettings(this.hardware.Id, this.cmModel);
        }

        addApplication() {
            var applications = [];
            for (var i = 0; i < this.addApplications.length; i++) {
                if (this.addApplications[i].selected === true) {
                    applications.push(this.addApplications[i].Id);
                }
            }
            this.hardwareService.addHardwareItems(this.$routeParams.id, applications, 'Applications').then(() => {
                this.hardwareService.getHardwareApplications(this.$routeParams.id, "True").then(res => {
                    this.applications = res.data;
                });
            });
        };

        removeApplication() {
            var applications = [];
            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].selected === true) {
                    applications.push(this.applications[i].Id);
                }
            }
            this.hardwareService.removeHardwareItems(this.$routeParams.id, applications, 'Applications').then(() => {
                this.hardwareService.getHardwareApplications(this.$routeParams.id, "True").then(res => this.applications = res.data);
            });
        }
    }

    angular.module('Upkeeper')
        .controller('EditHardwareController', EditHardwareController);
}

