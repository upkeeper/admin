namespace upk {
    class HomeController {

        newMessage: Message;
        messages: Array<Message>;

        computerslabels: Array<string>;
        computersseries: Array<string>;
        computersdata: number[][];
        summarylabels: any
        summaryseries: Array<string>;
        summarydata: number[][];
        hemma: string;

        computerSummary: any;

        static $inject = ['$scope', 'messageService', 'organizationService', '$rootScope'];
        constructor(private $scope: ng.IScope, private messageService: IMessageService, 
        private organizationService: IOrganizationService, private $rootScope) {
            messageService.getMessages().then(data => {
                this.messages = data;
            });
            organizationService.getOrganizationSummary(this.$rootScope.currentOrganization).then(data => {
                this.computerSummary = data
                this.summarylabels = [];
                this.summarydata = [[]];
                this.computerSummary.Properties.forEach(element => {
                    /*this.summarylabels.push(element.Property);*/
                    this.summarydata[0].push(parseInt(element.Value));
                });
                this.summarylabels = ["Computers", "Applications", "Groups", "Platforms", "Tasks"];
            });

        }

        saveMessage() {
            this.messageService.saveMessage(this.newMessage).then(res => {
                this.newMessage = null;
                this.messageService.getMessages().then(data => {
                    this.messages = data;
                })
            });
        };

        deleteMessage(messageId: string) {
            this.messageService.deleteMessage(messageId).then(res => {
                this.messageService.getMessages().then(data => this.messages = data);
            });
        };
    }

    angular.module('Upkeeper')
        .controller('HomeController', HomeController);
}