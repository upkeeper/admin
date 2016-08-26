namespace upk {
    'use strict';

    class CreateOrganizationController {

        organization: Organization;

        static $inject: Array < string > = ['organizationService', '$location'];
        constructor(private organizationService: IOrganizationService, private $location: ng.ILocationService) {

        }

        save() {
            this.organizationService.addOrganization(this.organization).then(res => this.$location.path('/Administration/Organizations'), err => console.log(err))
        }

    }

    angular
        .module('Upkeeper')
        .controller('CreateOrganizationController', CreateOrganizationController);
}