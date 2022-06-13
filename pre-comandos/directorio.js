const { Client, Interaction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");
const random = require('random');
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run = (client, interaction, options) => {
    var numerodepagina;
            if (!options.página){
                numerodepagina = 1;
                directorioslash(numerodepagina - 1)
            } else {
                var pointNum = options.página.value;
                if (pointNum < 1) {
                    interaction.reply({
                      content: "El número debe ser mayor a 0", 
                      ephemeral: true
                  })
                } else if ( pointNum > 146) {
                    interaction.reply({
                      content: "El número debe ser menor a 146", 
                      ephemeral: true
                  })
                } else { 
                    numerodepagina = pointNum;
                    directorioslash(numerodepagina - 1)
                }
            }
            
            //función de busqueda
            async function directorioslash(numerodepg){
                //mensaje de espera (cargando...)
                await interaction.deferReply();
                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Recopilando los animes en emisión ...")
                    ], components:[]});

                try{
                            const url = `https://www3.animeflv.net/browse?page=${numerodepg+1}`;
                            //info
                            const browser = await puppeteer.launch({
                                headless: true,
                                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                                });
                            const page = await browser.newPage();
                            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                            const tiomeout = await page.goto(url, {waitUntil: 'load', timeout: 0});

                            if (tiomeout.status() === 522) {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription(textoyemojis.errors.error522)
                                        .setFooter({text: textoyemojis.errors.espera})
                                ]});
                                return await browser.close()

                            } else if (tiomeout.status() === 404) {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription(textoyemojis.errors.error404)
                                        .setFooter({text: textoyemojis.errors.espera})
                                ]});
                                return await browser.close()
                                
                            } else if (tiomeout.status() === 502) {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription(textoyemojis.errors.error502)
                                        .setFooter({text: textoyemojis.errors.espera})
                                ]});
                                return await browser.close()
                                
                            } else {
                                
                            //ARMAR EMBEDS
                                                    let resultado1 = new MessageEmbed()
                                                    .setAuthor({name: "AnimeFLV", iconURL: "https://c.tenor.com/pXEDrZV2s4QAAAAi/star-spinning.gif", url: "https://www3.animeflv.net/browse"})
                                                    .setTitle("Lista completa de Animes:")
                                                    .setColor("RANDOM");

                                                    const button1 = new MessageButton()
                                                                    .setCustomId('previousbtn')
                                                                    .setEmoji(`${textoyemojis.emojis.izquierda}`)
                                                                    .setStyle('SECONDARY');

                                                    const button2 = new MessageButton()
                                                                    .setCustomId('nextbtn')
                                                                    .setEmoji(`${textoyemojis.emojis.derecha}`)
                                                                    .setStyle('SECONDARY');

                                                    // Create an array of embeds
                                                    pages = [
                                                        resultado1
                                                    ];

                                                    //create an array of buttons

                                                    buttonList = [
                                                        button1,
                                                        button2
                                                    ]
                                                
                                                    paginationEmbed(numerodepg, browser, page, interaction, pages, buttonList)
                                            
                                            }
                            }
                            
                            catch(error)
                            {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_RED")
                                            .setTimestamp()
                                            .setDescription("Hubo un error al cargar los animes en emisión")
                                    ]});
                                console.log(error)
                            }
                        }


                        async function paginationEmbed (numerodepg, browser, pagina, interaction, pages, buttonList) {
                            if (!pages) throw new Error("No hay páginas");
                            if (!buttonList) throw new Error("No hay botones");
                            if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
                              throw new Error(
                                "Los botones de enlace no son compatibles"
                              );
                            if (buttonList.length !== 2) throw new Error("Se necesitan dos botones");
                          
                            let page = numerodepg;
                          
                            const row = new MessageActionRow().addComponents(buttonList);
                            
                            const title1 = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > h3";
                            const pelianime1 = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > div > span";
                            const enlace1 = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a";
                            
                            const title2 = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a > h3";
                            const pelianime2 = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a > div > span";
                            const enlace2 = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a";

                            const title3 = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a > h3";
                            const pelianime3 = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a > div > span";
                            const enlace3 = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a";

                            const title4 = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a > h3";
                            const pelianime4 = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a > div > span";
                            const enlace4 = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a";

                            const title5 = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a > h3";
                            const pelianime5 = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a > div > span";
                            const enlace5 = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a";
                            
                            const title6 = "body > div.Wrapper > div > div > main > ul > li:nth-child(6) > article > a > h3";
                            const pelianime6 = "body > div.Wrapper > div > div > main > ul > li:nth-child(6) > article > a > div > span";
                            const enlace6 = "body > div.Wrapper > div > div > main > ul > li:nth-child(6) > article > a";

                            const title7 = "body > div.Wrapper > div > div > main > ul > li:nth-child(7) > article > a > h3";
                            const pelianime7 = "body > div.Wrapper > div > div > main > ul > li:nth-child(7) > article > a > div > span";
                            const enlace7 = "body > div.Wrapper > div > div > main > ul > li:nth-child(7) > article > a";

                            const title8 = "body > div.Wrapper > div > div > main > ul > li:nth-child(8) > article > a > h3";
                            const pelianime8 = "body > div.Wrapper > div > div > main > ul > li:nth-child(8) > article > a > div > span";
                            const enlace8 = "body > div.Wrapper > div > div > main > ul > li:nth-child(8) > article > a";

                            const title9 = "body > div.Wrapper > div > div > main > ul > li:nth-child(9) > article > a > h3";
                            const pelianime9 = "body > div.Wrapper > div > div > main > ul > li:nth-child(9) > article > a > div > span";
                            const enlace9 = "body > div.Wrapper > div > div > main > ul > li:nth-child(9) > article > a";

                            const title10 = "body > div.Wrapper > div > div > main > ul > li:nth-child(10) > article > a > h3";
                            const pelianime10 = "body > div.Wrapper > div > div > main > ul > li:nth-child(10) > article > a > div > span";
                            const enlace10 = "body > div.Wrapper > div > div > main > ul > li:nth-child(10) > article > a";
                            
                            const title11 = "body > div.Wrapper > div > div > main > ul > li:nth-child(11) > article > a > h3";
                            const pelianime11 = "body > div.Wrapper > div > div > main > ul > li:nth-child(11) > article > a > div > span";
                            const enlace11 = "body > div.Wrapper > div > div > main > ul > li:nth-child(11) > article > a";

                            const title12 = "body > div.Wrapper > div > div > main > ul > li:nth-child(12) > article > a > h3";
                            const pelianime12 = "body > div.Wrapper > div > div > main > ul > li:nth-child(12) > article > a > div > span";
                            const enlace12 = "body > div.Wrapper > div > div > main > ul > li:nth-child(12) > article > a";

                            const title13 = "body > div.Wrapper > div > div > main > ul > li:nth-child(13) > article > a > h3";
                            const pelianime13 = "body > div.Wrapper > div > div > main > ul > li:nth-child(13) > article > a > div > span";
                            const enlace13 = "body > div.Wrapper > div > div > main > ul > li:nth-child(13) > article > a";

                            const title14 = "body > div.Wrapper > div > div > main > ul > li:nth-child(14) > article > a > h3";
                            const pelianime14 = "body > div.Wrapper > div > div > main > ul > li:nth-child(14) > article > a > div > span";
                            const enlace14 = "body > div.Wrapper > div > div > main > ul > li:nth-child(14) > article > a";
                            
                            const title15 = "body > div.Wrapper > div > div > main > ul > li:nth-child(15) > article > a > h3";
                            const pelianime15 = "body > div.Wrapper > div > div > main > ul > li:nth-child(15) > article > a > div > span";
                            const enlace15 = "body > div.Wrapper > div > div > main > ul > li:nth-child(15) > article > a";

                            const title16 = "body > div.Wrapper > div > div > main > ul > li:nth-child(16) > article > a > h3";
                            const pelianime16 = "body > div.Wrapper > div > div > main > ul > li:nth-child(16) > article > a > div > span";
                            const enlace16 = "body > div.Wrapper > div > div > main > ul > li:nth-child(16) > article > a";

                            const title17 = "body > div.Wrapper > div > div > main > ul > li:nth-child(17) > article > a > h3";
                            const pelianime17 = "body > div.Wrapper > div > div > main > ul > li:nth-child(17) > article > a > div > span";
                            const enlace17 = "body > div.Wrapper > div > div > main > ul > li:nth-child(17) > article > a";

                            const title18 = "body > div.Wrapper > div > div > main > ul > li:nth-child(18) > article > a > h3";
                            const pelianime18 = "body > div.Wrapper > div > div > main > ul > li:nth-child(18) > article > a > div > span";
                            const enlace18 = "body > div.Wrapper > div > div > main > ul > li:nth-child(18) > article > a";

                            const title19 = "body > div.Wrapper > div > div > main > ul > li:nth-child(19) > article > a > h3";
                            const pelianime19 = "body > div.Wrapper > div > div > main > ul > li:nth-child(19) > article > a > div > span";
                            const enlace19 = "body > div.Wrapper > div > div > main > ul > li:nth-child(19) > article > a";
                            
                            const title20 = "body > div.Wrapper > div > div > main > ul > li:nth-child(20) > article > a > h3";
                            const pelianime20 = "body > div.Wrapper > div > div > main > ul > li:nth-child(20) > article > a > div > span";
                            const enlace20 = "body > div.Wrapper > div > div > main > ul > li:nth-child(20) > article > a";

                            const title21 = "body > div.Wrapper > div > div > main > ul > li:nth-child(21) > article > a > h3";
                            const pelianime21 = "body > div.Wrapper > div > div > main > ul > li:nth-child(21) > article > a > div > span";
                            const enlace21 = "body > div.Wrapper > div > div > main > ul > li:nth-child(21) > article > a";

                            const title22 = "body > div.Wrapper > div > div > main > ul > li:nth-child(22) > article > a > h3";
                            const pelianime22 = "body > div.Wrapper > div > div > main > ul > li:nth-child(22) > article > a > div > span";
                            const enlace22 = "body > div.Wrapper > div > div > main > ul > li:nth-child(22) > article > a";

                            const title23 = "body > div.Wrapper > div > div > main > ul > li:nth-child(23) > article > a > h3";
                            const pelianime23 = "body > div.Wrapper > div > div > main > ul > li:nth-child(23) > article > a > div > span";
                            const enlace23 = "body > div.Wrapper > div > div > main > ul > li:nth-child(23) > article > a";
                            
                            const title24 = "body > div.Wrapper > div > div > main > ul > li:nth-child(24) > article > a > h3";
                            const pelianime24 = "body > div.Wrapper > div > div > main > ul > li:nth-child(24) > article > a > div > span";
                            const enlace24 = "body > div.Wrapper > div > div > main > ul > li:nth-child(24) > article > a";
                              
                            //Miniatura
                            const imgs1 = await pagina.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                            const miniatura1 = imgs1[0];
                            // 1
                            await pagina.waitForSelector(title1)
                            let element1 = await pagina.$(title1)
                            let value1 = await pagina.evaluate(el => el.textContent, element1)
                            let titulo1 = value1

                            const url1 = await pagina.$$eval(enlace1, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl1 = "https://www3.animeflv.net" + url1

                            await pagina.waitForSelector(pelianime1)
                            let tipo1 = await pagina.$(pelianime1)
                            let tipodeanime1 = await pagina.evaluate(el => el.textContent, tipo1)

                            // 2
                            await pagina.waitForSelector(title2)
                            let element2 = await pagina.$(title2)
                            let value2 = await pagina.evaluate(el => el.textContent, element2)
                            let titulo2 = value2

                            const url2 = await pagina.$$eval(enlace2, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl2 = "https://www3.animeflv.net" + url2

                            await pagina.waitForSelector(pelianime2)
                            let tipo2 = await pagina.$(pelianime2)
                            let tipodeanime2 = await pagina.evaluate(el => el.textContent, tipo2)

                            // 3
                            await pagina.waitForSelector(title3)
                            let element3 = await pagina.$(title3)
                            let value3 = await pagina.evaluate(el => el.textContent, element3)
                            let titulo3 = value3

                            const url3 = await pagina.$$eval(enlace3, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl3 = "https://www3.animeflv.net" + url3

                            await pagina.waitForSelector(pelianime3)
                            let tipo3 = await pagina.$(pelianime3)
                            let tipodeanime3 = await pagina.evaluate(el => el.textContent, tipo3)

                            // 4
                            await pagina.waitForSelector(title4)
                            let element4 = await pagina.$(title4)
                            let value4 = await pagina.evaluate(el => el.textContent, element4)
                            let titulo4 = value4

                            const url4 = await pagina.$$eval(enlace4, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl4 = "https://www3.animeflv.net" + url4

                            await pagina.waitForSelector(pelianime4)
                            let tipo4 = await pagina.$(pelianime4)
                            let tipodeanime4 = await pagina.evaluate(el => el.textContent, tipo4)

                            // 5
                            await pagina.waitForSelector(title5)
                            let element5 = await pagina.$(title5)
                            let value5 = await pagina.evaluate(el => el.textContent, element5)
                            let titulo5 = value5

                            const url5 = await pagina.$$eval(enlace5, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl5 = "https://www3.animeflv.net" + url5

                            await pagina.waitForSelector(pelianime5)
                            let tipo5 = await pagina.$(pelianime5)
                            let tipodeanime5 = await pagina.evaluate(el => el.textContent, tipo5)

                            // 6
                            await pagina.waitForSelector(title6)
                            let element6 = await pagina.$(title6)
                            let value6 = await pagina.evaluate(el => el.textContent, element6)
                            let titulo6 = value6

                            const url6 = await pagina.$$eval(enlace6, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl6 = "https://www3.animeflv.net" + url6

                            await pagina.waitForSelector(pelianime6)
                            let tipo6 = await pagina.$(pelianime6)
                            let tipodeanime6 = await pagina.evaluate(el => el.textContent, tipo6)

                            // 7
                            await pagina.waitForSelector(title7)
                            let element7 = await pagina.$(title7)
                            let value7 = await pagina.evaluate(el => el.textContent, element7)
                            let titulo7 = value7

                            const url7 = await pagina.$$eval(enlace7, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl7 = "https://www3.animeflv.net" + url7

                            await pagina.waitForSelector(pelianime7)
                            let tipo7 = await pagina.$(pelianime7)
                            let tipodeanime7 = await pagina.evaluate(el => el.textContent, tipo7)

                            // 8
                            await pagina.waitForSelector(title8)
                            let element8 = await pagina.$(title8)
                            let value8 = await pagina.evaluate(el => el.textContent, element8)
                            let titulo8 = value8

                            const url8 = await pagina.$$eval(enlace8, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl8 = "https://www3.animeflv.net" + url8

                            await pagina.waitForSelector(pelianime8)
                            let tipo8 = await pagina.$(pelianime8)
                            let tipodeanime8 = await pagina.evaluate(el => el.textContent, tipo8)

                            // 9
                            await pagina.waitForSelector(title9)
                            let element9 = await pagina.$(title9)
                            let value9 = await pagina.evaluate(el => el.textContent, element9)
                            let titulo9 = value9

                            const url9 = await pagina.$$eval(enlace9, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl9 = "https://www3.animeflv.net" + url9

                            await pagina.waitForSelector(pelianime9)
                            let tipo9 = await pagina.$(pelianime9)
                            let tipodeanime9 = await pagina.evaluate(el => el.textContent, tipo9)

                            // 10
                            await pagina.waitForSelector(title10)
                            let element10 = await pagina.$(title10)
                            let value10 = await pagina.evaluate(el => el.textContent, element10)
                            let titulo10 = value10

                            const url10 = await pagina.$$eval(enlace10, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl10 = "https://www3.animeflv.net" + url10

                            await pagina.waitForSelector(pelianime10)
                            let tipo10 = await pagina.$(pelianime10)
                            let tipodeanime10 = await pagina.evaluate(el => el.textContent, tipo10)

                            // 11
                            await pagina.waitForSelector(title11)
                            let element11 = await pagina.$(title11)
                            let value11 = await pagina.evaluate(el => el.textContent, element11)
                            let titulo11 = value11

                            const url11 = await pagina.$$eval(enlace11, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl11 = "https://www3.animeflv.net" + url11

                            await pagina.waitForSelector(pelianime11)
                            let tipo11 = await pagina.$(pelianime11)
                            let tipodeanime11 = await pagina.evaluate(el => el.textContent, tipo11)

                            // 12
                            await pagina.waitForSelector(title12)
                            let element12 = await pagina.$(title12)
                            let value12 = await pagina.evaluate(el => el.textContent, element12)
                            let titulo12 = value12

                            const url12 = await pagina.$$eval(enlace12, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl12 = "https://www3.animeflv.net" + url12

                            await pagina.waitForSelector(pelianime12)
                            let tipo12 = await pagina.$(pelianime12)
                            let tipodeanime12 = await pagina.evaluate(el => el.textContent, tipo12)

                            // 13
                            await pagina.waitForSelector(title13)
                            let element13 = await pagina.$(title13)
                            let value13 = await pagina.evaluate(el => el.textContent, element13)
                            let titulo13 = value13

                            const url13 = await pagina.$$eval(enlace13, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl13 = "https://www3.animeflv.net" + url13

                            await pagina.waitForSelector(pelianime13)
                            let tipo13 = await pagina.$(pelianime13)
                            let tipodeanime13 = await pagina.evaluate(el => el.textContent, tipo13)

                            // 14
                            await pagina.waitForSelector(title14)
                            let element14 = await pagina.$(title14)
                            let value14 = await pagina.evaluate(el => el.textContent, element14)
                            let titulo14 = value14

                            const url14 = await pagina.$$eval(enlace14, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl14 = "https://www3.animeflv.net" + url14

                            await pagina.waitForSelector(pelianime14)
                            let tipo14 = await pagina.$(pelianime14)
                            let tipodeanime14 = await pagina.evaluate(el => el.textContent, tipo14)

                            // 15
                            await pagina.waitForSelector(title15)
                            let element15 = await pagina.$(title15)
                            let value15 = await pagina.evaluate(el => el.textContent, element15)
                            let titulo15 = value15

                            const url15 = await pagina.$$eval(enlace15, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl15 = "https://www3.animeflv.net" + url15

                            await pagina.waitForSelector(pelianime15)
                            let tipo15 = await pagina.$(pelianime15)
                            let tipodeanime15 = await pagina.evaluate(el => el.textContent, tipo15)

                            // 16
                            await pagina.waitForSelector(title16)
                            let element16 = await pagina.$(title16)
                            let value16 = await pagina.evaluate(el => el.textContent, element16)
                            let titulo16 = value16

                            const url16 = await pagina.$$eval(enlace16, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl16 = "https://www3.animeflv.net" + url16

                            await pagina.waitForSelector(pelianime16)
                            let tipo16 = await pagina.$(pelianime16)
                            let tipodeanime16 = await pagina.evaluate(el => el.textContent, tipo16)

                            // 17
                            await pagina.waitForSelector(title17)
                            let element17 = await pagina.$(title17)
                            let value17 = await pagina.evaluate(el => el.textContent, element17)
                            let titulo17 = value17

                            const url17 = await pagina.$$eval(enlace17, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl17 = "https://www3.animeflv.net" + url17

                            await pagina.waitForSelector(pelianime17)
                            let tipo17 = await pagina.$(pelianime17)
                            let tipodeanime17 = await pagina.evaluate(el => el.textContent, tipo17)

                            // 18
                            await pagina.waitForSelector(title18)
                            let element18 = await pagina.$(title18)
                            let value18 = await pagina.evaluate(el => el.textContent, element18)
                            let titulo18 = value18

                            const url18 = await pagina.$$eval(enlace18, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl18 = "https://www3.animeflv.net" + url18

                            await pagina.waitForSelector(pelianime18)
                            let tipo18 = await pagina.$(pelianime18)
                            let tipodeanime18 = await pagina.evaluate(el => el.textContent, tipo18)

                            // 19
                            await pagina.waitForSelector(title19)
                            let element19 = await pagina.$(title19)
                            let value19 = await pagina.evaluate(el => el.textContent, element19)
                            let titulo19 = value19

                            const url19 = await pagina.$$eval(enlace19, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl19 = "https://www3.animeflv.net" + url19

                            await pagina.waitForSelector(pelianime19)
                            let tipo19 = await pagina.$(pelianime19)
                            let tipodeanime19 = await pagina.evaluate(el => el.textContent, tipo19)
                            
                            // 20
                            await pagina.waitForSelector(title20)
                            let element20 = await pagina.$(title20)
                            let value20 = await pagina.evaluate(el => el.textContent, element20)
                            let titulo20 = value20

                            const url20 = await pagina.$$eval(enlace20, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl20 = "https://www3.animeflv.net" + url20

                            await pagina.waitForSelector(pelianime20)
                            let tipo20 = await pagina.$(pelianime20)
                            let tipodeanime20 = await pagina.evaluate(el => el.textContent, tipo20)

                            // 21
                            await pagina.waitForSelector(title21)
                            let element21 = await pagina.$(title21)
                            let value21 = await pagina.evaluate(el => el.textContent, element21)
                            let titulo21 = value21

                            const url21 = await pagina.$$eval(enlace21, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl21 = "https://www3.animeflv.net" + url21

                            await pagina.waitForSelector(pelianime21)
                            let tipo21 = await pagina.$(pelianime21)
                            let tipodeanime21 = await pagina.evaluate(el => el.textContent, tipo21)

                            // 22
                            await pagina.waitForSelector(title22)
                            let element22 = await pagina.$(title22)
                            let value22 = await pagina.evaluate(el => el.textContent, element22)
                            let titulo22 = value22

                            const url22 = await pagina.$$eval(enlace22, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl22 = "https://www3.animeflv.net" + url22

                            await pagina.waitForSelector(pelianime22)
                            let tipo22 = await pagina.$(pelianime22)
                            let tipodeanime22 = await pagina.evaluate(el => el.textContent, tipo22)

                            // 23
                            await pagina.waitForSelector(title23)
                            let element23 = await pagina.$(title23)
                            let value23 = await pagina.evaluate(el => el.textContent, element23)
                            let titulo23 = value23

                            const url23 = await pagina.$$eval(enlace23, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl23 = "https://www3.animeflv.net" + url23

                            await pagina.waitForSelector(pelianime23)
                            let tipo23 = await pagina.$(pelianime23)
                            let tipodeanime23 = await pagina.evaluate(el => el.textContent, tipo23)

                            // 24
                            await pagina.waitForSelector(title24)
                            let element24 = await pagina.$(title24)
                            let value24 = await pagina.evaluate(el => el.textContent, element24)
                            let titulo24 = value24

                            const url24 = await pagina.$$eval(enlace24, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl24 = "https://www3.animeflv.net" + url24

                            await pagina.waitForSelector(pelianime24)
                            let tipo24 = await pagina.$(pelianime24)
                            let tipodeanime24 = await pagina.evaluate(el => el.textContent, tipo24)

                            const curPage = await interaction.editReply({
                                embeds: [pages[0].setFooter({text: `Página: ${page + 1} / 146`}).setThumbnail(miniatura1).setDescription(`⦿ [**${titulo1}**](${laurl1}) ( ${tipodeanime1} )`+`\n`+`⦿ [**${titulo2}**](${laurl2}) ( ${tipodeanime2} )`+`\n`+`⦿ [**${titulo3}**](${laurl3}) ( ${tipodeanime3} )`+`\n`+`⦿ [**${titulo4}**](${laurl4}) ( ${tipodeanime4} )`+`\n`+`⦿ [**${titulo5}**](${laurl5}) ( ${tipodeanime5} )`+`\n`+`⦿ [**${titulo6}**](${laurl6}) ( ${tipodeanime6} )`+`\n`+`⦿ [**${titulo7}**](${laurl7}) ( ${tipodeanime7} )`+`\n`+`⦿ [**${titulo8}**](${laurl8}) ( ${tipodeanime8} )`+`\n`+`⦿ [**${titulo9}**](${laurl9}) ( ${tipodeanime9} )`+`\n`+`⦿ [**${titulo10}**](${laurl10}) ( ${tipodeanime10} )`+`\n`+`⦿ [**${titulo11}**](${laurl11}) ( ${tipodeanime11} )`+`\n`+`⦿ [**${titulo12}**](${laurl12}) ( ${tipodeanime12} )`+`\n`+`⦿ [**${titulo13}**](${laurl13}) ( ${tipodeanime13} )`+`\n`+`⦿ [**${titulo14}**](${laurl14}) ( ${tipodeanime14} )`+`\n`+`⦿ [**${titulo15}**](${laurl15}) ( ${tipodeanime15} )`+`\n`+`⦿ [**${titulo16}**](${laurl16}) ( ${tipodeanime16} )`+`\n`+`⦿ [**${titulo17}**](${laurl17}) ( ${tipodeanime17} )`+`\n`+`⦿ [**${titulo18}**](${laurl18}) ( ${tipodeanime18} )`+`\n`+`⦿ [**${titulo19}**](${laurl19}) ( ${tipodeanime19} )`+`\n`+`⦿ [**${titulo20}**](${laurl20}) ( ${tipodeanime20} )`+`\n`+`⦿ [**${titulo21}**](${laurl21}) ( ${tipodeanime21} )`+`\n`+`⦿ [**${titulo22}**](${laurl22}) ( ${tipodeanime22} )`+`\n`+`⦿ [**${titulo23}**](${laurl23}) ( ${tipodeanime23} )`+`\n`+`⦿ [**${titulo24}**](${laurl24}) ( ${tipodeanime24} )`)],
                                components: [row],
                                fetchReply: true,
                            });
                          
                            const filter = (i) =>
                              i.customId === buttonList[0].customId ||
                              i.customId === buttonList[1].customId;
                          
                            const collector = await curPage.createMessageComponentCollector({
                              filter,
                              time: 40000,
                            });
                          
                            collector.on("collect", async (i) => {
                              switch (i.customId) {
                                case buttonList[0].customId:
                                  page = page > 0 ? --page : 146 - 1;
                                  await pagina.goto(`https://www3.animeflv.net/browse?page=${page+1}`, {waitUntil: 'load', timeout: 0});
                                  break;
                                case buttonList[1].customId:
                                  page = page + 1 < 146 ? ++page : 0;
                                  await pagina.goto(`https://www3.animeflv.net/browse?page=${page+1}`, {waitUntil: 'load', timeout: 0});
                                  break;
                                default:
                                  break;
                              }
                              await i.deferUpdate();

                              // miniatura
                              const imgsm = await pagina.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                              const miniaturam = imgsm[0];
                              // 1
                              await pagina.waitForSelector(title1)
                              let element1m = await pagina.$(title1)
                              let value1m = await pagina.evaluate(el => el.textContent, element1m)
                              let titulo1m = value1m

                              const url1m = await pagina.$$eval(enlace1, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl1m = "https://www3.animeflv.net" + url1m

                              await pagina.waitForSelector(pelianime1)
                              let tipo1m = await pagina.$(pelianime1)
                              let tipodeanime1m = await pagina.evaluate(el => el.textContent, tipo1m)

                              // 2
                              await pagina.waitForSelector(title2)
                              let element2m = await pagina.$(title2)
                              let value2m = await pagina.evaluate(el => el.textContent, element2m)
                              let titulo2m = value2m

                              const url2m = await pagina.$$eval(enlace2, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl2m = "https://www3.animeflv.net" + url2m

                              await pagina.waitForSelector(pelianime2)
                              let tipo2m = await pagina.$(pelianime2)
                              let tipodeanime2m = await pagina.evaluate(el => el.textContent, tipo2m)

                              // 3
                              await pagina.waitForSelector(title3)
                              let element3m = await pagina.$(title3)
                              let value3m = await pagina.evaluate(el => el.textContent, element3m)
                              let titulo3m = value3m

                              const url3m = await pagina.$$eval(enlace3, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl3m = "https://www3.animeflv.net" + url3m

                              await pagina.waitForSelector(pelianime3)
                              let tipo3m = await pagina.$(pelianime3)
                              let tipodeanime3m = await pagina.evaluate(el => el.textContent, tipo3m)

                              // 4
                              await pagina.waitForSelector(title4)
                              let element4m = await pagina.$(title4)
                              let value4m = await pagina.evaluate(el => el.textContent, element4m)
                              let titulo4m = value4m

                              const url4m = await pagina.$$eval(enlace4, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl4m = "https://www3.animeflv.net" + url4m

                              await pagina.waitForSelector(pelianime4)
                              let tipo4m = await pagina.$(pelianime4)
                              let tipodeanime4m = await pagina.evaluate(el => el.textContent, tipo4m)

                              // 5
                              await pagina.waitForSelector(title5)
                              let element5m = await pagina.$(title5)
                              let value5m = await pagina.evaluate(el => el.textContent, element5m)
                              let titulo5m = value5m

                              const url5m = await pagina.$$eval(enlace5, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl5m = "https://www3.animeflv.net" + url5m

                              await pagina.waitForSelector(pelianime5)
                              let tipo5m = await pagina.$(pelianime5)
                              let tipodeanime5m = await pagina.evaluate(el => el.textContent, tipo5m)

                              // 6
                              await pagina.waitForSelector(title6)
                              let element6m = await pagina.$(title6)
                              let value6m = await pagina.evaluate(el => el.textContent, element6m)
                              let titulo6m = value6m

                              const url6m = await pagina.$$eval(enlace6, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl6m = "https://www3.animeflv.net" + url6m

                              await pagina.waitForSelector(pelianime6)
                              let tipo6m = await pagina.$(pelianime6)
                              let tipodeanime6m = await pagina.evaluate(el => el.textContent, tipo6m)

                              // 7
                              await pagina.waitForSelector(title7)
                              let element7m = await pagina.$(title7)
                              let value7m = await pagina.evaluate(el => el.textContent, element7m)
                              let titulo7m = value7m

                              const url7m = await pagina.$$eval(enlace7, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl7m = "https://www3.animeflv.net" + url7m

                              await pagina.waitForSelector(pelianime7)
                              let tipo7m = await pagina.$(pelianime7)
                              let tipodeanime7m = await pagina.evaluate(el => el.textContent, tipo7m)

                              // 8
                              await pagina.waitForSelector(title8)
                              let element8m = await pagina.$(title8)
                              let value8m = await pagina.evaluate(el => el.textContent, element8m)
                              let titulo8m = value8m

                              const url8m = await pagina.$$eval(enlace8, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl8m = "https://www3.animeflv.net" + url8m

                              await pagina.waitForSelector(pelianime8)
                              let tipo8m = await pagina.$(pelianime8)
                              let tipodeanime8m = await pagina.evaluate(el => el.textContent, tipo8m)

                              // 9
                              await pagina.waitForSelector(title9)
                              let element9m = await pagina.$(title9)
                              let value9m = await pagina.evaluate(el => el.textContent, element9m)
                              let titulo9m = value9m

                              const url9m = await pagina.$$eval(enlace9, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl9m = "https://www3.animeflv.net" + url9m

                              await pagina.waitForSelector(pelianime9)
                              let tipo9m = await pagina.$(pelianime9)
                              let tipodeanime9m = await pagina.evaluate(el => el.textContent, tipo9m)

                              // 10
                              await pagina.waitForSelector(title10)
                              let element10m = await pagina.$(title10)
                              let value10m = await pagina.evaluate(el => el.textContent, element10m)
                              let titulo10m = value10m

                              const url10m = await pagina.$$eval(enlace10, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl10m = "https://www3.animeflv.net" + url10m

                              await pagina.waitForSelector(pelianime10)
                              let tipo10m = await pagina.$(pelianime10)
                              let tipodeanime10m = await pagina.evaluate(el => el.textContent, tipo10m)

                              // 11
                              await pagina.waitForSelector(title11)
                              let element11m = await pagina.$(title11)
                              let value11m = await pagina.evaluate(el => el.textContent, element11m)
                              let titulo11m = value11m

                              const url11m = await pagina.$$eval(enlace11, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl11m = "https://www3.animeflv.net" + url11m

                              await pagina.waitForSelector(pelianime11)
                              let tipo11m = await pagina.$(pelianime11)
                              let tipodeanime11m = await pagina.evaluate(el => el.textContent, tipo11m)

                              // 12
                              await pagina.waitForSelector(title12)
                              let element12m = await pagina.$(title12)
                              let value12m = await pagina.evaluate(el => el.textContent, element12m)
                              let titulo12m = value12m

                              const url12m = await pagina.$$eval(enlace12, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl12m = "https://www3.animeflv.net" + url12m

                              await pagina.waitForSelector(pelianime12)
                              let tipo12m = await pagina.$(pelianime12)
                              let tipodeanime12m = await pagina.evaluate(el => el.textContent, tipo12m)

                              // 13
                              await pagina.waitForSelector(title13)
                              let element13m = await pagina.$(title13)
                              let value13m = await pagina.evaluate(el => el.textContent, element13m)
                              let titulo13m = value13m

                              const url13m = await pagina.$$eval(enlace13, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl13m = "https://www3.animeflv.net" + url13m

                              await pagina.waitForSelector(pelianime13)
                              let tipo13m = await pagina.$(pelianime13)
                              let tipodeanime13m = await pagina.evaluate(el => el.textContent, tipo13m)

                              // 14
                              await pagina.waitForSelector(title14)
                              let element14m = await pagina.$(title14)
                              let value14m = await pagina.evaluate(el => el.textContent, element14m)
                              let titulo14m = value14m

                              const url14m = await pagina.$$eval(enlace14, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl14m = "https://www3.animeflv.net" + url14m

                              await pagina.waitForSelector(pelianime14)
                              let tipo14m = await pagina.$(pelianime14)
                              let tipodeanime14m = await pagina.evaluate(el => el.textContent, tipo14m)

                              // 15
                              await pagina.waitForSelector(title15)
                              let element15m = await pagina.$(title15)
                              let value15m = await pagina.evaluate(el => el.textContent, element15m)
                              let titulo15m = value15m

                              const url15m = await pagina.$$eval(enlace15, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl15m = "https://www3.animeflv.net" + url15m

                              await pagina.waitForSelector(pelianime15)
                              let tipo15m = await pagina.$(pelianime15)
                              let tipodeanime15m = await pagina.evaluate(el => el.textContent, tipo15m)

                              // 16
                              await pagina.waitForSelector(title16)
                              let element16m = await pagina.$(title16)
                              let value16m = await pagina.evaluate(el => el.textContent, element16m)
                              let titulo16m = value16m

                              const url16m = await pagina.$$eval(enlace16, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl16m = "https://www3.animeflv.net" + url16m

                              await pagina.waitForSelector(pelianime16)
                              let tipo16m = await pagina.$(pelianime16)
                              let tipodeanime16m = await pagina.evaluate(el => el.textContent, tipo16m)

                              // 17
                              await pagina.waitForSelector(title17)
                              let element17m = await pagina.$(title17)
                              let value17m = await pagina.evaluate(el => el.textContent, element17m)
                              let titulo17m = value17m

                              const url17m = await pagina.$$eval(enlace17, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl17m = "https://www3.animeflv.net" + url17m

                              await pagina.waitForSelector(pelianime17)
                              let tipo17m = await pagina.$(pelianime17)
                              let tipodeanime17m = await pagina.evaluate(el => el.textContent, tipo17m)

                              // 18
                              await pagina.waitForSelector(title18)
                              let element18m = await pagina.$(title18)
                              let value18m = await pagina.evaluate(el => el.textContent, element18m)
                              let titulo18m = value18m

                              const url18m = await pagina.$$eval(enlace18, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl18m = "https://www3.animeflv.net" + url18m

                              await pagina.waitForSelector(pelianime18)
                              let tipo18m = await pagina.$(pelianime18)
                              let tipodeanime18m = await pagina.evaluate(el => el.textContent, tipo18m)

                              // 19
                              await pagina.waitForSelector(title19)
                              let element19m = await pagina.$(title19)
                              let value19m = await pagina.evaluate(el => el.textContent, element19m)
                              let titulo19m = value19m

                              const url19m = await pagina.$$eval(enlace19, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl19m = "https://www3.animeflv.net" + url19m

                              await pagina.waitForSelector(pelianime19)
                              let tipo19m = await pagina.$(pelianime19)
                              let tipodeanime19m = await pagina.evaluate(el => el.textContent, tipo19m)
                              
                              // 20
                              await pagina.waitForSelector(title20)
                              let element20m = await pagina.$(title20)
                              let value20m = await pagina.evaluate(el => el.textContent, element20m)
                              let titulo20m = value20m

                              const url20m = await pagina.$$eval(enlace20, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl20m = "https://www3.animeflv.net" + url20m

                              await pagina.waitForSelector(pelianime20)
                              let tipo20m = await pagina.$(pelianime20)
                              let tipodeanime20m = await pagina.evaluate(el => el.textContent, tipo20m)

                              // 21
                              await pagina.waitForSelector(title21)
                              let element21m = await pagina.$(title21)
                              let value21m = await pagina.evaluate(el => el.textContent, element21m)
                              let titulo21m = value21m

                              const url21m = await pagina.$$eval(enlace21, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl21m = "https://www3.animeflv.net" + url21m

                              await pagina.waitForSelector(pelianime21)
                              let tipo21m = await pagina.$(pelianime21)
                              let tipodeanime21m = await pagina.evaluate(el => el.textContent, tipo21m)

                              // 22
                              await pagina.waitForSelector(title22)
                              let element22m = await pagina.$(title22)
                              let value22m = await pagina.evaluate(el => el.textContent, element22m)
                              let titulo22m = value22m

                              const url22m = await pagina.$$eval(enlace22, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl22m = "https://www3.animeflv.net" + url22m

                              await pagina.waitForSelector(pelianime22)
                              let tipo22m = await pagina.$(pelianime22)
                              let tipodeanime22m = await pagina.evaluate(el => el.textContent, tipo22m)

                              // 23
                              await pagina.waitForSelector(title23)
                              let element23m = await pagina.$(title23)
                              let value23m = await pagina.evaluate(el => el.textContent, element23m)
                              let titulo23m = value23m

                              const url23m = await pagina.$$eval(enlace23, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl23m = "https://www3.animeflv.net" + url23m

                              await pagina.waitForSelector(pelianime23)
                              let tipo23m = await pagina.$(pelianime23)
                              let tipodeanime23m = await pagina.evaluate(el => el.textContent, tipo23m)

                              // 24
                              await pagina.waitForSelector(title24)
                              let element24m = await pagina.$(title24)
                              let value24m = await pagina.evaluate(el => el.textContent, element24m)
                              let titulo24m = value24m

                              const url24m = await pagina.$$eval(enlace24, urlone => urlone.map(href => href.getAttribute('href')));
                              const laurl24m = "https://www3.animeflv.net" + url24m

                              await pagina.waitForSelector(pelianime24)
                              let tipo24m = await pagina.$(pelianime24)
                              let tipodeanime24m = await pagina.evaluate(el => el.textContent, tipo24m)

                              await i.editReply({
                                embeds: [pages[0].setFooter({text: `Página: ${page + 1} / 146`}).setThumbnail(miniaturam).setDescription(`⦿ [**${titulo1m}**](${laurl1m}) ( ${tipodeanime1m} )`+`\n`+`⦿ [**${titulo2m}**](${laurl2m}) ( ${tipodeanime2m} )`+`\n`+`⦿ [**${titulo3m}**](${laurl3m}) ( ${tipodeanime3m} )`+`\n`+`⦿ [**${titulo4m}**](${laurl4m}) ( ${tipodeanime4m} )`+`\n`+`⦿ [**${titulo5m}**](${laurl5m}) ( ${tipodeanime5m} )`+`\n`+`⦿ [**${titulo6m}**](${laurl6m}) ( ${tipodeanime6m} )`+`\n`+`⦿ [**${titulo7m}**](${laurl7m}) ( ${tipodeanime7m} )`+`\n`+`⦿ [**${titulo8m}**](${laurl8m}) ( ${tipodeanime8m} )`+`\n`+`⦿ [**${titulo9m}**](${laurl9m}) ( ${tipodeanime9m} )`+`\n`+`⦿ [**${titulo10m}**](${laurl10m}) ( ${tipodeanime10m} )`+`\n`+`⦿ [**${titulo11m}**](${laurl11m}) ( ${tipodeanime11m} )`+`\n`+`⦿ [**${titulo12m}**](${laurl12m}) ( ${tipodeanime12m} )`+`\n`+`⦿ [**${titulo13m}**](${laurl13m}) ( ${tipodeanime13m} )`+`\n`+`⦿ [**${titulo14m}**](${laurl14m}) ( ${tipodeanime14m} )`+`\n`+`⦿ [**${titulo15m}**](${laurl15m}) ( ${tipodeanime15m} )`+`\n`+`⦿ [**${titulo16m}**](${laurl16m}) ( ${tipodeanime16m} )`+`\n`+`⦿ [**${titulo17m}**](${laurl17m}) ( ${tipodeanime17m} )`+`\n`+`⦿ [**${titulo18m}**](${laurl18m}) ( ${tipodeanime18m} )`+`\n`+`⦿ [**${titulo19m}**](${laurl19m}) ( ${tipodeanime19m} )`+`\n`+`⦿ [**${titulo20m}**](${laurl20m}) ( ${tipodeanime20m} )`+`\n`+`⦿ [**${titulo21m}**](${laurl21m}) ( ${tipodeanime21m} )`+`\n`+`⦿ [**${titulo22m}**](${laurl22m}) ( ${tipodeanime22m} )`+`\n`+`⦿ [**${titulo23m}**](${laurl23m}) ( ${tipodeanime23m} )`+`\n`+`⦿ [**${titulo24m}**](${laurl24m}) ( ${tipodeanime24m} )`)],
                                components: [row],
                              });
                              collector.resetTimer();
                            });
                          
                            collector.on("end", async(_, reason) => {
                              if (reason !== "messageDelete") {
                                const disabledRow = new MessageActionRow().addComponents(
                                  buttonList[0].setDisabled(true),
                                  buttonList[1].setDisabled(true)
                                );
                                curPage.edit({
                                  components: [disabledRow],
                                });
                                await browser.close()
                              } else {
                                await browser.close()
                              }
                            });
                          
                            return curPage;
                          };
}
module.exports.conf = {
    "name": "directorio",
    "description": "Navega por el directorio de AnimeFLV",
    "options":[
        {
            "name": "página",
            "description": "El número de la página al que quieres ir",
            "type": 10,
            "required": false
        }
    ],
    "category": "info"
}