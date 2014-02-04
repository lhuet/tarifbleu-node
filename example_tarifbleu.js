var tarifbleu = require('./tarifbleu');
var util = require('util');

var datalogger = function (data) {
	console.log(new Date());
	console.log(util.inspect(data));
};

var infoCompteur = tarifbleu('/dev/ttyAMA0', '00 * * * * *', datalogger);

setInterval(function() {
	console.log('Papp : ' + infoCompteur.getPuissanceApparente() + ' VA');
	console.log('Intensité : ' + infoCompteur.getIntensite() + ' A');
	console.log('Index compteur : ' + infoCompteur.getIndex() + ' Wh');
}, 2000);

console.log('Lancement datalogger tarifbleu');
