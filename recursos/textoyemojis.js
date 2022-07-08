module.exports = {
    embedColor: "RANDOM",
    imagelinks:{
        icono:"https://cdn.discordapp.com/attachments/945405660433117196/994735345939775548/LOGO_2.1.0_no_oficial_3-modified.png"
    },
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
        pensando:"<a:PensandoFLV:983855943781589052>",
        buscar:"<a:buscando:993941419729367162>",
        descargar:"<a:descargando:993941416524922900>",
        emisión:"<a:emiitidos:993941413962199050>",
        help:"<a:ayuda:993941665721094244>",
        random:"<a:randomizando:993941411932160083>"
    },
    tutorial:{
        buscar:"https://cdn.discordapp.com/attachments/945405660433117196/994030607615135825/Buscar_-T.gif",
        descargar:"https://cdn.discordapp.com/attachments/945405660433117196/994030608865054771/Descargar-T.gif",
        emisión:"https://cdn.discordapp.com/attachments/945405660433117196/994030608332370042/Emision-T.gif",
        help:"https://cdn.discordapp.com/attachments/945405660433117196/994030607036334120/Help-T.gif",
        random:"https://cdn.discordapp.com/attachments/945405660433117196/994030609544519710/Random-T.gif",
        usuario: "https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        botinfo:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        imagen:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        interacción:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        ping:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        pregunta:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        sudo:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        sugerencia:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        ucrania:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        yankenpo:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
        youtube:"https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3"
    },
    errors:{
        buscar: {
            LinkDirecto:"El enlace del anime proporcionado no existe:",
            CapDirecto:"El enlace del capitulo proporcionado no existe o no está disponible:",
            Argumento:"Desafortunadamente, el enlace del anime dejo de estar disponible en AnimeFLV:",
            SinResultados:"No existe ningún anime titulado",
            trylink:"Verifica el nombre o el link e intentalo de nuevo"
        },
        descargar: {
            trylink:"Verifica el nombre, el link o el capitulo e intentalo de nuevo",
            DetallesDirecto:"El anime no existe o el capitulo aún no esta disponible",
            VerDirecto:"El enlace del capitulo no existe",
            Argumento:"Ese capítulo no se encuentra disponible",
            SinResultados:"No se encontró ningún anime a descargar titulado"
        },
        emisión: {
            Argumento: "El enlace del anime en emisión arroja un error:"
        },
        random: {
            Argumento: "El enlace del anime elejido aleatoriamente arroja un error:"
        },
        espera: "Espera un tiempo a que se solucione solo...",
        errorlink: "Ese anime o link no existe o no esta dissponible",
        errorcap: "Ese capítulo o anime no existe o no esta dissponible"
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