namespace upk {
    'use strict';

    class DetailOrganizationController {

        organization: Organization;

        static $inject: Array<string> = ['organizationService', '$location', '$routeParams'];
        constructor(private organizationService: IOrganizationService, private $location: ng.ILocationService, private $routeParams: any) {
            organizationService.getOrganization($routeParams.id).then(data => this.organization = data);
        }

        save() {
            this.organizationService.updateOrganization(this.organization)
            .then(res => this.$location.path('/Administration/Organizations'));
        }

        delete() {
            this.organizationService.deleteOrganization(this.organization.Id)
            .then(res => this.$location.path('/Administration/Organizations'));
        }
    }

    angular
        .module('Upkeeper')
        .controller('DetailOrganizationController', DetailOrganizationController);
}