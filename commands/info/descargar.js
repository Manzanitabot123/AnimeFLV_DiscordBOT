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
                    headless: false,
                    args: ['--no-sandbox', "--disable-setuid-sandbox"],
                });
                const page = await browser.newPage();
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
                                        .setAuthor("Tu busqueda fue: 🔎 " + args.join(' '), message.author.displayAvatarURL())
                                        .setTitle("Por favor elige el anime que deseas descargar")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```' + '```' + '[５] ('+ valor5 +") - "+ output5 + " │ ⭐" + calificacion5 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                        .setThumbnail(miniatura)
                                        .setFooter(`Se cancelará la busqueda automáticamente en 18 segundos`);
                                        
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
                                        .setAuthor("Tu busqueda fue: 🔎 " + args.join(' '), message.author.displayAvatarURL())
                                        .setTitle("Por favor elige el anime que deseas descargar")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                        .setThumbnail(miniatura)
                                        .setFooter(`Se cancelará la busqueda automáticamente en 18 segundos`);
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
                                    .setAuthor("Tu busqueda fue: 🔎 " + args.join(' '), message.author.displayAvatarURL())
                                    .setTitle("Por favor elige el anime que deseas descargar")
                                    .setColor("DARK_GREEN")
                                    .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```')
                                    .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                    .setThumbnail(miniatura)
                                    .setFooter(`Se cancelará la busqueda automáticamente en 18 segundos`);
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
                                .setAuthor("Tu busqueda fue: 🔎 " + args.join(' '), message.author.displayAvatarURL())
                                .setTitle("Por favor elige el anime que deseas descargar")
                                .setColor("DARK_GREEN")
                                .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' +'[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```')
                                .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                                .setThumbnail(miniatura)
                                .setFooter(`Se cancelará la busqueda automáticamente en 18 segundos`);
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
                            .setAuthor("Tu busqueda fue: 🔎 " + args.join(' '), message.author.displayAvatarURL())
                            .setTitle("Por favor elige el anime que deseas descargar")
                            .setDescription('```'+'[１] ('+ valor1 +") │ "+ output1 + " │ ⭐" + calificacion1 +'```')
                            .setColor("DARK_GREEN")
                            .setURL("https://www3.animeflv.net/browse?q=" + args.join(' ').replace(/ /g,"+"))
                            .setThumbnail(miniatura)
                            .setFooter(`Se cancelará la busqueda automáticamente en 18 segundos`);
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
                            .setAuthor(message.author.username, message.author.displayAvatarURL())
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
                                .setAuthor(message.author.username, message.author.displayAvatarURL())
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
                                .setDescription("Tenias un solo trabajo y era poner un puto numero y ni eso puedes hacer D:< ...")
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

            //Para la 1era alternativa ___________________________________________________________________________________________________________________________________________________________________________________
            async function respuesta5_1(browser, page, message, urlone, eltitulo, eltipo)
            {   
                try{
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
                if(littlestars5_1 >= 0.0 && littlestars5_1 <= 0.5) {littlestarssymbols5_1 = "<:media_estrella:940318620028907560>"} else if(littlestars5_1 >= 0.6 && littlestars5_1 <= 1.0) {littlestarssymbols5_1 = "<:estrella:940318620171505665>"} else if(littlestars5_1 >= 1.1 && littlestars5_1 <= 1.5) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:media_estrella:940318620028907560>"} else if(littlestars5_1 >= 1.6 && littlestars5_1 <= 2.0) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665>"} else if(littlestars5_1 >= 2.1 && littlestars5_1 <= 2.5) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:media_estrella:940318620028907560>"} else if(littlestars5_1 >= 2.6 && littlestars5_1 <= 3.0) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665>"} else if(littlestars5_1 >= 3.1 && littlestars5_1 <= 3.5) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:media_estrella:940318620028907560>"} else if(littlestars5_1 >= 3.6 && littlestars5_1 <= 4.0) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665>"} else if(littlestars5_1 >= 4.1 && littlestars5_1 <= 4.7) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:media_estrella:940318620028907560>"} else if(littlestars5_1 >= 4.8 && littlestars5_1 <= 5.0) {littlestarssymbols5_1 = "<:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665> <:estrella:940318620171505665>"} else {littlestarssymbols5_1 = "<:media_estrella:940318620028907560>"};
                //imagen referencial
                await page.waitForSelector(imagen_referencial);
                const imagen_referencial5_1 = await page.evaluate(el => window.getComputedStyle(el).backgroundImage, await page.$(imagen_referencial));
                const backgroundImage5_1 = imagen_referencial5_1.match(/url\("(.*)"/)[1];
                
                var backgroundImg5_1;
                if(await getColors(backgroundImage5_1).then(colors => colors[1]._rgb[0]) !== 40) {
                    backgroundImg5_1 = backgroundImage5_1;
                } else {backgroundImg5_1 = "https://www3.animeflv.net/assets/animeflv/img/logo.png"};

                //votos
                await page.waitForSelector(votos);
                const votos5_1 = await page.$(votos);
                let votes5_1 = await page.evaluate(el => el.textContent, votos5_1);

                //ENVIANDO MENSAJE
                const resultado5_1 = new MessageEmbed()
                .setAuthor('AnimeFLV', 'https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3', 'https://www3.animeflv.net/')
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
                .setFooter(`Votos: 🗳️ ${votes5_1}`);
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
            }
            }
};
module.exports.conf = {
    "name": "descargar",
    "description": [{
        "lang": "es",
        "description": "Muestra el ping del bot."
    }, {
        "lang": "en",
        "description": "Display bot's ping."
    }],
    "aliases": ["download", "descarga", "desc", "down"],
    "usage": [{
        "lang": "es",
        "usage": "descargar"
    }, {
        "lang": "en",
        "usage": "download"
    }]
}
