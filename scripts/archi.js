import { execSync } from "child_process";
import generateBack from "./back.js";
import generateFront from './front.js';
import { existsSync } from "fs";
import copydir from 'copy-dir';

const generateCleanApp = (input, flags, showHelp) => {
    if (!input[0] || input[1]) {
        showHelp([2]);
    }
    if (flags) {
        const list = Object.keys(flags);
        if (list.length > 1 || (list.length === 1 && list[0] !== 'database')) {
            showHelp([2]);
        }
        if (flags.database) {
            if (flags.database !== 'mysql' && flags.database !== 'mongo'
                && flags.database !== 'neo4j' && flags.database !== 'postgres') {
                    showHelp([2]);
                }
        }
    }
    console.log('Creating new react app in folder ' + input[0]);
    if (existsSync(input[0])) {
        console.log('Folder already exist ! Remove it, or change project name');
    } else {
        execSync('mkdir ' + input[0], (err) => {
            if (err) {
                console.error(err);
            }
        })
        const origin = import.meta.url;
        const fileDir = path.resolve(new URL(origin).pathname, '../../files/');
        copydir.sync(fileDir + '/.vscode', folder + '/.vscode');
        generateFront(input[0]);
        generateBack(input[0], flags.database);
    }
}

export default generateCleanApp;