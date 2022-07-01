(async () => {
const puppeteer = require('puppeteer');
var start = new Date().getTime();
//_____________________________
const minimal_args = [
    `--window-size=320,480`,
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=egl',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: './Datos',
    args: minimal_args
  })
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.goto('https://www3.animeflv.net/', {waitUntil: 'load', timeout: 0});
  //A
  const totalEnEmisión = await page.evaluate(() => { return document.getElementsByClassName("ListSdbr")[0].childElementCount});
  console.log(totalEnEmisión)
  for (let i = 1; i <= totalEnEmisión; i++) {
    const result = `//*[@id="mCSB_1_container"]/ul/li[${i}]/a/text()`;
    const pelianime = `#mCSB_1_container > ul > li:nth-child(${i}) > a > span`;
    const enlace = `#mCSB_1_container > ul > li:nth-child(${i}) > a`;
    //Para todos __________________________________________________________________________________________________________________________________________________________________________________       
    await page.waitForXPath(result);
    let element = await page.$x(result);
    let valuexd = await page.evaluate(el => el.textContent, element[0]);
    let titulo = valuexd;

    const url = await page.$$eval(enlace, urlone => urlone.map(href => href.getAttribute('href')));

    await page.waitForSelector(pelianime);
    let tipo = await page.$(pelianime);
    let tipodeanime = await page.evaluate(el => el.textContent, tipo);
    console.log(titulo+" | ("+tipodeanime+") | "+url)
  }
  browser.close();
//__________________________________________
var end = new Date().getTime();
var time = end - start;
console.log('Tiempo total: ' + time);
})();