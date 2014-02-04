var cronJob = require('cron').CronJob;
var teleinfo = require('teleinfo');
var util = require('util');

var infosCompteur = {};

function tarifbleu(port, cronTime, datalogger, errorcb) {

  var trameEvents = teleinfo(port);
  razinfosCompteur();
  trameEvents.on('tramedecodee', function (data) {
    majData(data);
  });

  trameEvents.on('error', function(err) {
    if (typeof errorcb === 'function') {
      errorcb(err);
    }
    else {
      console.log(err);
    }
  });

  var job = new cronJob(cronTime, function(){
      // Fonction exécutée toutes les minutes
      if (typeof datalogger === 'function') {
        // Suppression propriétés internes
        delete infosCompteur.psum;
        delete infosCompteur.isum;
        delete infosCompteur.nbMesure;
        datalogger(infosCompteur);
      }
      else {
        console.log(util.inspect(infosCompteur));
      }
      // Raz moyenne
      razinfosCompteur();
    }, function () {
      // Fonction exécutée lorsque le job s'arrête
      console.log('Job stoppé');
    },
    true
  );
}

function getPapp() {
  return infosCompteur.pinst;
}

function getIntensite() {
  return infosCompteur.iinst;
}

function getIndex() {
  return infosCompteur.index;
}

function razinfosCompteur() {
  infosCompteur.imini = 30; // max de la souscription
  infosCompteur.imaxi= 0;
  infosCompteur.imoy= 0;
  infosCompteur.isum= 0;
  infosCompteur.pmini= 8000; // max la souscription
  infosCompteur.pmaxi= 0;
  infosCompteur.pmoy= 0;
  infosCompteur.psum= 0;
  infosCompteur.nbMesure= 0;
}

function majData(data) {
  infosCompteur.nbMesure += 1;
  if (data.IINST<infosCompteur.imini) {
    infosCompteur.imini = data.IINST;
  }
  if (data.IINST>infosCompteur.imaxi) {
    infosCompteur.imaxi = data.IINST;
  }
  infosCompteur.isum += data.IINST;
  infosCompteur.imoy = infosCompteur.isum / infosCompteur.nbMesure;
  if (data.PAPP<infosCompteur.pmini) {
    infosCompteur.pmini = data.PAPP;
  }
  if (data.PAPP>infosCompteur.pmaxi) {
    infosCompteur.pmaxi = data.PAPP;
  }
  infosCompteur.psum += data.PAPP;
  infosCompteur.pmoy = infosCompteur.psum / infosCompteur.nbMesure;
  // Index compteur en Wh
  infosCompteur.index = data.BASE;
  // puissance apparente instantannée en VA
  infosCompteur.pinst = data.PAPP;
  // intensité instantannée en A
  infosCompteur.iinst = data.IINST;
}

exports.tarifbleu = tarifbleu;
exports.getPuissanceApparente = getPapp;
exports.getIntensite = getIntensite;
exports.getIndex = getIndex;
