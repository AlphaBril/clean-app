import { execSync } from "child_process";

const generateBack = (folder, database) => {
    console.log('Generating backend with' + database);
    execSync('cd ' + folder + '/api', (err) => {
        if (err) {
            console.error(err);
        }
    })
}

export default generateBack;