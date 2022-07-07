const Discord = require('discord.js');
const crypto = require('crypto').webcrypto;
const cron = require('cron');
const fetch = require('node-fetch');

module.exports = async(client) => {
    //Actividades
    setInterval(() => {
        const randomstatus = [
        {type: 'PLAYING', name: "/help"},
        {type: 'WATCHING', name: `${client.users.cache.size} usuarios`},
        {type: 'WATCHING', name: `${client.guilds.cache.size} servidores`},
        {type: 'WATCHING', name: "🇺🇦 | Apoya con /ucrania"},
        {type: 'PLAYING', name: "/help"},
        {type: 'LISTENING', name: "Openings"},
        {type: 'PLAYING', name: "Shōgi"},
        {type: 'WATCHING', name: "animeflv.net"},
        {type: 'STREAMING', name: "Kudasai | Lina Vermillion", url: "https://www.twitch.tv/linavermillion"},
        {type: 'STREAMING', name: "Kudasai | Kotori Hikari", url: "https://www.twitch.tv/kotorihikari"}
        ]
        const randomsts = randomstatus[Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * randomstatus.length)];
        client.user.setActivity(randomsts)
        }, 900000);
    //Chequear página
    const url = process.env.PAGINA_BOT;
    const cronJob =  new cron.CronJob('0 */20 * * * *', function() {
        fetch(url)
        .then(res => console.log(`[WEB] Respuesta: ${res.ok} | Estado: ${res.status}`))
        .catch(err => {console.log("No se pudo ", err)});
    });
    cronJob.start();
}