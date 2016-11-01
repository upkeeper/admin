namespace upk {
    'use strict';
    export interface IMessageService {
        getMessages(): ng.IPromise<Message[]>;
        getGlobalMessages(): ng.IPromise<Message[]>;
        getMessage(id: string): ng.IPromise<Message>;
        deleteMessage(messageId: string): ng.IHttpPromise<{}>;
        saveMessage(message: Message): ng.IHttpPromise<{}>;
        saveGlobalMessage(message: Message): ng.IHttpPromise<{}>;
        updateMessage(message: Message): ng.IHttpPromise<{}>;
    }

    class MessageService implements IMessageService {
        apiUrl: string;

        static $inject = ['$http', 'CONFIG', 'ApiService', 'organizationService'];

        constructor(private $http: ng.IHttpService,
            private CONFIG: config.IConfig,
            private ApiService: IApiService,
            private OrganizationService: IOrganizationService) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getMessages(): ng.IPromise<Message[]> {
            return this.$http.get(this.apiUrl + 'Organization/Messages?onlyGlobal=false').then(res => res.data);
        }
        getGlobalMessages(): ng.IPromise<Message[]> {
            return this.$http.get(this.apiUrl + 'Organization/Messages?onlyGlobal=true').then(res => res.data);
        };

        getMessage(id: string): ng.IPromise<Message> {
            return this.$http.get(this.apiUrl + 'Organization/Message/' + id).then(res => res.data);
        };

        deleteMessage(id: string) {
            return this.$http.delete(this.apiUrl + 'Organization/' + 'Message/' + id);
        };

        saveMessage(message: Message) {
            message = this.setMessageProperties(message, false);
            return this.$http.post(this.apiUrl + 'Organization/Message', message);
        }

        saveGlobalMessage(message: Message) {
            message = this.setMessageProperties(message, true)
            return this.$http.post(this.apiUrl + 'Organization/Message', message);
        }

        updateMessage(message: Message) {
            return this.$http.put(this.apiUrl + 'Organization/Message', message)
        }

        private setMessageProperties(message: Message, global: boolean): Message {
            const date = new Date();
            message.Published = date.toISOString();
            message.OrganizationId = '1890802f-9e42-4435-bcda-3f65ca2a172b';
            message.Vendor = false;
            message.OrganizationName = null;
            message.UserFullname = null;

            if (!message.Urgent) {
                message.Urgent = false;
            }
            if (global === true)
                message.Global = true;
            else
                message.Global = false;
            return message;
        }
    }
    angular.module('Upkeeper')
        .service('messageService', MessageService);
}