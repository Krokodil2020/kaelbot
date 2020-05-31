/**
 * Resumindo o que essas duas linhas de código fazem:
 * Agora você pode usar `require("config.json")` ou `require("database.js")`
 * em qualquer arquivo no src sem se preocupar com os `../../../`
*/
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const { Client } = require("discord.js");
const client = new Client();
const { token } = require("config.json");
const fs = require("fs");
var source = fs.readdirSync("./src");

/**
 * Cada entrada no inviteFilter é um servidor
 * Cada servidor é um objeto de membros que mandaram invite
*/
client.inviteFilter = {};

/**
 * Cada entrada no mutes é um servidor
 * Cada servidor é um objeto de membros mutados
*/
client.mutes = {};

client.getEmoji = emoji => client.emojis.find(e => e.name === emoji);

var isDir = path => {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
};

/**
 * O nome do arquivo é o nome que foi armazendo em client.commands e etc
 * Exemplo: o comando `r!div` seria chamado com `client.commands.div(argumentos);`
 * 
 * O nome dos arquivos de eventos deve ser igual ao nome do evento em si
 * Exemplo: `client.on("ready", () => {});` faria com que o arquivo seja nomeado `ready.js`
 * 
 * Os comandos do bots ficam em `src/commands/Pasta/comando.js`
 * Os eventos ficam em `src/events/Pasta/evento.js`
 * Os subcomandos ficam em `src/commands/Pasta/comandoUtils/subcomando.js`
*/
source.forEach(folder => {
    if (folder === "commands") {
        client[folder] = {};
    } else if (folder !== "events") return;
    var subFolders = fs.readdirSync(`./src/${folder}`);
    subFolders.forEach(subFolder => {
        var all = fs.readdirSync(`./src/${folder}/${subFolder}`);
        var files = all.filter(f => { 
            let dirCheck = isDir(`./src/${folder}/${subFolder}/${f}`);
            return f.split('.').slice(-1)[0] === "js" && !dirCheck;
        });
        files.forEach(file => {
            let name = file.split('.')[0];
            if (name === "teste") console.log(1);
            let exported = require(`./src/${folder}/${subFolder}/${file}`);
            if (folder === "events") {
                client.on(name, exported.bind(null, client));
            } else {
                client[folder][name] = exported;
            }
            delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${file}`)];
        });
        var subFilesFolders = all.filter(f => isDir(`./src/${folder}/${subFolder}/${f}`));
        subFilesFolders.forEach(subFilesFolder => {
            client[subFilesFolder] = {};
            var subFiles = fs.readdirSync(`./src/${folder}/${subFolder}/${subFilesFolder}`);
            subFiles = subFiles.filter(f => f.split('.').slice(-1)[0] === "js");
            subFiles.forEach(subFile => {
                let name = subFile.split('.')[0];
                let exported = require(`./src/${folder}/${subFolder}/${subFilesFolder}/${subFile}`);
                client[subFilesFolder][name] = exported;
                delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${subFilesFolder}/${subFile}`)];
            });
        });
    });
});

client.login(token).catch(console.error);