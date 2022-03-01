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
        randomanime();

        async function randomanime(){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Buscando un anime al azar ...")
                    ], components:[]});

                try{
                const url = `https://www3.animeflv.net/`;
                
                //info
                const browser = await puppeteer.launch({
                    headless: false,
                    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                    });
                const page = await browser.newPage();
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
                            await page.waitForXPath(resultXXX);
                            let elementXXX = await page.$x(resultXXX);
                            let valueXXX = await page.evaluate(el => el.textContent, elementXXX[0]);
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
                                .setDescription("Hubo un error al elejir un anime aleatorio")
                        ]});
                    console.log(error)
                }
            }
            
}
