import { intro, text, select, outro, confirm } from "@clack/prompts";
import { COMMIT_TYPES } from "./commints-type.js";
import colors from "picocolors"
import { getChangesFiles, getStagedFiles, gitCommit } from "./git.js";
import { trytm } from "@bdsqqq/try";


intro(colors.inverse(`Asistente para la creación de commints por -->  ${colors.yellow('@niklauspalerme')}`))


const [changedFiles, errorChangedFiles] = await trytm(getChangesFiles())
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

if (errorChangedFiles || errorStagedFiles) {
    outro(colors.red(`Error: Comprueba que estás en un repositorio de git`));
    console.log(errorChangedFiles);
    process.exit(1);
}


// if (stagedFiles.length == 0) {
//     outro(colors.red(`Error: No hay archivos preparados para comitiar`));
//     //console.log(errorChangedFiles);
//     process.exit(1);
// }


const commitType = await select({
    message: colors.cyan('Selecciona el tipo de commint:'),
    options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
        value: key,
        label: `${value.emoji} ${key} - ${value.description}`
    }))
});

const commitMessage = await text({
    message: 'Indrotuce el mensaje del commit:',
    placeholder: 'Add new Feature',
});


const { emoji, release } = COMMIT_TYPES[commitType]
let breakingChange = false

if (release) {

    breakingChange = await confirm({

        initialValue: false,
        message: `Tienes este commit cambios que rompen la compatibilidad anterior?
        ${colors.gray('SI la respuesta es si, deberias crear un commit con el tipo "BREAKING CHANGE" y al hacer release se publicará una versión major')}`

    })
}

let commit = `${emoji} ${commitType}: ${commitMesage}`
commit = breakingChange ? `${commit} [breaking change]` : commit

const shouldContinue = await confirm({
    initialValue: true,
    message: `QUieres crearel commit con el sigueinte mensajes? 
    ${colors.green(colors.bold(commit))}
    Confirmas?`
})

if (!shouldContinue) {
    outro(colors.yellow('No se ha creado el commit'));
    process.exit(0)
}

// await gitCommit({commit})

outro(`Commint creado con exito! Gracias por usar el asistente`);