const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const paginationEmbed = require('../../utils/paginationEmbed');
const puppeteer = require('puppeteer');
const { captureRejections } = require("events");

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
            ultimoani();
            
            //función de busqueda
            async function ultimoani(){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Recopilando ultimos animes añadidos ...")
                    ], components:[]});
                message.channel.sendTyping();

                try{
                            const url = `https://www3.animeflv.net`;
            
                            const resultadouno = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a > h3";
                            const pelianime1 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a > div > span";
                            const stars1 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar1 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a > span";
            
                            const resultadodos = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > a > h3";
                            const pelianime2 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > a > div > span";
                            const stars2 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar2 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > a > span"
            
                            const resultadotres = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > a > h3";
                            const pelianime3 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > a > div > span";
                            const stars3 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar3 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > a > span";
            
                            const resultadocuatro = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a > h3";
                            const pelianime4 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a > div > span";
                            const stars4 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar4 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a > span";
            
                            const resultadocinco = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > a > h3";
                            const pelianime5 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > a > div > span";
                            const stars5 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar5 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > a > span";

                            const resultadoseis = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > a > h3";
                            const pelianime6 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > a > div > span";
                            const stars6 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar6 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > a > span";

                            const resultadosiete = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a > h3";
                            const pelianime7 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a > div > span";
                            const stars7 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar7 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a > span";
            
                            const resultadoocho = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > a > h3";
                            const pelianime8 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > a > div > span";
                            const stars8 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar8 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > a > span";

                            const resultadonueve = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > a > h3";
                            const pelianime9 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > a > div > span";
                            const stars9 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > div > p:nth-child(2) > span.Vts.fa-star";
                            const validar9 = "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > a > span";
            
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

                            } else if (tiomeout.status() === 404) {
                                msg.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setDescription(textoyemojis.errors.error404)
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
                                
                            } else {
            
                            //Para 1 resultado ___________________________________________________________________________________________________________________________________________________________________________________
                                const imgs1 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                                const miniatura1 = "https://www3.animeflv.net" + imgs1[0];
                                
                                await page.waitForSelector(resultadouno)
                                let element1 = await page.$(resultadouno)
                                let value1 = await page.evaluate(el => el.textContent, element1)
                                let output1 = value1

                                const url1 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                const urlone1 = "https://www3.animeflv.net" + url1

                                await page.waitForSelector(pelianime1)
                                let tipo1 = await page.$(pelianime1)
                                let valor1 = await page.evaluate(el => el.textContent, tipo1)
                                
                                var estrellitas1;
                                await page.waitForSelector(stars1)
                                const estrellas1 = await page.$(stars1)
                                let calificacion1 = await page.evaluate(el => el.textContent, estrellas1)
                                if(calificacion1 >= 0.0 && calificacion1 <= 0.5) {estrellitas1 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion1 >= 0.6 && calificacion1 <= 1.0) {estrellitas1 = `${textoyemojis.emojis.estrella}`} else if(calificacion1 >= 1.1 && calificacion1 <= 1.5) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion1 >= 1.6 && calificacion1 <= 2.0) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion1 >= 2.1 && calificacion1 <= 2.5) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion1 >= 2.6 && calificacion1 <= 3.0) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion1 >= 3.1 && calificacion1 <= 3.5) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion1 >= 3.6 && calificacion1 <= 4.0) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion1 >= 4.1 && calificacion1 <= 4.7) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion1 >= 4.8 && calificacion1 <= 5.0) {estrellitas1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas1 = `${textoyemojis.emojis.media_estrella}`};

                                var estreno1;
                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                    estreno1 = "🟢 En emisión"
                                } else { estreno1 = "🔴 Finalizado"};

                                let desc1 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(1) > article > div > p:nth-child(3)"), a => a.textContent)[0])
                                if(desc1 == ""){desc1 = "No tiene descripción"}

                                //Para 2 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                    await page.waitForSelector(resultadodos)
                                    let element2 = await page.$(resultadodos)
                                    let value2 = await page.evaluate(el => el.textContent, element2)
                                    let output2 = value2

                                    const url2 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                    const urlone2 = "https://www3.animeflv.net" + url2

                                    await page.waitForSelector(pelianime2)
                                    let tipo2 = await page.$(pelianime2)
                                    let valor2 = await page.evaluate(el => el.textContent, tipo2)

                                    var estrellitas2;
                                    await page.waitForSelector(stars2)
                                    const estrellas2 = await page.$(stars2)
                                    let calificacion2 = await page.evaluate(el => el.textContent, estrellas2)
                                    if(calificacion2 >= 0.0 && calificacion2 <= 0.5) {estrellitas2 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion2 >= 0.6 && calificacion2 <= 1.0) {estrellitas2 = `${textoyemojis.emojis.estrella}`} else if(calificacion2 >= 1.1 && calificacion2 <= 1.5) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion2 >= 1.6 && calificacion2 <= 2.0) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion2 >= 2.1 && calificacion2 <= 2.5) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion2 >= 2.6 && calificacion2 <= 3.0) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion2 >= 3.1 && calificacion2 <= 3.5) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion2 >= 3.6 && calificacion2 <= 4.0) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion2 >= 4.1 && calificacion2 <= 4.7) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion2 >= 4.8 && calificacion2 <= 5.0) {estrellitas2 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas2 = `${textoyemojis.emojis.media_estrella}`};

                                    var estreno2;
                                    if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                        estreno2 = "🟢 En emisión"
                                    } else { estreno2 = "🔴 Finalizado"};

                                    const desc2 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(2) > article > div > p:nth-child(3)"), a => a.textContent)[0])
            
                                    //Para 3 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                        await page.waitForSelector(resultadotres)
                                        let element3 = await page.$(resultadotres)
                                        let value3 = await page.evaluate(el => el.textContent, element3)
                                        let output3 = value3

                                        const url3 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                        const urlone3 = "https://www3.animeflv.net" + url3

                                        await page.waitForSelector(pelianime3)
                                        let tipo3 = await page.$(pelianime3)
                                        let valor3 = await page.evaluate(el => el.textContent, tipo3)

                                        var estrellitas3;
                                        await page.waitForSelector(stars3)
                                        const estrellas3 = await page.$(stars3)
                                        let calificacion3 = await page.evaluate(el => el.textContent, estrellas3)
                                        if(calificacion3 >= 0.0 && calificacion3 <= 0.5) {estrellitas3 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion3 >= 0.6 && calificacion3 <= 1.0) {estrellitas3 = `${textoyemojis.emojis.estrella}`} else if(calificacion3 >= 1.1 && calificacion3 <= 1.5) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion3 >= 1.6 && calificacion3 <= 2.0) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion3 >= 2.1 && calificacion3 <= 2.5) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion3 >= 2.6 && calificacion3 <= 3.0) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion3 >= 3.1 && calificacion3 <= 3.5) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion3 >= 3.6 && calificacion3 <= 4.0) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion3 >= 4.1 && calificacion3 <= 4.7) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion3 >= 4.8 && calificacion3 <= 5.0) {estrellitas3 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas3 = `${textoyemojis.emojis.media_estrella}`};
            
                                        var estreno3;
                                        if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                            estreno3 = "🟢 En emisión"
                                        } else { estreno3 = "🔴 Finalizado"};

                                        const desc3 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(3) > article > div > p:nth-child(3)"), a => a.textContent)[0])
            
                                        //Para 4 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                            const imgs4 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                                            const miniatura4 = "https://www3.animeflv.net" + imgs4[0];
                                        
                                            await page.waitForSelector(resultadocuatro)
                                            let element4 = await page.$(resultadocuatro)
                                            let value4 = await page.evaluate(el => el.textContent, element4)
                                            let output4 = value4

                                            const url4 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                            const urlone4 = "https://www3.animeflv.net" + url4

                                            await page.waitForSelector(pelianime4)
                                            let tipo4 = await page.$(pelianime4)
                                            let valor4 = await page.evaluate(el => el.textContent, tipo4)
            
                                            var estrellitas4;
                                            await page.waitForSelector(stars4)
                                            const estrellas4 = await page.$(stars4)
                                            let calificacion4 = await page.evaluate(el => el.textContent, estrellas4)
                                            if(calificacion4 >= 0.0 && calificacion4 <= 0.5) {estrellitas4 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion4 >= 0.6 && calificacion4 <= 1.0) {estrellitas4 = `${textoyemojis.emojis.estrella}`} else if(calificacion4 >= 1.1 && calificacion4 <= 1.5) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion4 >= 1.6 && calificacion4 <= 2.0) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion4 >= 2.1 && calificacion4 <= 2.5) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion4 >= 2.6 && calificacion4 <= 3.0) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion4 >= 3.1 && calificacion4 <= 3.5) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion4 >= 3.6 && calificacion4 <= 4.0) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion4 >= 4.1 && calificacion4 <= 4.7) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion4 >= 4.8 && calificacion4 <= 5.0) {estrellitas4 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas4 = `${textoyemojis.emojis.media_estrella}`};

                                            var estreno4;
                                            if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                estreno4 = "🟢 En emisión"
                                            } else { estreno4 = "🔴 Finalizado"};

                                            const desc4 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(4) > article > div > p:nth-child(3)"), a => a.textContent)[0])
            
                                            //Para 5 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                                await page.waitForSelector(resultadocinco)
                                                let element5 = await page.$(resultadocinco)
                                                let value5 = await page.evaluate(el => el.textContent, element5)
                                                let output5 = value5

                                                const url5 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                const urlone5 = "https://www3.animeflv.net" + url5

                                                await page.waitForSelector(pelianime5)
                                                let tipo5 = await page.$(pelianime5)
                                                let valor5 = await page.evaluate(el => el.textContent, tipo5)

                                                var estrellitas5;
                                                await page.waitForSelector(stars5)
                                                const estrellas5 = await page.$(stars5)
                                                let calificacion5 = await page.evaluate(el => el.textContent, estrellas5)
                                                if(calificacion5 >= 0.0 && calificacion5 <= 0.5) {estrellitas5 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion5 >= 0.6 && calificacion5 <= 1.0) {estrellitas5 = `${textoyemojis.emojis.estrella}`} else if(calificacion5 >= 1.1 && calificacion5 <= 1.5) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion5 >= 1.6 && calificacion5 <= 2.0) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion5 >= 2.1 && calificacion5 <= 2.5) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion5 >= 2.6 && calificacion5 <= 3.0) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion5 >= 3.1 && calificacion5 <= 3.5) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion5 >= 3.6 && calificacion5 <= 4.0) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion5 >= 4.1 && calificacion5 <= 4.7) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion5 >= 4.8 && calificacion5 <= 5.0) {estrellitas5 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas5 = `${textoyemojis.emojis.media_estrella}`};
            
                                                var estreno5;
                                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                    estreno5 = "🟢 En emisión"
                                                } else { estreno5 = "🔴 Finalizado"};

                                                const desc5 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(5) > article > div > p:nth-child(3)"), a => a.textContent)[0])

                                                //Para 6 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                                    await page.waitForSelector(resultadoseis)
                                                    let element6 = await page.$(resultadoseis)
                                                    let value6 = await page.evaluate(el => el.textContent, element6)
                                                    let output6 = value6

                                                    const url6 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const urlone6 = "https://www3.animeflv.net" + url6

                                                    await page.waitForSelector(pelianime6)
                                                    let tipo6 = await page.$(pelianime6)
                                                    let valor6 = await page.evaluate(el => el.textContent, tipo6)

                                                    var estrellitas6;
                                                    await page.waitForSelector(stars6)
                                                    const estrellas6 = await page.$(stars6)
                                                    let calificacion6 = await page.evaluate(el => el.textContent, estrellas6)
                                                    if(calificacion6 >= 0.0 && calificacion6 <= 0.5) {estrellitas6 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion6 >= 0.6 && calificacion6 <= 1.0) {estrellitas6 = `${textoyemojis.emojis.estrella}`} else if(calificacion6 >= 1.1 && calificacion6 <= 1.5) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion6 >= 1.6 && calificacion6 <= 2.0) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion6 >= 2.1 && calificacion6 <= 2.5) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion6 >= 2.6 && calificacion6 <= 3.0) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion6 >= 3.1 && calificacion6 <= 3.5) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion6 >= 3.6 && calificacion6 <= 4.0) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion6 >= 4.1 && calificacion6 <= 4.7) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion6 >= 4.8 && calificacion6 <= 5.0) {estrellitas6 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas6 = `${textoyemojis.emojis.media_estrella}`};
                
                                                    var estreno6;
                                                    if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                        estreno6 = "🟢 En emisión"
                                                    } else { estreno6 = "🔴 Finalizado"};

                                                    const desc6 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(6) > article > div > p:nth-child(3)"), a => a.textContent)[0])
                                                    
                                                    //Para 7 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                                        const imgs7 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                                                        const miniatura7 = "https://www3.animeflv.net" + imgs7[0];
                                                        
                                                        await page.waitForSelector(resultadosiete)
                                                        let element7 = await page.$(resultadosiete)
                                                        let value7 = await page.evaluate(el => el.textContent, element7)
                                                        let output7 = value7

                                                        const url7 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const urlone7 = "https://www3.animeflv.net" + url7

                                                        await page.waitForSelector(pelianime7)
                                                        let tipo7 = await page.$(pelianime7)
                                                        let valor7 = await page.evaluate(el => el.textContent, tipo7)

                                                        var estrellitas7;
                                                        await page.waitForSelector(stars7)
                                                        const estrellas7 = await page.$(stars7)
                                                        let calificacion7 = await page.evaluate(el => el.textContent, estrellas7)
                                                        if(calificacion7 >= 0.0 && calificacion7 <= 0.5) {estrellitas7 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion7 >= 0.6 && calificacion7 <= 1.0) {estrellitas7 = `${textoyemojis.emojis.estrella}`} else if(calificacion7 >= 1.1 && calificacion7 <= 1.5) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion7 >= 1.6 && calificacion7 <= 2.0) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion7 >= 2.1 && calificacion7 <= 2.5) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion7 >= 2.6 && calificacion7 <= 3.0) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion7 >= 3.1 && calificacion7 <= 3.5) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion7 >= 3.6 && calificacion7 <= 4.0) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion7 >= 4.1 && calificacion7 <= 4.7) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion7 >= 4.8 && calificacion7 <= 5.0) {estrellitas7 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas7 = `${textoyemojis.emojis.media_estrella}`};
                    
                                                        var estreno7;
                                                        if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                            estreno7 = "🟢 En emisión"
                                                        } else { estreno7 = "🔴 Finalizado"};

                                                        const desc7 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(7) > article > div > p:nth-child(3)"), a => a.textContent)[0])

                                                        //Para 8 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                                            await page.waitForSelector(resultadoocho)
                                                            let element8 = await page.$(resultadoocho)
                                                            let value8 = await page.evaluate(el => el.textContent, element8)
                                                            let output8 = value8

                                                            const url8 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                            const urlone8 = "https://www3.animeflv.net" + url8

                                                            await page.waitForSelector(pelianime8)
                                                            let tipo8 = await page.$(pelianime8)
                                                            let valor8 = await page.evaluate(el => el.textContent, tipo8)

                                                            var estrellitas8;
                                                            await page.waitForSelector(stars8)
                                                            const estrellas8 = await page.$(stars8)
                                                            let calificacion8 = await page.evaluate(el => el.textContent, estrellas8)
                                                            if(calificacion8 >= 0.0 && calificacion8 <= 0.5) {estrellitas8 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion8 >= 0.6 && calificacion8 <= 1.0) {estrellitas8 = `${textoyemojis.emojis.estrella}`} else if(calificacion8 >= 1.1 && calificacion8 <= 1.5) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion8 >= 1.6 && calificacion8 <= 2.0) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion8 >= 2.1 && calificacion8 <= 2.5) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion8 >= 2.6 && calificacion8 <= 3.0) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion8 >= 3.1 && calificacion8 <= 3.5) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion8 >= 3.6 && calificacion8 <= 4.0) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion8 >= 4.1 && calificacion8 <= 4.7) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion8 >= 4.8 && calificacion8 <= 5.0) {estrellitas8 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas8 = `${textoyemojis.emojis.media_estrella}`};
                        
                                                            var estreno8;
                                                            if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                                estreno8 = "🟢 En emisión"
                                                            } else { estreno8 = "🔴 Finalizado"};

                                                            const desc8 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(8) > article > div > p:nth-child(3)"), a => a.textContent)[0])

                                                        //Para 9 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                                                await page.waitForSelector(resultadonueve)
                                                                let element9 = await page.$(resultadonueve)
                                                                let value9 = await page.evaluate(el => el.textContent, element9)
                                                                let output9 = value9

                                                                const url9 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                                const urlone9 = "https://www3.animeflv.net" + url9

                                                                await page.waitForSelector(pelianime9)
                                                                let tipo9 = await page.$(pelianime9)
                                                                let valor9 = await page.evaluate(el => el.textContent, tipo9)

                                                                var estrellitas9;
                                                                await page.waitForSelector(stars9)
                                                                const estrellas9 = await page.$(stars9)
                                                                let calificacion9 = await page.evaluate(el => el.textContent, estrellas9)
                                                                if(calificacion9 >= 0.0 && calificacion9 <= 0.5) {estrellitas9 = `${textoyemojis.emojis.media_estrella}`} else if(calificacion9 >= 0.6 && calificacion9 <= 1.0) {estrellitas9 = `${textoyemojis.emojis.estrella}`} else if(calificacion9 >= 1.1 && calificacion9 <= 1.5) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion9 >= 1.6 && calificacion9 <= 2.0) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion9 >= 2.1 && calificacion9 <= 2.5) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion9 >= 2.6 && calificacion9 <= 3.0) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion9 >= 3.1 && calificacion9 <= 3.5) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion9 >= 3.6 && calificacion9 <= 4.0) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(calificacion9 >= 4.1 && calificacion9 <= 4.7) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(calificacion9 >= 4.8 && calificacion9 <= 5.0) {estrellitas9 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {estrellitas9 = `${textoyemojis.emojis.media_estrella}`};
                            
                                                                var estreno9;
                                                                if (await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > a > span"), a => a.textContent)[0]) !== undefined){
                                                                    estreno9 = "🟢 En emisión"
                                                                } else { estreno9 = "🔴 Finalizado"};

                                                                const desc9 = await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li:nth-child(9) > article > div > p:nth-child(3)"), a => a.textContent)[0])


                                                //ARMAR EMBEDS
                                                    const resultado1 = new MessageEmbed()
                                                    .setTitle("Los últimos animes agregados son: ")
                                                    .setColor("RANDOM")
                                                    .setThumbnail(miniatura1)
                                                    .setDescription(`${textoyemojis.emojis.animeflv}`+'```'+'[1] ' + output1 + " | " + estreno1 +'```' + `**Enlace:** [Ver original](${urlone1}) \n`+ "**Tipo:** " + valor1 + " | **Calificación:** ( " +calificacion1 + " ) " + estrellitas1 + `\n` + desc1 + `\n\n` +'```'+'[2] ' + output2 + " | " + estreno2 +'```' + `**Enlace:** [Ver original](${urlone2}) \n`+ "**Tipo:** " + valor2 + " | **Calificación:** ( " +calificacion2 + " ) " + estrellitas2 + `\n` + desc2 + `\n\n` + '```'+'[3] ' + output3 + " | " + estreno3 +'```' + `**Enlace:** [Ver original](${urlone3}) \n`+ "**Tipo:** " + valor3 + " | **Calificación:** ( " +calificacion3 + " ) " + estrellitas3 + `\n` + desc3);

                                                    const resultado2 = new MessageEmbed()
                                                    .setTitle("Los últimos animes agregados son: ")
                                                    .setColor("RANDOM")
                                                    .setDescription(`${textoyemojis.emojis.animeflv}`+'```'+'[4] ' + output4 + " | " + estreno4 +'```' + `**Enlace:** [Ver original](${urlone4}) \n`+ "**Tipo:** " + valor4 + " | **Calificación:** ( " +calificacion4 + " ) " + estrellitas4 + `\n` + desc4 + `\n\n` +'```'+'[5] ' + output5 + " | " + estreno5 +'```' + `**Enlace:** [Ver original](${urlone5}) \n`+ "**Tipo:** " + valor5 + " | **Calificación:** ( " +calificacion5 + " ) " + estrellitas5 + `\n` + desc5 + `\n\n` + '```'+'[6] ' + output6 + " | " + estreno6 +'```' + `**Enlace:** [Ver original](${urlone6}) \n`+ "**Tipo:** " + valor6 + " | **Calificación:** ( " +calificacion6 + " ) " + estrellitas6 + `\n` + desc6)
                                                    .setThumbnail(miniatura4);

                                                    const resultado3 = new MessageEmbed()
                                                    .setTitle("Los últimos animes agregados son: ")
                                                    .setColor("RANDOM")
                                                    .setDescription(`${textoyemojis.emojis.animeflv}`+'```'+'[7] ' + output7 + " | " + estreno7 +'```' + `**Enlace:** [Ver original](${urlone7}) \n`+ "**Tipo:** " + valor7 + " | **Calificación:** ( " +calificacion7 + " ) " + estrellitas7 + `\n` + desc7 + `\n\n` +'```'+'[8] ' + output8 + " | " + estreno8 +'```' + `**Enlace:** [Ver original](${urlone8}) \n`+ "**Tipo:** " + valor8 + " | **Calificación:** ( " +calificacion8 + " ) " + estrellitas8 + `\n` + desc8 + `\n\n` + '```'+'[9] ' + output9 + " | " + estreno9 +'```' + `**Enlace:** [Ver original](${urlone9}) \n`+ "**Tipo:** " + valor9 + " | **Calificación:** ( " +calificacion9 + " ) " + estrellitas9 + `\n` + desc9)
                                                    .setThumbnail(miniatura7);

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
                                                        resultado1,
                                                        resultado2,
                                                        resultado3
                                                    ];

                                                    //create an array of buttons

                                                    buttonList = [
                                                        button1,
                                                        button2
                                                    ]
                                                
                                                paginationEmbed(msg, message, pages, buttonList);
                                                await browser.close();
                                            
                                                }
                            }
                            
                            catch(error)
                            {
                                msg.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_RED")
                                            .setTimestamp()
                                            .setDescription("Hubo un error al cargar los ultimos animes")
                                    ]});
                                console.log(error)
                            }
            };
};
module.exports.conf = {
    "name": "ultimoani",
    "description": [ "Muestra los últimos animes agregados a AnimeFLV." ],
    "aliases": ["ultimoanime", "animenuevo"],
    "usage": [ "ultimoanime" ],
    "category": "info"
}
