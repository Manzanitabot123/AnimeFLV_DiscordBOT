const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const buscarAnime = require("../utilidades/buscarAnime");
const privado = require("../utilidades/privado");
const random = require('random');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Genera un anime aleatrio del repositorio de animes')
        .addStringOption(option => option.setName('tipo').setDescription('Ingresa el tipo de lista').setRequired(true).addChoices(
        {
            name: 'Cualquiera', 
            value: 'Todos'
        },
        {
            name: 'TV', 
            value: 'TV'
        },
        {
            name: 'Película', 
            value: 'Película'
        },
        {
            name: 'OVA', 
            value: 'OVA'
        }
        ))
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
	example: ['**/random**'],
	guildOnly: true,
	execute (interaction) {
		randomslash();
            
            //función de busqueda
            async function randomslash(){
                //mensaje de espera (cargando...)
                privado(interaction, new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(textoyemojis.emojis.dado + " Elijiendo un anime al azar..."));
                try{
                            let browserurl;
                            const tipoelejido = interaction.options.getString('tipo');
                            if(tipoelejido == "Todos"){ browserurl = `https://www3.animeflv.net/browse?`} else if(tipoelejido == "TV"){ browserurl = `https://www3.animeflv.net/browse?type%5B%5D=tv&order=default&`} else if(tipoelejido == "Película"){ browserurl = `https://www3.animeflv.net/browse?type%5B%5D=movie&order=default&`} else if(tipoelejido == "OVA"){ browserurl = `https://www3.animeflv.net/browse?type%5B%5D=ova&order=default&`} else if(tipoelejido == "Especial"){ browserurl = `https://www3.animeflv.net/browse?type%5B%5D=special&order=default&`} else {browserurl = `https://www3.animeflv.net/browse?`}
                            //info
                            const browser = await puppeteer.launch({
                                headless: true,
                                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                                });
                            const page = await browser.newPage();
                            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                            await page.goto(browserurl, {waitUntil: 'load', timeout: 0})
                            try{

                            //Cantidad de Paginas
                            const totaldepaginas = await page.evaluate(() => { return document.querySelector("body > div.Wrapper > div > div > main > div > ul > li:nth-child(13)").textContent})*1;
                            const pagina = random.int(1, totaldepaginas);
                            await page.goto(`${browserurl}page=${pagina}`, {waitUntil: 'load', timeout: 0})
                            //Cantidad de Animes
                            const totalderesultados = await page.evaluate(() => { return document.getElementsByClassName("ListAnimes AX Rows A03 C02 D02")[0].childElementCount})*1;
                            const elejido = random.int(1, totalderesultados);

                            //nombre
                            await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > div > strong`)
                            const titulodelanime = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > div > strong`)
                            let grantitulo = await page.evaluate(el => el.textContent, titulodelanime);

                            //tipo
                            await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span`)
                            const tipodelanime = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span`)
                            let grantipo = await page.evaluate(el => el.textContent, tipodelanime)
                            if(grantipo == "Anime") {grantipo = "el **anime**"} else if(grantipo == "OVA") {grantipo = "el **OVA**"} else {grantipo = "la **película**"};

                            //imagen
                            const imagenpequeña = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > a > div > figure > img`, imgs => imgs.map(img => img.getAttribute('src')));
                            const imagensita = imagenpequeña[0];

                            //estrellas
                            await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span.Vts.fa-star`);
                            const estrellas = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span.Vts.fa-star`);
                            let calificacion = await page.evaluate(el => el.textContent, estrellas);
                            
                            //seguidores
                            const seguiendo = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > span > span`);
                            let seguidores = await page.evaluate(el => el.textContent, seguiendo);

                            //link
                            const urlrandom = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > a`, urlrandom => urlrandom.map(href => href.getAttribute('href')));
                            const link = "https://www3.animeflv.net" + urlrandom[0];

                            const detallesrandom = new MessageActionRow().addComponents(
                                new MessageButton()
                                .setURL(link)
                                .setLabel("Ver original")
                                .setStyle('LINK')
                                );
                            interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setDescription(`Se ha elejido ${grantipo}:\n\n> \`${grantitulo}\`${calificacion != 0.0?`\nCalificación: ${calificacion} \⭐`:""}${seguidores != 0?`\nSeguidores: ${seguidores} \👥`:""}`)
                                        .setThumbnail(imagensita)
                                        .setFooter({text: "Cargando información más detallada...", iconURL:"https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1626286790970x379404562786661800%2FAdvanced-Loading-Spinner.gif"})
                                    ], components:[detallesrandom]
                                    });

                            buscarAnime(interaction, page, browser, link)
                            }
                            catch(error){
                            await browser.close();
                            interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription("Hubo un error al cargar el anime random")
                                ]});
                            console.log(error)
                            }
                            }
                            
                            catch(error)
                            {
                                console.log("ERROR EN RANDOM")
                                console.log(error)
                            }
            };
		}
};