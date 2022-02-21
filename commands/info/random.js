const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");
const random = require('random');
/** 
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
        var url;
        usuario(url)

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

        async function usuario(url){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando un anime al azar ...")
                    ], components:[]});

                const pagina = random.int((min = 1), (max = 146));

                try{
                url = `https://www3.animeflv.net/browse?page=${pagina}`;
                
                //info
                const browser = await puppeteer.launch({ headless: false});
                const page = await browser.newPage();
                await page.goto(url);

                const elejido = random.int((min = 1), (max = 24));
                //nombre
                await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > div > strong`)
                const titulodelanime = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > div > strong`)
                let grantitulo = await page.evaluate(el => el.textContent, titulodelanime);

                //tipo
                var valor5;
                await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span`)
                const tipodelanime = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span`)
                let grantipo = await page.evaluate(el => el.textContent, tipodelanime)
                if(grantipo == "Anime") {valor5 = "🌈 Anime"} else if(grantipo == "OVA") {valor5 = "📀 OVA"} else {valor5 = "🎬 Película"};
                if(grantipo == "Anime") {grantipo = "el **anime**"} else if(grantipo == "OVA") {grantipo = "el **OVA**"} else {grantipo = "la **película**"};

                //imagen
                const imagenpequeña = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > a > div > figure > img`, imgs => imgs.map(img => img.getAttribute('src')));
                const imagensita = imagenpequeña[0];

                //estrellas
                await page.waitForSelector(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span.Vts.fa-star`);
                const estrellas = await page.$(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > div > p:nth-child(2) > span.Vts.fa-star`);
                let calificacion = await page.evaluate(el => el.textContent, estrellas);
                
                //link
                const urlrandom = await page.$$eval(`body > div.Wrapper > div > div > main > ul > li:nth-child(${elejido}) > article > a`, urlrandom => urlrandom.map(href => href.getAttribute('href')));
                const link = "https://www3.animeflv.net" + urlrandom[0];

                const detallesrandom = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setURL(link)
                    .setLabel("Ver original")
                    .setStyle('LINK')
                    );
                
                msg.edit({
                        embeds: [
                            new MessageEmbed()
                            .setDescription(`Se ha elejido ${grantipo}:` + "```" + grantitulo + "| ⭐"+ calificacion +"```" + `Cargando información...`)
                            .setThumbnail(imagensita)
                        ], components:[detallesrandom]
                        });

                await page.goto(link);
                const eltitulo = grantitulo;
                const eltipo = valor5;
                await respuesta5_1(browser, page, msg, urlrandom, eltitulo, eltipo, detallesrandom)

                }
                
                catch(error)
                {
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor("DARK_RED")
                                .setTimestamp()
                                .setDescription("Hubo un error al elejir un anime aleatorio")
                        ]});
                    console.log(error)
                }
            }
            
            //___________________________________________________________________________________________________________
            async function respuesta5_1(browser, page, msg, urlrandom, eltitulo, eltipo, detallesrandom)
            {   
                try{

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
                let url5_1 = "https://www3.animeflv.net" + urlrandom[0];

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
                msg.edit({
                    embeds: [resultado5_1], components:[detallesrandom] 
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

                msg.edit({
                    embeds: [resultado5_1.addField("Reacciones:", gaxd, true).addField("Comentarios:", gaxdx, true)], components:[detallesrandom]
                });
                await browser.close();
            }

                
            catch(error)
            {
                msg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DARK_RED")
                            .setTimestamp()
                            .setDescription("Hubo un error al recopilar la información")
                    ]});
                console.log(error)
            }
            }
}

module.exports.conf = {
    "name": "random",
    "description": [{
        "lang": "es",
        "description": "Muestra el ping del bot."
    }, {
        "lang": "en",
        "description": "Display bot's ping."
    }],
    "aliases": ["aleatorio"],
    "usage": [{
        "lang": "es",
        "usage": "aleatorio"
    }, {
        "lang": "en",
        "usage": "random"
    }]
}
