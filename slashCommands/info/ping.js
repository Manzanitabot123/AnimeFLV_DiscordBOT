const { Client, Interaction } = require("discord.js");
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run = (client, interaction) => {
    let d2 = interaction.createdTimestamp
    interaction.reply(`${d2 - Date.now()} ms`)
    console.log(interaction.options)
}
module.exports.conf = {
    "name": "ping",
    "description": "Calcula el ping del Bot",
    "options": [],
    "category": "info"
}