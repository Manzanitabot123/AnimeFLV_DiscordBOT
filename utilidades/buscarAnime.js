const {
    MessageActionRow,
    MessageEmbed,
    MessageButton,
    MessageSelectMenu
  } = require("discord.js");
  
  const buscarAnime = async(
    interaction,
    page,
    browser,
    urlSelected,
    button
  ) => {
    const timeout = await page.goto(urlSelected, {waitUntil: 'load', timeout: 0})

    //función de busqueda
    const titulo = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > h1";
    const tipo = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > span";
    const otros_nombres = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3)";
    const imagen = "body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img";
    const estado = "body > div.Wrapper > div > div > div.Container > div > aside > p > span";
    const descripción = "body > div.Wrapper > div > div > div.Container > div > main > section:nth-child(1) > div.Description > p";
    const seguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > div > div > span";
    const nombresdelosseguidores = "body > div.Wrapper > div > div > div.Container > div > aside > section > ul";
    const estrellitas = "#votes_prmd";
    const votos = "#votes_nmbr";
    const imagen_referencial = "body > div.Wrapper > div > div > div.Ficha.fchlt > div.Bg";

    if (timeout.status() === 522) {
    interaction.editReply({
    embeds: [
        new MessageEmbed()
            .setColor("DARK_RED")
            .setDescription(textoyemojis.errors.error522)
            .setFooter({text: textoyemojis.errors.espera})
    ], components:[]});
    return browser.close();

    } else if (timeout.status() === 404) {
        interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(textoyemojis.errors.errorlink)
                .setFooter({text: textoyemojis.errors.trylink})
        ], components:[]});
        return browser.close();
        
    } else if (timeout.status() === 502) {
        interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(textoyemojis.errors.error502)
                .setFooter({text: textoyemojis.errors.espera})
        ], components:[]});
        return browser.close();
        
    }
    
    if (urlSelected.startsWith("https://www3.animeflv.net/ver/")) {
        const urlSelectedAdded = await page.evaluate(() => { return document.getElementsByClassName("CapNvLs fa-th-list")[0].href});
        console.log(urlSelectedAdded)
        await page.goto(urlSelectedAdded, {waitUntil: 'load', timeout: 0})
    }
    
      try{
      //titulo
      await page.waitForSelector(titulo);
      let elementTitle = await page.$(titulo);
      const title5_1 = await page.evaluate(el => el.textContent, elementTitle);
                //detalles
                const detalles5_1 = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setURL(urlSelected)
                    .setLabel("Ver original")
                    .setStyle('LINK')
                );
                //capitulos
                let episodios5_1;
                await page.waitForSelector("#episodeList");
                const capitulos5_1 = await page.evaluate(() => Array.from(document.querySelectorAll("#episodeList"), el => el.childElementCount)[0]);
                
                //Estado
                let next5_1;
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
                }
                //URL
                let url5_1 = urlSelected;

                //otros nombres
                let othernames5_1;
                await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span:nth-child(1)"), el => el.textContent)[0]);
                if(await page.evaluate(() => Array.from(document.querySelectorAll("body > div.Wrapper > div > div > div.Ficha.fchlt > div.Container > div:nth-child(3) > span:nth-child(1)"), el => el.textContent)[0]) !== undefined) {
                    const otros_nombres5_1 = await page.$(otros_nombres);
                    othernames5_1 = await page.evaluate(el => el.textContent, otros_nombres5_1);
                } else {
                    othernames5_1 = "No tiene otros nombres"
                }

                //géneros
                let gender5_1;
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
                }

                
                //imagen
                const imgs = await page.$$eval(imagen, imgsA => imgsA.map(img => img.getAttribute('src')));
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
                let allfollowers5_1;
                await page.waitForSelector(nombresdelosseguidores);
                if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(1) > a > img") !== null) {
                    const unoseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(1) > a > img", unoseguidor5_1A => unoseguidor5_1A.map(alt => alt.getAttribute('alt')));
                    
                    if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(2) > a > img") !== null) {
                        const dosseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(2) > a > img", dosseguidor5_1A => dosseguidor5_1A.map(alt => alt.getAttribute('alt')));
                        
                        if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(3) > a > img") !== null) {
                            const tresseguidor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(3) > a > img", tresseguidor5_1A => tresseguidor5_1A.map(alt => alt.getAttribute('alt')));
                            
                            if(page.$("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(4) > a > img") !== null) {
                                const cuatrosegudor5_1 = await page.$$eval("body > div.Wrapper > div > div > div.Container > div > aside > section > ul > li:nth-child(4) > a > img", cuatrosegudor5_1A => cuatrosegudor5_1A.map(alt => alt.getAttribute('alt')));
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
                await page.waitForSelector(tipo)
                let tipoxd = await page.$(tipo)
                let tipo5_1 = await page.evaluate(el => el.textContent, tipoxd)

                //estrellitas
                await page.waitForSelector(estrellitas);
                const estrellitas5_1 = await page.$(estrellitas);
                let littlestars5_1 = await page.evaluate(el => el.textContent, estrellitas5_1);
                let littlestarssymbols5_1;
                if(littlestars5_1 >= 0.0 && littlestars5_1 <= 0.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 0.6 && littlestars5_1 <= 1.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 1.1 && littlestars5_1 <= 1.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 1.6 && littlestars5_1 <= 2.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 2.1 && littlestars5_1 <= 2.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 2.6 && littlestars5_1 <= 3.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 3.1 && littlestars5_1 <= 3.5) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 3.6 && littlestars5_1 <= 4.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else if(littlestars5_1 >= 4.1 && littlestars5_1 <= 4.7) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.media_estrella}`} else if(littlestars5_1 >= 4.8 && littlestars5_1 <= 5.0) {littlestarssymbols5_1 = `${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella} ${textoyemojis.emojis.estrella}`} else {littlestarssymbols5_1 = `${textoyemojis.emojis.media_estrella}`}
                //imagen referencial
                await page.waitForSelector(imagen_referencial);
                const imagen_referencial5_1 = await page.evaluate(el => window.getComputedStyle(el).backgroundImage, await page.$(imagen_referencial));
                const backgroundImage5_1 = imagen_referencial5_1.match(/url\("(.*)"/)[1];
                
                let backgroundImg5_1;
                try{
                if(await getColors(backgroundImage5_1).then(colors => colors[1]._rgb[0]) !== 40) {
                    backgroundImg5_1 = backgroundImage5_1;
                } else {backgroundImg5_1 = "https://www3.animeflv.net/assets/animeflv/img/logo.png"}
                }          
                catch(error)
                {
                backgroundImg5_1 = "https://www3.animeflv.net/assets/animeflv/img/logo.png"
                }

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
                interaction.editReply({
                    embeds: [resultado5_1]
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

                if(!button) {
                    interaction.editReply({
                        embeds: [resultado5_1.addField("Reacciones:", gaxd, true).addField("Comentarios:", gaxdx, true)], components: [detalles5_1]});
                    await browser.close()
                } else {
                    const modific = button.concat([detalles5_1])
                    interaction.editReply({
                    embeds: [resultado5_1.addField("Reacciones:", gaxd, true).addField("Comentarios:", gaxdx, true)], components: modific})}
              } catch {}
  };
module.exports = buscarAnime;

//CORREGIR EL ASUNTO DEL TIPO ESPECIAL QUE RESULTA ERROR