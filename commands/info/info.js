const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");
const { channel } = require("diagnostics_channel");

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
            //remplazar el mensaje por una url
            const anime = args.join(' ').replace(/ /g,"+");
            const member = message.member;
            //comprobar el canal adecuado
            if(!args.join(' ') || !args[0]){
                message.reply("Te falta escribir el anime que quieres buscar")
                return;
            } else if(args.join(' ').length < 3){
                message.reply("Lo que quieres buscar es demasiado corto")
                return;
            } else if(args.join(' ').length > 70){
                message.reply("Lo que quieres buscar es demasiado largo")
                return;
            } else if(message.content.includes(`\n`)){
                message.reply("Tu busqueda contiene más de un reglón")
                return;
            } else {
                searchinfo()
            }
            
            //función de busqueda
            const otros_nombres = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3)";
            const imagen = "body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img";
            const estado = "body > div.Wrapper > div > div > div.Container > div > aside > p > span";
            const descripción = "body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p";
            const seguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > div > div > span";
            const nombresdelosseguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > ul";
            const estrellitas = "#votes_prmd";
            const votos = "#votes_nmbr";
            const imagen_referencial = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Bg";

            async function searchinfo(){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando **" +  args.join(' ') + "** ...")
                    ], components:[]});
                try{
                const url = `https://www3.animeflv.net/browse?q=${anime}`;

                const resultadouno = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > h3";
                const pelianime1 = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > div > span";
                const stars1 = "body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > div > p:nth-child(2) > span.Vts.fa-star";
                
                const resultadodos = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a > h3";
                const pelianime2 = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a > div > span";
                const stars2 = "body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > div > p:nth-child(2) > span.Vts.fa-star";
                
                const resultadotres = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a > h3";
                const pelianime3 = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a > div > span";
                const stars3 = "body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > div > p:nth-child(2) > span.Vts.fa-star";
                
                const resultadocuatro = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a > h3";
                const pelianime4 = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a > div > span";
                const stars4 = "body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > div > p:nth-child(2) > span.Vts.fa-star";
                
                const resultadocinco = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a > h3";
                const pelianime5 = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a > div > span";
                const stars5 = "body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > div > p:nth-child(2) > span.Vts.fa-star";
                
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
                                
                            } else if (await page.$(resultadouno) !== null) {
                    //Para la miniatura
                    const imgs = await page.$$eval("body > div.Wrapper > div > div > main > ul > li > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                    const miniatura = imgs[0]
                    
                    await page.waitForSelector(resultadouno)
                    let element1 = await page.$(resultadouno)
                    let value1 = await page.evaluate(el => el.textContent, element1)
                    let output1 = value1
                    
                    await page.waitForSelector(pelianime1)
                    let tipo1 = await page.$(pelianime1)
                    let valor1 = await page.evaluate(el => el.textContent, tipo1)
                    
                    await page.waitForSelector(stars1)
                    const estrellas1 = await page.$(stars1)
                    let calificacion1 = await page.evaluate(el => el.textContent, estrellas1)

                    if(valor1 == "Anime") {valor1 = "🌈 Anime"} else if(valor1 == "OVA") {valor1 = "📀 OVA"} else {valor1 = "🎬 Película"}
                    
                    //Para 2 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                    if (await page.$(resultadodos) !== null) {
                        await page.waitForSelector(resultadodos)
                        let element2 = await page.$(resultadodos)
                        let value2 = await page.evaluate(el => el.textContent, element2)
                        let output2 = value2

                        await page.waitForSelector(pelianime2)
                        let tipo2 = await page.$(pelianime2)
                        let valor2 = await page.evaluate(el => el.textContent, tipo2)

                        await page.waitForSelector(stars2)
                        const estrellas2 = await page.$(stars2)
                        let calificacion2 = await page.evaluate(el => el.textContent, estrellas2)

                        if(valor2 == "Anime") {valor2 = "🌈 Anime"} else if(valor2 == "OVA") {valor2 = "📀 OVA"} else {valor2 = "🎬 Película"}
                        
                        //Para 3 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                        if (await page.$(resultadotres) !== null) {
                            await page.waitForSelector(resultadotres)
                            let element3 = await page.$(resultadotres)
                            let value3 = await page.evaluate(el => el.textContent, element3)
                            let output3 = value3

                            await page.waitForSelector(pelianime3)
                            let tipo3 = await page.$(pelianime3)
                            let valor3 = await page.evaluate(el => el.textContent, tipo3)

                            await page.waitForSelector(stars3)
                            const estrellas3 = await page.$(stars3)
                            let calificacion3 = await page.evaluate(el => el.textContent, estrellas3)

                            if(valor3 == "Anime") {valor3 = "🌈 Anime"} else if(valor3 == "OVA") {valor3 = "📀 OVA"} else {valor3 = "🎬 Película"}
                            
                            //Para 4 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                            if (await page.$(resultadocuatro) !== null) {
                                await page.waitForSelector(resultadocuatro)
                                let element4 = await page.$(resultadocuatro)
                                let value4 = await page.evaluate(el => el.textContent, element4)
                                let output4 = value4
                                
                                await page.waitForSelector(pelianime4)
                                let tipo4 = await page.$(pelianime4)
                                let valor4 = await page.evaluate(el => el.textContent, tipo4)

                                await page.waitForSelector(stars4)
                                const estrellas4 = await page.$(stars4)
                                let calificacion4 = await page.evaluate(el => el.textContent, estrellas4)

                                if(valor4 == "Anime") {valor4 = "🌈 Anime"} else if(valor4 == "OVA") {valor4 = "📀 OVA"} else {valor4 = "🎬 Película"}

                                //Para 5 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                if (await page.$(resultadocinco) !== null) {
                                    await page.waitForSelector(resultadocinco)
                                    let element5 = await page.$(resultadocinco)
                                    let value5 = await page.evaluate(el => el.textContent, element5)
                                    let output5 = value5

                                    await page.waitForSelector(pelianime5)
                                    let tipo5 = await page.$(pelianime5)
                                    let valor5 = await page.evaluate(el => el.textContent, tipo5)

                                    await page.waitForSelector(stars5)
                                    const estrellas5 = await page.$(stars5)
                                    let calificacion5 = await page.evaluate(el => el.textContent, estrellas5)

                                    if(valor5 == "Anime") {valor5 = "🌈 Anime"} else if(valor5 == "OVA") {valor5 = "📀 OVA"} else {valor5 = "🎬 Película"}
                                    
                                    //Para 5 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                                    const row5 = new MessageActionRow().addComponents(
                                        new MessageButton()
                                        .setCustomId('one5')
                                        .setEmoji("1️⃣")
                                        .setStyle('PRIMARY'),
                                        new MessageButton()
                                        .setCustomId('two5')
                                        .setEmoji("2️⃣")
                                        .setStyle('SECONDARY'),
                                        new MessageButton()
                                        .setCustomId('three5')
                                        .setEmoji("3️⃣")
                                        .setStyle('PRIMARY'),
                                        new MessageButton()
                                        .setCustomId('four5')
                                        .setEmoji("4️⃣")
                                        .setStyle('SECONDARY'),
                                        new MessageButton()
                                        .setCustomId('five5')
                                        .setEmoji("5️⃣")
                                        .setStyle('PRIMARY')
                                        );
                                    
                                        const resultado5 = new MessageEmbed()
                                        .setAuthor({name: "Tu busqueda fue: 🔎 " + args.join(' '), iconURL: message.author.displayAvatarURL()})
                                        .setTitle("Por favor elige el anime que buscas")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```' + '```' + '[５] ('+ valor5 +") - "+ output5 + " │ ⭐" + calificacion5 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                        .setThumbnail(miniatura)
                                        .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                        
                                        msg.edit({embeds: [resultado5], components:[row5]}).then(message => {
                                            const filter = (button5) => button5.user.id === member.id;
                                            const collector5 = message.createMessageComponentCollector({
                                                filter,
                                                max: 1,
                                                time: 18000,
                                                errors: ['time']
                                            });
                                                //Collector On
                                                collector5.on('collect', async b => {
                                                    await b.deferUpdate()      
                                                    if (b.customId === "one5") { 
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output1 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output1;
                                                        const eltipo = valor1;
                                    
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    } else if (b.customId === "two5") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output2 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output2;
                                                        const eltipo = valor2;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                        
                                                    } else if (b.customId === "three5") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output3 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output3;
                                                        const eltipo = valor3;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    } else if (b.customId === "four5") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output4 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output4;
                                                        const eltipo = valor4;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                      
                                                    } else if (b.customId === "five5") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output4 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output5;
                                                        const eltipo = valor5;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                      
                                                    }
                                                });
                                                //Collector Off
                        
                                                collector5.on('end', async(collected, reason) => {
                                                    if (collected.size < 1) {
                                                    console.log("Timeout 5");
                                                    await browser.close();
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                                .setColor("RED")
                                                                .setDescription("Te tardaste mucho en elejir...")
                                                        ], components:[]})
                                                    }
                                                });
                                            })
                                    //Para 5 respuestas ___________________________________________________________________________________________________________________________________________________________________________________

                                } else {
                                    //Para 4 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                                    const row4 = new MessageActionRow().addComponents(
                                        new MessageButton()
                                        .setCustomId('one4')
                                        .setEmoji("1️⃣")
                                        .setStyle('PRIMARY'),
                                        new MessageButton()
                                        .setCustomId('two4')
                                        .setEmoji("2️⃣")
                                        .setStyle('SECONDARY'),
                                        new MessageButton()
                                        .setCustomId('three4')
                                        .setEmoji("3️⃣")
                                        .setStyle('PRIMARY'),
                                        new MessageButton()
                                        .setCustomId('four4')
                                        .setEmoji("4️⃣")
                                        .setStyle('SECONDARY')
                                        );
                        
                                        const resultado4 = new MessageEmbed()
                                        .setAuthor({name: "Tu busqueda fue: 🔎 " + args.join(' '), iconURL: message.author.displayAvatarURL()})
                                        .setTitle("Por favor elige el anime que buscas")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                        .setThumbnail(miniatura)
                                        .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                        msg.edit({embeds: [resultado4], components:[row4]}).then(message => {
                                            const filter = (button4) => button4.user.id === member.id;
                                            const collector4 = message.createMessageComponentCollector({
                                                filter,
                                                max: 1,
                                                time: 18000,
                                                errors: ['time']
                                            });
                                                //Collector On
                                                collector4.on('collect', async b => {
                                                    await b.deferUpdate()      
                                                    if (b.customId === "one4") { 
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output1 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output1;
                                                        const eltipo = valor1;
                                    
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    } else if (b.customId === "two4") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output2 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output2;
                                                        const eltipo = valor2;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                        
                                                    } else if (b.customId === "three4") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output3 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output3;
                                                        const eltipo = valor3;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    } else if (b.customId === "four4") {
                                                        message.edit({
                                                            embeds: [
                                                                new MessageEmbed()
                                                                    .setColor("YELLOW")
                                                                    .setDescription("Recopilando información de **" +  output4 + "** ...")
                                                            ], components:[]})
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                        const eltitulo = output4;
                                                        const eltipo = valor4;
                            
                                                        return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    }
                                                });
                                                //Collector Off
                        
                                                collector4.on('end', async(collected, reason) => {
                                                    if (collected.size < 1) {
                                                    console.log("Timeout 4");
                                                    await browser.close();
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                                .setColor("RED")
                                                                .setDescription("Te tardaste mucho en elejir...")
                                                        ], components:[]})
                                                    }
                                                });
                                            });
                                    //Para 4 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                                };
                                
                            } else {
                                //Para 3 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                                const row3 = new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId('one3')
                                    .setEmoji("1️⃣")
                                    .setStyle('PRIMARY'),
                                    new MessageButton()
                                    .setCustomId('two3')
                                    .setEmoji("2️⃣")
                                    .setStyle('SECONDARY'),
                                    new MessageButton()
                                    .setCustomId('three3')
                                    .setEmoji("3️⃣")
                                    .setStyle('PRIMARY')
                                    );
                    
                                    const resultado3 = new MessageEmbed()
                                    .setAuthor({name: "Tu busqueda fue: 🔎 " + args.join(' '), iconURL: message.author.displayAvatarURL()})
                                    .setTitle("Por favor elige el anime que buscas")
                                    .setColor("DARK_GREEN")
                                    .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```')
                                    .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                    .setThumbnail(miniatura)
                                    .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                    msg.edit({embeds: [resultado3], components:[row3]}).then(message => {
                                        const filter = (button3) => button3.user.id === member.id;
                                        const collector3 = message.createMessageComponentCollector({
                                            filter,
                                            max: 1,
                                            time: 18000,
                                            errors: ['time']
                                        });
                                            //Collector On
                                            collector3.on('collect', async b => {
                                                await b.deferUpdate()      
                                                if (b.customId === "one3") { 
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                                .setColor("YELLOW")
                                                                .setDescription("Recopilando información de **" +  output1 + "** ...")
                                                        ], components:[]})
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                    const eltitulo = output1;
                                                    const eltipo = valor1;
                                
                        
                                                    return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                } else if (b.customId === "two3") {
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                                .setColor("YELLOW")
                                                                .setDescription("Recopilando información de **" +  output2 + "** ...")
                                                        ], components:[]})
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                    const eltitulo = output2;
                                                    const eltipo = valor2;
                        
                                                    return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                    
                                                } else if (b.customId === "three3") {
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                                .setColor("YELLOW")
                                                                .setDescription("Recopilando información de **" +  output3 + "** ...")
                                                        ], components:[]})
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                    const eltitulo = output3;
                                                    const eltipo = valor3;
                        
                                                    return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                }
                                            });
                                            //Collector Off
                    
                                            collector3.on('end', async(collected, reason) => {
                                                if (collected.size < 1) {
                                                console.log("Timeout 4");
                                                await browser.close();
                                                message.edit({
                                                    embeds: [
                                                        new MessageEmbed()
                                                            .setColor("RED")
                                                            .setDescription("Te tardaste mucho en elejir...")
                                                    ], components:[]})
                                                }
                                            });
                                        });
                                //Para 3 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                            };

                        } else {
                            //Para 2 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                            const row2 = new MessageActionRow().addComponents(
                                new MessageButton()
                                .setCustomId('one2')
                                .setEmoji("1️⃣")
                                .setStyle('PRIMARY'),
                                new MessageButton()
                                .setCustomId('two2')
                                .setEmoji("2️⃣")
                                .setStyle('SECONDARY')
                                );
                
                                const resultado2 = new MessageEmbed()
                                .setAuthor({name: "Tu busqueda fue: 🔎 " + args.join(' '), iconURL: message.author.displayAvatarURL()})
                                .setTitle("Por favor elige el anime que buscas")
                                .setColor("DARK_GREEN")
                                .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' +'[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```')
                                .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                .setThumbnail(miniatura)
                                .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                msg.edit({embeds: [resultado2], components:[row2]}).then(message => {
                                    const filter = (button2) => button2.user.id === member.id;
                                    const collector2 = message.createMessageComponentCollector({
                                        filter,
                                        max: 1,
                                        time: 18000,
                                        errors: ['time']
                                    });
                                        //Collector On
                                        collector2.on('collect', async b => {
                                            await b.deferUpdate()      
                                            if (b.customId === "one2") { 
                                                message.edit({
                                                    embeds: [
                                                        new MessageEmbed()
                                                            .setColor("YELLOW")
                                                            .setDescription("Recopilando información de **" +  output1 + "** ...")
                                                    ], components:[]})
                                                const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                const eltitulo = output1;
                                                const eltipo = valor1;
                            
                    
                                                return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                            } else if (b.customId === "two2") {
                                                message.edit({
                                                    embeds: [
                                                        new MessageEmbed()
                                                            .setColor("YELLOW")
                                                            .setDescription("Recopilando información de **" +  output2 + "** ...")
                                                    ], components:[]})
                                                const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                await page.goto("https://www3.animeflv.net" + urlone[0]);
                                                const eltitulo = output2;
                                                const eltipo = valor2;
                    
                                                return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                                
                                            }
                                        });
                                        //Collector Off
                
                                        collector2.on('end', async(collected, reason) => {
                                            if (collected.size < 1) {
                                            console.log("Timeout 4");
                                            await browser.close();
                                            message.edit({
                                                embeds: [
                                                    new MessageEmbed()
                                                        .setColor("RED")
                                                        .setDescription("Te tardaste mucho en elejir...")
                                                ], components:[]})
                                            }
                                        });
                                    });
                            //Para 2 respuestas ___________________________________________________________________________________________________________________________________________________________________________________
                        };

                    } else {
                        //Para 1 respuesta ___________________________________________________________________________________________________________________________________________________________________________________
                        const row1 = new MessageActionRow().addComponents(
                            new MessageButton()
                            .setCustomId('one1')
                            .setEmoji("1️⃣")
                            .setStyle('PRIMARY')
                            );
            
                            const resultado1 = new MessageEmbed()
                            .setAuthor({name: "Tu busqueda fue: 🔎 " + args.join(' '), iconURL: message.author.displayAvatarURL()})
                            .setTitle("Por favor elige el anime que buscas")
                            .setDescription('```'+'[１] ('+ valor1 +") │ "+ output1 + " │ ⭐" + calificacion1 +'```')
                            .setColor("DARK_GREEN")
                            .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                            .setThumbnail(miniatura)
                            .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                            msg.edit({embeds: [resultado1], components:[row1]}).then(message => {
                                const filter = (button1) => button1.user.id === member.id;
                                const collector1 = message.createMessageComponentCollector({
                                    filter,
                                    max: 1,
                                    time: 18000,
                                    errors: ['time']
                                });
                                    //Collector On
                                    collector1.on('collect', async b => {
                                        await b.deferUpdate()
                                        if (b.customId === "one1") { 
                                            message.edit({
                                                embeds: [
                                                    new MessageEmbed()
                                                        .setColor("YELLOW")
                                                        .setDescription("Recopilando información de **" +  output1 + "** ...")
                                                ], components:[]})
                                            const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                            await page.goto("https://www3.animeflv.net" + urlone[0]);
                                            const eltitulo = output1;
                                            const eltipo = valor1;
                        
                
                                            return await respuesta5_1(browser, page, message, urlone, eltitulo, eltipo);
                                        }
                                    });
                                    //Collector Off
            
                                    collector1.on('end', async(collected, reason) => {
                                        if (collected.size < 1) {
                                        console.log("Timeout 4");
                                        await browser.close();
                                        message.edit({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setColor("RED")
                                                    .setDescription("Te tardaste mucho en elejir...")
                                            ], components:[]})
                                        }
                                    });
                                });
                        //Para 1 respuesta ___________________________________________________________________________________________________________________________________________________________________________________
                    };
                } else {msg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                            .setColor("DARK_RED")
                            .setTimestamp()
                            .setDescription("No se encontraron coincidencias para **" + args.join(' ') + "** D:")
                    ]});
                    return await browser.close()
                };


                }

                
                catch(error)
                {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error al buscar **" + args.join(' ')+"**")
                        ]});
                }
            }

            //Para la 1era alternativa ___________________________________________________________________________________________________________________________________________________________________________________
            async function respuesta5_1(browser, page, message, urlone, eltitulo, eltipo)
            {   
                try{
                message.channel.sendTyping();
                //detalles
                const detalles5_1 = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setURL("https://www3.animeflv.net" + urlone[0])
                    .setLabel("Ver original")
                    .setStyle('LINK')
                );

                //Titutlo
                let title5_1 = eltitulo;
                
                //capitulos
                var episodios5_1;
                await page.waitForSelector("#episodeList");
                const capitulos5_1 = await page.evaluate(() => Array.from(document.querySelectorAll("#episodeList"), el => el.childElementCount)[0]);
                
                //Estado
                var next5_1;
                await page.waitForSelector(estado);
                let estado5_1 = await page.$(estado);
                let state5_1 = await page.evaluate(el => el.textContent, estado5_1);
                let colorembed5_1 = "#ec1424";
                if(state5_1 == "Finalizado") { state5_1 = "[🔴 FINALIZADO]";
                episodios5_1 = capitulos5_1;
                next5_1 = "No hay próximo episodio.";
                } else {(colorembed5_1 = "#14c40c") && (state5_1 = "[🟢 EN EMISIÓN]");
                episodios5_1 = capitulos5_1 - 1;
                
                //proximo_episodio

                const proximo5_1 = await page.$("#episodeList > li.fa-play-circle.Next > a > span");
                next5_1 = "Fecha del proximo episodio: **" + await page.evaluate(el => el.textContent, proximo5_1) + "**";
                };
                //URL
                let url5_1 = "https://www3.animeflv.net" + urlone[0];

                //otros nombres
                var othernames5_1;
                await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span:nth-child(1)"), el => el.textContent)[0]);
                if(await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span:nth-child(1)"), el => el.textContent)[0]) !== undefined) {
                    const otros_nombres5_1 = await page.$(otros_nombres);
                    othernames5_1 = await page.evaluate(el => el.textContent, otros_nombres5_1);
                } else {
                    othernames5_1 = "No tiene otros nombres"
                };

                //géneros
                var gender5_1;
                if(await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(1)[href]'), a => a.getAttribute('href'))[0]) !== undefined) {
                    await page.waitForSelector("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(1)");
                    const ungender5_1 = await page.$("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(1)");
                    const ungenero5_1 = await page.evaluate(el => el.textContent, ungender5_1);
                    
                    if(await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(2)[href]'), a => a.getAttribute('href'))[0]) !== undefined) {
                        await page.waitForSelector("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(2)");
                        const dosgender5_1 = await page.$("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(2)");
                        const dosgenero5_1 = await page.evaluate(el => el.textContent, dosgender5_1);
                        
                        if(await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(3)[href]'), a => a.getAttribute('href'))[0]) !== undefined) {
                            await page.waitForSelector("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(3)");
                            const tresgender5_1 = await page.$("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(3)");
                            const tresgenero5_1 = await page.evaluate(el => el.textContent, tresgender5_1);
                                
                            if(await page.evaluate(() => Array.from(document.querySelectorAll('body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(4)[href]'), a => a.getAttribute('href'))[0]) !== undefined) {
                                await page.waitForSelector("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(4)");
                                    const cuatrogender5_1 = await page.$("body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav > a:nth-child(4)");
                                    const cuatrogenero5_1 = await page.evaluate(el => el.textContent, cuatrogender5_1);
                                    gender5_1 = ungenero5_1 + `, ` + dosgenero5_1 + `, ` + tresgenero5_1 + ` y ` + cuatrogenero5_1;
                            } else {
                                gender5_1 = ungenero5_1 + `, ` + dosgenero5_1 + ` y ` + tresgenero5_1;
                            }
                        } else {
                            gender5_1 = ungenero5_1 + ` y ` + dosgenero5_1;
                        }
                    } else {
                        gender5_1 = ungenero5_1;
                    }
                } else { 
                    gender5_1 = "No tiene género";
                };

                
                //imagen
                const imgs = await page.$$eval(imagen, imgs => imgs.map(img => img.getAttribute('src')));
                const imagen5_1 = imgs[0];

                //sinopsis
                await page.waitForSelector(descripción);
                const desc5_1 = await page.$(descripción);
                let description5_1 = await page.evaluate(el => el.textContent, desc5_1);

                //cantidaddeseguidores
                await page.waitForSelector(seguidores);
                const seguidores5_1 = await page.$(seguidores);
                let followers5_1 = await page.evaluate(el => el.textContent, seguidores5_1);

                //losseguidores
                var allfollowers5_1;
                await page.waitForSelector(nombresdelosseguidores);
                if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(1) > a > img") !== null) {
                    const unoseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(1) > a > img", unoseguidor5_1 => unoseguidor5_1.map(alt => alt.getAttribute('alt')));
                    
                    if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(2) > a > img") !== null) {
                        const dosseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(2) > a > img", dosseguidor5_1 => dosseguidor5_1.map(alt => alt.getAttribute('alt')));
                        
                        if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(3) > a > img") !== null) {
                            const tresseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(3) > a > img", tresseguidor5_1 => tresseguidor5_1.map(alt => alt.getAttribute('alt')));
                            
                            if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(4) > a > img") !== null) {
                                const cuatrosegudor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(4) > a > img", cuatrosegudor5_1 => cuatrosegudor5_1.map(alt => alt.getAttribute('alt')));
                                    allfollowers5_1 = unoseguidor5_1[0] + ", " + dosseguidor5_1[0] + ", " + tresseguidor5_1[0] + ", " + cuatrosegudor5_1[0];
                            
                            } else {
                                allfollowers5_1 = unoseguidor5_1[0] + ", " + dosseguidor5_1[0] + ", " + tresseguidor5_1[0];
                            }
                        } else {
                            allfollowers5_1 = unoseguidor5_1[0] + ", " + dosseguidor5_1[0];
                        }
                    } else {
                        allfollowers5_1 = unoseguidor5_1[0];
                    }
                } else { 
                    allfollowers5_1 = "No hay seguidores";
                }

                //tipo
                let tipo5_1 = eltipo;

                //estrellitas
                await page.waitForSelector(estrellitas);
                const estrellitas5_1 = await page.$(estrellitas);
                let littlestars5_1 = await page.evaluate(el => el.textContent, estrellitas5_1);
                var littlestarssymbols5_1;
                if(littlestars5_1 >= 0.0 && littlestars5_1 <= 0.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 0.6 && littlestars5_1 <= 1.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 1.1 && littlestars5_1 <= 1.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 1.6 && littlestars5_1 <= 2.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 2.1 && littlestars5_1 <= 2.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 2.6 && littlestars5_1 <= 3.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 3.1 && littlestars5_1 <= 3.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 3.6 && littlestars5_1 <= 4.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 4.1 && littlestars5_1 <= 4.7) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 4.8 && littlestars5_1 <= 5.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {littlestarssymbols5_1 = `${textoyemojis.emojis.media_estrella}`};
                //imagen referencial
                await page.waitForSelector(imagen_referencial);
                const imagen_referencial5_1 = await page.evaluate(el => window.getComputedStyle(el).backgroundImage, await page.$(imagen_referencial));
                const backgroundImage5_1 = imagen_referencial5_1.match(/url\("(.*)"/)[1];
                
                var backgroundImg5_1;
                try{
                if(await getColors(backgroundImage5_1).then(colors => colors[1]._rgb[0]) !== 40) {
                    backgroundImg5_1 = backgroundImage5_1;
                } else {backgroundImg5_1 = "https://www3.animeflv.net/assets/animeflv/img/logo.png"}
                }          
                catch(error)
                {
                backgroundImg5_1 = "https://www3.animeflv.net/assets/animeflv/img/logo.png"
                };

                //votos
                await page.waitForSelector(votos);
                const votos5_1 = await page.$(votos);
                let votes5_1 = await page.evaluate(el => el.textContent, votos5_1);

                //ENVIANDO MENSAJE
                const resultado5_1 = new MessageEmbed()
                .setAuthor({name: 'AnimeFLV', iconURL: 'https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3', url:'https://www3.animeflv.net/'})
                .setTitle(`${title5_1} ${state5_1}`)
                .setColor(colorembed5_1)
                .setURL(url5_1)
                .setThumbnail("https://www3.animeflv.net"+imagen5_1)
                .setImage(backgroundImg5_1)
                .setDescription(`**Descripción:** \n${description5_1}`)
                .addFields(
                    { name: 'Otros nombres:', value: othernames5_1, inline: false },   
                    { name: 'Género:', value: gender5_1 , inline: false },
                    {name: "Tipo:", value: tipo5_1, inline: false}
                )
                .addField("Episodios:", `( ${episodios5_1} ) ${next5_1}`, false)
                .addField(`Seguidores:`, `( ${followers5_1} ) ${allfollowers5_1}, etc.`, false)
                .addField('Calificación:', `( ${littlestars5_1} ) ${littlestarssymbols5_1}`, false)
                .setFooter({text: `Votos: 🗳️ ${votes5_1}`});
                message.edit({
                    embeds: [resultado5_1], components:[detalles5_1] 
                });

                //Buscando comentarios y reacciones
                await page.waitForSelector("#disqus_thread")
                    const gaaaa = await page.evaluate(() => Array.from(document.querySelectorAll("#disqus_thread"), a => a.querySelector("iFrame").getAttribute("src"))[0]);
                    await page.goto(gaaaa);

                await page.waitForSelector("#reactions");
                    const gaxd2 = await page.$("#reactions > div.align.align--center.spacing-bottom");
                    let gaxd = await page.evaluate(el => el.textContent.replace(' Responses',''), gaxd2);

                await page.waitForSelector("#main-nav");
                    const gaxd2x = await page.$("#main-nav > nav > ul > li.nav-tab.nav-tab--primary.tab-conversation.active > a > span.comment-count");
                    let gaxdx = await page.evaluate(el => el.textContent.replace(' comentarios',''), gaxd2x);

                message.edit({
                    embeds: [resultado5_1.addField("Reacciones:", gaxd, true).addField("Comentarios:", gaxdx, true)], components:[detalles5_1]
                });
                await browser.close();
            }

                
            catch(error)
            {
                message.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DARK_RED")
                            .setTimestamp()
                            .setDescription("Hubo un error al buscar **" + args.join(' ')+"**")
                    ]});
                console.log(error)
            }
            }
};
module.exports.conf = {
    "name": "info",
    "description": [ "Busca y obtén información de un anime." ],
    "aliases": ["animeinfo", "infoanime","information"],
    "usage": [ "info" ]
}
