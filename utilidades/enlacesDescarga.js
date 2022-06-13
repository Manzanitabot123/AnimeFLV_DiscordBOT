const {
    MessageActionRow,
    MessageEmbed,
    MessageButton,
    MessageSelectMenu
  } = require("discord.js");
  
  const enlacesDescarga = async(
    interaction,
    page,
    browser,
    urlSelected,
    episodio
  ) => {
    var enlaceoriginal;
    if (urlSelected.startsWith("https://www3.animeflv.net/ver/")) {
        enlaceoriginal = urlSelected;
    } else if (urlSelected.startsWith("https://www3.animeflv.net/anime/")){
        enlaceoriginal = urlSelected.replace('/anime/','/ver/') + "-"+ episodio;
    } else { enlaceoriginal = "https://www3.animeflv.net" + urlSelected.replace('/anime/','/ver/') + "-"+ episodio}
    const timeout = await page.goto(enlaceoriginal, {waitUntil: 'load', timeout: 0});

    if (timeout.status() === 522) {
    interaction.editReply({
    embeds: [
        new MessageEmbed()
            .setColor("DARK_RED")
            .setDescription(textoyemojis.errors.error522)
            .setFooter({text: textoyemojis.errors.espera})
    ], components:[]});
    return await browser.close();

    } else if (timeout.status() === 404) {
        interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(textoyemojis.errors.errorcap)
                .setFooter({text: textoyemojis.errors.trylink})
        ], components:[]});
        return await browser.close();
        
    } else if (timeout.status() === 502) {
        interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(textoyemojis.errors.error502)
                .setFooter({text: textoyemojis.errors.espera})
        ], components:[]});
        return await browser.close();
        
    }
    
      try{
            //Cantidad de Paginas
            /*const enlacesDeVideo = await page.evaluate(() => { return document.querySelector("body > script:nth-child(17)").textContent});
            console.log(enlacesDeVideo);
            var convertirACadena = /var videos = ([^\s]+[\w])/
            var match = enlacesDeVideo.match(convertirACadena);
            var ga = JSON.parse(match[1]+'"}]}');


            await page.waitForSelector("body > script:nth-child(17)");
            const enlacesDeVideo = await page.evaluate(() => { return document.querySelector("body > script:nth-child(17)").innerText});
            console.log(enlacesDeVideo);
            var convertirACadena = /{"SUB":([^\s]+[\w])/;
            var match = enlacesDeVideo.match(convertirACadena);
            var ga = JSON.parse(match[0]+'"}]}'); 
            for (let i = 0; i < ga.SUB.length; i++) {
                console.log("Titulo: " + ga.SUB[i].title + " >>> Link: " + ga.SUB[i].code);
            }; */

            var a = await page.evaluate(() => { var xd; const enlacesDeVideo = document.querySelectorAll( 'script' );
            for (let i = 0; i < enlacesDeVideo.length; i++) {
                xd += enlacesDeVideo[i].innerText;  
                };
            return xd;
            });
            var convertirACadena = /{"SUB":([^\s]+[\w])/;
            var match = a.match(convertirACadena);
            var ga = JSON.parse(match[0]+'"}]}'); 

            const embed = new MessageEmbed()
            .setTitle("Enlaces de descarga")
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: false })})
            .setColor("RANDOM");

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
                embed.addFields({ name:  "Servidor (Destacado): " + nombreenlace + " | Formato: " + Formatoenlace, value: " >>> Link: [Click para descargar](" + linkenlace + ")" })
            }; 

            for (let i = 0; i < ga.SUB.length; i++) {
                if(!ga.SUB[i].code.includes("hqq.tv/player/")) embed.addFields({ name:  "Servidor: " + ga.SUB[i].title, value: " >>> Link: [Click para descargar](" + ga.SUB[i].code.replace('/streamtape.com/e/','/streamtape.com/v/').replace('/embedsito.com/v/','/embedsito.com/f/').replace('/embedsb.com/e/','/embedsb.com/d/').replace('/mega.nz/embed','/mega.nz/').replace('yourupload.com/embed/','yourupload.com/watch/') + ")" })
            }; 
            

            const detallesraros = new MessageActionRow().addComponents(
                new MessageButton()
                .setURL(enlaceoriginal)
                .setLabel("Ir al episodio")
                .setStyle('LINK')
            );

            interaction.editReply({ embeds: [embed], components:[detallesraros]});

            await browser.close()
                        } catch {}
  };
module.exports = enlacesDescarga;