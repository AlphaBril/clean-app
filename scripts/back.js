import { execSync } from "child_process";
import { copyFileSync } from "fs";
import copydir from 'copy-dir';
import path from "path";

const dependencies = [
    'express',
    'bcrypt',
    'dotenv',
    'jsonwebtoken',
    'nodemailer',
    'socket.io',
    'mysql',
    'mongodb',
    'pg',
    'neo4j-driver'
];

const devDependencies = [
    '@types/express',
    '@types/jsonwebtoken',
    'nodemon',
    'eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'typescript',
    'ts-node',
    '@types/bcrypt',
    '@types/mysql',
    '@types/nodemailer',
    '@types/pg'
]

const generateBack = (folder, database) => {
    const origin = import.meta.url;
    const fileDir = path.resolve(new URL(origin).pathname, '../../files/');
    console.log('Generating backend with ' + database);
    copydir.sync(fileDir + '/api', folder + '/api');
    copyFileSync(fileDir + '/api/env-example', folder + '/api/.env');
    copyFileSync(fileDir + '/api/.gitignore', folder + '/api/.gitignore');
    console.log('Installing dependencies');
    execSync('npm install ' + dependencies.join(' '), {
        cwd: folder + '/api'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log('Installing dev dependencies');
    execSync('npm install --save-dev ' + devDependencies.join(' '), {
        cwd: folder + '/api'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export default generateBack;