const { Client, Message } = require("discord.js");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = (client, message, args) => {
    let d1 = new Date().getTime()

    message.reply('Pong!').then(msg =>{
        let d2 = message.createdTimestamp;
        const pingg = d2-d1;
        msg.edit("El ping del bot de "+pingg+" ms, mientras que del API es de "+Math.round(client.ws.ping)+" ms")
    })
}
module.exports.conf = {
    "name": "ping",
    "description": [ "Muestra el ping del bot." ],
    "aliases": ["pong", "latencia"],
    "usage": ["latencia"]
}
