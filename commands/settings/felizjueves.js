const { Client, Message, MessageEmbed, Permissions, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { captureRejections } = require("events");
const db = require('quick.db');
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply(textoyemojis.errors.noPerm)
    const member = message.member;
    let felizjuevesconfig = "verdad";
    let siono = db.get(`felizjueves.${message.guild.id}`)
    var ffelizjueves;
    if (siono) {
        ffelizjueves = siono
    } else {
        ffelizjueves = felizjuevesconfig
    };

    const rowtrue = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('verdad')
        .setEmoji(textoyemojis.emojis.encendido)
        .setLabel("Encendido")
        .setStyle('SUCCESS')
        );

    const rowfalse = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('falso')
        .setEmoji(textoyemojis.emojis.apagado)
        .setLabel("Apagado")
        .setStyle('DANGER'),
        new MessageButton()
        .setCustomId('verdad')
        .setEmoji(textoyemojis.emojis.encendido)
        .setLabel("Cambiar canal")
        .setStyle('SUCCESS')
        );

        const resultado2 = new MessageEmbed()
        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
        .setTitle("Selecciona un boton:")
        .setColor("DARK_GREEN")
        .setDescription("El botón verde mantendrá encedido el mensaje semanal de feliz jueves y mientras que el botón rojo, todo lo contrario.")
        .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947292769037189200/Asuka_running.gif")
        .setFooter({text: `Se cancelará la elección automáticamente en 20 segundos`});

        if (ffelizjueves === "verdad") {
            message.reply({embeds: [resultado2], components:[rowfalse]}).then(message => {
                const filter = (button2) => button2.user.id === member.id;
                const collector2 = message.createMessageComponentCollector({
                    filter,
                    max: 1,
                    time: 20000,
                    errors: ['time']
                });
                    //Collector On
                    collector2.on('collect', async b => {
                        await b.deferUpdate()      
                        if (b.customId === "verdad") { 
                            db.set(`felizjueves.${message.guild.id}`, "verdad");
                            collectorchannel(message)
    
                        } else if (b.customId === "falso") {
                            db.set(`felizjueves.${message.guild.id}`, "falso");
                            message.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("RED")
                                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                                        .setDescription(textoyemojis.commands.felizjueves.messages.newConfig +"**Desactivada**")
                                        .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947296840691363870/Asuka_enojada.gif")
                                ], components:[]})
                            
                        }
                    });
                    //Collector Off
    
                    collector2.on('end', async(collected, reason) => {
                        if (collected.size < 1) {
                        console.log("Timeout 4");
                        message.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription("Te tardaste mucho en elejir...")
                            ], components:[]})
                        }
                    });
        });
        } else if (ffelizjueves === "falso") {
            message.reply({embeds: [resultado2], components:[rowtrue]}).then(message => {
                const filter = (button2) => button2.user.id === member.id;
                const collector2 = message.createMessageComponentCollector({
                    filter,
                    max: 1,
                    time: 20000,
                    errors: ['time']
                });
                    //Collector On
                    collector2.on('collect', async b => {
                        await b.deferUpdate()      
                        if (b.customId === "verdad") { 
                            db.set(`felizjueves.${message.guild.id}`, "verdad");
                            collectorchannel(message)
                        }
                    });
                    //Collector Off
    
                    collector2.on('end', async(collected, reason) => {
                        if (collected.size < 1) {
                        console.log("Timeout 4");
                        message.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription("Te tardaste mucho en elejir...")
                            ], components:[]})
                        }
                    });
        });
        }

    async function collectorchannel(msg) {
        let channels = message.guild.channels.cache;

        const select_Menu = new MessageSelectMenu()
                .setCustomId('canal')
                .setPlaceholder('Selecciona un canal de texto')
                .addOptions([{ 
                    label: `Cancelar`,
                    description: "Anula la elección del canal de feliz jueves",
                    emoji: textoyemojis.emojis.cancelar,
                    value: `cancel`,
                },
                { 
                    label: `Canal aleatorio`,
                    description: `El mensaje será enviado a un canal aleatorio`,
                    emoji: textoyemojis.emojis.dado,
                    value: `random`,
                }
                ]);

        channels.map(g => { if(g.type =="GUILD_TEXT") return select_Menu.addOptions([
            { 
                label: `${g.name}`,
                description: `${g.parent.name}`,
                emoji: textoyemojis.emojis.canal,
                value: `${g.id}`,
            }
        ])});

        const row = new MessageActionRow()
        .addComponents(
            select_Menu,
            
        );

        
        msg.edit({ embeds: [
            new MessageEmbed()
                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                .setColor("RANDOM")
                .setDescription("Elije un canal para el saludo semanal de **Feliz Jueves**:")
                .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947292769037189200/Asuka_running.gif")
                .setFooter({text: `Se cancelará la eleccion automáticamente en 25 segundos`})
            ], components: [row]}).then(message => {
            const filter = (interaction) => interaction.user.id === member.id;
            const collector = message.createMessageComponentCollector({
                componentType: "SELECT_MENU",
                filter,
                time: 25000,
                errors: ['time']
            });
                //Collector On
                collector.on('collect', async(collected) => {
                    await collected.deferUpdate()     
                    const value = collected.values[0]
                    if(value === "cancel") {
                        message.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("RED")
                                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                                    .setDescription(textoyemojis.commands.felizjueves.errors.anterior)
                                    .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947296840691363870/Asuka_enojada.gif")
                            ], components:[]})
                    } else if (value === "random"){
                        db.set(`felizjueves_canal.${message.guild.id}`, `random`);
                        const randomembed =  new MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                        .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947292769037189200/Asuka_running.gif")
                        .setFooter({text: textoyemojis.commands.felizjueves.messages.randomChannelnota});
                        if (ffelizjueves === "verdad") {
                            message.edit({
                                embeds: [ 
                                    randomembed.setDescription(textoyemojis.commands.felizjueves.messages.sigueConfig + `**Encendido**` + "\n"+ textoyemojis.commands.felizjueves.messages.randomChannel)
                                ], components:[]})
                        } else if (ffelizjueves === "falso") {
                            message.edit({
                                embeds: [ 
                                    randomembed.setDescription(textoyemojis.commands.felizjueves.messages.newConfig + `**Encendido**` + "\n"+ textoyemojis.commands.felizjueves.messages.randomChannel)
                                ], components:[]})
                        }
                    } else {
                        db.set(`felizjueves_canal.${message.guild.id}`, `${value}`);
                        const randomnewch = new MessageEmbed()
                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                        .setColor("GREEN")
                        .setThumbnail("https://media.discordapp.net/attachments/946075296069730385/947292769037189200/Asuka_running.gif");
                        if (ffelizjueves === "verdad") {
                            message.edit({
                                embeds: [
                                    randomnewch.setDescription(textoyemojis.commands.felizjueves.messages.sigueConfig + `**Encendido**` + "\n"+ textoyemojis.commands.felizjueves.messages.newChannel+ `<#${value}>`)
                                ], components:[]})
                        } else if (ffelizjueves === "falso") {
                            message.edit({
                                embeds: [
                                    randomnewch.setDescription(textoyemojis.commands.felizjueves.messages.newConfig + `**Encendido**` + "\n"+ textoyemojis.commands.felizjueves.messages.newChannel+ `<#${value}>`)
                                ], components:[]})
                        }
                    }
                });
                //Collector Off

                collector.on('end', async(collected, reason) => {
                    if (collected.size < 1) {
                    console.log("Timeout");
                    message.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("RED")
                                .setDescription("Te tardaste mucho en elejir...")
                        ], components:[]})
                    }
                });
            })
        }
}
module.exports.conf = {
    "name": "felizjueves",
    "description": [ "Activa/desactiva el mensaje semanal de Feliz jueves." ],
    "aliases": ["feliz-jueves"],
    "usage": ["felizjueves"],
    "category": "settings"
}
