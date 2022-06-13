const privado = async(
    interaction,
    embed,
    component,
    edit
  ) => {
    const private = interaction.options.getString('privado') // 'true';
    if (private === 'false') {
    edit ? (interaction.editReply({ embeds: (embed? [embed]:[]), components: (component? [component]:[]), ephemeral: false })) : (interaction.reply({ embeds: (embed? [embed]:[]), components: (component? [component]:[]), ephemeral: false }))
    } else if (!private || private === 'true') { edit ? (interaction.editReply({ embeds: (embed? [embed]:[]), components: (component? [component]:[]), ephemeral: true })) : (interaction.reply({ embeds: (embed? [embed]:[]), components: (component? [component]:[]), ephemeral: true })) };
  };
  module.exports = privado;