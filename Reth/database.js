const mongoose = require("mongoose");
const { dbURL, prefix } = require("config.json");

mongoose.connect(dbURL, { useNewUrlParser: true }, error => {
    if (error) {
        console.log(`Erro: ${error}`);
        process.exit(1);
        return 1;
    }
    console.log("Conectado ao banco de dados");
    return 0;
});

/*
 * No geral, `_id` é o ID de um canal ou usuário
*/
var Schema = mongoose.Schema;

/**
 * `_id` corresponde ao ID do canal setado para o contador
 * 
 * `format` corresponde à 'cor' do contador
 * 
 * 0 => padrao
 * 
 * B => verde
 * 
 * SS => azul
 * 
 * N => natal
*/
var ContadorSchema = new Schema({
    _id: String,
    status: Boolean,
    text: String,
    format: String
});

/**
 * `masculino`, `feminino` e `novato` são cargos identificados pelo ID 
*/
var ConfigSchema = new Schema({
    filtroInvites: Boolean,
    filtroBots : Boolean,
    masculino: String,
    feminino: String,
    novato: String
});

var RegistradorSchema = new Schema({
    _id: String,
    membrosRegistrados: [{
        _id: String,
        genero: String,
        timestamp: Number
    }]
});

var WelcomeSchema = new Schema({
    welcome: {
        _id: String,
        text: String
    },
    saida: {
        _id: String,
        text: String
    },
    privado: String
});

var EventLogSchema = new Schema({
    _id: String,
    ban: Boolean,
    delet: Boolean,
    edit: Boolean,
    unban: Boolean
});

var EditSchema = new Schema({
    ban: String,
    mute: String,
    reporte: String
});

var ReportSchema = new Schema({
    _id: String,
    primeira: {
        _id: String,
        text: String
    },
    segunda: {
        _id: String,
        text: String
    }
});

var GuildSchema = new Schema({
    _id: String,
    prefix: String,
    contador: ContadorSchema,
    config: ConfigSchema,
    welcome: WelcomeSchema,
    eventlog: EventLogSchema,
    edit: EditSchema,
    usuariosReportados: [ReportSchema],
    registradores: [RegistradorSchema]
});

var guild = mongoose.model("guild", GuildSchema);

var createNewGuildEntry = guildID => {
    let newGuild = new guild({
        _id: guildID,
        prefix,
        contador: {
            status: false,
            _id: "",
            text: "",
            format: "0"
        },
        config: {
            filtroInvites: false,
            filtroBots: false,
            masculino: "",
            feminino: "",
            novato: ""
        },
        welcome: {
            welcome: {
                _id: "",
                text: "${USER} Bem vindo ao servidor ${SERVER}"
            },
            saida: {
                _id: "",
                text: "${USER} saiu do servidor"
            },
            privado: ""
        },
        eventlog: {
            _id: "",
            ban: false,
            delet: false,
            edit: false,
            unban: false
        },
        edit: {
            ban: "",
            mute: "",
            reporte: ""
        },
        registradores: [],
        usuariosReportados: []
    });
    newGuild.save().catch(console.error);
};

module.exports = {
    guild,
    createNewGuildEntry
};