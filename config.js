"use strict";

module.exports = {
    "log_level": "debug",
    "backends": {
        "terminal": { // Debug terminal module
            "enabled": true,
            "nickname": "arnaud" // terminal isn't multiuser, so we need to simulate one
        },
        "irc": {
            "enabled": false,
            "server": "localhost:6667",
            "password": null,
            "channel": "#supbottest", //use channel:password if you need one
            "nickname": "JeanYves"
        },
        "discord": {
            "enabled": false,
            "login": "",
            "password": "",
            "invite": "",
            "channel": "#general" // All channels are joined on Discord, but pick which ones to listen to
        }
    },
    "plugins": {
        "logger": {
            "enabled": false,
            "excluded_backends": null
        },
        "commands": {
            "enabled": true,
            "excluded_backends": ["irc"], // Exclude a backend for this plugin
            "prefix": "!",
            "plugins": {
                "twitter": {
                    "enabled": true,
                    "allowed_users": ["*"],
                    "tweets_per_page": 3
                },
                "admin": {
                    "enabled": true,
                    "allowed_users": ["irc:Dream_Team", "discord:Aranom"]
                }
            }
        },
        "bridge": { // Bridge messages from other protocols (stdin, Discord, IRC) between eachother
            "enabled": false,
            "excluded_backends": null
        }
    }
};
