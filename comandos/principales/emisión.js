const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const lanzarChromium = require('../../utilidades/navegador');
const buscarAnime = require("../../utilidades/buscarAnime");
const privado = require("../../utilidades/privado");
const ultimaSelecciónEmisión = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emisión')
		.setDescription('Muestra los anime que estan en emisión')
        .addStringOption(privado[1]),
	cooldown: '8',
	example: ['**/emisión**'],
    category: 'Principal',
	guildOnly: true,
	execute (interaction) {
		emisionesslash();
            
            //función de busqueda
            async function emisionesslash(){
                //mensaje de espera (cargando...)
                privado[0](interaction, [new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Recopilando los animes en emisión ...")]);

                            const emisiónurl = `https://www3.animeflv.net/`;
            
                            //info
                            const [browser, page] = await lanzarChromium(puppeteer)
                            await page.goto(emisiónurl, {waitUntil: 'load', timeout: 0})
                            try{

                            //Cantidad
                            const totalEnEmisión = await page.evaluate(() => { return document.getElementsByClassName("ListSdbr")[0].childElementCount});
                            
                            if(totalEnEmisión === 0) {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                        .setColor("DARK_RED")
                                        .setTimestamp()
                                        .setDescription("No hay animes en emisión")
                                ]});
                                return await browser.close()
                            }

                            const emisiónMenu = new MessageSelectMenu()
                            .setCustomId('emisiones')
                            .setPlaceholder('Selecciona un anime (PARTE 1)');
                            const emisiónMenu2 = new MessageSelectMenu()
                            .setCustomId('emisiones25')
                            .setPlaceholder('Selecciona un anime (PARTE 2)');
                            
                            interaction.editReply({ embeds: [
                                new MessageEmbed()
                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                    .setColor("RANDOM")
                                    .setDescription(`**En emisión hay ${totalEnEmisión} animes**\nElije uno de los animes en emisión para verlo detalladamente:`)
                                    .setThumbnail("https://cdn.dribbble.com/users/1208688/screenshots/4575084/anime_search_event.gif")
                                    .setFooter({text: `Se cancelará la eleccion automáticamente en 40 segundos`})
                                ]});

                            for (let i = 1; i <= ((totalEnEmisión > 25) ? 25 : totalEnEmisión); i++) {
                                const result = `//*[@id="mCSB_1_container"]/ul/li[${i}]/a/text()`;
                                const pelianime = `#mCSB_1_container > ul > li:nth-child(${i}) > a > span`;
                                const enlace = `#mCSB_1_container > ul > li:nth-child(${i}) > a`;
                                //Para todos __________________________________________________________________________________________________________________________________________________________________________________       
                                await page.waitForXPath(result);
                                let element = await page.$x(result);
                                let valuexd = await page.evaluate(el => el.textContent, element[0]);
                                let titulo = valuexd;

                                const url = await page.$$eval(enlace, urlone => urlone.map(href => href.getAttribute('href')));

                                await page.waitForSelector(pelianime);
                                let tipo = await page.$(pelianime);
                                let tipodeanime = await page.evaluate(el => el.textContent, tipo);
                                emisiónMenu.addOptions([
                                    { 
                                        label: `${titulo}`,
                                        description: `${tipodeanime} N°${i}`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${url}`
                                    }
                                ])
                            } 

                            const row = new MessageActionRow()
                            .addComponents(
                                emisiónMenu
                            );

                            let row25;
                            if(totalEnEmisión > 25 ) {
                            for (let i = 26; i <= ((totalEnEmisión > 50) ? 50 : totalEnEmisión); i++) {
                                const result25 = `//*[@id="mCSB_1_container"]/ul/li[${i}]/a/text()`;
                                const pelianime25 = `#mCSB_1_container > ul > li:nth-child(${i}) > a > span`;
                                const enlace25 = `#mCSB_1_container > ul > li:nth-child(${i}) > a`;
                                //Para todos __________________________________________________________________________________________________________________________________________________________________________________       
                                await page.waitForXPath(result25);
                                let element25 = await page.$x(result25);
                                let valuexd25 = await page.evaluate(el => el.textContent, element25[0]);
                                let titulo25 = valuexd25;

                                const url25 = await page.$$eval(enlace25, urlone => urlone.map(href => href.getAttribute('href')));

                                await page.waitForSelector(pelianime25);
                                let tipo25 = await page.$(pelianime25);
                                let tipodeanime25 = await page.evaluate(el => el.textContent, tipo25);
                                emisiónMenu2.addOptions([
                                    { 
                                        label: `${titulo25}`,
                                        description: `${tipodeanime25} N°${i}`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${url25}`
                                    }
                                ])
                            }
                            row25 = new MessageActionRow()
                            .addComponents(
                                emisiónMenu2
                            );
                            }

                            var detalles5_1;
                            var elejido;
                            interaction.editReply({ components: (totalEnEmisión > 25) ? [row, row25] : [row] }).then(searchemision => {
                                const filterEmisión = (interacciónEmisión) => interacciónEmisión.user.id === interaction.member.id;
                                const collectorEmisión = searchemision.createMessageComponentCollector({
                                    componentType: "SELECT_MENU",
                                    filterEmisión,
                                    time: 39999
                                });
                                    //Collector On
                                    collectorEmisión.on('collect', async(collected) => {
                                        elejido = true;
                                        row.components[0].setDisabled(true);
                                        if (ultimaSelecciónEmisión.has(interaction.user.id)) return collected.deferUpdate();
                                        ultimaSelecciónEmisión.add(interaction.user.id)
                                        setTimeout(() => {
                                            ultimaSelecciónEmisión.delete(interaction.user.id)
                                        }, 5000);
                                        await collected.deferUpdate();
                                        const value = collected.values[0];
                                        const redirecturl = "https://www3.animeflv.net"+value;
                                        detallesEmisión = new MessageActionRow().addComponents(
                                            new MessageButton()
                                            .setURL(redirecturl)
                                            .setLabel("Ver original")
                                            .setStyle('LINK')
                                        );
                                        const componentes = (totalEnEmisión > 25) ? [row, row25, detallesEmisión] : [row, detallesEmisión]
                                        interaction.editReply({ embeds: [
                                        new MessageEmbed()
                                            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                            .setColor("RANDOM")
                                            .setDescription(`**Cargando Información...""`)
                                            .setFooter({text: `Puedes elejir otro durante 40 segundos`, iconURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1626286790970x379404562786661800%2FAdvanced-Loading-Spinner.gif"})
                                        ], components: componentes});
                                        row.components[0].setDisabled(false) && buscarAnime(interaction, page, browser, redirecturl, componentes);
                                        collectorEmisión.resetTimer();
                                    });
                                    //Collector Off
                    
                                    collectorEmisión.on('end', async(_, reason) => {
                                        if (reason === "time") {
                                        if (page.url() === emisiónurl){
                                            interaction.editReply({ embeds: [
                                                new MessageEmbed()
                                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                                    .setColor("RANDOM")
                                                    .setDescription(`La selección del anime ha terminado`)
                                                    .setThumbnail("https://c.tenor.com/KxEm4q8BoKcAAAAC/spider-man-alfred-molina.gif")
                                                ], components:[]});
                                        } else {interaction.editReply({ components:[]})}
                                        }
                                        await browser.close();
                                    })
                                })

                            }
                            catch(error){
                            await browser.close();
                            const errorEmbed = new MessageEmbed()
                            .setColor("DARK_RED")
                            .setDescription("Hubo un error al cargar los animes en emisión");
                            interaction.editReply({embeds: [errorEmbed]});
                            console.log(error)
                            }
            }
		}
};