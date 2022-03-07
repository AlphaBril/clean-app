import { execSync } from "child_process";
import generateBack from "./back.js";
import generateFront from './front.js';

const generateCleanApp = (input, flags, showHelp) => {
    if (!input[0] || input[1]) {
        showHelp([2]);
    }
    if (flags) {
        const list = Object.keys(flags);
        if (list.length > 1 || list[0] !== 'database') {
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
    execSync('mkdir ' + input[0], (err) => {
        if (err) {
            console.error(err);
        }
    })
    generateFront(input[0]);
    generateBack(input[0], flags.database);
}

export default generateCleanApp;