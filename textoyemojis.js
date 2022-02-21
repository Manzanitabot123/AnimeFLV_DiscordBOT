module.exports = {
    emojis:{
        estrella: "<a:estrellaFLV:945408753249968169>",
        media_estrella: "<a:media_estrellaFLV:945409376523526164>",
    },
    errors:{
        error: "ERROR",
        noPerm: "¡No tienes permiso para hacer esto!",
        noChannel: "Debes especificar un canal",
        wrongUsage: "No has escrito nada. | **Intenta con:**",
        unknown: "Un error desconocido"
    },
    messages:{
        description: "Descripción",
        views: "vistas",
        wait: "Espere por favor...",
        channel: "Canal",
        click: "Click aquí",
        usedby: "Usado por",
        wentLive: "fue en vivo!",
        viewers: "Espectadores",
        game: "Juego",
        newvideo: "ha publicado nuevo video!"
    },
    commands:{
        setLang: {
            messages:{
                success: "Language successfully changed to **English**",
                available: "en / english"
            },
            errors:{
                noLang: "Ese idioma no existe. | **Intenta con:**",
                sameLang: " ya ha sido colocado. | **Disponibles:**"
            }
        },
        setPrefix: {
            messages:{
                prefix: "El prefijo o prefix es ",
                newPrefix: "Prefijo cambiado correctamente a "
            },
            errors:{
                long: "EL prefijo sobrepasa con el limite de 3 letras. | **Intentalo de nuevo**",
                same: "EL prefijo escrito sigue siendo el mismo. | **Intentalo de nuevo**"
            }
        } 
    },
    categories: {
        info: "Información"
    }
}