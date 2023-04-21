import { execSync } from "child_process";
import copydir from 'copy-dir';
import { copyFileSync } from "fs";
import path from "path";
const dependencies = [
    'antd',
    'axios',
    'i18next',
    'react-i18next',
    'i18next-browser-languagedetector',
    'react-router-dom',
    'socket.io-client',
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/free-solid-svg-icons',
    '@fortawesome/free-regular-svg-icons',
    '@fortawesome/react-fontawesome@latest'
];

const devDependencies = [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@types/jsonwebtoken',
    'eslint-config-prettier',
    'eslint-plugin-jest',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'prettier',
];

const generateFront = (folder) => {
    console.log('Generating front with CRA');
    execSync('npm install create-react-app', {
        cwd: folder
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    execSync('npx create-react-app app --template redux-typescript', {
        cwd: folder
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log('Installing dependencies');
    execSync('npm install ' + dependencies.join(' '), {
        cwd: folder + '/app'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log('Installing dev dependencies');
    execSync('npm install ' + devDependencies.join(' ') + ' --save-dev', {
        cwd: folder + '/app'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    const origin = import.meta.url;
    const fileDir = path.resolve(new URL(origin).pathname, '../../files/');
    console.log('Populating config files');
    copyFileSync(fileDir + '/.eslintrc.json', folder + '/app/.eslintrc.json');
    copyFileSync(fileDir + '/tsconfig.json', folder + '/app/tsconfig.json');
    copyFileSync(fileDir + '/src/App.route.tsx', folder + '/app/src/App.route.tsx');
    copyFileSync(fileDir + '/src/App.test.tsx', folder + '/app/src/App.test.tsx');
    copyFileSync(fileDir + '/src/App.tsx', folder + '/app/src/App.tsx');
    copyFileSync(fileDir + '/src/App.css', folder + '/app/src/App.css');
    copyFileSync(fileDir + '/src/index.tsx', folder + '/app/src/index.tsx');

    console.log('Populating core files');
    copydir.sync(fileDir + '/src/components', folder + '/app/src/components');
    copydir.sync(fileDir + '/src/ducks', folder + '/app/src/ducks');
    copydir.sync(fileDir + '/src/hooks', folder + '/app/src/hooks');
    copydir.sync(fileDir + '/src/store', folder + '/app/src/store');
    copydir.sync(fileDir + '/src/utils', folder + '/app/src/utils');

    console.log('Removing CRA remnants');
    execSync('rm -rf src/app src/features .git', {
        cwd: folder + '/app'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log('Running prettier');
    execSync('npx prettier --write ./src', {
        cwd: folder + '/app'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export default generateFront;