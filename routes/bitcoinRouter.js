var express = require('express');
var router = express.Router();

const bitcoinController = require('../controllers/bitcoinController');
const electrumController = require('../controllers/electrumController');
const lndController = require('../controllers/lndController');
const torController = require('../controllers/torController');
const backupController = require('../controllers/backupController');
const btcrpcexplorerController = require('../controllers/btcrpcexplorerController');

router.get('/', bitcoinController.bitcoin_home);
router.get('/home/', bitcoinController.bitcoin_home);
router.get('/bitcoin_enable', bitcoinController.bitcoin_enable);
router.get('/bitcoin_disable', bitcoinController.bitcoin_disable);
router.get('/bitcoin_status', bitcoinController.bitcoin_status);

router.get('/electrum_enable', electrumController.electrum_enable);
router.get('/electrum_disable', electrumController.electrum_disable);
router.get('/electrum_status', electrumController.electrum_status);

router.get('/lnd_enable', lndController.lnd_enable);
router.get('/lnd_disable', lndController.lnd_disable);
router.get('/lnd_status', lndController.lnd_status);

router.get('/tor_enable', torController.tor_enable);
router.get('/tor_disable', torController.tor_disable);
router.get('/tor_status', torController.tor_status);

router.get('/btcrpcexplorer_enable', btcrpcexplorerController.btcrpcexplorer_enable);
router.get('/btcrpcexplorer_disable', btcrpcexplorerController.btcrpcexplorer_disable);
router.get('/btcrpcexplorer_status', btcrpcexplorerController.btcrpcexplorer_status);

router.get('/backup', backupController.backup);

// Pages
/* Page to display all shopping lists
router.get('/', listsController.fetchAll);
// Page to create new shopping list
router.get('/create', listsController.create);
// Page to fetch shopping list by id
router.get('/:listId', listsController.read);
// Page to update shopping list
router.get('/:listId/update', listsController.update);
// Page to search for items
router.get('/:listId/itemSearch', listsController.itemSearch);
*/

module.exports = router;
