const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const paginationEmbed = require('../../utils/paginationEmbed');
const puppeteer = require('puppeteer');
const getColors = require('get-image-colors');
const { captureRejections } = require("events");

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
            var url;
            emisiones(url)
            
            //función de busqueda
            async function emisiones(url){
                //mensaje de espera (cargando...)
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("YELLOW")
                            .setDescription("Recopilando los animes en emisión ...")
                    ], components:[]});
                message.channel.sendTyping();

                try{
                            url = `https://www3.animeflv.net`;
                            
                            const result1 = "#mCSB_1_container > ul > li:nth-child(1) > a";
                            const pelianime1 = "#mCSB_1_container > ul > li:nth-child(1) > a > span";
                            const enlace1 = "#mCSB_1_container > ul > li:nth-child(1) > a";
                            
                            const result2 = "#mCSB_1_container > ul > li:nth-child(2) > a";
                            const pelianime2 = "#mCSB_1_container > ul > li:nth-child(2) > a > span";
                            const enlace2 = "#mCSB_1_container > ul > li:nth-child(2) > a";

                            const result3 = "#mCSB_1_container > ul > li:nth-child(3) > a";
                            const pelianime3 = "#mCSB_1_container > ul > li:nth-child(3) > a > span";
                            const enlace3 = "#mCSB_1_container > ul > li:nth-child(3) > a";

                            const result4 = "#mCSB_1_container > ul > li:nth-child(4) > a";
                            const pelianime4 = "#mCSB_1_container > ul > li:nth-child(4) > a > span";
                            const enlace4 = "#mCSB_1_container > ul > li:nth-child(4) > a";

                            const result5 = "#mCSB_1_container > ul > li:nth-child(5) > a";
                            const pelianime5 = "#mCSB_1_container > ul > li:nth-child(5) > a > span";
                            const enlace5 = "#mCSB_1_container > ul > li:nth-child(5) > a";
                            
                            const result6 = "#mCSB_1_container > ul > li:nth-child(6) > a";
                            const pelianime6 = "#mCSB_1_container > ul > li:nth-child(6) > a > span";
                            const enlace6 = "#mCSB_1_container > ul > li:nth-child(6) > a";

                            const result7 = "#mCSB_1_container > ul > li:nth-child(7) > a";
                            const pelianime7 = "#mCSB_1_container > ul > li:nth-child(7) > a > span";
                            const enlace7 = "#mCSB_1_container > ul > li:nth-child(7) > a";

                            const result8 = "#mCSB_1_container > ul > li:nth-child(8) > a";
                            const pelianime8 = "#mCSB_1_container > ul > li:nth-child(8) > a > span";
                            const enlace8 = "#mCSB_1_container > ul > li:nth-child(8) > a";

                            const result9 = "#mCSB_1_container > ul > li:nth-child(9) > a";
                            const pelianime9 = "#mCSB_1_container > ul > li:nth-child(9) > a > span";
                            const enlace9 = "#mCSB_1_container > ul > li:nth-child(9) > a";

                            const result10 = "#mCSB_1_container > ul > li:nth-child(10) > a";
                            const pelianime10 = "#mCSB_1_container > ul > li:nth-child(10) > a > span";
                            const enlace10 = "#mCSB_1_container > ul > li:nth-child(10) > a";
                            
                            const result11 = "#mCSB_1_container > ul > li:nth-child(11) > a";
                            const pelianime11 = "#mCSB_1_container > ul > li:nth-child(11) > a > span";
                            const enlace11 = "#mCSB_1_container > ul > li:nth-child(11) > a";

                            const result12 = "#mCSB_1_container > ul > li:nth-child(12) > a";
                            const pelianime12 = "#mCSB_1_container > ul > li:nth-child(12) > a > span";
                            const enlace12 = "#mCSB_1_container > ul > li:nth-child(12) > a";

                            const result13 = "#mCSB_1_container > ul > li:nth-child(13) > a";
                            const pelianime13 = "#mCSB_1_container > ul > li:nth-child(13) > a > span";
                            const enlace13 = "#mCSB_1_container > ul > li:nth-child(13) > a";

                            const result14 = "#mCSB_1_container > ul > li:nth-child(14) > a";
                            const pelianime14 = "#mCSB_1_container > ul > li:nth-child(14) > a > span";
                            const enlace14 = "#mCSB_1_container > ul > li:nth-child(14) > a";
                            
                            const result15 = "#mCSB_1_container > ul > li:nth-child(15) > a";
                            const pelianime15 = "#mCSB_1_container > ul > li:nth-child(15) > a > span";
                            const enlace15 = "#mCSB_1_container > ul > li:nth-child(15) > a";

                            const result16 = "#mCSB_1_container > ul > li:nth-child(16) > a";
                            const pelianime16 = "#mCSB_1_container > ul > li:nth-child(16) > a > span";
                            const enlace16 = "#mCSB_1_container > ul > li:nth-child(16) > a";

                            const result17 = "#mCSB_1_container > ul > li:nth-child(17) > a";
                            const pelianime17 = "#mCSB_1_container > ul > li:nth-child(17) > a > span";
                            const enlace17 = "#mCSB_1_container > ul > li:nth-child(17) > a";

                            const result18 = "#mCSB_1_container > ul > li:nth-child(18) > a";
                            const pelianime18 = "#mCSB_1_container > ul > li:nth-child(18) > a > span";
                            const enlace18 = "#mCSB_1_container > ul > li:nth-child(18) > a";

                            const result19 = "#mCSB_1_container > ul > li:nth-child(19) > a";
                            const pelianime19 = "#mCSB_1_container > ul > li:nth-child(19) > a > span";
                            const enlace19 = "#mCSB_1_container > ul > li:nth-child(19) > a";
                            
                            const result20 = "#mCSB_1_container > ul > li:nth-child(20) > a";
                            const pelianime20 = "#mCSB_1_container > ul > li:nth-child(20) > a > span";
                            const enlace20 = "#mCSB_1_container > ul > li:nth-child(20) > a";

                            const result21 = "#mCSB_1_container > ul > li:nth-child(21) > a";
                            const pelianime21 = "#mCSB_1_container > ul > li:nth-child(21) > a > span";
                            const enlace21 = "#mCSB_1_container > ul > li:nth-child(21) > a";

                            const result22 = "#mCSB_1_container > ul > li:nth-child(22) > a";
                            const pelianime22 = "#mCSB_1_container > ul > li:nth-child(22) > a > span";
                            const enlace22 = "#mCSB_1_container > ul > li:nth-child(22) > a";

                            const result23 = "#mCSB_1_container > ul > li:nth-child(23) > a";
                            const pelianime23 = "#mCSB_1_container > ul > li:nth-child(23) > a > span";
                            const enlace23 = "#mCSB_1_container > ul > li:nth-child(23) > a";
                            
                            const result24 = "#mCSB_1_container > ul > li:nth-child(24) > a";
                            const pelianime24 = "#mCSB_1_container > ul > li:nth-child(24) > a > span";
                            const enlace24 = "#mCSB_1_container > ul > li:nth-child(24) > a";

                            const result25 = "#mCSB_1_container > ul > li:nth-child(25) > a";
                            const pelianime25 = "#mCSB_1_container > ul > li:nth-child(25) > a > span";
                            const enlace25 = "#mCSB_1_container > ul > li:nth-child(25) > a";

                            const result26 = "#mCSB_1_container > ul > li:nth-child(26) > a";
                            const pelianime26 = "#mCSB_1_container > ul > li:nth-child(26) > a > span";
                            const enlace26 = "#mCSB_1_container > ul > li:nth-child(26) > a";

                            const result27 = "#mCSB_1_container > ul > li:nth-child(27) > a";
                            const pelianime27 = "#mCSB_1_container > ul > li:nth-child(27) > a > span";
                            const enlace27 = "#mCSB_1_container > ul > li:nth-child(27) > a";
                            
                            const result28 = "#mCSB_1_container > ul > li:nth-child(28) > a";
                            const pelianime28 = "#mCSB_1_container > ul > li:nth-child(28) > a > span";
                            const enlace28 = "#mCSB_1_container > ul > li:nth-child(28) > a";

                            const result29 = "#mCSB_1_container > ul > li:nth-child(29) > a";
                            const pelianime29 = "#mCSB_1_container > ul > li:nth-child(29) > a > span";
                            const enlace29 = "#mCSB_1_container > ul > li:nth-child(29) > a";

                            const result30 = "#mCSB_1_container > ul > li:nth-child(30) > a";
                            const pelianime30 = "#mCSB_1_container > ul > li:nth-child(30) > a > span";
                            const enlace30 = "#mCSB_1_container > ul > li:nth-child(30) > a";
            
                            //info
                            const browser = await puppeteer.launch({
                                headless: true,
                                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--use-gl=egl', '--disable-extensions'],
                                });
                            const page = await browser.newPage();
                            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                            await page.goto(url);
            
                            //Para el 1 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result1);
                            let element1 = await page.$(result1);
                            let value1 = await page.evaluate(el => el.textContent, element1);
                            let titulo1 = value1;

                            const url1 = await page.$$eval(enlace1, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl1 = "https://www3.animeflv.net" + url1;

                            await page.waitForSelector(pelianime1);
                            let tipo1 = await page.$(pelianime1);
                            let tipodeanime1 = await page.evaluate(el => el.textContent, tipo1);
                            
                            //Para el 2  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result2);
                            let element2 = await page.$(result2);
                            let value2 = await page.evaluate(el => el.textContent, element2);
                            let titulo2 = value2;

                            const url2 = await page.$$eval(enlace2, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl2 = "https://www3.animeflv.net" + url2;

                            await page.waitForSelector(pelianime2);
                            let tipo2 = await page.$(pelianime2);
                            let tipodeanime2 = await page.evaluate(el => el.textContent, tipo2);

                            //Para el 3 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result3);
                            let element3 = await page.$(result3);
                            let value3 = await page.evaluate(el => el.textContent, element3);
                            let titulo3 = value3;

                            const url3 = await page.$$eval(enlace3, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl3 = "https://www3.animeflv.net" + url3;

                            await page.waitForSelector(pelianime3);
                            let tipo3 = await page.$(pelianime3);
                            let tipodeanime3 = await page.evaluate(el => el.textContent, tipo3);
                            
                            //Para el 4  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result4);
                            let element4 = await page.$(result4);
                            let value4 = await page.evaluate(el => el.textContent, element4);
                            let titulo4 = value4;

                            const url4 = await page.$$eval(enlace4, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl4 = "https://www3.animeflv.net" + url4;

                            await page.waitForSelector(pelianime4);
                            let tipo4 = await page.$(pelianime4);
                            let tipodeanime4 = await page.evaluate(el => el.textContent, tipo4);

                            //Para el 5 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result5);
                            let element5 = await page.$(result5);
                            let value5 = await page.evaluate(el => el.textContent, element5);
                            let titulo5 = value5;

                            const url5 = await page.$$eval(enlace5, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl5 = "https://www3.animeflv.net" + url5;

                            await page.waitForSelector(pelianime5);
                            let tipo5 = await page.$(pelianime5);
                            let tipodeanime5 = await page.evaluate(el => el.textContent, tipo5);
                            
                            //Para el 6  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result6);
                            let element6 = await page.$(result6);
                            let value6 = await page.evaluate(el => el.textContent, element6);
                            let titulo6 = value6;

                            const url6 = await page.$$eval(enlace6, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl6 = "https://www3.animeflv.net" + url6;

                            await page.waitForSelector(pelianime6);
                            let tipo6 = await page.$(pelianime6);
                            let tipodeanime6 = await page.evaluate(el => el.textContent, tipo6);
                            
                            //Para el 7 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result7);
                            let element7 = await page.$(result7);
                            let value7 = await page.evaluate(el => el.textContent, element7);
                            let titulo7 = value7;

                            const url7 = await page.$$eval(enlace7, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl7 = "https://www3.animeflv.net" + url7;

                            await page.waitForSelector(pelianime7);
                            let tipo7 = await page.$(pelianime7);
                            let tipodeanime7 = await page.evaluate(el => el.textContent, tipo7);
                            
                            //Para el 8  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result8);
                            let element8 = await page.$(result8);
                            let value8 = await page.evaluate(el => el.textContent, element8);
                            let titulo8 = value8;

                            const url8 = await page.$$eval(enlace8, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl8 = "https://www3.animeflv.net" + url8;

                            await page.waitForSelector(pelianime8);
                            let tipo8 = await page.$(pelianime8);
                            let tipodeanime8 = await page.evaluate(el => el.textContent, tipo8);

                            //Para el 9 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result9);
                            let element9 = await page.$(result9);
                            let value9 = await page.evaluate(el => el.textContent, element9);
                            let titulo9 = value9;

                            const url9 = await page.$$eval(enlace9, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl9 = "https://www3.animeflv.net" + url9;

                            await page.waitForSelector(pelianime9);
                            let tipo9 = await page.$(pelianime9);
                            let tipodeanime9 = await page.evaluate(el => el.textContent, tipo9);
                            
                            //Para el 10  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result10);
                            let element10 = await page.$(result10);
                            let value10 = await page.evaluate(el => el.textContent, element10);
                            let titulo10 = value10;

                            const url10 = await page.$$eval(enlace10, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl10 = "https://www3.animeflv.net" + url10;

                            await page.waitForSelector(pelianime10);
                            let tipo10 = await page.$(pelianime10);
                            let tipodeanime10 = await page.evaluate(el => el.textContent, tipo10);

                            //Para el 11 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result11);
                            let element11 = await page.$(result11);
                            let value11 = await page.evaluate(el => el.textContent, element11);
                            let titulo11 = value11;

                            const url11 = await page.$$eval(enlace11, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl11 = "https://www3.animeflv.net" + url11;

                            await page.waitForSelector(pelianime11);
                            let tipo11 = await page.$(pelianime11);
                            let tipodeanime11 = await page.evaluate(el => el.textContent, tipo11);
                            
                            //Para el 12  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result12);
                            let element12 = await page.$(result12);
                            let value12 = await page.evaluate(el => el.textContent, element12);
                            let titulo12 = value12;

                            const url12 = await page.$$eval(enlace12, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl12 = "https://www3.animeflv.net" + url12;

                            await page.waitForSelector(pelianime12);
                            let tipo12 = await page.$(pelianime12);
                            let tipodeanime12 = await page.evaluate(el => el.textContent, tipo12);

                            //Para el 13 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result13);
                            let element13 = await page.$(result13);
                            let value13 = await page.evaluate(el => el.textContent, element13);
                            let titulo13 = value13;

                            const url13 = await page.$$eval(enlace13, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl13 = "https://www3.animeflv.net" + url13;

                            await page.waitForSelector(pelianime13);
                            let tipo13 = await page.$(pelianime13);
                            let tipodeanime13 = await page.evaluate(el => el.textContent, tipo13);
                            
                            //Para el 14  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result14);
                            let element14 = await page.$(result14);
                            let value14 = await page.evaluate(el => el.textContent, element14);
                            let titulo14 = value14;

                            const url14 = await page.$$eval(enlace14, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl14 = "https://www3.animeflv.net" + url14;

                            await page.waitForSelector(pelianime14);
                            let tipo14 = await page.$(pelianime14);
                            let tipodeanime14 = await page.evaluate(el => el.textContent, tipo14);
                            
                            //Para el 15 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result15);
                            let element15 = await page.$(result15);
                            let value15 = await page.evaluate(el => el.textContent, element15);
                            let titulo15 = value15;

                            const url15 = await page.$$eval(enlace15, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl15 = "https://www3.animeflv.net" + url15;

                            await page.waitForSelector(pelianime15);
                            let tipo15 = await page.$(pelianime15);
                            let tipodeanime15 = await page.evaluate(el => el.textContent, tipo15);
                            
                            //Para el 16  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result16);
                            let element16 = await page.$(result16);
                            let value16 = await page.evaluate(el => el.textContent, element16);
                            let titulo16 = value16;

                            const url16 = await page.$$eval(enlace16, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl16 = "https://www3.animeflv.net" + url16;

                            await page.waitForSelector(pelianime16);
                            let tipo16 = await page.$(pelianime16);
                            let tipodeanime16 = await page.evaluate(el => el.textContent, tipo16);

                            //Para el 17 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result17);
                            let element17 = await page.$(result17);
                            let value17 = await page.evaluate(el => el.textContent, element17);
                            let titulo17 = value17;

                            const url17 = await page.$$eval(enlace17, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl17 = "https://www3.animeflv.net" + url17;

                            await page.waitForSelector(pelianime17);
                            let tipo17 = await page.$(pelianime17);
                            let tipodeanime17 = await page.evaluate(el => el.textContent, tipo17);
                            
                            //Para el 18  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result18);
                            let element18 = await page.$(result18);
                            let value18 = await page.evaluate(el => el.textContent, element18);
                            let titulo18 = value18;

                            const url18 = await page.$$eval(enlace18, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl18 = "https://www3.animeflv.net" + url18;

                            await page.waitForSelector(pelianime18);
                            let tipo18 = await page.$(pelianime18);
                            let tipodeanime18 = await page.evaluate(el => el.textContent, tipo18);

                            //Para el 19 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result19);
                            let element19 = await page.$(result19);
                            let value19 = await page.evaluate(el => el.textContent, element19);
                            let titulo19 = value19;

                            const url19 = await page.$$eval(enlace19, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl19 = "https://www3.animeflv.net" + url19;

                            await page.waitForSelector(pelianime19);
                            let tipo19 = await page.$(pelianime19);
                            let tipodeanime19 = await page.evaluate(el => el.textContent, tipo19);
                            
                            //Para el 20  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result20);
                            let element20 = await page.$(result20);
                            let value20 = await page.evaluate(el => el.textContent, element20);
                            let titulo20 = value20;

                            const url20 = await page.$$eval(enlace20, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl20 = "https://www3.animeflv.net" + url20;

                            await page.waitForSelector(pelianime20);
                            let tipo20 = await page.$(pelianime20);
                            let tipodeanime20 = await page.evaluate(el => el.textContent, tipo20);

                            //Para el 21 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result21);
                            let element21 = await page.$(result21);
                            let value21 = await page.evaluate(el => el.textContent, element21);
                            let titulo21 = value21;

                            const url21 = await page.$$eval(enlace21, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl21 = "https://www3.animeflv.net" + url21;

                            await page.waitForSelector(pelianime21);
                            let tipo21 = await page.$(pelianime21);
                            let tipodeanime21 = await page.evaluate(el => el.textContent, tipo21);
                            
                            //Para el 22  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result22);
                            let element22 = await page.$(result22);
                            let value22 = await page.evaluate(el => el.textContent, element22);
                            let titulo22 = value22;

                            const url22 = await page.$$eval(enlace22, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl22 = "https://www3.animeflv.net" + url22;

                            await page.waitForSelector(pelianime22);
                            let tipo22 = await page.$(pelianime22);
                            let tipodeanime22 = await page.evaluate(el => el.textContent, tipo22);
                            
                            //Para el 23 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result23);
                            let element23 = await page.$(result23);
                            let value23 = await page.evaluate(el => el.textContent, element23);
                            let titulo23 = value23;

                            const url23 = await page.$$eval(enlace23, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl23 = "https://www3.animeflv.net" + url23;

                            await page.waitForSelector(pelianime23);
                            let tipo23 = await page.$(pelianime23);
                            let tipodeanime23 = await page.evaluate(el => el.textContent, tipo23);
                            
                            //Para el 24  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result24);
                            let element24 = await page.$(result24);
                            let value24 = await page.evaluate(el => el.textContent, element24);
                            let titulo24 = value24;

                            const url24 = await page.$$eval(enlace24, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl24 = "https://www3.animeflv.net" + url24;

                            await page.waitForSelector(pelianime24);
                            let tipo24 = await page.$(pelianime24);
                            let tipodeanime24 = await page.evaluate(el => el.textContent, tipo24);

                            //Para el 25 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result25);
                            let element25 = await page.$(result25);
                            let value25 = await page.evaluate(el => el.textContent, element25);
                            let titulo25 = value25;

                            const url25 = await page.$$eval(enlace25, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl25 = "https://www3.animeflv.net" + url25;

                            await page.waitForSelector(pelianime25);
                            let tipo25 = await page.$(pelianime25);
                            let tipodeanime25 = await page.evaluate(el => el.textContent, tipo25);

                            //Para el 26  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result26);
                            let element26 = await page.$(result26);
                            let value26 = await page.evaluate(el => el.textContent, element26);
                            let titulo26 = value26;

                            const url26 = await page.$$eval(enlace26, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl26 = "https://www3.animeflv.net" + url26;

                            await page.waitForSelector(pelianime26);
                            let tipo26 = await page.$(pelianime26);
                            let tipodeanime26 = await page.evaluate(el => el.textContent, tipo26);

                            //Para el 27 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result27);
                            let element27 = await page.$(result27);
                            let value27 = await page.evaluate(el => el.textContent, element27);
                            let titulo27 = value27;

                            const url27 = await page.$$eval(enlace27, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl27 = "https://www3.animeflv.net" + url27;

                            await page.waitForSelector(pelianime27);
                            let tipo27 = await page.$(pelianime27);
                            let tipodeanime27 = await page.evaluate(el => el.textContent, tipo27);
                            
                            //Para el 28  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result28);
                            let element28 = await page.$(result28);
                            let value28 = await page.evaluate(el => el.textContent, element28);
                            let titulo28 = value28;

                            const url28 = await page.$$eval(enlace28, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl28 = "https://www3.animeflv.net" + url28;

                            await page.waitForSelector(pelianime28);
                            let tipo28 = await page.$(pelianime28);
                            let tipodeanime28 = await page.evaluate(el => el.textContent, tipo28);

                            //Para el 29 __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result29);
                            let element29 = await page.$(result29);
                            let value29 = await page.evaluate(el => el.textContent, element29);
                            let titulo29 = value29;

                            const url29 = await page.$$eval(enlace29, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl29 = "https://www3.animeflv.net" + url29;

                            await page.waitForSelector(pelianime29);
                            let tipo29 = await page.$(pelianime29);
                            let tipodeanime29 = await page.evaluate(el => el.textContent, tipo29);
                            
                            //Para el 30  __________________________________________________________________________________________________________________________________________________________________________________       
                            await page.waitForSelector(result30);
                            let element30 = await page.$(result30);
                            let value30 = await page.evaluate(el => el.textContent, element30);
                            let titulo30 = value30;

                            const url30 = await page.$$eval(enlace30, urlone => urlone.map(href => href.getAttribute('href')));
                            const laurl30 = "https://www3.animeflv.net" + url30;

                            await page.waitForSelector(pelianime30);
                            let tipo30 = await page.$(pelianime30);
                            let tipodeanime30 = await page.evaluate(el => el.textContent, tipo30);


                            //ARMAR EMBEDS
                                                    const resultado1 = new MessageEmbed()
                                                    .setTitle("Los animes en emisión son:")
                                                    .setColor("RANDOM")
                                                    .setDescription(`⦿ [**${titulo1}**](${laurl1}) ( ${tipodeanime1} )`+`\n`+`⦿ [**${titulo2}**](${laurl2}) ( ${tipodeanime2} )`+`\n`+`⦿ [**${titulo3}**](${laurl3}) ( ${tipodeanime3} )`+`\n`+`⦿ [**${titulo4}**](${laurl4}) ( ${tipodeanime4} )`+`\n`+`⦿ [**${titulo5}**](${laurl5}) ( ${tipodeanime5} )`+`\n`+`⦿ [**${titulo6}**](${laurl6}) ( ${tipodeanime6} )`+`\n`+`⦿ [**${titulo7}**](${laurl7}) ( ${tipodeanime7} )`+`\n`+`⦿ [**${titulo8}**](${laurl8}) ( ${tipodeanime8} )`+`\n`+`⦿ [**${titulo9}**](${laurl9}) ( ${tipodeanime9} )`+`\n`+`⦿ [**${titulo10}**](${laurl10}) ( ${tipodeanime10} )`);

                                                    const resultado2 = new MessageEmbed()
                                                    .setTitle("Los animes en emisión son:")
                                                    .setColor("RANDOM")
                                                    .setDescription(`⦿ [**${titulo11}**](${laurl11}) ( ${tipodeanime11} )`+`\n`+`⦿ [**${titulo12}**](${laurl12}) ( ${tipodeanime12} )`+`\n`+`⦿ [**${titulo13}**](${laurl13}) ( ${tipodeanime13} )`+`\n`+`⦿ [**${titulo14}**](${laurl14}) ( ${tipodeanime14} )`+`\n`+`⦿ [**${titulo15}**](${laurl15}) ( ${tipodeanime15} )`+`\n`+`⦿ [**${titulo16}**](${laurl16}) ( ${tipodeanime16} )`+`\n`+`⦿ [**${titulo17}**](${laurl17}) ( ${tipodeanime17} )`+`\n`+`⦿ [**${titulo18}**](${laurl18}) ( ${tipodeanime18} )`+`\n`+`⦿ [**${titulo19}**](${laurl19}) ( ${tipodeanime19} )`+`\n`+`⦿ [**${titulo20}**](${laurl20}) ( ${tipodeanime20} )`);

                                                    const resultado3 = new MessageEmbed()
                                                    .setTitle("Los animes en emisión son:")
                                                    .setColor("RANDOM")
                                                    .setDescription(`⦿ [**${titulo21}**](${laurl21}) ( ${tipodeanime21} )`+`\n`+`⦿ [**${titulo22}**](${laurl22}) ( ${tipodeanime22} )`+`\n`+`⦿ [**${titulo23}**](${laurl23}) ( ${tipodeanime23} )`+`\n`+`⦿ [**${titulo24}**](${laurl24}) ( ${tipodeanime24} )`+`\n`+`⦿ [**${titulo25}**](${laurl25}) ( ${tipodeanime25} )`+`\n`+`⦿ [**${titulo26}**](${laurl26}) ( ${tipodeanime26} )`+`\n`+`⦿ [**${titulo27}**](${laurl27}) ( ${tipodeanime27} )`+`\n`+`⦿ [**${titulo28}**](${laurl28}) ( ${tipodeanime28} )`+`\n`+`⦿ [**${titulo29}**](${laurl29}) ( ${tipodeanime29} )`+`\n`+`⦿ [**${titulo30}**](${laurl30}) ( ${tipodeanime30} )`);

                                                    const button1 = new MessageButton()
                                                                    .setCustomId('previousbtn')
                                                                    .setEmoji(`${textoyemojis.emojis.izquierda}`)
                                                                    .setStyle('SECONDARY');

                                                    const button2 = new MessageButton()
                                                                    .setCustomId('nextbtn')
                                                                    .setEmoji(`${textoyemojis.emojis.derecha}`)
                                                                    .setStyle('SECONDARY');

                                                    // Create an array of embeds
                                                    pages = [
                                                        resultado1,
                                                        resultado2,
                                                        resultado3
                                                    ];

                                                    //create an array of buttons

                                                    buttonList = [
                                                        button1,
                                                        button2
                                                    ]
                                                
                                                paginationEmbed(msg, message, pages, buttonList);
                                                await browser.close();
                                            
                            }
            
                            
                            catch(error)
                            {
                                msg.edit({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("DARK_RED")
                                            .setTimestamp()
                                            .setDescription("Hubo un error al cargar los animes en emisión")
                                    ]});
                                console.log(error)
                            }
            };
};
module.exports.conf = {
    "name": "emision",
    "description": [ "Muestra los anime que se encuentran en emisión." ],
    "aliases": [ "enemision", "actual" ],
    "usage": [ "emision" ]
}
