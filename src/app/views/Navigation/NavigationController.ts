namespace upk {
    'use strict';

    class NavController {
        activePage: string;
        sidebarActive: boolean;

        static $inject: Array<String> = ['$location', '$route'];
        constructor(private $location: ng.ILocationService, private $route) {
            this.sidebarActive = false;

         /*   const options = {
                trigger: 'hover'
            }*/
            $('[data-toogle="tooltip"]').tooltip();
        };

        setActivePage(viewLocation: string) {
            this.activePage = this.$location.url();
            this.sidebarActive = false;
        };

        isActive(viewLocation: string) {
            return viewLocation === this.$location.path();
        };

        sidebar() {
            return this.sidebarActive;
        };

        toggleSidebar() {
            if (this.sidebarActive)
                this.sidebarActive = false;
            else
                this.sidebarActive = true;
        };

        adminView() {
            if (this.$route.current.locals) {
                if (this.$route.current.locals.administration)
                    return true;
            }
            else
                return false;
        }

        closeSideBar() {
            this.sidebarActive = false;
        }
    }

    angular.module('Upkeeper')
        .controller('NavController', NavController);
}