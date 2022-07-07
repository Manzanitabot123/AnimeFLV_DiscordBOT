const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { version, author, dependencies } = require('../../package.json');
const { release, cpus } = require('os');
const privado = require("../../utilidades/privado");
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const lanzarChromium = require('../../utilidades/navegador');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Muestra información sobre el bot y su estado')
        .addStringOption(privado[1]),
    cooldown: '3',
    example: ['**/botinfo**'],
    category: 'Secundario',
    guildOnly: false,
	execute (interaction) {
        const servidor = interaction.guild;
        const { heapUsed, heapTotal } = process.memoryUsage();
        let totalSeconds = interaction.client.uptime / 1000;
            const days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
            const hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
        const totalAqui = (servidor === null ? `` : `\nAquí: \`${interaction.guild.memberCount}\``)
        const embed = new MessageEmbed()
            .setColor('#e09c2c')
            .setURL('https://www3.animeflv.net')
            .setTitle(`${interaction.client.user.username} v${version}`)
            .setAuthor((servidor === null ? {name: `AnimeFLV Bot`, iconURL: interaction.user.displayAvatarURL({ dynamic: false })} : {name: `${servidor.name}`, iconURL: servidor.iconURL()}))
            .addFields(
                /*
                { name: '📅 __Fecha de creación__', value: `\`${interaction.client.user.createdAt}\`` },
                */
                { name: '👥 __Usuarios__', value: `Total: \`${interaction.client.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)}\` \nEn cache: \`${interaction.client.users.cache.size}\``+totalAqui, inline: true },
                { name: '🧠 __Memoria__', value: `Total:\u2000\u2000[\` ${(heapTotal / 1024 / 1024).toFixed(0)} MB \`] \nUsado:\u2000\u2000[\` ${(heapUsed / 1024 / 1024).toFixed(0)} MB \`]`, inline: true },
                { name: '✉ __Chats__', value: `Servidores: \`${interaction.client.guilds.cache.size}\` \n Canales: \`${interaction.client.channels.cache.size}\``, inline: true },
                { name: '⚙️ __Sistema__', value: `SO:\u2000\u2000\`${process.platform.replace('win32', 'Windows').replace('darwin', 'MacOS').replace('linux', 'Linux')} ${release}\` \nDiscordJS:\u2000\u2000\`${dependencies["discord.js"].replace('^', 'v')}\` \nNode:\u2000\u2000\`${process.version}\` \nCPU:\u2000\u2000\`${cpus()[0].model}\``, inline: true },
                { name: '⌛ __Tiempo encendido__', value: `\`${days}\` días(s), \`${hours}\` horas(s), \`${minutes}\` minuto(s), \`${seconds}\` segundo(s)` },
                { name: '👀 __Observaciones__', value: `Estado del bot: \`Evaluando...\`\nEstado del sitio web: \`Evaluando...\`\nEstado de la página del bot: \`Evaluando...\`` }
            )
            .setFooter({text: `Info y estado del bot - Bot creado por ${author}`})
            .setColor('YELLOW');
        privado[0](interaction, [embed]);
        (async () => {
        let estadoFinalFLV;
        let estadoFinalBotPage;
        let luzEstado;
        const [browser, page] = await lanzarChromium(puppeteer)
        const evaluar = await page.goto('https://www3.animeflv.net/', {waitUntil: 'load', timeout: 0})
        if (evaluar.status() === 522||evaluar.status() === 404||evaluar.status() === 502) { luzEstado = 'RED'; estadoFinalFLV = `❌ No está funcionando... | ${evaluar.status()}` } else { luzEstado = 'GREEN'; estadoFinalFLV = `✅ Operando... | ${evaluar.status()}` }
        browser.close();
        await fetch(process.env.PAGINA_BOT)
        .then(res => {estadoFinalBotPage = `✅ Operando... | ${res.status}`})
        .catch(err => {estadoFinalBotPage = `❌ No está funcionando... | 404`});
        embed.fields[5] = { name: '👀 __Observaciones__', value: `Estado del bot: \`✅ Operando... | 200\`\nEstado del sitio web: \`${estadoFinalFLV}\`\nEstado de la página del bot: \`${estadoFinalBotPage}\`` }
        return interaction.editReply({embeds:[embed.setColor(luzEstado)]});
        })();
	}
};