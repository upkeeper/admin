namespace upk {
    'use strict';

    class EditApplicationController {

        application: Application;
        computers: Array<Computer>;
        groups: Array<Group>;
        hardwares: Array<Hardware>;
        addGroups: Array<Group>
        addComputers: Array<Computer>;
        addHardwares: Array<Hardware>;
        events: Array<Event>;
        addReqApplications: Array<Application>;
        addConflictingApplications: Array<Application>;
        reqApplications: Array<Application>;
        conflictingApplications: Array<Application>;


        InstallConditions: Array<String>;
        RebootConditions: Array<String>;
        selectAll: boolean;

        static $inject: Array<string> = ['$location', '$routeParams', 'applicationService'];
        constructor(private $location: ng.ILocationService, private $routeParams, private applicationService: IApplicationService) {
            $(function () {
                $('#datetimepicker2').datetimepicker();
                $("#datetimepicker2").on("dp.change", function (e) {
                    $scope.$apply(() => {
                        this.application.PublishTime = e.date.format('YYYY-MM-DD HH:mm');
                    })
                });
            });

            this.InstallConditions = this.applicationService.InstallConditions;
            this.RebootConditions = this.applicationService.RebootConditions;
            applicationService.getApplicationDetail($routeParams.id).then(data => this.application = data);
            applicationService.getRequiredApplications($routeParams.id, "True").then(data => this.reqApplications = data);
            applicationService.getConflictingApplications($routeParams.id, "True").then(data => this.conflictingApplications = data);
            applicationService.getApplicationComputers($routeParams.id).then(data => this.computers = data);
            applicationService.getApplicationGroups($routeParams.id, "True").then(data => this.groups = data);
            applicationService.getApplicationHardwares($routeParams.id).then(res => this.hardwares = res);
            applicationService.getApplicationEvents($routeParams.id).then(data => this.events = data);
        }

        checkAll(items) {
            angular.forEach(items, item => {
                item.selected = this.selectAll;
            })
        }


        save() {
            this.applicationService.updateApplication(this.$routeParams.id, this.application).then(() => this.$location.path('/Applications'));
        };
        delete() {
            this.applicationService.removeApplication(this.application.Id).then(() => this.$location.path('/Applications'));
        }

        getAddRequiredApplications() {
            this.applicationService.getRequiredApplications(this.$routeParams.id, "False").then(data => {
                this.addReqApplications = data;
            })
        };
        addRequiredApplications() {
            var applications = [];
            for (var i = 0; i < this.addReqApplications.length; i++) {
                if (this.addReqApplications[i].selected === true) {
                    applications.push(this.addReqApplications[i].Id);
                }
            }
            this.applicationService.addRequiredApplications(this.$routeParams.id, applications).then(() => {
                this.applicationService.getRequiredApplications(this.$routeParams.id, "True").then(data => {
                    this.reqApplications = data;
                });
            });
        };
        removeRequiredApplications() {
            var applications = [];
            for (var i = 0; i < this.reqApplications.length; i++) {
                if (this.reqApplications[i].selected === true) {
                    applications.push(this.reqApplications[i].Id);
                }
            }

            this.applicationService.removeRequiredApplications(this.$routeParams.id, applications).then(() => {
                this.applicationService.getRequiredApplications(this.$routeParams.id, "True").then(data => {
                    this.reqApplications = data;

                });
            });
        }


        getAddConflictingApplications() {
            this.applicationService.getConflictingApplications(this.$routeParams.id, "False").then(data => {
                this.addConflictingApplications = data;
            })
        };
        addConfApplications() {
            var applications = [];
            for (var i = 0; i < this.addConflictingApplications.length; i++) {
                if (this.addConflictingApplications[i].selected === true) {
                    applications.push(this.addConflictingApplications[i].Id);
                }
            }
            this.applicationService.addConflictingApplications(this.$routeParams.id, applications).then(() => {
                this.applicationService.getConflictingApplications(this.$routeParams.id, "True").then(data => {
                    this.conflictingApplications = data;
                });
            });
        };
        removeConflictingApplications() {
            var applications = [];
            for (var i = 0; i < this.conflictingApplications.length; i++) {
                if (this.conflictingApplications[i].selected === true) {
                    applications.push(this.conflictingApplications[i].Id);
                }
            }
            this.applicationService.removeConflictingApplications(this.$routeParams.id, applications).then(() => {
                this.applicationService.getConflictingApplications(this.$routeParams.id, "True").then(data => {
                    this.conflictingApplications = data;
                });
            });
        };
        /* Application Computers*/

        getAddApplicationComputers() {
            this.applicationService.getAddApplicationComputers(this.$routeParams.id, "False").then(data => {
                this.addComputers = data;
            })
        };

        addComputer() {
            var computers = [];
            for (var i = 0; i < this.addComputers.length; i++) {
                if (this.addComputers[i].selected === true) {
                    computers.push(this.addComputers[i].Id);
                }
            }
            this.applicationService.addApplicationItems(this.$routeParams.id, computers, 'Computers').then(() => {
                this.applicationService.getApplicationComputers(this.$routeParams.id).then(data => {
                    this.computers = data;
                });
            });
        };

        removeComputer() {
            var computers = [];
            for (var i = 0; i < this.computers.length; i++) {
                if (this.computers[i].selected === true) {
                    computers.push(this.computers[i].Id);
                }
            }
            this.applicationService.removeApplicationItems(this.$routeParams.id, computers, "Computers").then(() => {
                this.applicationService.getApplicationComputers(this.$routeParams.id).then(data => {
                    this.computers = data;
                });
            });
        }
        /* END */

        /* Application Groups */


        getAddComputerGroups() {
            this.applicationService.getAddApplicationGroups(this.$routeParams.id, "False").then(data => {
                this.addGroups = data;
            });
        };


        getHardwares() {
            this.applicationService.getAddApplicationHardwares(this.$routeParams.id).then(data => {
                this.addHardwares = data;
            })
        };

        addHardware() {
            var hardwares = [];
            for (var i = 0; i < this.addHardwares.length; i++) {
                if (this.addHardwares[i].selected === true) {
                    hardwares.push(this.addHardwares[i].Id);
                }
            }
            this.applicationService.addApplicationItems(this.$routeParams.id, hardwares, 'Hardwares').then(() => {
                this.applicationService.getAddApplicationHardwares(this.$routeParams.id).then(data => {
                    this.addHardwares = data;
                })
            });
        };

        removehardware() {
            var hardwares = [];
            for (var i = 0; i < this.hardwares.length; i++) {
                if (this.hardwares[i].selected === true) {
                    hardwares.push(this.hardwares[i].Id);
                }
            }
            this.applicationService.removeApplicationItems(this.$routeParams.id, hardwares, 'Hardwares').then(() => {
                this.applicationService.getApplicationHardwares(this.$routeParams.id).then(res => this.hardwares = res);
            });
        }



    }

    angular
        .module('Upkeeper')
        .controller('EditApplicationController', EditApplicationController);
}