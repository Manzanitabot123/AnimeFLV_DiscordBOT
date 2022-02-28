const { Client, Interaction, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");
const zsExtract = require('zs-extract');
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run = (client, interaction, options) => {
    const página = options.capitulo.value
    const args = options.anime.value;
    //remplazar el mensaje por una url
    const anime = args.replace(/ /g,"+");
    const member = interaction.member;
    //comprobar el canal adecuado
    if(!args){
                interaction.reply({
                    content: "Te falta escribir el usuario que quieres buscar", 
                    ephemeral: true
                })
                return;
        } else if(args.length < 3){
                interaction.reply({
                    content: "Ese nombre es muy corto", 
                    ephemeral: true
                })
                return;
        } else if(args.length > 40){
                interaction.reply({
                    content: "Es un nombre muy largo", 
                    ephemeral: true
                })
                return;
        } else if(args.includes(`\n`)){
                interaction.reply({
                    content: "Tu busqueda contiene más de un reglón", 
                    ephemeral: true
                })
                return;
        } else {
                searchdownslash()
        }
        
        async function searchdownslash(){
                //mensaje de espera (cargando...)
                await interaction.deferReply();
                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando **" +  args + "** ...")
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
                    
                } else if (await page.$(resultadouno) !== null) {
                    //Para la miniatura
                    const imgs1 = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(1) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                    const miniatura1 = imgs1[0]
                    
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
                        //Para la miniatura
                        const imgs2 = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                        const miniatura2 = imgs2[0]

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
                            //Para la miniatura
                            const imgs3 = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                            const miniatura3 = imgs3[0]

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
                                //Para la miniatura
                                const imgs4 = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                                const miniatura4 = imgs4[0]

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
                                    //Para la miniatura
                                    const imgs5 = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a > div > figure > img", imgs => imgs.map(img => img.getAttribute('src')));
                                    const miniatura5 = imgs5[0]

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
                                        .setAuthor({name: "Tu busqueda fue: 🔎 " + args, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                        .setTitle("Por favor elige el anime que deseas descargar")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```' + '```' + '[５] ('+ valor5 +") - "+ output5 + " │ ⭐" + calificacion5 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.replace(/ /g,"+"))
                                        .setThumbnail(miniatura1)
                                        .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                        
                                        interaction.editReply({embeds: [resultado5], components:[row5]}).then(message => {
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
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura1)
                                                    } else if (b.customId === "two5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output2;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura2)
                                                        
                                                    } else if (b.customId === "three5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output3;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura3)

                                                    } else if (b.customId === "four5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output4;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura4)
                                                      
                                                    } else if (b.customId === "five5") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(5) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output5;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura5)
                                                      
                                                    }
                                                });
                                                //Collector Off
                        
                                                collector5.on('end', async(collected, reason) => {
                                                    if (collected.size < 1) {
                                                    console.log("Timeout 5");
                                                    await browser.close();
                                                    interaction.editReply({
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
                                        .setAuthor({name: "Tu busqueda fue: 🔎 " + args, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                        .setTitle("Por favor elige el anime que deseas descargar")
                                        .setColor("DARK_GREEN")
                                        .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```' + '```' + '[４] ('+ valor4 +") - "+ output4 + " │ ⭐" + calificacion4 + '```')
                                        .setURL("https://www3.animeflv.net/browse?q=" + args.replace(/ /g,"+"))
                                        .setThumbnail(miniatura1)
                                        .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                        interaction.editReply({embeds: [resultado4], components:[row4]}).then(message => {
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
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura1)

                                                    } else if (b.customId === "two4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output2;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura2)
                                                        
                                                    } else if (b.customId === "three4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output3;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura3)

                                                    } else if (b.customId === "four4") {
                                                        const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(4) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                        const eltitulo = output4;
                                                        collectormsg(page, browser, urlone, eltitulo, miniatura4)

                                                    }
                                                });
                                                //Collector Off
                        
                                                collector4.on('end', async(collected, reason) => {
                                                    if (collected.size < 1) {
                                                    console.log("Timeout 4");
                                                    await browser.close();
                                                    interaction.editReply({
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
                                    .setAuthor({name: "Tu busqueda fue: 🔎 " + args, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                    .setTitle("Por favor elige el anime que deseas descargar")
                                    .setColor("DARK_GREEN")
                                    .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' + '[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```' + '```' + '[３] ('+ valor3 +") - "+ output3 + " │ ⭐" + calificacion3 + '```')
                                    .setURL("https://www3.animeflv.net/browse?q=" + args.replace(/ /g,"+"))
                                    .setThumbnail(miniatura1)
                                    .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                    interaction.editReply({embeds: [resultado3], components:[row3]}).then(message => {
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
                                                    collectormsg(page, browser, urlone, eltitulo, miniatura1)

                                                } else if (b.customId === "two3") {
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const eltitulo = output2;
                                                    collectormsg(page, browser, urlone, eltitulo, miniatura2)
                                                    
                                                } else if (b.customId === "three3") {
                                                    const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(3) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                    const eltitulo = output3;
                                                    collectormsg(page, browser, urlone, eltitulo, miniatura3)
                        
                                                }
                                            });
                                            //Collector Off
                    
                                            collector3.on('end', async(collected, reason) => {
                                                if (collected.size < 1) {
                                                console.log("Timeout 4");
                                                await browser.close();
                                                interaction.editReply({
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
                                .setAuthor({name: "Tu busqueda fue: 🔎 " + args, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                .setTitle("Por favor elige el anime que deseas descargar")
                                .setColor("DARK_GREEN")
                                .setDescription('```'+'[１] ('+ valor1 +") - "+ output1 + " │ ⭐" + calificacion1 + '```' + '```' +'[２] ('+ valor2 +") - "+ output2 + " │ ⭐" + calificacion2 + '```')
                                .setURL("https://www3.animeflv.net/browse?q=" + args.replace(/ /g,"+"))
                                .setThumbnail(miniatura1)
                                .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                                interaction.editReply({embeds: [resultado2], components:[row2]}).then(message => {
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
                                                collectormsg(page, browser, urlone, eltitulo, miniatura1)

                                            } else if (b.customId === "two2") {
                                                const urlone = await page.$$eval("body > div.Wrapper > div > div > main > ul > li:nth-child(2) > article > a", urlone => urlone.map(href => href.getAttribute('href')));
                                                const eltitulo = output2;
                                                collectormsg(page, browser, urlone, eltitulo, miniatura2)
                                                
                                            }
                                        });
                                        //Collector Off
                
                                        collector2.on('end', async(collected, reason) => {
                                            if (collected.size < 1) {
                                            console.log("Timeout 4");
                                            await browser.close();
                                            interaction.editReply({
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
                            .setAuthor({name: "Tu busqueda fue: 🔎 " + args, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                            .setTitle("Por favor elige el anime que deseas descargar")
                            .setDescription('```'+'[１] ('+ valor1 +") │ "+ output1 + " │ ⭐" + calificacion1 +'```')
                            .setColor("DARK_GREEN")
                            .setURL("https://www3.animeflv.net/browse?q=" + args.replace(/ /g,"+"))
                            .setThumbnail(miniatura1)
                            .setFooter({text: `Se cancelará la busqueda automáticamente en 18 segundos`});
                            interaction.editReply({embeds: [resultado1], components:[row1]}).then(message => {
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
                                            collectormsg(page, browser, urlone, eltitulo, miniatura1)

                                        }
                                    });
                                    //Collector Off
            
                                    collector1.on('end', async(collected, reason) => {
                                        if (collected.size < 1) {
                                        console.log("Timeout 4");
                                        await browser.close();
                                        interaction.editReply({
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
                } else {interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                            .setColor("DARK_RED")
                            .setTimestamp()
                            .setDescription("No se encontraron coincidencias para **" + args + "** D:")
                    ]});
                    return await browser.close()
                };


                }

                
                catch(error)
                {
                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error al buscar **" + args+"**")
                        ]});
                }
            }
            //Pone el numero de la página ___________________________________________________________________________________________________________________________________________________________________________________
            async function collectormsg(page, browser, urlone, eltitulo, miniatura) {
                interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setThumbnail(miniatura)
                                .setDescription("Recopilando información del episodio **" +  página + "** ..." + "\n **¿Cómo descargo un archivo de Mega o Stapé?**")
                                .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                        ], components:[]})
                    const result = await page.goto("https://www3.animeflv.net/ver/" + urlone[0].replace('/anime/','') + "-"+ página);
                    if (result.status() === 404) {
                    console.log('Episodio desconocido');
                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                                .setColor("DARK_RED")
                                .setDescription("No existe un episodio **" + página + "** o aún no esta disponible")
                        ]});
                    return await browser.close()
                  } else {
                    const enlaceoriginal = "https://www3.animeflv.net/ver/" + urlone[0].replace('/anime/','') + "-"+ página;
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
                    var linkenlace1 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                    try {
                        if (linkenlace1.includes("zippyshare.com/")){
                            const info1 = await zsExtract.extract(linkenlace1);
                            if (info1 !== undefined) {
                                linkenlace1 = info1.download
                            } else {
                                /*nada*/
                            }
                    
                            } else if (linkenlace1.includes("streamtape.com/")){
                            await page.goto(linkenlace1)
                            const linkdestape1 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                            if (linkdestape1[0] !== undefined) {
                                linkenlace1 = 'https:'+linkdestape1[0]
                            } else {
                                /*nada*/
                            }
                            await page.goBack()
                    
                            } else if (linkenlace1.includes("mediafire.com/")){
                                await page.goto(linkenlace1)
                                const linkdemediafire1 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                if (linkdemediafire1[0] !== undefined) {
                                    linkenlace1 = linkdemediafire1[0]
                                } else {
                                    /*nada*/
                                }
                                await page.goBack()
                    
                            } else {
                                /*nada*/
                            }
                        }
                        catch(error)
                        {
                            /*nada*/
                        }
                    
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
                        var linkenlace2 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                        try {
                            if (linkenlace2.includes("zippyshare.com/")){
                                const info2 = await zsExtract.extract(linkenlace2);
                                if (info2 !== undefined) {
                                    linkenlace2 = info2.download
                                } else {
                                    /*nada*/
                                }
                        
                                } else if (linkenlace2.includes("streamtape.com/")){
                                await page.goto(linkenlace2)
                                const linkdestape2 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                                if (linkdestape2[0] !== undefined) {
                                    linkenlace2 = 'https:'+linkdestape2[0]
                                } else {
                                    /*nada*/
                                }
                                await page.goBack()
                        
                                } else if (linkenlace2.includes("mediafire.com/")){
                                    await page.goto(linkenlace2)
                                    const linkdemediafire2 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                    if (linkdemediafire2[0] !== undefined) {
                                        linkenlace2 = linkdemediafire2[0]
                                    } else {
                                        /*nada*/
                                    }
                                    await page.goBack()
                        
                                } else {
                                    /*nada*/
                                }
                            }
                            catch(error)
                            {
                                /*nada*/
                            }

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
                            var linkenlace3 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(3) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                            try {
                                if (linkenlace3.includes("zippyshare.com/")){
                                    const info3 = await zsExtract.extract(linkenlace3);
                                    if (info3 !== undefined) {
                                        linkenlace3 = info3.download
                                    } else {
                                        /*nada*/
                                    }
                            
                                    } else if (linkenlace3.includes("streamtape.com/")){
                                    await page.goto(linkenlace3)
                                    const linkdestape3 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                                    if (linkdestape3[0] !== undefined) {
                                        linkenlace3 = 'https:'+linkdestape3[0]
                                    } else {
                                        /*nada*/
                                    }
                                    await page.goBack()
                            
                                    } else if (linkenlace3.includes("mediafire.com/")){
                                        await page.goto(linkenlace3)
                                        const linkdemediafire3 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                        if (linkdemediafire3[0] !== undefined) {
                                            linkenlace3 = linkdemediafire3[0]
                                        } else {
                                            /*nada*/
                                        }
                                        await page.goBack()
                            
                                    } else {
                                        /*nada*/
                                    }
                                }
                                catch(error)
                                {
                                    /*nada*/
                                }

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
                                var linkenlace4 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(4) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                try {
                                    if (linkenlace4.includes("zippyshare.com/")){
                                        const info4 = await zsExtract.extract(linkenlace4);
                                        if (info4 !== undefined) {
                                            linkenlace4 = info4.download
                                        } else {
                                            /*nada*/
                                        }
                                
                                        } else if (linkenlace4.includes("streamtape.com/")){
                                        await page.goto(linkenlace4)
                                        const linkdestape4 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                                        if (linkdestape4[0] !== undefined) {
                                            linkenlace4 = 'https:'+linkdestape4[0]
                                        } else {
                                            /*nada*/
                                        }
                                        await page.goBack()
                                
                                        } else if (linkenlace4.includes("mediafire.com/")){
                                            await page.goto(linkenlace4)
                                            const linkdemediafire4 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                            if (linkdemediafire4[0] !== undefined) {
                                                linkenlace4 = linkdemediafire4[0]
                                            } else {
                                                /*nada*/
                                            }
                                            await page.goBack()
                                
                                        } else {
                                            /*nada*/
                                        }
                                    }
                                    catch(error)
                                    {
                                        /*nada*/
                                    }

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
                                    var linkenlace5 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(5) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                    try {
                                        if (linkenlace5.includes("zippyshare.com/")){
                                            const info5 = await zsExtract.extract(linkenlace5);
                                            if (info5 !== undefined) {
                                                linkenlace5 = info5.download
                                            } else {
                                                /*nada*/
                                            }
                                    
                                            } else if (linkenlace5.includes("streamtape.com/")){
                                            await page.goto(linkenlace5)
                                            const linkdestape5 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                                            if (linkdestape5[0] !== undefined) {
                                                linkenlace5 = 'https:'+linkdestape5[0]
                                            } else {
                                                /*nada*/
                                            }
                                            await page.goBack()
                                    
                                            } else if (linkenlace5.includes("mediafire.com/")){
                                                await page.goto(linkenlace5)
                                                const linkdemediafire5 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                                if (linkdemediafire5[0] !== undefined) {
                                                    linkenlace5 = linkdemediafire5[0]
                                                } else {
                                                    /*nada*/
                                                }
                                                await page.goBack()
                                    
                                            } else {
                                                /*nada*/
                                            }
                                        }
                                        catch(error)
                                        {
                                            /*nada*/
                                        }
                                    
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
                                        var linkenlace6 = await page.evaluate(() => Array.from(document.querySelectorAll('#DwsldCn > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > a[href]'), a => a.getAttribute('href'))[0])
                                        try {
                                            if (linkenlace6.includes("zippyshare.com/")){
                                                const info6 = await zsExtract.extract(linkenlace6);
                                                if (info6 !== undefined) {
                                                    linkenlace6 = info6.download
                                                } else {
                                                    /*nada*/
                                                }
                                    
                                                } else if (linkenlace6.includes("streamtape.com/")){
                                                await page.goto(linkenlace6)
                                                const linkdestape6 = await page.$$eval("#mainvideo", links => links.map(link => link.getAttribute('src')));
                                                if (linkdestape6[0] !== undefined) {
                                                    linkenlace6 = 'https:'+linkdestape6[0]
                                                } else {
                                                    /*nada*/
                                                }
                                                await page.goBack()
                                    
                                                } else if (linkenlace6.includes("mediafire.com/")){
                                                    await page.goto(linkenlace6)
                                                    const linkdemediafire6 = await page.$$eval("#downloadButton", links => links.map(link => link.getAttribute('href')));
                                                    if (linkdemediafire6[0] !== undefined) {
                                                        linkenlace6 = linkdemediafire6[0]
                                                    } else {
                                                        /*nada*/
                                                    }
                                                    await page.goBack()
                                        
                                                } else {
                                                    /*nada*/
                                                }
                                            }
                                            catch(error)
                                            {
                                                /*nada*/
                                            }

                                        interaction.editReply({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setColor("DARK_GREEN")
                                                    .setTitle("Enlaces de descarga")
                                                    .setURL(enlaceoriginal)
                                                    .setThumbnail(miniatura)
                                                    .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                                    .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                                    .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                                    .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                                    .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                                    .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                                    .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                                    .addField("5. "+nombreenlace5, tamañoenlace5 + " en **" + Formatoenlace5 +`** [Click para descargar](${linkenlace5})`, false)
                                                    .addField("6. "+nombreenlace6, tamañoenlace6 + " en **" + Formatoenlace6 +`** [Click para descargar](${linkenlace6})`, false)
                                            ], components:[detallesraros]})
                                        
                                        await browser.close();
                    
                                        } else {
                                        interaction.editReply({
                                        embeds: [
                                            new MessageEmbed()
                                                .setColor("DARK_GREEN")
                                                .setTitle("Enlaces de descarga")
                                                .setThumbnail(miniatura)
                                                .setURL(enlaceoriginal)
                                                .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                                .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                                .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                                .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                                .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                                .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                                .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                                .addField("5. "+nombreenlace5, tamañoenlace5 + " en **" + Formatoenlace5 +`** [Click para descargar](${linkenlace5})`, false)
                                        ], components:[detallesraros]})
                                    
                                        await browser.close();
                                        };
                
                                    } else {
                                    interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_GREEN")
                                            .setTitle("Enlaces de descarga")
                                            .setThumbnail(miniatura)
                                            .setURL(enlaceoriginal)
                                            .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                            .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                            .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                            .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                            .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                            .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                            .addField("4. "+nombreenlace4, tamañoenlace4 + " en **" + Formatoenlace4 +`** [Click para descargar](${linkenlace4})`, false)
                                    ], components:[detallesraros]})
                                
                                    await browser.close();
                                    };
                                
                                } else {
                                interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_GREEN")
                                        .setTitle("Enlaces de descarga")
                                        .setURL(enlaceoriginal)
                                        .setThumbnail(miniatura)
                                        .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                        .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                        .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                        .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                        .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                                        .addField("3. "+nombreenlace3, tamañoenlace3 + " en **" + Formatoenlace3 +`** [Click para descargar](${linkenlace3})`, false)
                                ], components:[detallesraros]})
                            
                                await browser.close();
                                };
        
                            } else {
                            interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("DARK_GREEN")
                                    .setTitle("Enlaces de descarga")
                                    .setURL(enlaceoriginal)
                                    .setThumbnail(miniatura)
                                    .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                    .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                    .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                    .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                    .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                            ], components:[detallesraros]})
                        
                            await browser.close();
                            };
    
                        } else {
                        interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_GREEN")
                                .setTitle("Enlaces de descarga")
                                .setURL(enlaceoriginal)
                                .setThumbnail(miniatura)
                                .setDescription("**"+ eltitulo + "** | EPISODIO " + página)
                                .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                        ], components:[detallesraros]})
                    
                        await browser.close();
                        };

                    } else {
                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setThumbnail(miniatura)
                                .setDescription("No hay enlaces de descarga episodio **" +  página + "** ...")
                        ], components:[detallesraros]})
                    
                    await browser.close();
                    };
                    }
            }
}
module.exports.conf = {
    "name": "descargar",
    "description": "Obtén enlaces de descarga de cualquier anime.",
    "options":[
        {
            "name": "anime",
            "description": "El nombre del anime que deseas descargar",
            "type": 3,
            "required": true
        },
        {
            "name": "capitulo",
            "description": "El número del episodio que deseas descargar",
            "type": 10,
            "required": true
        }
    ],
    "category": "info"
}