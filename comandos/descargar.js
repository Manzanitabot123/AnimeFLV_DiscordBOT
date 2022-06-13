const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const privado = require("../utilidades/privado");
const enlacesDescarga = require("../utilidades/enlacesDescarga");
const ultimaSelección = new Set();

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
        var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        const anime = args.replace(/ /g,"+");
        const member = interaction.member;
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
            } else if(regex.test(args)){
                if(args.startsWith("https://www3.animeflv.net/anime/")) {
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
                .setDescription("Buscando **" +  args + "** ..."));
                try{
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
                            const total = await page.evaluate(() => { return document.getElementsByClassName("ListAnimes AX Rows A03 C02 D02")[0].childElementCount});
                            
                            if(total === 0) {
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
                            const imgs = await page.$$eval("body > div.Wrapper > div > div > main > ul > li > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                            const miniatura = imgs[0]

                            interaction.editReply({ embeds: [
                                new MessageEmbed()
                                    .setAuthor({name: "Tu busqueda fue: 🔎 " + args , iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                    .setTitle("Por favor elige el anime que descargar")
                                    .setColor("DARK_GREEN")
                                    .setURL("https://www3.animeflv.net/browse?q=" + args .replace(/ /g,"+"))
                                    .setThumbnail(miniatura)
                                    .setDescription(`${total === 1? `**Se encontró solo 1 resultado**\nSeleccionalo para verlo detalladamente:`:`**Se encontraron ${total} resultados**\nElije uno de los resultados para descargar el capítulo ${cap}:`}`)
                                    .setFooter({text: `Se cancelará la eleccion automáticamente en 40 segundos`})
                                ]});

                            for (let i = 1; i <= ((total > 24) ? 24 : total); i++) {
                                const result= `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > h3`;
                                const pelianime = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a > div > span`;
                                const stars = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > div > p:nth-child(2) > span.Vts.fa-star`;
                                const enlace = `body > div.Wrapper > div > div > main > ul > li:nth-child(${i}) > article > a`;
                                //Para todos __________________________________________________________________________________________________________________________________________________________________________________       
                                await page.waitForSelector(result)
                                let element = await page.$(result)
                                let titulo = await page.evaluate(el => el.textContent, element)

                                await page.waitForSelector(stars)
                                const estrellas = await page.$(stars)
                                let calificación = await page.evaluate(el => el.textContent, estrellas)

                                const url = await page.$$eval(enlace, urlone => urlone.map(href => href.getAttribute('href')));

                                await page.waitForSelector(pelianime);
                                let tipo = await page.$(pelianime);
                                let tipodeanime = await page.evaluate(el => el.textContent, tipo);
                                if(tipodeanime == "Anime") {tipodeanime = "🌈 Anime"} else if(tipodeanime == "OVA") {tipodeanime = "📀 OVA"} else {tipodeanime = "🎬 Película"}
                                
                                BúsquedaMenu.addOptions([
                                    { 
                                        label: `${titulo}`,
                                        description: `${tipodeanime} N°${i} | Calificación: ${calificación} ⭐`,
                                        emoji: textoyemojis.emojis.play,
                                        value: `${url}`,
                                    }
                                ])
                            }; 

                            const row = new MessageActionRow()
                            .addComponents(
                                BúsquedaMenu
                            );


                            interaction.editReply({ components: (total > 25) ? [row, row25] : [row] }).then(searchemision => {
                                const filter = (interaction) => interaction.user.id === interaction.member.id;
                                const collector = searchemision.createMessageComponentCollector({
                                    componentType: "SELECT_MENU",
                                    filter,
                                    time: 40000,
                                    errors: ['time']
                                });
                                    //Collector On
                                    collector.on('collect', async(collected) => {
                                        if (ultimaSelección.has(interaction.user.id)) return collected.deferUpdate();
                                        ultimaSelección.add(interaction.user.id)
                                        setTimeout(() => {
                                            ultimaSelección.delete(interaction.user.id)
                                        }, 5000);

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
                                        collector.resetTimer();
                                    });
                                    //Collector Off
                    
                                    collector.on('end', async(_, reason) => {
                                        if (reason === "time") {
                                        if (page.url() === busquedaurl){
                                            interaction.editReply({ embeds: [
                                                new MessageEmbed()
                                                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                                    .setColor("RANDOM")
                                                    .setDescription(`La selección del anime ha terminado`)
                                                    .setThumbnail("https://c.tenor.com/KxEm4q8BoKcAAAAC/spider-man-alfred-molina.gif")
                                                ], components:[]});
                                        } else {interaction.editReply({ components:[]})}
                                        };
                                        await browser.close();
                                    });
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
                            
                            catch(error)
                            {
                                console.log("ERROR EN DESCARGAR")
                                console.log(error)
                            }
            };
		}
};