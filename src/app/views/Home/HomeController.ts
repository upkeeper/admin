namespace upk {
    class HomeController {

        newMessage: Message;
        messages: Array<Message>;
        editingMessage = false;

        availableGroups: Array<Group>;

        computerslabels: Array<string>;
        computersseries: Array<string>;
        computersdata: number[][];
        summarylabels: any
        summaryseries: Array<string>;
        summarydata: number[][];
        hemma: string;

        computerSummary: any;

        static $inject = ['$scope', 'messageService', 'organizationService', '$rootScope', 'ApiService'];
        constructor(private $scope: ng.IScope, private messageService: IMessageService,
            private organizationService: IOrganizationService, private $rootScope, private ApiService: IApiService) {
            messageService.getMessages().then(data => {
                this.messages = data;
            });
            ApiService.getOrganizationSummary().then(data => {
                this.computerSummary = data
                this.summarylabels = [];
                this.summarydata = [[]];
                this.computerSummary.Properties.forEach(element => {
                    this.summarydata[0].push(parseInt(element.Value));
                });
                this.summarylabels = ["Computers", "Applications", "Groups", "Platforms", "Tasks"];
            });

        }

        createMessage() {
            this.newMessage = null;
            this.editingMessage = false;
            this.newMessage.ShowClients = false;
        }

        saveMessage() {
            if (!this.editingMessage) {
                this.messageService.saveMessage(this.newMessage).then(res => {
                    this.newMessage = null;
                    this.messageService.getMessages().then(data => {
                        this.messages = data;
                    });
                });
            } else {
                this.messageService.updateMessage(this.newMessage).then(res => {
                    this.messageService.getMessages().then(data => {
                        this.messages = data;
                    });
                });
            }
        };

        editMessage(id: string) {
            this.newMessage = null;
            this.editingMessage = true;
            this.messageService.getMessage(id).then(res => {
                this.newMessage = res;
            });
        }

        deleteMessage(messageId: string) {
            this.messageService.deleteMessage(messageId).then(res => {
                this.messageService.getMessages().then(data => this.messages = data);
            });
        };
    }

    angular.module('Upkeeper')
        .controller('HomeController', HomeController);
}