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
  <link rel="stylesheet" type="text/css" href="recursos/estilo.css" />
  <link rel="icon" href="https://cdn.discordapp.com/avatars/938856255416569946/d5facd45ba90a6774f728365e9266b40.webp" />
  <title>🤖 | AnimeFLV Bot </title>
  </head>
  <body>
  <img alt="Animeflv" src="https://cdn.discordapp.com/avatars/938856255416569946/d5facd45ba90a6774f728365e9266b40.webp">
  <h1 contenteditable="false">AnimeFLV Bot v${version}</h1>\n    
  </br>
  <footer class="theme-footer"></footer>
  <h2>Un Bot de Discord (no oficial 🤖) para ver información y descargar animes clásicos, actuales y populares.</h2>\n    
  <p>Consola:</p>
  <pre>${getConsole()}</pre>
  \n\n    \x3C!-- InfluAds -->\n    
  <div id="influads_block" class="influads_block" style="display: none !important;"></div>
  <p><a href="https://github.com/Manzanitabot123/AnimeFLV_DiscordBOT/issues">Haz click aquí si tienes alguna duda o problema</a> <span>·</span> Hecho por <a href="https://github.com/Manzanitabot123/">${author}</a></p>
  <footer class="theme-footer"></footer>
  </br>
  </br>
  <a href="https://discord.ly/animeflv"><div class="area">◍ Bot en línea</div></a>
  </body>`)
});
animeflvBot.get("/invite", (req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=938856255416569946&permissions=150055939184&scope=bot%20applications.commands');
});
animeflvBot.listen(PORT, () => {
  console.log(`[WEB] Aplicación en el puerto ${PORT}`);
});
}
