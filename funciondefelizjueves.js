//Nunca se ejecuta

/* setInterval(() => {
    client.guilds.cache.forEach(guild => {
        try {
        const channel = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') || guild.channels.cache.first();
        if (channel) {
            channel.send('hola');
        } else {
            console.log('The server ' + guild.name + ' has no channels.');
        }
    } catch (err) {
        console.log('Could not send message to ' + guild.name + '.');
    }
    });
    
}, 15000); */