import {intro,text,select, outro } from "@clack/prompts";
import { COMMIT_TYPES } from "./commints-type.js";
import colors from "picocolors"
import { getChangesFiles } from "./git.js";
import { trytm } from "@bdsqqq/try";


const [changedFiles, errorChangedFiles] = await trytm (getChangesFiles())

if(errorChangedFiles){
  outro(colors.red(`Error: Comprueba que estás en un repositorio de git`));
  process.exit(1);
}

console.log(changedFiles);

intro(

    colors.inverse(`Asistente para la creación de commints por -->  ${colors.yellow('@niklauspalerme')}`)

)


const commintType = await select({
    message: colors.cyan ('Selecciona el tipo de commint:'),
    options: Object.entries(COMMIT_TYPES).map(([key,value]) => ({
        value: key,
        label: `${value.emoji} ${key} - ${value.description}`
    }))
  });

const commitMsg = await text({
    message: 'Indrotuce el mensaje del commit:',
    placeholder: 'Add new Feature',
  });

outro(`Commint creado con exito! Gracias por usar el asistente`);