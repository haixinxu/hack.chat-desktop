import {Parser} from "./parser";
import  fs = require('fs');
import {UserData} from "./userData";
const platformUserDataClass = require('./loadUserData');
export class App {
    public static favourites: string[];
    public static nick: string;
    public static currentChannel: string;
    public static parsers: Parser[];
    public static userData: UserData;
    public static ipc: Electron.IpcRenderer; //TODO: replace by abstract communication class

    public static init(): void {
        App.ipc = require('electron').ipcRenderer;
        App.favourites = [];
        App.parsers = [];
        App.userData = new platformUserDataClass();
        App.userData.get("nickName", function (nick) {
            App.nick = nick;
        });
        App.loadParsers();
    }
    static parseText(text: string): string {
        App.parsers.forEach(function (parser: Parser) {
            text = parser.parse(text);
        });
        return text;
    }
    private static loadParsers(): void {
        if(fs.hasOwnProperty("readdir")){
            fs.readdir(`${__dirname}/parsers`, function (err, files) {
                if (err === null) {
                    files.forEach(function (file) {
                        try {
                            let parser = require(`${__dirname}/parsers/${file}`);
                            App.parsers.push(new parser());
                        } catch (e) {
                            console.warn(`./parsers/${file} doesn't contain a Parser`);
                        }
                    });
                } else {
                    console.error("Cannot load parsers: lib/client/parsers access error.");
                }
            });
        } else {
            require('./loadParsers');
        }
    }
}
