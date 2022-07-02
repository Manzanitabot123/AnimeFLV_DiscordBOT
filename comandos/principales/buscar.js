const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const lanzarChromium = require('../../utilidades/navegador');
const buscarAnime = require("../../utilidades/buscarAnime");
const privado = require("../../utilidades/privado");
const validUrl = require('valid-url');
const ultimaSelecciónBuscar = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buscar')
		.setDescription('Busca y obtén información de un anime')
        .addStringOption(option => option.setName('anime').setDescription('El nombre o el link del anime que quieres buscar').setRequired(true))
        .addStringOption(privado[1]),
	cooldown: '3',
    example: [
        '**/buscar** anime:`Fullmetal Alchemist: Brotherhood`',
        '**/buscar** anime:`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood`'
      ],
    category: 'Principal',
	guildOnly: true,
	execute (interaction) {
		const args = interaction.options.getString('anime');
        const anime = args.replace(/ /g,"+");
        //comprobar el canal adecuado
            if(!args){
            interaction.reply({
                content: `${textoyemojis.emojis.cancelar} Te falta escribir el usuario que quieres buscar`, 
                ephemeral: true
            })
            return;
            } else if(args.length < 3){
                    interaction.reply({
                        content: `${textoyemojis.emojis.cancelar} Ese nombre es muy corto`, 
                        ephemeral: true
                    })
                    return;
            } else if(args.includes(`\n`)){
                    interaction.reply({
                        content: `${textoyemojis.emojis.cancelar} Tu busqueda contiene más de un reglón`, 
                        ephemeral: true
                    })
                    return;
            } else if (validUrl.isUri(args)){
                if(args.startsWith("https://www3.animeflv.net/anime/")) {
                (async () => {
                privado[0](interaction, [new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Buscando con el enlace: **" +  args + "** ...")]);

                const [browser, page] = await lanzarChromium(puppeteer)
                buscarAnime(interaction, page, browser, args);
                })();
                } else if (args.startsWith("https://www3.animeflv.net/ver/")) {
                    (async () => {
                    privado[0](interaction, [new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription("Buscando con el enlace: **" +  args + "** ...")]);
                    const [browser, page] = await lanzarChromium(puppeteer)
                    buscarAnime(interaction, page, browser, args);
                    })();
                } else {
                    privado[0](interaction, [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${textoyemojis.emojis.cancelar} **${args}** no es un link válido.\n__Ejemplo:__\n ${textoyemojis.emojis.canal} **/buscar** anime:\`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood\` ${textoyemojis.emojis.cursor}`)
                    .setFooter({text: "Intentalo de nuevo"})]); 
                }
            } else { 
                buscarslash();
            }
            
            //función de busqueda
            async function buscarslash(){
                //mensaje de espera (cargando...)
                privado[0](interaction, [new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Buscando **" +  args + "** ...")]);
                
                            const busquedaurl = `https://www3.animeflv.net/browse?q=${anime}`;
            
                            //info
                            const [browser, page] = await lanzarChromium(puppeteer)
                            await page.goto(busquedaurl, {waitUntil: 'load', timeout: 0})
                            try{
                            
                            //Cantidad
                            const totalenBuscar = await page.evaluate(() => { return document.getElementsByClassName("ListAnimes AX Rows A03 C02 D02")[0].childElementCount});
                            
                            if(totalenBuscar === 0) {
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
                            
                            const BúsquedaMenu = new MessageSelectMenu()
                            .setCustomId('resultados')
                            .setPlaceholder('Selecciona un anime');

                            //Miniatura
                            const imgs = await page.$$eval("body > div.Wrapper > div > div > main > ul > li > article > a > div > figure > img", imgsA => imgsA.map(img => img.getAttribute('src')));
                            const miniatura = imgs[0]

                            interaction.editReply({ embeds: [
                                new MessageEmbed()
                                    .setAuthor({name: "Tu busqueda fue: 🔎 " + args , iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                    .setTitle("Por favor elige el anime que buscas")
                                    .setColor("DARK_GREEN")
                                    .setURL("https://www3.animeflv.net/browse?q=" + args .replace(/ /g,"+"))
                                    .setThumbnail(miniatura)
                                    .setDescription(totalenBuscar === 1? `**Se encontró solo 1 resultado**\nSeleccionalo para verlo detalladamente:`:`**Se encontraron ${totalenBuscar} resultados**\nElije uno de los resultados para verlo detalladamente:`)
                                    .setFooter({text: `Se cancelará la eleccion automáticamente en 40 segundos`})
                                ]});

                            for (let i = 1; i <= ((totalenBuscar > 24) ? 24 : totalenBuscar); i++) {
                                const result= `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > h3`;
                                const pelianime = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > div > span`;
                                const stars = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > div > p:nth-child(2) > span.Vts.fa-star`;
                                //Para todos __________________________________________________________________________________________________________________________________________________________________________________       
                                await page.waitForSelector(result)
                                let element = await page.$(result)
                                let titulo = await page.evaluate(el => el.textContent, element)

                                await page.waitForSelector(stars)
                                const estrellas = await page.$(stars)
                                let calificación = await page.evaluate(el => el.textContent, estrellas)

                                await page.waitForSelector(pelianime);
                                let tipo = await page.$(pelianime);
                                let tipodeanime = await page.evaluate(el => el.textContent, tipo);
                                if(tipodeanime == "Anime") {tipodeanime = "🌈 Anime"} else if(tipodeanime == "OVA") {tipodeanime = "📀 OVA"} else if(tipodeanime == "Especial") {tipodeanime = "💖 Especial"} else {tipodeanime = "🎬 Película"}
                                
                                BúsquedaMenu.addOptions([
                                    { 
                                        label: `${titulo}`,
                                        description: `${tipodeanime} N°${i} | Calificación: ${calificación} ⭐`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${i}`
                                    }
                                ])
                            }

                            const row = new MessageActionRow()
                            .addComponents(
                                BúsquedaMenu
                            );

                            var detalles5_1;
                            var elejido;
                            interaction.editReply({ components: [row] }).then(searching => {
                                const filterBuscar = (interacciónBuscar) => interacciónBuscar.user.id === interaction.member.id;
                                const collectorBuscar = searching.createMessageComponentCollector({
                                    componentType: "SELECT_MENU",
                                    filterBuscar,
                                    time: 40000
                                });
                                    //Collector On
                                    collectorBuscar.on('collect', async(collected) => {
                                        elejido = true;
                                        row.components[0].setDisabled(true);
                                        const value = collected.values[0];
                                        if (ultimaSelecciónBuscar.has(interaction.user.id)) return collected.deferUpdate();
                                        ultimaSelecciónBuscar.add(interaction.user.id)
                                        setTimeout(() => {
                                            ultimaSelecciónBuscar.delete(interaction.user.id)
                                        }, 5000);
                                        await collected.deferUpdate();
                                        const url = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a`, urlone => urlone.map(href => href.getAttribute('href')));
                                        let elemento = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a > h3`)
                                        let nombre = await page.evaluate(el => el.textContent, elemento)
                                        let icon = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${value}) > article > a > div > figure > img`, imgsA => imgsA.map(img => img.getAttribute('src')));
                                        const redirecturl = "https://www3.animeflv.net"+url[0];
                                        //detalles
                                        detalles5_1 = new MessageActionRow().addComponents(
                                            new MessageButton()
                                            .setURL(redirecturl)
                                            .setLabel("Ver original")
                                            .setStyle('LINK')
                                        );
                                        interaction.editReply({ embeds: [
                                        new MessageEmbed()
                                            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                            .setColor("RANDOM")
                                            .setDescription(`*Haz seleccionado:* \n**${nombre}** \n Cargando Información...`)
                                            .setThumbnail(icon[0])
                                            .setFooter({text: `Puedes elejir otro durante 40 segundos`, iconURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1626286790970x379404562786661800%2FAdvanced-Loading-Spinner.gif"})
                                        ], components: [row, detalles5_1]});
                                        row.components[0].setDisabled(false) && await buscarAnime(interaction, page, browser, redirecturl, [row, detalles5_1]);
                                        await page.goto(busquedaurl, {waitUntil: 'load', timeout: 0})
                                        collectorBuscar.resetTimer();
                                    });
                                    //Collector Off
                    
                                    collectorBuscar.on('end', async(_, reason) => {
                                        row.components[0].setDisabled(true);
                                        if (reason === "time") {
                                        if (!elejido){
                                            interaction.editReply({ embeds: [
                                                new MessageEmbed()
                                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                                    .setColor("RANDOM")
                                                    .setDescription(`La selección del anime ha terminado`)
                                                    .setThumbnail(miniatura)
                                                ], components: [row]});
                                        } else {interaction.editReply({ components: [row, detalles5_1]})}
                                        }
                                        await browser.close();
                                    });
                                })

                            }
                            catch(error){
                            let errEmbed = new MessageEmbed()
                            .setColor("DARK_RED")
                            .setDescription("Hubo un error al cargar los resultados de la búsqueda");

                            interaction.editReply({
                                embeds: [
                                    errEmbed
                                ]});
                            await browser.close();
                            console.log(error)
                            }
            }
		}
};