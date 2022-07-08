module.exports = () => {
  let express = require('express');
  let helmet = require("helmet");
  let animeflvBot = express();  // Compliant
  animeflvBot.use(helmet.hidePoweredBy());
  
  const { version, author} = require('../package.json');
  const PORT = process.env.PORT || 3000;
  let TodaLaConsola = [];
  console.defaultLog = console.log.bind(console);
  console.log = function(){
      TodaLaConsola.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
      console.defaultLog.apply(console, arguments);
  }
  console.defaultError = console.error.bind(console);
  console.error = function(){
      TodaLaConsola.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
      console.defaultError.apply(console, arguments);
  }
  console.defaultWarn = console.warn.bind(console);
  console.warn = function(){
      TodaLaConsola.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
      console.defaultWarn.apply(console, arguments);
  }
  console.defaultDebug = console.debug.bind(console);
  console.debug = function(){
      TodaLaConsola.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
      console.defaultDebug.apply(console, arguments);
  }
  
  const getConsole = function () {return `${TodaLaConsola.map(x => "<small>("+x.type + ")</small> <b>" +x.datetime + ":</b>\n<mark>" + x.value+"</mark>").join('<br/>')}`}
  animeflvBot.use(express.static(process.cwd()));
  animeflvBot.get("/", (req, res) => {
    res.send(`<head>
    <meta charset="utf-8">
    <meta name="description" content="Bot de Discord (no oficial 🤖) de Animeflv en Español para ver información y descargar anime.">
    <meta name="keywords" content="Discord Bot, Animeflv, Anime">
    <title>Animeflv | Discord Bot 🤖</title>
    <meta content="es" name="language">
    <meta name="author" content="Ⲙⲇnzⲇnitⲇgⲇmer123#0647">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffcf3d>
    <meta property="og:url" content="${process.env.PAGINA_BOT}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Animeflv | Discord Bot 🤖">
    <meta property="og:description" content="Bot de Discord (no oficial 🤖) de Animeflv en Español para ver información y descargar anime.">
    <meta property="og:image" content="https://cdn.discordapp.com/attachments/945405660433117196/987098300740157480/Copia_de_LOGO_2.1.0_no_oficial.gif">
    <meta property="og:site_name" content="herokuapp.com">
    <meta name="twitter:card" content="summary">
    <meta property="twitter:domain" content="herokuapp.com">
    <meta property="twitter:url" content="${process.env.PAGINA_BOT}">
    <meta name="twitter:title" content="Animeflv | Discord Bot 🤖">
    <meta name="twitter:description" content="Bot de Discord (no oficial 🤖) de Animeflv en Español para ver información y descargar anime.">
    <meta name="twitter:image" content="${textoyemojis.imagelinks.icono}">
    <meta name="twitter:image:src" content="https://cdn.discordapp.com/attachments/945405660433117196/987098300740157480/Copia_de_LOGO_2.1.0_no_oficial.gif">
    <link rel="stylesheet" type="text/css" href="recursos/estilo.css" />
    <link rel="icon" href="${textoyemojis.imagelinks.icono}" />
    </head>
    <body>
    <div class="fondo">
    <img alt="Animeflv" src="${textoyemojis.imagelinks.icono}">
    <h1 contenteditable="false">AnimeFLV Bot v${version}</h1>\n    
    </br>
    <footer class="theme-footer"></footer>
    <h2>Un Bot de Discord (no oficial 🤖) para **ver información y descargar animes clásicos, actuales y populares** de AnimeFLV</h2>\n    
    <p>Consola:</p>
    <pre id="consola1">${getConsole()}</pre> 
    <div id="influads_block" class="influads_block" style="display: none !important;"></div>
    <p><a href="https://github.com/Manzanitabot123/AnimeFLV_DiscordBOT/issues">Haz click aquí si tienes alguna duda o problema</a> <span>·</span> Hecho por <a href="https://github.com/Manzanitabot123/">${author}</a></p>
    <footer class="theme-footer"></footer>
    </br>
    </br>
    <a href="https://discord.ly/animeflv"><div class="area">◍ En línea</div></a>
    </div>
    <script>
    /* https://stream.laut.fm/lofi?ref=radiode
    https://stream.zeno.fm/z1sqn9mt6mzuv.aac */
    setInterval(() => {fetch('/')
      .then(function(response) {
          // When the page is loaded convert it to text
          return response.text()
      })
      .then(function(html) {
          // Initialize the DOM parser
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          document.getElementById("consola1").innerHTML = doc.getElementById("consola1").innerHTML;
      })
      .catch(function(err) {  
          console.log('Failed to fetch page: ', err);  
      });}, 10000)
      const typeWriterr = new Audio("https://stream.laut.fm/lofi?ref=radiode"); typeWriterr.volume = 0.4;
      let playAttempt = setInterval(() => {
        typeWriterr.play()
          .then(() => {
            clearInterval(playAttempt);
          })
          .catch(error => {
            console.log('Unable to play the video, User has not interacted yet.');
          });
      }, 3000);
      
    </script>
    </body>`)
  });
  animeflvBot.get("/invite", (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=938856255416569946&permissions=150055939184&scope=bot%20applications.commands');
  });
  animeflvBot.listen(PORT, () => {
    console.log(`[WEB] Aplicación en el puerto ${PORT}`);
  });
}
