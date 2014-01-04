Module tarifbleu
================
Module node.js exploitant les données spécifiques du tarif bleu.
Ce module utilise le module [cron](https://github.com/ncb000gt/node-cron) et utilise une fonction callback qu'elle exécute à fréquence donnée (configuration du cron).

Dépendance avec les modules teleinfo, cron et serialport. Installation du module :

    npm install tarifbleu

Utilisation
-----------

Importer le module :

```javascript
var tarifbleu = require('tarifbleu');
```

Démarrer le 'job' en utilisant la fonction tarifbleu :

```javascript
tarifbleu.tarifbleu('/dev/ttyAMA0', '00 * * * * *', datalogger);
```

Les paramètres de cette fonction sont :

* Le nom du port
* La configuration du cron
* Une fonction callback prenant en paramètre l'objet de données

Contenu de l'objet de données :

```javascript
    { imini: 1,
      imaxi: 1,
      imoy: 1,
      pmini: 200,
      pmaxi: 210,
      pmoy: 208.57142857142858,
      index: 6401853,
      pinst: 210,
      iinst: 1 }
```

avec :
* imini, imaxi, imoy : l'intensité mini/maxi/moyenne pendant la période (en A)
* pmini, pmaxi, pmoy : puissance apparente mini/maxi/moyenne pendant la période (en VA)
* index : index compteur (en Wh)
* pinst, iinst : puissance apparente et intensité instantanées à la fin de la période

Les valeurs instantannées sont disponibles via les fonctions :
```javascript
tarifbleu.getPuissanceApparente();
tarifbleu.getIntensite();
tarifbleu.getIndex();
```
