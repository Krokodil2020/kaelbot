module.exports = (client, message) => {
    const { prefix } = require('config.json');
    const { RichEmbed } = require("discord.js");
    let embed = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('Olá eu souu Kael fui programado em Js , meus comandos estão logo abaixo!')
        .addField('Entretenimento | 🍕','Cantinho de Entretenimento!')
        .addField('Moderação | 💼','Catinho da moderação')
        .addField('Server Config | 🏆','Cantinho para full configurações do seu servidor')
        .addField('Registro | 📋','Cantinho do registro')
        .addField('Status | 🔃','Cantinho do status')
        .addField('Utilidade | 🎈','Cantinho das utilidades')
        .addField('Games | 🎮','Games da Lunna')
        .addField('Suporte | 🏡','Minha Casa 🏡')                
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed1 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🍕 Entretenimento!')
        .addField(`${prefix}anime`,`• Digite **Ex: l!anime Naruto** para aparecer informações sobre o anime mencionado`)
        .addField(`${prefix}avatar`,`• Para aparecer o avatar **Ex: l!avatar @lunna ou l!avatar**`)
        .addField(`${prefix}aviso`,`• Utilizado como say em embed **Ex: l!say olá**`)
        .addField(`${prefix}clima`,`• Para mostra informações sobre Clima **Ex: l!clima São paulo**`)
        .addField(`${prefix}fake`,`• Para mostrar informações sobre fakes **Ex: l!fake @lunna**`)
        .addField(`${prefix}host`,`• Para mostra informações sobre a host`)
        .addField(`${prefix}invite`,`• Para adquirir o invite ou convite da Lunna`)
        .addField(`${prefix}ontime`,`• Para mostrar o tempo de atividade do bot`)
        .addField(`${prefix}perfil`,`• Para mostra informações do seu perfil ou do perfil do usuário mencionado **Ex: l!perfil @lunna**`)
        .addField(`${prefix}say`,`• Para o bot falar algo que você digitou **Ex: l!say olá**`)
        .addField(`${prefix}settopic`,`• Para setar algo no tópico do chat **Ex: l!ettopic este chat foi feito para imagens é link**`)
        .addField(`${prefix}ship`,`• Utilizado para shipar duas pessoas ou melhor ver suas chances de relacionamento com a pessoa **Ex: l!ship @lunna @jack`)       
        .addField(`${prefix}spot`,`• Utilizado para ter informaçoes dos usuários que estão ouvindo alguma música no spotify **Ex l!spot lunna**`)  
        .addField(`${prefix}top10`,`• Para visualizar os top 10 servidores da Lunna`)   
        .addField(`${prefix}level`,`• Para visualizar o seu level e quantidade de XP`)   
        .addField(`${prefix}topxp`,`• Para visualizar os tops XPs e Levels`)           
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed3 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('💼 Moderação!')
        .addField(`${prefix}allunban`,`• Para desbanir todos os usuários do servidor`)
        .addField(`${prefix}slowmode`,`• Defina o tempo de mensagem para ser enviado em qualquer canal**`)        
        .addField(`${prefix}ban`,`• Para banir contas por id ou mencionando **Ex: k.ban @kael**`)
        .addField(`${prefix}auto-role`,`• Para adicionar tag em todos do membros novos **Ex: k.auto-role @tag**`)
        .addField(`${prefix}clear`,`• Para apagar mensagens do chat **Ex: l!clear 800** Obs: só pode apagar até 1000 mensagens por vez`)
        .addField(`${prefix}caifora`,`• Para banir contas por id ou mencionando **Ex: k.caifora @kael** Obs: bane usuários por id até fora do servidor`)
        .addField(`${prefix}lock`,`• Para bloquear o chat`)
        .addField(`${prefix}unlock`,`• Para desbloquear o chat`)      
        .addField(`${prefix}prefixo`,`• Para mostrar informações sobre o prefixo, **Para alterar o prefixo k!prefixo [novo prefx] exemplo; kael!**`)
        .addField(`${prefix}mute`,`• Para mutar o usário mencionado **Ex: k!mutar @kael 1h**`)   
        .addField(`${prefix}unmute`,`• Para retirar o mute do usuário mencionado **Ex: k!unmute @kael**`)
        .addField(`${prefix}report`,`• Para reporta algum erro ou bug para o suporte`)                                                 
        .addField(`${prefix}unreporte`,`• Para retirar a report feita`)
        .addField(`${prefix}reporte`,`• Para inserir uma advertência no usuário mencionado **Ex: k.reporte Kael (Motivo)**`)
        .addField(`${prefix}unreporte`,`• Para retirar a advertência do usuário mencionado **Ex: k.unreporte Kael (motivo)**`)  
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed4 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🏆 Server Config!')
        .addField(`${prefix}auto-role`,`• Configuração de auto-role para novos membros que entram no servidor receber a tag setada`)
        .addField(`${prefix}auto-verificar`,`• Configurações para banir contas com menos de 5 dias de discord automaticamente`)
        .addField(`${prefix}block-bots`,`• Configurações para bloquear qualquer entrada de bot`)
        .addField(`${prefix}block-convites`,`• Configuração de envio de convites de outros servidores dentro do seu servidor`)
        .addField(`${prefix}welcome`,`• Configuração de bem vindo no seu servidor`)
        .addField(`${prefix}logs`,`• Configurações de logs **Ex: deletar mensagens / editar mensagens / bans / unbans do servidor em um chat específico`)
        .addField(`${prefix}contador`,`• Configurações de contador de membros`)     
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed5 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('📋 Registro!')
        .addField(`${prefix}registro`,`• Configurações de registro definir cargo **masculino ou feminino**`)
        .addField(`${prefix}registrar`,`• Registra a pessoa mencionada`)
        .addField(`${prefix}registrador`,`• Mostra quantas pessoas você registrou`)
        .addField(`${prefix}registrou`,`• Mostra quem te registrou no servidor`)
        .addField(`${prefix}registros`,`• Mostra os top 5 registradores do servidor`)
        .addField(`${prefix}resetrgs`,`• Para resetar todos os registros`)
        .addField(`${prefix}registrados`,`• Mostra quantidades de pessoas registradas no servidor.`)     
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed6 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🔃 Status')
        .addField(`${prefix}memoria`,`• Mostra informações sobre a memória da vps do bot`)        
        .addField(`${prefix}ping`,`• mostra o ping do bot`)
        .addField(`${prefix}server`,`• mostra informações sobre server`)
        .addField(`${prefix}botinfor`,`• mostra informações sobre o bot`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed7 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🎈 Utilidade')
        .addField(`${prefix}div`,`• Mostra quantidades de convites que o usuário tem`)    
        .addField(`${prefix}divulgador`,`• Mostra os convites e os membros recrutados`)        
        .addField(`${prefix}divulgadores`,`• Top 5 divulgadores`)
        .addField(`${prefix}emoji`,`• Informações sobre emojis`)
        .addField(`${prefix}servericon`,`• Mostra o icone do servidor`)
        .addField(`${prefix}userinfo`,`• Informação do usuário`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    let embed8 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🎮 Games')
        .addField(`${prefix}loja`,`• Mostra a lojinha da Lunna`)    
        .addField(`${prefix}comprar`,`• Compra o item da lojinha Ex: l!comprar 1 que significa a quantidade de itens é 2 o número do ID do item a ser comprado`)        
        .addField(`${prefix}saldo`,`• Mostra o saldo da sua conta`)
        .addField(`${prefix}minerar`,`• Minera dinheiro para comprar itens na loja`)
        .addField(`${prefix}transferir`,`• Transferir itens para outro usuário **Ex: l!transferir @Lunna 1 pizza**`)
        .addField(`${prefix}doar`,`• Doar dinheiro para outro usuário Ex: **l!doar @Lunna 120**`)
        .addField(`${prefix}pescar`,`• Este comando te proporciona pescar algo da loja aleatoriamente em alto mar!`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();        
    let embed9 = new RichEmbed()
        .setColor('#f781c6')
        .setDescription('🏡 Suporte')
        .addField(`Suport Lunna`,`**• https://discord.gg/7MqvwRz**`)    
        .addField(`Link de Invite da Lunna`,`**• https://discordapp.com/oauth2/authorize?client_id=524949763674734602&scope=bot&permissions=8**`)        
        .addField(`Meu Site `,`**• Site em criação , logo estará disponível**`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
    message.member.send(embed)
        .then(async msg => {
            message.channel.send(`${message.author} Meus comandos estão na sua **DM** amiguinho(a)! <:vergonha:534524312384962570>`).catch(()=>{});
            let arr = ['🍕', '💼', '🏆', '📋', '🔃', '🎈', '🎮', '🏡', '⬅'];
            for (let i = 0; i < arr.length; ++i) {
                await msg.react(arr[i]).catch(()=>{});
            }
            const collector = msg.createReactionCollector((r, u) => {
                return arr.some(e => e === r.emoji.name) && u.id === message.author.id;
            });
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case '🍕':
                        msg.edit(embed1).catch(()=>{});
                        break;
                    case'💼':
                        msg.edit(embed3).catch(()=>{});
                        break;
                    case'🏆':
                        msg.edit(embed4).catch(()=>{});
                        break;
                    case'📋':
                        msg.edit(embed5).catch(()=>{});
                        break;
                    case'🔃':
                        msg.edit(embed6).catch(()=>{});
                        break;
                    case'🎈':
                        msg.edit(embed7).catch(()=>{});
                        break;
                    case'🎮':
                        msg.edit(embed8).catch(()=>{});
                        break;                    
                    case'🏡':
                        msg.edit(embed9).catch(()=>{});
                        break;
                    case'⬅':
                        msg.edit(embed).catch(()=>{});
                }
            });
        })
        .catch(() => {
            message.reply(`Nao foi possivel enviar no seu **DM** amiguinho (a) <:pensando:533762779727790080>`).catch(()=>{});
        });
};
