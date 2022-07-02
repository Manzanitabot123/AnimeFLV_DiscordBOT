const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const lanzarChromium = require('../../utilidades/navegador');
const privado = require("../../utilidades/privado");
const enlacesDescarga = require("../../utilidades/enlacesDescarga");
const validUrl = require('valid-url');
const ultimaSelecciónDescargar = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('descargar')
		.setDescription('Obtén enlaces de descarga de cualquier anime')
        .addStringOption(option => option.setName('anime').setDescription('Nombre o link del anime que deseas descargar').setRequired(true))
        .addNumberOption(option => option.setName('capítulo').setDescription('El número del episodio que deseas descargar').setRequired(true))
        .addStringOption(privado[1]),
	cooldown: '5',
	example: [
        '**/descargar** anime:`Fullmetal Alchemist: Brotherhood` capítulo:`3`',
        '**/descargar** anime:`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood` capítulo:`3`'
      ],
    category: 'Principal',
	guildOnly: true,
	execute (interaction) {
		const args = interaction.options.getString('anime');
        const cap = interaction.options.getNumber("capítulo");
        const anime = args.replace(/ /g,"+");
        //comprobar el canal adecuado
            if(args.length < 3){
                    interaction.reply({
                        content: `${textoyemojis.emojis.cancelar} Ese nombre es muy corto`, 
                        ephemeral: true
                    })
                    return;
            } else if(!args){
                interaction.reply({
                    content: `${textoyemojis.emojis.cancelar} Te falta escribir el usuario que quieres buscar`, 
                    ephemeral: true
                })
                return;
            } else if(validUrl.isUri(args)){
                if(args.startsWith("https://www3.animeflv.net/anime/")) {
                    (async () => {
                    privado[0](interaction, [new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription("Buscando anime con el enlace: **" +  args + "** ...")]);

                    const [browser, page] = await lanzarChromium(puppeteer)
                    enlacesDescarga(interaction, page, browser, args, cap);
                    })();
                } else if (args.startsWith("https://www3.animeflv.net/ver/")) {
                    (async () => {
                    privado[0](interaction, [new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription("Buscando con el enlace: **" +  args + "** ...")]);
    
                    const [browser, page] = await lanzarChromium(puppeteer)
                    enlacesDescarga(interaction, page, browser, args, cap);
                    })();
                } else {
                    privado[0](interaction, [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${textoyemojis.emojis.cancelar} **${args}** no es un link válido.\n__Ejemplo:__\n ${textoyemojis.emojis.canal} **/buscar** anime:\`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood\` ${textoyemojis.emojis.cursor}`)
                    .setFooter({text: "Intentalo de nuevo"})]); 
                }
            } else { 
                descargarslash();
            }
            
            //función de busqueda
            async function descargarslash(){
                //mensaje de espera (cargando...)
                privado[0](interaction, [new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Buscando con el nombre: **" +  args + "** ...")]);

                            const busquedaurl = `https://www3.animeflv.net/browse?q=${anime}`;
            
                            //info
                            const [browser, page] = await lanzarChromium(puppeteer)
                            await page.goto(busquedaurl, {waitUntil: 'load', timeout: 0})
                            try{
                            
                            //Cantidad
                            const totalEnDescargas = await page.evaluate(() => { return document.getElementsByClassName("ListAnimes AX Rows A03 C02 D02")[0].childElementCount});
                            
                            if(totalEnDescargas === 0) {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                        .setColor("DARK_RED")
                                        .setTimestamp()
                                        .setDescription("No se encontraron coincidencias para **" + args  + "**")
                                ]});
                                return await browser.close()
                            }
                            
                            const BúsquedaDecargarMenu = new MessageSelectMenu()
                            .setCustomId('resultados')
                            .setPlaceholder('Selecciona el anime que buscas');

                            //Miniatura para Descargas
                            const imgs = await page.$$eval("body > div.Wrapper > div > div > main > ul > li > article > a > div > figure > img", imgsA => imgsA.map(img => img.getAttribute('src')));
                            const miniaturaDescargar = imgs[0]
                            interaction.editReply({ embeds: [
                                new MessageEmbed()
                                    .setAuthor({name: "Tu busqueda fue: 🔎 " + args , iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                    .setTitle("Por favor elige el anime que descargar")
                                    .setColor("DARK_GREEN")
                                    .setURL("https://www3.animeflv.net/browse?q=" + args .replace(/ /g,"+"))
                                    .setThumbnail(miniaturaDescargar)
                                    .setDescription(totalEnDescargas === 1? `**Se encontró solo 1 resultado**\nElíjelo para descargar el capítulo ${cap}:`:`**Se encontraron ${totalEnDescargas} resultados**\nElije uno de los resultados para descargar el capítulo ${cap}:`)
                                    .setFooter({text: `Se cancelará la eleccion automáticamente en 40 segundos`})
                                ]});

                            for (let i = 1; i <= ((totalEnDescargas > 24) ? 24 : totalEnDescargas); i++) {
                                const resultDescargar= `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > h3`;
                                const pelianimeDescargar = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > div > span`;
                                const starsDescargar = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > div > p:nth-child(2) > span.Vts.fa-star`;
                                
                                //__________________________________________________________________________________________________________________________________________________________________________________       
                                
                                await page.waitForSelector(resultDescargar)
                                let elementoDescargar = await page.$(resultDescargar)
                                let tituloDescargar = await page.evaluate(el => el.textContent, elementoDescargar)

                                await page.waitForSelector(starsDescargar)
                                const estrellasDescargar = await page.$(starsDescargar)
                                let calificaciónDescargar = await page.evaluate(el => el.textContent, estrellasDescargar)

                                await page.waitForSelector(pelianimeDescargar);
                                let tipoDescargar = await page.$(pelianimeDescargar);
                                let tipodeanimeDescargar = await page.evaluate(el => el.textContent, tipoDescargar);
                                if(tipodeanimeDescargar == "Anime") {tipodeanimeDescargar = "🌈 Anime"} else if(tipodeanimeDescargar == "OVA") {tipodeanimeDescargar = "📀 OVA"} else if(tipodeanimeDescargar == "Especial") {tipodeanimeDescargar = "💖 Especial"} else {tipodeanimeDescargar = "🎬 Película"}
                                
                                BúsquedaDecargarMenu.addOptions([
                                    { 
                                        label: `${tituloDescargar}`,
                                        description: `${tipodeanimeDescargar} N°${i} | Calificación: ${calificaciónDescargar} ⭐`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${i}`,
                                    }
                                ])
                            }

                            const row = new MessageActionRow()
                            .addComponents(
                                BúsquedaDecargarMenu
                            );


                            interaction.editReply({ components: [row] }).then(searchLinksDownload => {
                                const filterDescargar = (interacciónDescargar) => interacciónDescargar.user.id === interaction.member.id;
                                const collectorDescargar = searchLinksDownload.createMessageComponentCollector({
                                    componentType: "SELECT_MENU",
                                    filterDescargar,
                                    time: 39898
                                });
                                    collectorDescargar.on('collect', async(collected) => {
                                        elejido = true;
                                        row.components[0].setDisabled(true);
                                        if (ultimaSelecciónDescargar.has(interaction.user.id)) return collected.deferUpdate();
                                        ultimaSelecciónDescargar.add(interaction.user.id)
                                        setTimeout(() => {
                                            ultimaSelecciónDescargar.delete(interaction.user.id)
                                        }, 6000);

                                        await collected.deferUpdate();
                                        const value = collected.values[0];
                                        const SemiUrl = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a`, urlone => urlone.map(href => href.getAttribute('href')));
                                        let elementoDownload = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a > h3`)
                                        let nombreDownload = await page.evaluate(el => el.textContent, elementoDownload)
                                        let icono = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a > div > figure > img`, imgsD => imgsD.map(img => img.getAttribute('src')));
                                        interaction.editReply({ embeds: [
                                        new MessageEmbed()
                                            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                            .setColor("RANDOM")
                                            .setDescription(`*Haz seleccionado:* \n**${nombreDownload}** \n Cargando enlaces de descarga...`)
                                            .setThumbnail(icono[0])
                                            .setFooter({text: `Links extraidos de AnimeFLV`, iconURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1626286790970x379404562786661800%2FAdvanced-Loading-Spinner.gif"})
                                        ], components: [row]});
                                        enlacesDescarga(interaction, page, browser, SemiUrl[0], cap);
                                    });
                    
                                    collectorDescargar.on('end', async(_, reason) => {
                                        row.components[0].setDisabled(true);
                                        if (reason === "time") {
                                        if (page.url() === busquedaurl){
                                            interaction.editReply({ embeds: [
                                                new MessageEmbed()
                                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                                    .setColor("RANDOM")
                                                    .setDescription(`La selección del anime a descargar ha terminado`)
                                                    .setThumbnail(miniaturaDescargar)
                                                ], components:[row]});
                                        }
                                        }
                                    })
                                })

                            }
                            catch(error){
                            await browser.close();
                            interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription("Hubo un error al cargar los enlaces de descargas")
                                ]});
                            console.log(error)
                            }
            }
		}
};
