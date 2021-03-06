/**
 * Copyright (c) 2014 Kai Toedter
 * All rights reserved.
 * Licensed under MIT License, see http://toedter.mit-license.org/
 */

/// <reference path="../chatty.ts" />
/// <reference path="../model/ChatMessage.ts" />
/// <reference path="../model/User.ts" />
// / <reference path="../../../typescript-defs/angularjs/angular.d.ts" />

class ChatMessageService {
    static $inject = ['$resource'];

    constructor(private $resource:ng.resource.IResourceService) {
        console.log('ChatMessage service started')
    }

    getAllChatMessages(callback:(messages:chatty.model.ChatMessage[]) => void) {
        var messageResource:chatty.model.ChatMessageResource =
            <chatty.model.ChatMessageResource> this.$resource('http://localhost:8080/chatty/api/messages');

        messageResource.get((result:any) => {
            var messages:chatty.model.ChatMessage[] = [];
            if (result.hasOwnProperty("_embedded") && result._embedded.hasOwnProperty("messages")) {
                messages = result._embedded.messages;
            }
            callback(messages);
        });
    }

    postMessage(user:chatty.model.User, message:string):void {
        var messageResource:chatty.model.ChatMessageResource =
            <chatty.model.ChatMessageResource> this.$resource('http://localhost:8080/chatty/api/messages');

        messageResource.save({author:user, text:message}, (result:any) => {
            console.log(result);
        }, (result:any) => {
            console.log(result);
        });
    }
}

chatty.services.service('chatMessageService', ChatMessageService);