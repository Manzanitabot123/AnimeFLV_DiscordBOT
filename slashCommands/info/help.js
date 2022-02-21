const { Client, Interaction, MessageEmbed } = require("discord.js");
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run =  (client,interaction, options) => {
    console.log(options)
    interaction.reply(`EN CONSTRUCCIÓN`)
    
}
module.exports.conf = {
    "name": "help",
    "description": "Ve información detallada del Bot.",
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