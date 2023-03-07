import { intro, text, select, outro } from "@clack/prompts";
import { COMMIT_TYPES } from "./commints-type.js";
import colors from "picocolors"
import { getChangesFiles, getStagedFiles } from "./git.js";
import { trytm } from "@bdsqqq/try";


intro(colors.inverse(`Asistente para la creación de commints por -->  ${colors.yellow('@niklauspalerme')}`))


const [changedFiles, errorChangedFiles] = await trytm(getChangesFiles())
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

if (errorChangedFiles || errorStagedFiles) {
    outro(colors.red(`Error: Comprueba que estás en un repositorio de git`));
    console.log(errorChangedFiles);
    process.exit(1);
}


if (stagedFiles.length == 0) {
    outro(colors.red(`Error: No hay archivos preparados para comitiar`));
    //console.log(errorChangedFiles);
    process.exit(1);
}




const commintType = await select({
    message: colors.cyan('Selecciona el tipo de commint:'),
    options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
        value: key,
        label: `${value.emoji} ${key} - ${value.description}`
    }))
});

const commitMsg = await text({
    message: 'Indrotuce el mensaje del commit:',
    placeholder: 'Add new Feature',
});

outro(`Commint creado con exito! Gracias por usar el asistente`);