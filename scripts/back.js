import { execSync } from "child_process";
import { copyFileSync } from "fs";
import copydir from 'copy-dir';
import path from "path";

const dependencies = [
    'express',
    'express-validator',
    'bcrypt',
    'dotenv',
    'jsonwebtoken',
    'nodemailer',
    'socket.io',
    'cors',
    'cookie-parser'
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
    '@types/nodemailer',
    'tsconfig-paths',
    '@types/cookie-parser'
]

const generateBack = (folder, database) => {
    const origin = import.meta.url;
    const fileDir = path.resolve(new URL(origin).pathname, '../../files/');
    console.log('Generating backend with ' + database);
    execSync('mkdir ' + input[0] + '/api', (err) => {
        if (err) {
            console.error(err);
        }
    })
    execSync('mkdir ' + input[0] + '/api/public', (err) => {
        if (err) {
            console.error(err);
        }
    })
    copydir.sync(fileDir + '/api/src', folder + '/api/src');
    switch (databse) {
        case 'mongo':
            dependencies.push('mongodb');
            copyFileSync(fileDir + '/api/env-example-mongodb', folder + '/api/.env');
            copydir.sync(fileDir + '/api/modules/mongodb', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/mongo', folder + '/api/src/shared/mongo');
            break;
        case 'neo4j':
            dependencies.push('neo4j-driver');
            copyFileSync(fileDir + '/api/env-example-neo4j', folder + '/api/.env');
            copydir.sync(fileDir + '/api/modules/neo4j', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/neo4j', folder + '/api/src/shared/neo4j');
            break;
        case 'postgres':
            dependencies.push('pg');
            devDependencies.push('@types/pg');
            copyFileSync(fileDir + '/api/env-example-postgres', folder + '/api/.env');
            copydir.sync(fileDir + '/api/modules/postgres', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/postgres', folder + '/api/src/shared/postgres');
            break;
        case 'mysql':
        default:
            dependencies.push('mysql');
            devDependencies.push('@types/mysql');
            copyFileSync(fileDir + '/api/env-example-mysql', folder + '/api/.env');
            copydir.sync(fileDir + '/api/modules/mysql', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/mysql', folder + '/api/src/shared/mysql');
            break;
    }
    copyFileSync(fileDir + '/api/gitignore-example', folder + '/api/.gitignore');
    copyFileSync(fileDir + '/api/.eslintrc', folder + '/api/.eslintrc');
    copyFileSync(fileDir + '/api/package.json', folder + '/api/package.json');
    copyFileSync(fileDir + '/api/tsconfig.json', folder + '/api/tsconfig.json');
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