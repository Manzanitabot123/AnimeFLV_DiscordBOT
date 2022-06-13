const privado = async(
    interaction,
    embed,
    component,
    edit
  ) => {
    const private = interaction.options.getString('privado') // 'true';
    const embedxd = embed? [embed]:[];
    const componentxd = component? [component]:[];
    const privadoxd = !private||(private==='true')?true:false;
    edit ? (interaction.editReply({ embeds: embedxd, components: componentxd, ephemeral: privadoxd})) : (interaction.reply({ embeds: embedxd, components: componentxd, ephemeral: privadoxd}))
  };
  module.exports = privado;