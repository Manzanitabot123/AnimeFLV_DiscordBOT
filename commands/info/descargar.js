const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
            var url;
            //remplazar el mensaje por una url
            const anime = args.join(' ').replace(/ /g,"+");
            const member = message.member;
            //comprobar el canal adecuado
            if(!args.join(' ') || !args[0]){
                message.reply("Te falta escribir el anime que quieres descargar")
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
                search(url)
            }
            
            //función de busqueda
            const otros_nombres = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3)";
            const genero = "body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > nav";
            const imagen = "body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img";
            const estado = "body > div.Wrapper > div > div > div.Container > div > aside > p > span";
            const descripción = "body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p";
            const seguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > div > div > span";
            const nombresdelosseguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > ul";
            const estrellitas = "#votes_prmd";
            const votos = "#votes_nmbr";
            const imagen_referencial = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Bg";

            async function search(url){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando **" +  args.join(' ') + "** ...")
                    ], components:[]});
                try{
                url = `https://www3.animeflv.net/browse?q=${anime}`;
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
                await page.goto(url);

                //Para 1 resultado ___________________________________________________________________________________________________________________________________________________________________________________
                if (await page.$(resultadouno) !== null) {
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
                                        .setTitle("Por favor elige el anime que deseas descargar")
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
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output1;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)
                                                    } else if (b.customId === "two5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output2;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)
                                                        
                                                    } else if (b.customId === "three5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output3;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)

                                                    } else if (b.customId === "four5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output4;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)
                                                      
                                                    } else if (b.customId === "five5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output5;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)
                                                      
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
                                        .setTitle("Por favor elige el anime que deseas descargar")
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
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output1;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)

                                                    } else if (b.customId === "two4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output2;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)
                                                        
                                                    } else if (b.customId === "three4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output3;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)

                                                    } else if (b.customId === "four4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output4;
                                                        collectormsg(msg, page, browser, urlone, eltitulo)

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
                                    .setTitle("Por favor elige el anime que deseas descargar")
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
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const eltitulo = output1;
                                                    collectormsg(msg, page, browser, urlone, eltitulo)

                                                } else if (b.customId === "two3") {
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const eltitulo = output2;
                                                    collectormsg(msg, page, browser, urlone, eltitulo)
                                                    
                                                } else if (b.customId === "three3") {
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const eltitulo = output3;
                                                    collectormsg(msg, page, browser, urlone, eltitulo)
                        
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
                                .setTitle("Por favor elige el anime que deseas descargar")
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
                                                const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                const eltitulo = output1;
                                                collectormsg(msg, page, browser, urlone, eltitulo)

                                            } else if (b.customId === "two2") {
                                                const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                const eltitulo = output2;
                                                collectormsg(msg, page, browser, urlone, eltitulo)
                                                
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
                            .setTitle("Por favor elige el anime que deseas descargar")
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
                                            const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                            const eltitulo = output1;
                                            collectormsg(msg, page, browser, urlone, eltitulo)

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
            };

            //Para recoletar el numero de página ___________________________________________________________________________________________________________________________________________________________________________________
            async function collectormsg(msg, page, browser, urlone, eltitulo) {
                await msg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Escribe el número de un capítulo")
                    ], components:[]
                }).then(msg => {
                    const filter = (m) => m.author.id === message.author.id;;
                    const collector = msg.channel.createMessageCollector({
                        filter,
                        time: 10000,
                        errors: ['time']
                    });
            
                function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
                collector.on('collect', async(mensaje) => {
                    const value = mensaje.content;
                    if ((mensaje.content.toLowerCase() === 'cancelar') || (mensaje.content.toLowerCase() === 'cancel')) {
                    collector.stop();
                    mensaje.delete()
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setDescription("Bye")
                        ], components:[]})
                    await browser.close();

                    } else if (isNumber(value) === true) {
                    collector.stop();
                    mensaje.delete()
                    message.channel.sendTyping();
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription("Recopilando información del episodio **" +  value + "** ...")
                        ], components:[]})
                    const result = await page.goto("https://www3.animeflv.net/ver/" + urlone[0].replace('/anime/','') + "-"+ value);
                    if (result.status() === 404) {
                    console.error('Episodio desconocido');
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                                .setColor("DARK_RED")
                                .setDescription("No existe un episodio **" + value + "** o aún no esta disponible")
                        ]});
                    return await browser.close()
                  } else {
                    const enlaceoriginal = "https://www3.animeflv.net/ver/" + urlone[0].replace('/anime/','') + "-"+ value;
                    const detallesraros = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setURL(enlaceoriginal)
                        .setLabel("Ir al episodio")
                        .setStyle('LINK')
                    );

                    await page.waitForSelector("#DwsldCn")
                    
                    //PARA UN LINK _______________________________________________________________________________________________________________________________________________________________________
                    if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(1)"), el => el.textContent)[0]) !== undefined) {
                    //Nombre
                    const elnombredellink = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(1) > td:nth-child(1)");
                    const nombreenlace1 = await page.evaluate(el => el.textContent, elnombredellink);
                    //Tamaño
                    const eltamañodellink = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > strong");
                    const tamañoenlace1 = await page.evaluate(el => el.textContent, eltamañodellink);
                    //Formato
                    const elFormatodellink = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(1) > td:nth-child(3)");
                    let Formatoenlace1 = await page.evaluate(el => el.textContent, elFormatodellink);
                    if (Formatoenlace1 == "SUB") {Formatoenlace1 = "Subtitulado"} else if (Formatoenlace1 == "LAT") {Formatoenlace1 = "Latino"} else { /* nada */};
                    //Link
                    const linkenlace1 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                    
                    //PARA DOS LINKS _______________________________________________________________________________________________________________________________________________________________________
                    if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(2)"), el => el.textContent)[0]) !== undefined) {
                        //Nombre
                        const elnombredellink2 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(2) > td:nth-child(1)");
                        const nombreenlace2 = await page.evaluate(el => el.textContent, elnombredellink2);
                        //Tamaño
                        const eltamañodellink2 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > strong");
                        const tamañoenlace2 = await page.evaluate(el => el.textContent, eltamañodellink2);
                        //Formato
                        const elFormatodellink2 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(2) > td:nth-child(3)");
                        let Formatoenlace2 = await page.evaluate(el => el.textContent, elFormatodellink2);
                        if (Formatoenlace2 == "SUB") {Formatoenlace2 = "Subtitulado"} else if (Formatoenlace2 == "LAT") {Formatoenlace2 = "Latino"} else { /* nada */};
                        //Link
                        const linkenlace2 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                        
                        //PARA TRES LINKS _______________________________________________________________________________________________________________________________________________________________________
                        if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(3)"), el => el.textContent)[0]) !== undefined) {
                            //Nombre
                            const elnombredellink3 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(3) > td:nth-child(1)");
                            const nombreenlace3 = await page.evaluate(el => el.textContent, elnombredellink3);
                            //Tamaño
                            const eltamañodellink3 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > strong");
                            const tamañoenlace3 = await page.evaluate(el => el.textContent, eltamañodellink3);
                            //Formato
                            const elFormatodellink3 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(3) > td:nth-child(3)");
                            let Formatoenlace3 = await page.evaluate(el => el.textContent, elFormatodellink3);
                            if (Formatoenlace3 == "SUB") {Formatoenlace3 = "Subtitulado"} else if (Formatoenlace3 == "LAT") {Formatoenlace3 = "Latino"} else { /* nada */};
                            //Link
                            const linkenlace3 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(3) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                            
                            //PARA CUATRO LINKS _______________________________________________________________________________________________________________________________________________________________________
                            if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(4)"), el => el.textContent)[0]) !== undefined) {
                                //Nombre
                                const elnombredellink4 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(4) > td:nth-child(1)");
                                const nombreenlace4 = await page.evaluate(el => el.textContent, elnombredellink4);
                                //Tamaño
                                const eltamañodellink4 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > strong");
                                const tamañoenlace4 = await page.evaluate(el => el.textContent, eltamañodellink4);
                                //Formato
                                const elFormatodellink4 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(4) > td:nth-child(3)");
                                let Formatoenlace4 = await page.evaluate(el => el.textContent, elFormatodellink4);
                                if (Formatoenlace4 == "SUB") {Formatoenlace4 = "Subtitulado"} else if (Formatoenlace4 == "LAT") {Formatoenlace4 = "Latino"} else { /* nada */};
                                //Link
                                const linkenlace4 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(4) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                
                                //PARA CINCO LINKS _______________________________________________________________________________________________________________________________________________________________________
                                if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(5)"), el => el.textContent)[0]) !== undefined) {
                                    //Nombre
                                    const elnombredellink5 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(5) > td:nth-child(1)");
                                    const nombreenlace5 = await page.evaluate(el => el.textContent, elnombredellink5);
                                    //Tamaño
                                    const eltamañodellink5 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(5) > td:nth-child(2) > strong");
                                    const tamañoenlace5 = await page.evaluate(el => el.textContent, eltamañodellink5);
                                    //Formato
                                    const elFormatodellink5 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(5) > td:nth-child(3)");
                                    let Formatoenlace5 = await page.evaluate(el => el.textContent, elFormatodellink5);
                                    if (Formatoenlace5 == "SUB") {Formatoenlace5 = "Subtitulado"} else if (Formatoenlace5 == "LAT") {Formatoenlace5 = "Latino"} else { /* nada */};
                                    //Link
                                    const linkenlace5 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(5) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                    
                                    //PARA SEIS LINKS _______________________________________________________________________________________________________________________________________________________________________
                                    if(await page.evaluate(() => Array.from(document.querySelectorAll("#DwsldCn > div > table > tbody > tr:nth-child(6)"), el => el.textContent)[0]) !== undefined) {
                                        //Nombre
                                        const elnombredellink6 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(6) > td:nth-child(1)");
                                        const nombreenlace6 = await page.evaluate(el => el.textContent, elnombredellink6);
                                        //Tamaño
                                        const eltamañodellink6 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(6) > td:nth-child(2) > strong");
                                        const tamañoenlace6 = await page.evaluate(el => el.textContent, eltamañodellink6);
                                        //Formato
                                        const elFormatodellink6 = await page.$("#DwsldCn > div > table > tbody > tr:nth-child(6) > td:nth-child(3)");
                                        let Formatoenlace6 = await page.evaluate(el => el.textContent, elFormatodellink6);
                                        if (Formatoenlace6 == "SUB") {Formatoenlace6 = "Subtitulado"} else if (Formatoenlace6 == "LAT") {Formatoenlace6 = "Latino"} else { /* nada */};
                                        //Link
                                        const linkenlace6 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                        
                                        msg.edit({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setColor("DARK_RED")
                                                    .setTitle("Enlaces de descarga")
                                                    .setURL(enlaceoriginal)
                                                    .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                                    .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                                    .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                                    .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                                    .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                                    .addField("5. "+nombreenlace5, tamañoenlace5 + " en **" + Formatoenlace5 +`** [Click para descargar](${linkenlace5})`, false)
                                                    .addField("6. "+nombreenlace6, tamañoenlace6 + " en **" + Formatoenlace6 +`** [Click para descargar](${linkenlace6})`, false)
                                            ], components:[detallesraros]})
                                        
                                        await browser.close();
                    
                                        } else {
                                        msg.edit({
                                        embeds: [
                                            new MessageEmbed()
                                                .setColor("DARK_RED")
                                                .setTitle("Enlaces de descarga")
                                                .setURL(enlaceoriginal)
                                                .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                                .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                                .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                                .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                                .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                                .addField("5. "+nombreenlace5, tamañoenlace5 + " en **" + Formatoenlace5 +`** [Click para descargar](${linkenlace5})`, false)
                                        ], components:[detallesraros]})
                                    
                                        await browser.close();
                                        };
                
                                    } else {
                                    msg.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_RED")
                                            .setTitle("Enlaces de descarga")
                                            .setURL(enlaceoriginal)
                                            .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                            .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                            .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                            .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                            .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                    ], components:[detallesraros]})
                                
                                    await browser.close();
                                    };
                                
                                } else {
                                msg.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_RED")
                                        .setTitle("Enlaces de descarga")
                                        .setURL(enlaceoriginal)
                                        .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                        .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                        .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                        .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                ], components:[detallesraros]})
                            
                                await browser.close();
                                };
        
                            } else {
                            msg.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("DARK_RED")
                                    .setTitle("Enlaces de descarga")
                                    .setURL(enlaceoriginal)
                                    .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                    .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                    .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                            ], components:[detallesraros]})
                        
                            await browser.close();
                            };
    
                        } else {
                        msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTitle("Enlaces de descarga")
                                .setURL(enlaceoriginal)
                                .setDescription("**"+ eltitulo + "** | EPISODIO " + value)
                                .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                        ], components:[detallesraros]})
                    
                        await browser.close();
                        };

                    } else {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setDescription("No hay enlaces de descarga episodio **" +  value + "** ...")
                        ], components:[detallesraros]})
                    
                    await browser.close();
                    };
                    }} else {
                    collector.stop();
                    mensaje.delete()
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setDescription("Proceso Finalizado. Se requería de un número natural mayor a 0.")
                        ], components:[]})
                    
                    await browser.close();
                    }
                    });
                  
                collector.on('end', (collected, reason) => {
                    if (collected.size < 1) {
                    // reason is the one you passed above with the stop() method
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setDescription("Te falto escribir el numero capo ...")
                        ], components:[]})
                    }
                  });
                })
            }
};
module.exports.conf = {
    "name": "descargar",
    "description": [ "Obtén enlaces de descarga de cualquier anime." ],
    "aliases": ["download", "descarga", "desc", "down"],
    "usage": [ "descargar" ]
}
