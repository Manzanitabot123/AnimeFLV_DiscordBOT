const { Client, Message, MessageEmbed, MessageButton, MessageActionRow, MessageManager} = require("discord.js");
const { errors } = require("puppeteer");
/** 
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
    const collectormsg = await message.reply({
        content: "Escribe un numero"
    }).then(msg => {
        const filter = (m) => m.author.id === message.author.id;;
        const collector = msg.channel.createMessageCollector({
            filter,
            time: 10000,
            errors: ['time']
        });

    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
    collector.on('collect', mensaje => {
        const value = mensaje.content;
        if ((mensaje.content.toLowerCase() === 'cancelar') || (mensaje.content.toLowerCase() === 'cancel')) {
        collector.stop();
        mensaje.delete()
        msg.edit('Bye!');
        } else if (isNumber(value) === true) {
        collector.stop();
        mensaje.delete()
        msg.edit(value);
        } else {
        collector.stop();
        mensaje.delete()
        msg.edit('tenias un solo trabajo y era poner un puto numero y ni eso puedes hacer');
        }
      });
      
    collector.on('end', (collected, reason) => {
        if (collected.size < 1) {
        // reason is the one you passed above with the stop() method
        msg.edit(`Te falto escribir`);
        }
      });
    })
}

module.exports.conf = {
    "name": "prueba",
    "description": [{
        "lang": "es",
        "description": "Muestra el ping del bot."
    }, {
        "lang": "en",
        "description": "Display bot's ping."
    }],
    "aliases": ["pruebita"],
    "usage": [{
        "lang": "es",
        "usage": "latencia"
    }, {
        "lang": "en",
        "usage": "ping"
    }]
}
