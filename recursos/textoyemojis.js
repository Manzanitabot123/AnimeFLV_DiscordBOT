module.exports = {
    embedColor: "RANDOM",
    emojis:{
        estrella: "<a:estrellaFLV:945408753249968169>",
        media_estrella: "<a:media_estrellaFLV:945409376523526164>",
        animeflv: "<a:AnimeFLV1:945675767369568266><a:AnimeFLV2:945675765138202664><a:AnimeFLV3:945675764957872159><a:AnimeFLV4:945675765435994192>",
        izquierda: "<:IzquierdaFLV:945696417526218783>",
        derecha: "<:DerechaFLV:945696417740116018>",
        listo: "<a:ListoFLV:947173571699044402>",
        cancelar: "<a:CancelarFLV:947289005236584458>",
        canal: "<:CanalFLV:947286971095605248>",
        dado: "<a:DadoFLV:947287706642317332>",
        encendido: "<:EncendidoFLV:947306164469788702>",
        apagado: "<:ApagadoFLV:947306164440412211>",
        animeflv_icon: "<:AnimeFLV:945855622669287534>",
        facebook_icon: "<:FacebookFLV:945855771135082546>",
        twitter_icon: "<:TwitterFLV:945856036064067586>",
        instagram_icon: "<:InstagramFLV:947687993399980102>",
        youtube_icon: "<:YoutubeFLV:947686135419793469>",
        comando_icon: "<:comandomcFLV:982393744231903262>",
        pin_icon: "<a:pinFLV:982394281899737209>",
        escribiendo_icon:"<a:escribiendoFLV:982394277491531776>",
        cutelove:"<a:cute:982394279924211742>",
        nesuko:"<a:nesukoFLV:982472564569935873>",
        cursor:"<a:CursorFLV:982818673653870612>",
        textorandom:"<:TextoFLV:982818156915589181>",
        play:"<a:PlayFLV:983158611494731806>",
        pensando:"<a:PensandoFLV:983855943781589052>"
    },
    errors:{
        error: "ERROR",
        noPerm: "¡No tienes permiso para hacer esto!",
        noChannel: "Debes especificar un canal",
        wrongUsage: "No has escrito nada. | **Intenta con:**",
        unknown: "Un error desconocido",
        error404: "Esa página no está disponible en el servidor. ``` Page Not Found | ERROR 404``",
        error522: "Se agotó el tiempo de espera de Animeflv al intentar conectarse con el servidor. ```Connection timed out | ERROR 522```",
        error502: "El servidor proxy no pudo obtener una respuesta válida del servidor de origen. ```Bad Gateway | ERROR 502```",
        espera: "Espera un tiempo a que se solucione solo...",
        errorlink: "Ese anime o link no existe o no esta dissponible",
        errorcap: "Ese capítulo o anime no existe o no esta dissponible",
        trylink: "Verifica el nombre o el link e intentalo de nuevo"
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
        newvideo: "ha publicado nuevo video!",
        eleccion: "Se cancelará la eleccion automáticamente en 18 segundos"
    },
    commands:{
        setPrefix: {
            messages:{
                prefix: "El prefijo o prefix es ",
                newPrefix: "Prefijo cambiado correctamente a "
            },
            errors:{
                long: "EL prefijo sobrepasa con el limite de 3 letras. | **Intentalo de nuevo**",
                same: "EL prefijo escrito sigue siendo el mismo. | **Intentalo de nuevo**"
            }
        },
        felizjueves: {
            messages:{
                newConfig: "El mensaje semanal de *Feliz Jueves* ha sido: ",
                sigueConfig: "El mensaje semanal de *Feliz Jueves* se mantiene: ",
                newChannel: "<a:ListoFLV:947173571699044402> Ahora los mensajes se enviarán a: ",
                randomChannel: "El canal ahora será: <a:DadoFLV:947287706642317332> **Aleatorio**",
                randomChannelnota: "Nota: Por lo general es el primer canal del servidor.",
                randomChanneloff: "El canal de *Feliz jueves* ahora será: **Aleatoria** cuando se vuelva a **activar**..."
            },
            errors:{
                same: "La configuración de mensaje semanal de *Feliz Jueves* sigue siendo la misma. | **Intentalo de nuevo**",
                notextChannel: "Recuerda que el canal debe ser de tipo texto y accesible",
                falseparatenerChannel: "No se puede establecer un canal si la función esta **Desactivada**",
                anterior: "<a:CancelarFLV:947289005236584458> **Se canceló la elección del canal.** Permancerá con la configuración del canal anteriror."
            }
        } 
    },
    categories: {
        info: "Información"
    }
}