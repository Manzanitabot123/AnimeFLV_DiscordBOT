const { Client, Message } = require("discord.js");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = (client, message, args) => {
    let d1 = new Date().getTime()

    message.reply('Pong!').then(msg =>{
        let d2 = message.createdTimestamp
        msg.edit("El ping del bot de "+d2-d1+" ms, mientras que del API es de "+Math.round(client.ws.ping)+" ms")
    })
}
module.exports.conf = {
    "name": "ping",
    "description": [{
        "lang": "es",
        "description": "Muestra el ping del bot."
    }, {
        "lang": "en",
        "description": "Display bot's ping."
    }],
    "aliases": ["pong", "latencia"],
    "usage": [{
        "lang": "es",
        "usage": "latencia"
    }, {
        "lang": "en",
        "usage": "ping"
    }]
}
