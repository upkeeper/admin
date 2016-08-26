namespace upk {
    'use strict';

    class OrganizationsController {

        organizations: Array<Organization>;

        static $inject: Array<string> = ['organizationService', '$location'];
        constructor(private organizationService: IOrganizationService, private $location: ng.ILocationService) {
            organizationService.getOrganizations().then(data => this.organizations = data);
        }

        create() {
            this.$location.path('/Administration/Organizations/Create')
        }

        editOrganization(organization: Organization) {
            this.$location.path('/Administration/Organizations/Detail/' + organization.Id)
        }

    }

    angular
        .module('Upkeeper')
        .controller('OrganizationsController', OrganizationsController);
}