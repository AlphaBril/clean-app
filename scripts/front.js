import { execSync } from "child_process";
const dependencies = [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@types/jsonwebtoken',
    '@types/antd',
    'eslint-config-prettier',
    'eslint-plugin-jest',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'prettier',
    'antd',
    'axios',
    'i18next',
    'react-i18next',
    'i18next-browser-languagedetector',
    'react-router-dom',
    'jsonwebtoken',
    'socket.io',
    'socker.io-client',
    'jwt-decode'
];

const generateFront = (folder) => {
    console.log('Generating front with CRA');
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
}

export default generateFront;