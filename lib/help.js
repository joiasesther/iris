const config = require('./config/config.json')
const prefix = config.prefix
exports.help = help()
function help() {
	return `   *Joias Esther*

*${prefix}sobre*
_Um pouco sobre nós e nossos produtos!_

*${prefix}garantia*
_Nossos termos de garantia._

*${prefix}catálogo*
_Catálogo completo da nossa última coleção._

*${prefix}naosei*
_slakkkkkkkkk._

*${prefix}help (mensagem)*
_Informe erros para os responsáveis do Bot._

*${prefix}sticker*
_Faço suas imagens virarem sticker rapidinho!_

*${prefix}gif*
_Com isso você pode fazer stickers com gifs também!_

*${prefix}criador*
_Conheça o carinha legal que me construiu.._
`
}

exports.down = down()
function down() {
    return `
	*☾ Downloads ☽*
	
*Caso algum comando não funcione significa que o servidor caiu e é necessário esperar.*

*1 - ${prefix}Play <nome>*
_Baixe musicas pelo nome._

*2 - ${prefix}Mp3 <link do YouTube>*
_Baixe audios por link._

*3 - ${prefix}Mp4 <link do YouTube>*
_Baixe videos por link._

*4 - ${prefix}fb <link facebook>*
_Baixe videos do facebook._`
}

exports.paises = paises()
function paises() {
	return `_Nomes aceitados no comando_ *${prefix}covid*\n\nAfghanistan\n\nAlbania\n\nAlgeria\n\nAndorra\n\nAngola\n\nAnguilla\n\nAntigua and Barbuda\n\nArgentina\n\nArmenia\n\nAruba\n\nAustralia\n\nAustria\n\nAzerbaijan\n\nBahamas\n\nBahrain\n\nBangladesh\n\nBarbados\n\nBelarus\n\nBelgium\n\nBelize\n\nBenin\n\nBermuda\n\nBhutan\n\nBolivia\n\nBosnia and Herzegovina\n\nBotswana\n\nBrazil\n\nBritish Virgin Islands\n\nBrunei\n\nBulgaria\n\nBurkina Faso\n\nBurundi\n\nCAR\n\nCabo Verde\n\nCambodia\n\nCameroon\n\nCanada\n\nCaribbean Netherlands\n\nCayman Islands\n\nChad\n\nChannel Islands\n\nChile\n\nChina\n\nColombia\n\nComoros\n\nCongo\n\nCosta Rica\n\nCroatia\n\nCuba\n\nCuraçao\n\nCyprus\n\nCzechia\n\nDRC\n\nDenmark\n\nDiamond Princess\n\nDjibouti\n\nDominica\n\nDominican Republic\n\nEcuador\n\nEgypt\n\nEl Salvador\n\nEquatorial Guinea\n\nEritrea\n\nEstonia\n\nEswatini\n\nEthiopia\n\nFaeroe Islands\n\nFalkland Islands\n\nFiji\n\nFinland\n\nFrance\n\nFrench Guiana\n\nFrench Polynesia\n\nGabon\n\nGambia\n\nGeorgia\n\nGermany\n\nGhana\n\nGibraltar\n\nGreece\n\nGreenland\n\nGrenada\n\nGuadeloupe\n\nGuatemala\n\nGuinea-Bissau\n\nGuinea\n\nGuyana\n\nHaiti\n\nHonduras\n\nHong Kong\n\nHungary\n\nIceland\n\nIndia\n\nIndonesia\n\nIran\n\nIraq\n\nIreland\n\nIsle of Man\n\nIsrael\n\nItaly\n\nIvory Coast\n\nJamaica\n\nJapan\n\nJordan\n\nKazakhstan\n\nKenya\n\nKuwait\n\nKyrgyzstan\n\nLaos\n\nLatvia\n\nLebanon\n\nLesotho\n\nLiberia\n\nLibya\n\nLiechtenstein\n\nLithuania\n\nLuxembourg\n\nMS Zaandam\n\nMacao\n\nMadagascar\n\nMalawi\n\nMalaysia\n\nMaldives\n\nMali\n\nMalta\n\nMarshall Islands\n\nMartinique\n\nMauritania\n\nMauritius\n\nMayotte\n\nMexico\n\nMicronesia\n\nMoldova\n\nMonaco\n\nMongolia\n\nMontenegro\n\nMontserrat\n\nMorocco\n\nMozambique\n\nMyanmar\n\nNamibia\n\nNepal\n\nNetherlands\n\nNew Caledonia\n\nNew Zealand\n\nNicaragua\n\nNiger\n\nNigeria\n\nNorth Macedonia\n\nNorway\n\nOman\n\nPakistan\n\nPalestine\n\nPanama\n\nPapua New Guinea\n\nParaguay\n\nPeru\n\nPhilippines\n\nPoland\n\nPortugal\n\nQatar\n\nRomania\n\nRussia\n\nRwanda\n\nRéunion\n\nS. Korea\n\nSaint Kitts and Nevis\n\nSaint Lucia\n\nSaint Martin\n\nSaint Pierre Miquelon\n\nSamoa\n\nSan Marino\n\nSao Tome and Principe\n\nSaudi Arabia\n\nSenegal\n\nSerbia\n\nSeychelles\n\nSierra Leone\n\nSingapore\n\nSint Maarten\n\nSlovakia\n\nSlovenia\n\nSolomon Islands\n\nSomalia\n\nSouth Africa\n\nSouth Sudan\n\nSpain\n\nSri Lanka\n\nSt. Barth\n\nSt. Vincent Grenadines\n\nSudan\n\nSuriname\n\nSweden\n\nSwitzerland\n\nSyria\n\nTaiwan\n\nTajikistan\n\nTanzania\n\nThailand\n\nTimor-Leste\n\nTogo\n\nTrinidad and Tobago\n\nTunisia\n\nTurkey\n\nTurks and Caicos\n\nUAE\n\nUK\n\nUSA\n\nUganda\n\nUkraine\n\nUruguay\n\nUzbekistan\n\nVanuatu\n\nVatican City\n\nVenezuela\n\nVietnam\n\nWallis and Futuna\n\nWestern Sahara\n\nWorld\n\nYemen\n\nZambia\n\nZimbabwe`
}
