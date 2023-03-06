export const COMMIT_TYPES = {
    feat: {
        emoji: "🆕",
        description: "Add new feature",
        release: true
    },
    fix: {
        emoji: "🛠️ ",
        description: "Submit a fix a bug",
        release: true
    },
    perf: {
        emoji: "⚡",
        description: "Improve perfomance",
        release: true
    },
    docs: {
        emoji: "📚",
        description: "Add or update documentation",
        release: false
    },
    test: {
        emoji: "🧪",
        description: "Add or update test",
        release: false
    },
    build: {
        emoji: "🏗️ ",
        description: "Add or update build scripts",
        release: false
    }
}



//Nota para podr usar la data tipo [{},{},{}] de {{},{},{}}
// Se uso el siguiente codigo:

// console.log(Object.entries(COMMIT_TYPES).map(([key,value]) => ({
//     value: key,
//     label: `${value.emoji} ${key} - ${value.description}`
// })));