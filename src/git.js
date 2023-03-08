import { exec } from 'node:child_process';
import { promisify } from 'node:util'


//Convertimos esta funcion async con el promisify
const execAsync = promisify(exec);

function cleanStdout(stdout) {
    return stdout.trim().split('\n').filter(Boolean)
}


export async function getChangesFiles() {

    const { stdout } = await execAsync('git status --porcelain')
    const cleanedStdout = cleanStdout(stdout).map(item => item.trim().split(' '))
    const finalstdout = cleanedStdout.map((item) => item[1])
    return finalstdout
}

export async function getStagedFiles() {
    const { stdout } = await execAsync('git diff --cached --name-only')
    return cleanStdout(stdout)
}


export async function gitCommit({ commit } = {}) {

    const { stdout } = await execAsync(`git coommit -m ${commit}`);
    return cleanStdout(stdout)

}


//Notas:

//stdout (Standard Ouput) es el nombre que se coloca a una salida estandar de
//datos luego de su ejecución