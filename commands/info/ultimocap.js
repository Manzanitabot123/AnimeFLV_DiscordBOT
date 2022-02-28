const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const { captureRejections } = require("events");
const zsExtract = require('zs-extract');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
            const member = message.member;
            ultimocap();

            async function ultimocap(){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Recapitulando ultimos 5 episodios...")
                    ], components:[]});
                try{
                const url = `https://www3.animeflv.net`;

                const resultadouno = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(1) > a > strong";
                const episodionumero1 = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(1) > a > span.Capi"

                const resultadodos = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(2) > a > strong";
                const episodionumero2 = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(2) > a > span.Capi"

                const resultadotres = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(3) > a > strong";
                const episodionumero3 = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(3) > a > span.Capi"

                const resultadocuatro = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(4) > a > strong";
                const episodionumero4 = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(4) > a > span.Capi"

                const resultadocinco = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(5) > a > strong";
                const episodionumero5 = "body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(5) > a > span.Capi"
                
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
                    //Para la miniatura
                    const imgs1 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(1) > a > span.Image > img", imgs => imgs.map(img => img.getAttribute('src')));
                    const miniatura1 = "https://www3.animeflv.net" + imgs1[0];
                    await page.waitForSelector(resultadouno)
                    let element1 = await page.$(resultadouno)
                    let value1 = await page.evaluate(el => el.textContent, element1)
                    let output1 = value1;
                    await page.waitForSelector(episodionumero1)
                    let numepisodio1 = await page.$(episodionumero1)
                    let valordeepisodio1 = await page.evaluate(el => el.textContent, numepisodio1)
                    let epi1 = valordeepisodio1;

                    const url1 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(1) > a", urlone => urlone.map(href => href.getAttribute('href')));
                    
                    //Para 2 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                        const imgs2 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(2) > a > span.Image > img", imgs => imgs.map(img => img.getAttribute('src')));
                        const miniatura2 = "https://www3.animeflv.net" + imgs2[0];
                        await page.waitForSelector(resultadodos)
                        let element2 = await page.$(resultadodos)
                        let value2 = await page.evaluate(el => el.textContent, element2)
                        let output2 = value2;
                        await page.waitForSelector(episodionumero2)
                        let numepisodio2 = await page.$(episodionumero2)
                        let valordeepisodio2 = await page.evaluate(el => el.textContent, numepisodio2)
                        let epi2 = valordeepisodio2;

                        const url2 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(2) > a", urlone => urlone.map(href => href.getAttribute('href')));
                        
                        //Para 3 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                            const imgs3 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(3) > a > span.Image > img", imgs => imgs.map(img => img.getAttribute('src')));
                            const miniatura3 = "https://www3.animeflv.net" + imgs3[0];
                            await page.waitForSelector(resultadotres)
                            let element3 = await page.$(resultadotres)
                            let value3 = await page.evaluate(el => el.textContent, element3)
                            let output3 = value3;
                            await page.waitForSelector(episodionumero3)
                            let numepisodio3 = await page.$(episodionumero3)
                            let valordeepisodio3 = await page.evaluate(el => el.textContent, numepisodio3)
                            let epi3 = valordeepisodio3;

                            const url3 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(3) > a", urlone => urlone.map(href => href.getAttribute('href')));
                            
                            //Para 4 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                const imgs4 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(4) > a > span.Image > img", imgs => imgs.map(img => img.getAttribute('src')));
                                const miniatura4 = "https://www3.animeflv.net" + imgs4[0];
                                await page.waitForSelector(resultadocuatro)
                                let element4 = await page.$(resultadocuatro)
                                let value4 = await page.evaluate(el => el.textContent, element4)
                                let output4 = value4;
                                await page.waitForSelector(episodionumero4)
                                let numepisodio4 = await page.$(episodionumero4)
                                let valordeepisodio4 = await page.evaluate(el => el.textContent, numepisodio4)
                                let epi4 = valordeepisodio4;

                                const url4 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(4) > a", urlone => urlone.map(href => href.getAttribute('href')));

                                //Para 5 resultados ___________________________________________________________________________________________________________________________________________________________________________________
                                    const imgs5 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(5) > a > span.Image > img", imgs => imgs.map(img => img.getAttribute('src')));
                                    const miniatura5 = "https://www3.animeflv.net" + imgs5[0];
                                    await page.waitForSelector(resultadocinco)
                                    let element5 = await page.$(resultadocinco)
                                    let value5 = await page.evaluate(el => el.textContent, element5)
                                    let output5 = value5;
                                    await page.waitForSelector(episodionumero5)
                                    let numepisodio5 = await page.$(episodionumero5)
                                    let valordeepisodio5 = await page.evaluate(el => el.textContent, numepisodio5)
                                    let epi5 = valordeepisodio5;
                                    
                                    const url5 = await page.$$eval("body > div.Wrapper > div > div > div > main > ul.ListEpisodios.AX.Rows.A06.C04.D03 > li:nth-child(5) > a", urlone => urlone.map(href => href.getAttribute('href')));
                                    
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
                                        .setAuthor({name: "Los ultimos capitulos de hoy son los siguientes: ", iconURL: message.author.displayAvatarURL()})
                                        .setTitle("Por favor elige el anime que deseas descargar o ver")
                                        .setColor("DARK_GREEN")
                                        .setDescription('[１] ('+ epi1 +") - "+ `[**${output1}**](https://www3.animeflv.net${url1})` + `\n\n` + '[２] ('+ epi2 +") - "+ `[**${output2}**](https://www3.animeflv.net${url2})` + `\n\n` + '[３] ('+ epi3 +") - "+ `[**${output3}**](https://www3.animeflv.net${url3})` + `\n\n` + '[４] ('+ epi4 +") - "+ `[**${output4}**](https://www3.animeflv.net${url4})` + `\n\n` + '[５] ('+ epi5 +") - "+ `[**${output5}**](https://www3.animeflv.net${url5})`)
                                        .setThumbnail(miniatura1)
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
                                                        const urlone = "https://www3.animeflv.net" + url1;
                                                        const eltitulo = output1;
                                                        collectormsg(msg, page, browser, urlone, eltitulo, miniatura1, epi1)
                                                    } else if (b.customId === "two5") {
                                                        const urlone = "https://www3.animeflv.net" + url2;
                                                        const eltitulo = output2;
                                                        collectormsg(msg, page, browser, urlone, eltitulo, miniatura2, epi2)
                                                        
                                                    } else if (b.customId === "three5") {
                                                        const urlone = "https://www3.animeflv.net" + url3;
                                                        const eltitulo = output3;
                                                        collectormsg(msg, page, browser, urlone, eltitulo, miniatura3, epi3)

                                                    } else if (b.customId === "four5") {
                                                        const urlone = "https://www3.animeflv.net" + url4;
                                                        const eltitulo = output4;
                                                        collectormsg(msg, page, browser, urlone, eltitulo, miniatura4, epi4)
                                                      
                                                    } else if (b.customId === "five5") {
                                                        const urlone = "https://www3.animeflv.net" + url5;
                                                        const eltitulo = output5;
                                                        collectormsg(msg, page, browser, urlone, eltitulo, miniatura5, epi5)
                                                      
                                                    }
                                                });
                                                //Collector Off
                        
                                                collector5.on('end', async(collected, reason) => {
                                                    if (collected.size < 1) {
                                                    await browser.close();
                                                    message.edit({
                                                        embeds: [
                                                            new MessageEmbed()
                                                            .setAuthor({name: "Los ultimos capitulos de hoy son los siguientes: ", iconURL: message.author.displayAvatarURL()})
                                                            .setColor("DARK_GREEN")
                                                            .setDescription('[１] ('+ epi1 +") - "+ `[**${output1}**](https://www3.animeflv.net${url1})` + `\n\n` + '[２] ('+ epi2 +") - "+ `[**${output2}**](https://www3.animeflv.net${url2})` + `\n\n` + '[３] ('+ epi3 +") - "+ `[**${output3}**](https://www3.animeflv.net${url3})` + `\n\n` + '[４] ('+ epi4 +") - "+ `[**${output4}**](https://www3.animeflv.net${url4})` + `\n\n` + '[５] ('+ epi5 +") - "+ `[**${output5}**](https://www3.animeflv.net${url5})`)
                                                            .setThumbnail(miniatura1)
                                                        ], components:[]})
                                                    }
                                                });
                                            })
                                    //Para 5 respuestas ___________________________________________________________________________________________________________________________________________________________________________________


                                    }
                }
                
                catch(error)
                {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error al cargar los ultimos capitulos")
                        ]});
                }
            };

            //Para recoletar el numero de página __________________________________________ _________________________________________________________________________________________________________________________________________
            async function collectormsg(msg, page, browser, urlone, eltitulo, miniatura, episodio) {
                try {
                message.channel.sendTyping();
                msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription("Recopilando información del **" + episodio+"** ..." + "\n **¿Cómo descargo un archivo de Mega o Stapé?**")
                                .setThumbnail(miniatura)
                                .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                        ], components:[]})
                const result = await page.goto(urlone);
                    if (result.status() === 404) {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                                .setColor("DARK_RED")
                                .setDescription("No existe ese episodio o aún no esta disponible")
                        ]});
                    return await browser.close()
                  } else {
                    const enlaceoriginal = urlone;
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

                                        msg.edit({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setColor("DARK_GREEN")
                                                    .setTitle("Enlaces de descarga")
                                                    .setThumbnail(miniatura)
                                                    .setURL(enlaceoriginal)
                                                    .setDescription("**"+ eltitulo + "** | " + episodio)
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
                                        msg.edit({
                                        embeds: [
                                            new MessageEmbed()
                                                .setColor("DARK_GREEN")
                                                .setTitle("Enlaces de descarga")
                                                .setThumbnail(miniatura)
                                                .setURL(enlaceoriginal)
                                                .setDescription("**"+ eltitulo + "** | " + episodio)
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
                                    msg.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_GREEN")
                                            .setTitle("Enlaces de descarga")
                                            .setThumbnail(miniatura)
                                            .setURL(enlaceoriginal)
                                            .setDescription("**"+ eltitulo + "** | " + episodio)
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
                                msg.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("DARK_GREEN")
                                        .setTitle("Enlaces de descarga")
                                        .setThumbnail(miniatura)
                                        .setURL(enlaceoriginal)
                                        .setDescription("**"+ eltitulo + "** | " + episodio)
                                        .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                                    .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
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
                                    .setColor("DARK_GREEN")
                                    .setTitle("Enlaces de descarga")
                                    .setThumbnail(miniatura)
                                    .setURL(enlaceoriginal)
                                    .setDescription("**"+ eltitulo + "** | " + episodio)
                                    .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                                    .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                    .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                                    .addField("2. "+nombreenlace2, tamañoenlace2 + " en **" + Formatoenlace2 +`** [Click para descargar](${linkenlace2})`, false)
                            ], components:[detallesraros]})
                        
                            await browser.close();
                            };
    
                        } else {
                        msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_GREEN")
                                .setTitle("Enlaces de descarga")
                                .setThumbnail(miniatura)
                                .setURL(enlaceoriginal)
                                .setDescription("**"+ eltitulo + "** | " + episodio)
                                .setImage("https://media.discordapp.net/attachments/946075296069730385/946829146535911576/como_puedo_descargar.gif?width=1049&height=471")
                                                    .setFooter({text: "Si la descarga de Zippyshare o Mediafire no comienza, prueba copiando la dirección de enlace y pegandolo en otra pestaña"})
                                .addField("1. "+nombreenlace1, tamañoenlace1 + " en **" + Formatoenlace1 +`** [Click para descargar](${linkenlace1})`, false)
                        ], components:[detallesraros]})
                    
                        await browser.close();
                        };

                    } else {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setDescription("No hay enlaces de descarga para el **" +  episodio + "** ...")
                        ], components:[detallesraros]})
                    
                    await browser.close();
                    };
                    }
                }
                catch(error)
                {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error mientras cargaba los enlaces de descarga")
                        ]});
                    console.log(error)
                }
            }
};
module.exports.conf = {
    "name": "ultimocap",
    "description": [ "Muestra los episodios mas recientes del día" ],
    "aliases": ["ultimocapitulo", "capitulonuevo", "capnuevo", "ultimoscaps"],
    "usage": [ "ultimocap" ],
    "category": "info"
}