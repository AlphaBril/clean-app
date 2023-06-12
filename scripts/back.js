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
    execSync('mkdir ' + folder + '/api', (err) => {
        if (err) {
            console.error(err);
        }
    })
    execSync('mkdir ' + folder + '/api/public', (err) => {
        if (err) {
            console.error(err);
        }
    })
    copydir.sync(fileDir + '/api/src', folder + '/api/src');
    switch (database) {
        case 'mongo':
            dependencies.push('mongodb');
            copyFileSync(fileDir + '/api/env-example-mongodb', folder + '/api/.env');
            copyFileSync(fileDir + '/api/mongodb.yml', folder + '/api/docker-compose.yml');
            copydir.sync(fileDir + '/api/modules/mongodb', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/mongo', folder + '/api/src/shared/mongo');
            copydir.sync(fileDir + '/api/constants/mongo.ts', folder + '/api/src/constants/mongo.ts');
            break;
        case 'neo4j':
            dependencies.push('neo4j-driver');
            copyFileSync(fileDir + '/api/env-example-neo4j', folder + '/api/.env');
            copyFileSync(fileDir + '/api/neo4j.yml', folder + '/api/docker-compose.yml');
            copydir.sync(fileDir + '/api/modules/neo4j', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/neo4j', folder + '/api/src/shared/neo4j');
            copydir.sync(fileDir + '/api/constants/neo4j.ts', folder + '/api/src/constants/neo4j.ts');
            break;
        case 'postgres':
            dependencies.push('pg');
            devDependencies.push('@types/pg');
            copyFileSync(fileDir + '/api/env-example-postgres', folder + '/api/.env');
            copyFileSync(fileDir + '/api/postgres.yml', folder + '/api/docker-compose.yml');
            copydir.sync(fileDir + '/api/modules/postgres', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/postgres', folder + '/api/src/shared/postgres');
            copydir.sync(fileDir + '/api/constants/postgres.ts', folder + '/api/src/constants/postgres.ts');
            break;
        case 'mysql':
        default:
            dependencies.push('mysql');
            devDependencies.push('@types/mysql');
            copyFileSync(fileDir + '/api/mysql.yml', folder + '/api/docker-compose.yml');
            copyFileSync(fileDir + '/api/env-example-mysql', folder + '/api/.env');
            copydir.sync(fileDir + '/api/modules/mysql', folder + '/api/src/modules');
            copydir.sync(fileDir + '/api/shared/mysql', folder + '/api/src/shared/mysql');
            copydir.sync(fileDir + '/api/constants/mysql.ts', folder + '/api/src/constants/mysql.ts');
            break;
    }
    copyFileSync(fileDir + '/api/gitignore-example', folder + '/api/.gitignore');
    copyFileSync(fileDir + '/api/eslintrc-example.json', folder + '/api/.eslintrc.json');
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