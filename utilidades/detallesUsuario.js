const {
    MessageActionRow,
    MessageEmbed,
    MessageButton,
    MessageSelectMenu
  } = require("discord.js");
  
  const detallesUsuario = async(
    interaction,
    page,
    browser,
    reason,
    urlSelected
  ) => {
    let enlaceoriginal;
    if (urlSelected.startsWith("https://www3.animeflv.net/ver/")) {
        enlaceoriginal = urlSelected;
    } else if (urlSelected.startsWith("https://www3.animeflv.net/anime/")){
        enlaceoriginal = urlSelected.replace('/anime/','/ver/') + "-"+ episodio;
    } else { enlaceoriginal = "https://www3.animeflv.net" + urlSelected.replace('/anime/','/ver/') + "-"+ episodio}
    const timeout = await page.goto(enlaceoriginal, {waitUntil: 'load', timeout: 0});

    if (timeout.status() === 522||timeout.status() === 404||timeout.status() === 502) {
        console.log(interaction)
        interaction.editReply({ embeds: [ new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(textoyemojis.emojis.cancelar + " | " + textoyemojis.errors[interaction.commandName][reason]+"\n**"+urlSelected+"**")
                .setFooter({text: textoyemojis.errors.descargar.trylink + " | Error "+timeout.status()})], components:[]});
        return browser.close(); 
    }
    
      try{
            const numberoCap = await page.evaluate(() => {return document.querySelector("#XpndCn > div.CpCnA > div.CapiTop > h2").textContent})

            const a = await page.evaluate(() => { let xd; const enlacesDeVideo = Array.from(document.querySelectorAll( 'script' ));
            for (let enlace of enlacesDeVideo) {
                xd += enlace.innerText;  
            }
            return xd;
            })

            const convertirACadena = /{"SUB":([^\s]+[\w])/;
            const match = a.match(convertirACadena);
            const ga = JSON.parse(match[0]+'"}]}'); 

            //Añadir miniatura
            const imageMiniatura = await page.evaluate(() =>{ return document.querySelectorAll('[property="og:image"]')[0].content})

            const embed = new MessageEmbed()
            .setTitle("Enlaces de descarga | " + numberoCap)
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
            .setColor("RANDOM")
            .setThumbnail(imageMiniatura)
            .setFooter({text: "Extraido de: AnimeFLV.com"})

            const total = await page.evaluate(() => { return document.querySelector("#DwsldCn > div > table > tbody").childElementCount});
            for (let i = 1; i <= total; i++) {
                    //Nombre
                const elnombredellink = await page.$(`#DwsldCn > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`);
                const nombreenlace = await page.evaluate(el => el.textContent, elnombredellink);
                //Formato
                const elFormatodellink = await page.$(`#DwsldCn > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`);
                const Formatoenlace = await page.evaluate(el => el.textContent, elFormatodellink);
                //Enlace
                const linksp = await page.$(`#DwsldCn > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > a`);
                const linkenlace = await page.evaluate(el => el.href, linksp);
                embed.addFields({ name:  "Servidor: " + nombreenlace + " 🌟 | Formato: " + Formatoenlace, value: " >>> Link: [Click para descargar](" + linkenlace + ")" })
            }

            const servidores = ga.SUB;
            for (let servidor of servidores) {
                if(!servidor.code.includes("hqq.tv/player/") && !servidor.code.includes("mega.nz/")) embed.addFields({ name:  "Servidor: " + servidor.title, value: " >>> Link: [Click para descargar](" + servidor.code.replace('/streamtape.com/e/','/streamtape.com/v/').replace('/embedsito.com/v/','/embedsito.com/f/').replace('/embedsb.com/e/','/embedsb.com/d/').replace('/mega.nz/embed','/mega.nz/').replace('yourupload.com/embed/','yourupload.com/watch/') + ")" })
            }

            const detallesraros = new MessageActionRow();

            if (await page.evaluate(() => Array.from(document.getElementsByClassName("CapNvPv fa-chevron-left"))[0]) !== undefined) {
                const anterior = await page.evaluate(() => document.getElementsByClassName("CapNvPv fa-chevron-left")[0].href)
                detallesraros.addComponents([
                    new MessageButton()
                    .setCustomId(`${anterior}`)
                    .setLabel('Cap. anterior')
                    .setStyle('DANGER')
                    .setEmoji(textoyemojis.emojis.izquierda)
                ])
            }

            //Añade los detalles
            const Detallitos = new MessageButton()
            .setURL(enlaceoriginal)
            .setLabel("Ir al episodio")
            .setStyle('LINK')
            .setEmoji(textoyemojis.emojis.animeflv_icon);

            detallesraros.addComponents([Detallitos])

            if (await page.evaluate(() => Array.from(document.getElementsByClassName("CapNvNx fa-chevron-right"))[0]) !== undefined) {
                const siguiente = await page.evaluate(() => document.getElementsByClassName("CapNvNx fa-chevron-right")[0].href)
                detallesraros.addComponents([
                    new MessageButton()
                    .setCustomId(`${siguiente}`)
                    .setLabel('Cap. siguiente')
                    .setStyle('SUCCESS')
                    .setEmoji(textoyemojis.emojis.derecha)
                ])
            }
            
            interaction.editReply({ embeds: [embed], components:[detallesraros]});
            
            const message = await interaction.fetchReply();

            const filter = ft => ft.isButton() && ft.user.id === interaction.user.id;
            const collector = message.createMessageComponentCollector({
                filter,
                max: 1,
                time: 35000
            });
            collector.on('collect', async collected => {
                const botones = detallesraros.components;
                for(let botón of botones) {
                    botón.setDisabled(true)
                }
                interaction.editReply({ 
                    embeds: [embed.setFooter({text: "CARGANDO LINKS DEL EPISODIO..."})], components: [detallesraros]
                })
                Denuevo(collected, interaction, page, browser, collected.customId) 
                });
    
                collector.on("end", async(_, reason) => {
                    if (reason === "time") {
                        interaction.editReply({ components:[new MessageActionRow().addComponents([Detallitos])]})
                        await browser.close()
                    }
                  });

            } catch(error) {
                interaction.editReply({ embeds: [new MessageEmbed()
                    .setTitle("Ha ocurrido un error al obtener los enlaces")
                    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
                    .setColor("RANDOM")], components:[]});
                console.log(error)
            }
  };

async function Denuevo(collected, interaction, page, browser, a) {
    try{
    enlacesDescarga(interaction, page, browser, "VerDirecto", a).then( await collected.deferUpdate())
    } catch { 
    interaction.editReply({ embeds: [embed.setFooter({text: "Ha ocurrido un error al cargar el episodio"})], components:[]})
    await browser.close()
    }
}
module.exports = detallesUsuario;