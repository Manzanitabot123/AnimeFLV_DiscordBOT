const privado = async(
    interaction,
    embed,
    component,
    edit
  ) => {
    const chequear = interaction.options.getString('privado') // 'true';
    const embedxd = embed? [embed]:[];
    const componentxd = component? [component]:[];
    const privadoxd = !chequear||(chequear==='true')?true:false;
    edit ? (interaction.editReply({ embeds: embedxd, components: componentxd, ephemeral: privadoxd})) : (interaction.reply({ embeds: embedxd, components: componentxd, ephemeral: privadoxd}))
  };
  module.exports = privado;