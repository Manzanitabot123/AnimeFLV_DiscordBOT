const elejiirPrivado = option => option.setName('visibilidad').setDescription('Elige si mostrar a todos o solo a ti').addChoices(
{
    name: 'Mostrar a todos', 
    value: 'false'
},
{
    name: 'Mostrar solo a mí', 
    value: 'true'
}
);

const privado = async(
  interaction,
  embed,
  component
) => {
  const chequear = interaction.options.getString('visibilidad') // 'true';
  const embedxd = embed? embed:[];
  const componentxd = component? component:[];
  const visibilidad = !chequear||(chequear==='true')?true:false;
  return interaction.reply({ embeds: embedxd, components: componentxd, ephemeral: visibilidad})
};

module.exports = [privado, elejiirPrivado];