import { exec } from 'node:child_process';
import { promisify } from 'node:util'


//Convertimos esta funcion async con el promisify
const execAsync = promisify(exec);

function cleanStdout(stdout){

    return stdout.trim().split('\n').filter(Boolean)
} 


export async function getChangesFiles () {

    const {stdout} = await execAsync('git status --porcelain')
    return cleanStdout(stdout).map((line)=> line.split(' ').at(-1))
}



//Notas:

//stdout (Standard Ouput) es el nombre que se coloca a una salida estandar de
//datos luego de su ejecución

