const { Client, Interaction, MessageEmbed } = require("discord.js");
const es = require('../../langs/es.json')
/**
 * @param {Client} client
 * @param {Interaction} interaction
 * @param {es} lang
 */
module.exports.run =  (client,interaction, options,lang) => {
    console.log(options)
    interaction.reply(`EN CONSTRUCCIÓN`)
    
}
module.exports.conf = {
    "name": "help",
    "description": ["Bot ve komutlar hakkında bilgileri gösterir.","Displays bot's commands and info1."],
    "options":[
        {
            "name": "category",
            "description": "A category wants you display",
            "type": 3,
            "required": false,
            "choices": [
                {
                    "name": "Info",
                    "value": "info"
                },
                {
                    "name": "Settings",
                    "value": "settings"
                },
                {
                    "name": "Announce",
                    "value": "announce"
                }
            ]
        }
    ],
    "category": "info"
}