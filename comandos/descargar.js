const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const privado = require("../utilidades/privado");
const enlacesDescarga = require("../utilidades/enlacesDescarga");
const validUrl = require('valid-url');
const ultimaSelecciónDescargar = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('descargar')
		.setDescription('Obtén enlaces de descarga de cualquier anime')
        .addStringOption(option => option.setName('anime').setDescription('Nombre o link del anime que deseas descargar').setRequired(true))
        .addNumberOption(option => option.setName('capítulo').setDescription('El número del episodio que deseas descargar').setRequired(true))
        .addStringOption(option => option.setName('privado').setDescription('Solo tu podras ver mis mensajes (Por defecto: Si)').addChoices(
        {
            name: 'Si, solo quiero verlo yo', 
            value: 'true'
        },
        {
            name: 'No, muestralo para todos', 
            value: 'false'
        }
        )),
	cooldown: '5',
	example: [
        '**/descargar** anime:`Fullmetal Alchemist: Brotherhood` capítulo:`3`',
        '**/descargar** anime:`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood` capítulo:`3`'
      ],
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
            } if(!args){
                interaction.reply({
                    content: `${textoyemojis.emojis.cancelar} Te falta escribir el usuario que quieres buscar`, 
                    ephemeral: true
                })
                return;
            } else if(validUrl.isUri(args)){
                if(args.startsWith("https://www3.animeflv.net/anime/")) {
                    (async () => {
                    privado(interaction, new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription("Buscando anime con el enlace: **" +  args + "** ..."));

                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                        });
                    const page = await browser.newPage();
                    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                    enlacesDescarga(interaction, page, browser, args, cap);
                    })();
                } else if (args.startsWith("https://www3.animeflv.net/ver/")) {
                    (async () => {
                    privado(interaction, new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription("Buscando con el enlace: **" +  args + "** ..."));
    
                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                        });
                    const page = await browser.newPage();
                    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                    enlacesDescarga(interaction, page, browser, args, cap);
                    })();
                } else {
                    privado(interaction, new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${textoyemojis.emojis.cancelar} **${args}** no es un link válido.\n__Ejemplo:__\n ${textoyemojis.emojis.canal} **/buscar** anime:\`https://www3.animeflv.net/anime/fullmetal-alchemist-brotherhood\` ${textoyemojis.emojis.cursor}`)
                    .setFooter({text: "Intentalo de nuevo"})); 
                }
            } else { 
                descargarslash();
            }
            
            //función de busqueda
            async function descargarslash(){
                //mensaje de espera (cargando...)
                privado(interaction, new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Buscando con el nombre: **" +  args + "** ..."));

                            const busquedaurl = `https://www3.animeflv.net/browse?q=${anime}`;
            
                            //info
                            const browser = await puppeteer.launch({
                                headless: true,
                                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                                });
                            const page = await browser.newPage();
                            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
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
                                const enlaceDescargar = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a`;
                                
                                //__________________________________________________________________________________________________________________________________________________________________________________       
                                
                                await page.waitForSelector(resultDescargar)
                                let elementoDescargar = await page.$(resultDescargar)
                                let tituloDescargar = await page.evaluate(el => el.textContent, elementoDescargar)

                                await page.waitForSelector(starsDescargar)
                                const estrellasDescargar = await page.$(starsDescargar)
                                let calificaciónDescargar = await page.evaluate(el => el.textContent, estrellasDescargar)

                                const url = await page.$$eval(enlaceDescargar, urlone => urlone.map(href => href.getAttribute('href')));

                                await page.waitForSelector(pelianimeDescargar);
                                let tipoDescargar = await page.$(pelianimeDescargar);
                                let tipodeanimeDescargar = await page.evaluate(el => el.textContent, tipoDescargar);
                                if(tipodeanimeDescargar == "Anime") {tipodeanimeDescargar = "🌈 Anime"} else if(tipodeanimeDescargar == "OVA") {tipodeanimeDescargar = "📀 OVA"} else if(tipodeanimeDescargar == "Especial") {tipodeanimeDescargar = "💖 Especial"} else {tipodeanimeDescargar = "🎬 Película"}
                                
                                BúsquedaDecargarMenu.addOptions([
                                    { 
                                        label: `${tituloDescargar}`,
                                        description: `${tipodeanimeDescargar} N°${i} | Calificación: ${calificaciónDescargar} ⭐`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${url}`,
                                    }
                                ])
                            }

                            const row = new MessageActionRow()
                            .addComponents(
                                BúsquedaDecargarMenu
                            );


                            interaction.editReply({ components: (totalEnDescargas > 25) ? [row, row25] : [row] }).then(searchLinksDownload => {
                                const filterDescargar = (interacciónDescargar) => interacciónDescargar.user.id === interaction.member.id;
                                const collectorDescargar = searchLinksDownload.createMessageComponentCollector({
                                    componentType: "SELECT_MENU",
                                    filterDescargar,
                                    time: 39898
                                });
                                    collectorDescargar.on('collect', async(collected) => {
                                        if (ultimaSelecciónDescargar.has(interaction.user.id)) return collected.deferUpdate();
                                        ultimaSelecciónDescargar.add(interaction.user.id)
                                        setTimeout(() => {
                                            ultimaSelecciónDescargar.delete(interaction.user.id)
                                        }, 8000);

                                        await collected.deferUpdate();
                                        const value = collected.values[0];
                                        const redirecturl = value;
                                        interaction.editReply({ embeds: [
                                        new MessageEmbed()
                                            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                            .setColor("RANDOM")
                                            .setDescription(`**Haz elejido un anime** \n Cargando enlaces de descarga...`)
                                            .setThumbnail("https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1626286790970x379404562786661800%2FAdvanced-Loading-Spinner.gif")
                                            .setFooter({text: `Espera unos segundos`})
                                        ]});
                                        enlacesDescarga(interaction, page, browser, redirecturl, cap);
                                        collectorDescargar.resetTimer();
                                    });
                    
                                    collectorDescargar.on('end', async(_, reason) => {
                                        if (reason === "time") {
                                        if (page.url() === busquedaurl){
                                            interaction.editReply({ embeds: [
                                                new MessageEmbed()
                                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                                    .setColor("RANDOM")
                                                    .setDescription(`La selección del anime ha terminado`)
                                                    .setThumbnail("https://c.tenor.com/KxEm4q8BoKcAAAAC/spider-man-alfred-molina.gif")
                                                ], components:[]});
                                        }
                                        };
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
