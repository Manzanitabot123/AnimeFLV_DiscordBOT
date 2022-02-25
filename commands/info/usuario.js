const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");
/** 
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
        //remplazar el mensaje por una url
        const user_animeflv = args.join(' ').replace(/ /g,"+");
        const member = message.member;
        //comprobar el canal adecuado
        if(!args.join(' ') || !args[0]){
                message.reply("Te falta escribir el usuario que quieres buscar")
                return;
        } else if(args.join(' ').length < 3){
                message.reply("Ese nombre es muy corto")
                return;
        } else if(args.join(' ').length > 40){
                message.reply("Es un nombre muy largo")
                return;
        } else if(message.content.includes(`\n`)){
                message.reply("Tu busqueda contiene más de un reglón")
                return;
        } else {
                usuario();
        }

        async function usuario(){
                //mensaje de espera (cargando...)
                message.channel.sendTyping();
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando al usuario **" +  args.join(' ') + "** ...")
                    ], components:[]});
                try{
                const url = `https://www3.animeflv.net/perfil/${user_animeflv}`;
                
                //info
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                    });
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                const tiomeout = await page.goto(url, {waitUntil: 'load', timeout: 0});

                if (tiomeout.status() === 522) {
                    msg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DARK_RED")
                            .setDescription(textoyemojis.errors.error522)
                            .setFooter({text: textoyemojis.errors.espera})
                    ]});
                    return await browser.close()

                } else if (tiomeout.status() === 502) {
                    msg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DARK_RED")
                            .setDescription(textoyemojis.errors.error502)
                            .setFooter({text: textoyemojis.errors.espera})
                    ]});
                    return await browser.close()
                    
                } else if (tiomeout.status() === 404) {
                    console.error('Usuario desconocido')
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                                .setColor("DARK_RED")
                                .setDescription("No existe nadie llamado **" + args.join(' ') + "** D:")
                        ]});
                    return await browser.close()
                  } else {
                    //link
                    const linkdelpfp = await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div > aside > div > div > figure > a[href]'), a => a.getAttribute('href'))[0])
                    const enlacedelpfp = "https://www3.animeflv.net" + linkdelpfp;

                    // imagen del perfil
                    const logo = await page.$$eval("body > div.Wrapper > div > div > div > aside > div > div > figure > a > img", imgs => imgs.map(img => img.getAttribute('src')));
                    const avatar = logo[0];
                    const enlacedellogo = "https://www3.animeflv.net"+avatar;

                    // nombre del perfil
                    await page.waitForSelector("body > div.Wrapper > div > div > div > aside > div > div > div.Name")
                    let elemento1 = await page.$("body > div.Wrapper > div > div > div > aside > div > div > div.Name")
                    let nombre_original = await page.evaluate(el => el.textContent, elemento1)

                    // color del embed
                    const options = {
                    count: 1,
                    }
                    const colorhex = await getColors(enlacedellogo, options).then(colors => colors.map(color => color.hex()))

                    // animes favoritos
                    var animes_favoritos;
                    var Thumbnail1;
                    var Vertodos_favoritos;
                    if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1)"), a => a.textContent)[0]) !== undefined){
                        // Obtener Titulo 1
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        const titulodelanime1 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        let grantitulo1 = await page.evaluate(el => el.textContent, titulodelanime1);

                        // Obtener el tipo 1
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > span")
                        const tipodelanime2 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > span")
                        let grantipo1 = await page.evaluate(el => el.textContent, tipodelanime2)

                        // Obtener la calificación 1
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        const estrellasdelanime1 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        let calificación1 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime1);

                        // Miniatura
                        const imagenpequeña = await page.$$eval("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(1) > article > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                        Thumbnail1 = "https://www3.animeflv.net" + imagenpequeña[0];

                        // Ver todos
                        const ver_todos1 = await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div > main > section:nth-child(1) > a[href]'), a => a.getAttribute('href'))[0])
                        Vertodos_favoritos = "https://www3.animeflv.net" + ver_todos1;

                        if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2)"), a => a.textContent)[0]) !== undefined){
                            // Obtener Titulo 2
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            const titulodelanime2 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            let grantitulo2 = await page.evaluate(el => el.textContent, titulodelanime2);

                            // Obtener el tipo 2
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > span")
                            const tipodelanime2 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > span")
                            let grantipo2 = await page.evaluate(el => el.textContent, tipodelanime2)

                            //obtener la calificación 2
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            const estrellasdelanime2 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            let calificación2 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime2);

                            if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3)"), a => a.textContent)[0]) !== undefined){
                                // Obtener Titulo 3
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                const titulodelanime3 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                let grantitulo3 = await page.evaluate(el => el.textContent, titulodelanime3);

                                // Obtener el tipo 3
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > span")
                                const tipodelanime3 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > span")
                                let grantipo3 = await page.evaluate(el => el.textContent, tipodelanime3)

                                //obtener la calificación 3
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                const estrellasdelanime3 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                let calificación3 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime3);

                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4)"), a => a.textContent)[0]) !== undefined){
                                    // Obtener Titulo 4
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    const titulodelanime4 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    let grantitulo4 = await page.evaluate(el => el.textContent, titulodelanime4);

                                    // Obtener el tipo 4
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > span")
                                    const tipodelanime4 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > span")
                                    let grantipo4 = await page.evaluate(el => el.textContent, tipodelanime4)

                                    //obtener la calificación 4
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    const estrellasdelanime4 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(1) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    let calificación4 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime4);
                            
                                    animes_favoritos="```‣ ("+ grantipo1+") " + grantitulo1 + " │ ⭐" + calificación1 + "\n‣ (" + grantipo2 +") " + grantitulo2 + " │ ⭐" + calificación2 + "\n‣ (" + grantipo3 +") " + grantitulo3 + " │ ⭐" + calificación3 + "\n‣ (" + grantipo4 +") " + grantitulo4 + " │ ⭐" + calificación4 + "```" + `[Ver todos](${Vertodos_favoritos})`; 
                                } else { 
                                    animes_favoritos="```‣ ("+ grantipo1+") " + grantitulo1 + " │ ⭐" + calificación1 + "\n‣ (" + grantipo2 +") " + grantitulo2 + " │ ⭐" + calificación2 + "\n‣ (" + grantipo3 +") " + grantitulo3 + " │ ⭐" + calificación3 + "```" + `[Ver todos](${Vertodos_favoritos})`; 
                                }
                            } else { 
                                animes_favoritos="```‣ ("+ grantipo1+") " + grantitulo1 + " │ ⭐" + calificación1 + "\n‣ (" + grantipo2 +") " + grantitulo2 + " │ ⭐" + calificación2 +"```" + `[Ver todos](${Vertodos_favoritos})`; 
                            }
                        } else { 
                            animes_favoritos="```‣ ("+ grantipo1+") " + grantitulo1 + " │ ⭐" + calificación1 + "```" + `[Ver todos](${Vertodos_favoritos})`; 
                        }
                    } else { 
                        animes_favoritos = "No tiene animes favoritos";
                        Thumbnail1 = "https://i.blogs.es/3b6c61/flv/840_560.jpg";
                    };

                    // animes seguidos
                    var animes_seguidos;
                    var Vertodos_seguidos;
                    if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1)"), a => a.textContent)[0]) !== undefined){
                        // Obtener Titulo 5
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        const titulodelanime5 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        let grantitulo5 = await page.evaluate(el => el.textContent, titulodelanime5);

                        // Obtener el tipo 5
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > span")
                        const tipodelanime5 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > span")
                        let grantipo5 = await page.evaluate(el => el.textContent, tipodelanime5)

                        // Obtener la calificación 5
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        const estrellasdelanime5 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        let calificación5 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime5);
                        
                        // Ver todos
                        const ver_todos5 = await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div > main > section:nth-child(2) > a[href]'), a => a.getAttribute('href'))[0])
                        Vertodos_seguidos = "https://www3.animeflv.net" + ver_todos5;
                        
                        if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2)"), a => a.textContent)[0]) !== undefined){
                            // Obtener Titulo 6
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            const titulodelanime6 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            let grantitulo6 = await page.evaluate(el => el.textContent, titulodelanime6);

                            // Obtener el tipo 6
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > span")
                            const tipodelanime6 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > span")
                            let grantipo6 = await page.evaluate(el => el.textContent, tipodelanime6)

                            //obtener la calificación 6
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            const estrellasdelanime6 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            let calificación6 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime6);

                            if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3)"), a => a.textContent)[0]) !== undefined){
                                // Obtener Titulo 7
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                const titulodelanime7 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                let grantitulo7 = await page.evaluate(el => el.textContent, titulodelanime7);

                                // Obtener el tipo 7
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > span")
                                const tipodelanime7 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > span")
                                let grantipo7 = await page.evaluate(el => el.textContent, tipodelanime7)

                                //obtener la calificación 7
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                const estrellasdelanime7 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                let calificación7 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime7);

                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4)"), a => a.textContent)[0]) !== undefined){
                                    // Obtener Titulo 8
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    const titulodelanime8 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    let grantitulo8 = await page.evaluate(el => el.textContent, titulodelanime8);

                                    // Obtener el tipo 8
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > span")
                                    const tipodelanime8 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > span")
                                    let grantipo8 = await page.evaluate(el => el.textContent, tipodelanime8)

                                    //obtener la calificación 8
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    const estrellasdelanime8 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    let calificación8 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime8);
                            
                                    animes_seguidos="```‣ ("+ grantipo5+") " + grantitulo5 + " │ ⭐" + calificación5 + "\n‣ (" + grantipo6 +") " + grantitulo6 + " │ ⭐" + calificación6 + "\n‣ (" + grantipo7 +") " + grantitulo7 + " │ ⭐" + calificación7 + "\n‣ (" + grantipo8 +") " + grantitulo8 + " │ ⭐" + calificación8 + "```" + `[Ver todos](${Vertodos_seguidos})`; 
                                } else { 
                                    animes_seguidos="```‣ ("+ grantipo5+") " + grantitulo5 + " │ ⭐" + calificación5 + "\n‣ (" + grantipo6 +") " + grantitulo6 + " │ ⭐" + calificación6 + "\n‣ (" + grantipo7 +") " + grantitulo7 + " │ ⭐" + calificación7 + "```" + `[Ver todos](${Vertodos_seguidos})`; 
                                }
                            } else { 
                                animes_seguidos="```‣ ("+ grantipo5+") " + grantitulo5 + " │ ⭐" + calificación5 + "\n‣ (" + grantipo6 +") " + grantitulo6 + " │ ⭐" + calificación6 +"```" + `[Ver todos](${Vertodos_seguidos})`; 
                            }
                        } else { 
                            animes_seguidos="```‣ ("+ grantipo5+") " + grantitulo5 + " │ ⭐" + calificación5 + "```" + `[Ver todos](${Vertodos_seguidos})`; 
                        }
                    } else { 
                        animes_seguidos = "No sigue ningun anime";
                    };

                    // animes pendientes
                    var animes_pendientes;
                    var Vertodos_pendientes;
                    if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1)"), a => a.textContent)[0]) !== undefined){
                        // Obtener Titulo 9
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        const titulodelanime9 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > div > div.Title > strong > a")
                        let grantitulo9 = await page.evaluate(el => el.textContent, titulodelanime9);

                        // Obtener el tipo 9
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > span")
                        const tipodelanime9 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > span")
                        let grantipo9 = await page.evaluate(el => el.textContent, tipodelanime9)

                        // Obtener la calificación 9
                        await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        const estrellasdelanime9 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(1) > article > div > div > div.Vts.fa-star")
                        let calificación9 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime9);
                        
                        // Ver todos
                        const ver_todos9 = await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div > main > section:nth-child(3) > a[href]'), a => a.getAttribute('href'))[0])
                        Vertodos_pendientes = "https://www3.animeflv.net" + ver_todos9;
                        
                        if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(2)"), a => a.textContent)[0]) !== undefined){
                            // Obtener Titulo 10
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            const titulodelanime10 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(2) > article > div > div > div.Title > strong > a")
                            let grantitulo10 = await page.evaluate(el => el.textContent, titulodelanime10);

                            // Obtener el tipo 20
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > span")
                            const tipodelanime10 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(2) > ul > li:nth-child(2) > article > div > span")
                            let grantipo10 = await page.evaluate(el => el.textContent, tipodelanime10)

                            //obtener la calificación 10
                            await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            const estrellasdelanime10 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(2) > article > div > div > div.Vts.fa-star")
                            let calificación10 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime10);

                            if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3)"), a => a.textContent)[0]) !== undefined){
                                // Obtener Titulo 11
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                const titulodelanime11 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > div > div.Title > strong > a")
                                let grantitulo11 = await page.evaluate(el => el.textContent, titulodelanime11);

                                // Obtener el tipo 11
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > span")
                                const tipodelanime11 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > span")
                                let grantipo11 = await page.evaluate(el => el.textContent, tipodelanime11)

                                //obtener la calificación 11
                                await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                const estrellasdelanime11 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(3) > article > div > div > div.Vts.fa-star")
                                let calificación11 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime11);

                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4)"), a => a.textContent)[0]) !== undefined){
                                    // Obtener Titulo 12
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    const titulodelanime12 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > div > div.Title > strong > a")
                                    let grantitulo12 = await page.evaluate(el => el.textContent, titulodelanime12);

                                    // Obtener el tipo 12
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > span")
                                    const tipodelanime12 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > span")
                                    let grantipo12 = await page.evaluate(el => el.textContent, tipodelanime12)

                                    //obtener la calificación 12
                                    await page.waitForSelector("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    const estrellasdelanime12 = await page.$("body > div.Wrapper > div > div > div > main > section:nth-child(3) > ul > li:nth-child(4) > article > div > div > div.Vts.fa-star")
                                    let calificación12 = await page.evaluate(el => el.textContent[0]+el.textContent[1]+el.textContent[2], estrellasdelanime12);
                            
                                    animes_pendientes="```‣ ("+ grantipo9+") " + grantitulo9 + " │ ⭐" + calificación9 + "\n‣ (" + grantipo10 +") " + grantitulo10 + " │ ⭐" + calificación10 + "\n‣ (" + grantipo11 +") " + grantitulo11 + " │ ⭐" + calificación11 + "\n‣ (" + grantipo12 +") " + grantitulo12 + " │ ⭐" + calificación12 + "```" + `[Ver todos](${Vertodos_pendientes})`; 
                                } else { 
                                    animes_pendientes="```‣ ("+ grantipo9+") " + grantitulo9 + " │ ⭐" + calificación9 + "\n‣ (" + grantipo10 +") " + grantitulo10 + " │ ⭐" + calificación10 + "\n‣ (" + grantipo11 +") " + grantitulo11 + " │ ⭐" + calificación11 + "```" + `[Ver todos](${Vertodos_pendientes})`; 
                                }
                            } else { 
                                animes_pendientes="```‣ ("+ grantipo9+") " + grantitulo9 + " │ ⭐" + calificación9 + "\n‣ (" + grantipo10 +") " + grantitulo10 + " │ ⭐" + calificación10 +"```" + `[Ver todos](${Vertodos_pendientes})`; 
                            }
                        } else { 
                            animes_pendientes="```‣ ("+ grantipo9+") " + grantitulo9 + " │ ⭐" + calificación9 + "```" + `[Ver todos](${Vertodos_pendientes})`; 
                        }
                    } else { 
                        animes_pendientes = "No tiene animes pendientes";
                    };

                    //detalles
                    const detalles = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setURL(enlacedelpfp)
                    .setLabel("Ir al perfil")
                    .setStyle('LINK')
                    );

                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                            .setTitle(`Perfil de ${nombre_original}`)
                            .setURL(enlacedelpfp)
                            .setImage(enlacedellogo)
                            .setColor(colorhex[0])
                            .setThumbnail(Thumbnail1)
                            .addField('Animes favoritos:', animes_favoritos, false)
                            .addField('Animes seguidos:', animes_seguidos, false)
                            .addField('Animes pendientes:', animes_pendientes, false)
                        ], components:[detalles]});
                    return await browser.close()
                  }

                }
                
                catch(error)
                {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error mientras buscaba al usuario **" + args.join(' ')+"**")
                        ]});
                    console.log(error)
                }
            }
}

module.exports.conf = {
    "name": "usuario",
    "description": [ "Revisa perfiles de usuarios de  AnimeFLV" ],
    "aliases": ["user"],
    "usage": ["latencia"]
}
