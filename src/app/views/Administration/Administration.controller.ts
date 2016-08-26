namespace upk {
    'use strict';

    class AdministrationController {

        messages: Message[];
        newMessage: Message;

        system: ISystemInformation;
        settings: any;

        static $inject: Array < string > = ['messageService', 'configurationService', 'SettingsService'];
        constructor(private messageService: IMessageService, private configurationService: IConfigurationService, private SettingsService: ISettingsService) {
            messageService.getGlobalMessages().then(data => this.messages = data);
            configurationService.getSystemInformation().then(res => this.system = res);
            SettingsService.getGeneralSettings().then(data => this.settings = data);

        }

        saveMessage() {
            this.messageService.saveGlobalMessage(this.newMessage).then(res => {
                this.newMessage = null;
                this.messageService.getGlobalMessages().then(data => {
                    this.messages = data;
                })
            })
        }

        deleteMessage(messageId: string) {
            this.messageService.deleteMessage(messageId).then(res => {
                this.messageService.getGlobalMessages().then(data => this.messages = data);
            });
        };

    }

    angular.module('Upkeeper')
        .controller('AdministrationController', AdministrationController);
}