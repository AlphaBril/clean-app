import { execSync } from "child_process";
import generateBack from "./back.js";
import generateFront from './front.js';
import { existsSync } from "fs";

const generateCleanApp = (input, flags, showHelp) => {
    if (!input[0] || input[1]) {
        console.log('sortie 1');
        showHelp([2]);
    }
    if (flags) {
        const list = Object.keys(flags);
        if (list.length > 1 || (list.length === 1 && list[0] !== 'database')) {
            console.log('sortie 2');
            showHelp([2]);
        }
        if (flags.database) {
            if (flags.database !== 'mysql' && flags.database !== 'mongo'
                && flags.database !== 'neo4j' && flags.database !== 'postgres') {
                    console.log('sortie 3');
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
        generateFront(input[0]);
        generateBack(input[0], flags.database);
    }
}

export default generateCleanApp;