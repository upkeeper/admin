namespace upk {
    'use strict';
    export interface IOrganizationService {
        getOrganization(organizationId: string): ng.IPromise<Organization>;
        getOrganizations(): ng.IPromise<Organization[]>;
        addOrganization(organization: Organization): ng.IHttpPromise<{}>;
        updateOrganization(organization: Organization): ng.IHttpPromise<{}>;
        deleteOrganization(organization: string): ng.IHttpPromise<{}>;

    }

    export class OrganizationService implements IOrganizationService {
        apiUrl: string;

        static $inject = ['$http', 'CONFIG'];

        constructor(private $http: ng.IHttpService, CONFIG: config.IConfig) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getOrganization(organizationId: string) {
            return this.$http.get(this.apiUrl + 'Organization/' + organizationId).then(res => res.data);
        };

        getOrganizations() {
            return this.$http.get(this.apiUrl + 'Organizations').then(res => res.data);
        };

        addOrganization(organization: Organization) {
            if (!organization.AutoRegisterClients) {
                organization.AutoRegisterClients = false;
            }
            return this.$http.post(this.apiUrl + 'Organization', organization);
        };

        updateOrganization(organization: Organization) {
            return this.$http.put(this.apiUrl + 'Organization', organization);
        };

        deleteOrganization(organizationId: string) {
            return this.$http.delete(this.apiUrl + 'Organization?id=' + organizationId);
        };
    }
    angular.module('Upkeeper')
        .service('organizationService', OrganizationService);
}