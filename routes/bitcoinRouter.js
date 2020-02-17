var express = require('express');
var router = express.Router();

const bitcoinController = require('../controllers/bitcoinController');
const electrumController = require('../controllers/electrumController');
const lndController = require('../controllers/lndController');
const torController = require('../controllers/torController');
const btcrpcexplorerController = require('../controllers/btcrpcexplorerController');
const firewallController = require('../controllers/firewallController');
const openvpnController = require('../controllers/openvpnController');
const wifiController = require('../controllers/wifiController');
const usefulController = require('../controllers/usefulController');
const rtlController = require('../controllers/rtlController');
const webconfigController = require('../controllers/webconfigController');
const wireguardController = require('../controllers/wireguardController');

router.get('/', bitcoinController.bitcoin_home);
router.get('/home/', bitcoinController.bitcoin_home);
router.get('/bitcoin_enable', bitcoinController.bitcoin_enable);
router.get('/bitcoin_disable', bitcoinController.bitcoin_disable);
router.get('/bitcoin_status', bitcoinController.bitcoin_status);

router.get('/electrum_start', electrumController.electrum_start);
router.get('/electrum_stop', electrumController.electrum_stop);
router.get('/electrum_enable', electrumController.electrum_enable);
router.get('/electrum_disable', electrumController.electrum_disable);
router.get('/electrum_status', electrumController.electrum_status);

router.get('/lnd_start', lndController.lnd_start);
router.get('/lnd_stop', lndController.lnd_stop);
router.get('/lnd_enable', lndController.lnd_enable);
router.get('/lnd_disable', lndController.lnd_disable);
router.get('/lnd_status', lndController.lnd_status);

router.get('/tor_enable', torController.tor_enable);
router.get('/tor_disable', torController.tor_disable);
router.get('/tor_status', torController.tor_status);

router.get('/btcrpcexplorer_start', btcrpcexplorerController.btcrpcexplorer_start);
router.get('/btcrpcexplorer_start', btcrpcexplorerController.btcrpcexplorer_start);
router.get('/btcrpcexplorer_enable', btcrpcexplorerController.btcrpcexplorer_enable);
router.get('/btcrpcexplorer_disable', btcrpcexplorerController.btcrpcexplorer_disable);
router.get('/btcrpcexplorer_status', btcrpcexplorerController.btcrpcexplorer_status);
router.get('/btcrpcexplorer_home', btcrpcexplorerController.btcrpcexplorer_home);

router.get('/rtl_start', rtlController.rtl_start);
router.get('/rtl_stop', rtlController.rtl_stop);
router.get('/rtl_enable', rtlController.rtl_enable);
router.get('/rtl_disable', rtlController.rtl_disable);
router.get('/rtl_status', rtlController.rtl_status);

router.get('/firewall_enable', firewallController.firewall_enable);
router.get('/firewall_disable', firewallController.firewall_disable);
router.get('/firewall_status', firewallController.firewall_status);

router.get('/openvpn_start', openvpnController.openvpn_start);
router.get('/openvpn_stop', openvpnController.openvpn_stop);
router.get('/openvpn_enable', openvpnController.openvpn_enable);
router.get('/openvpn_disable', openvpnController.openvpn_disable);
router.get('/openvpn_status', openvpnController.openvpn_status);
router.get('/openvpn_home', openvpnController.openvpn_home);
router.get('/openvpn_set_port', openvpnController.openvpn_home);
router.post('/openvpn_set_port', openvpnController.openvpn_home);

router.get('/webconfig_restart', webconfigController.webconfig_restart);

router.get('/backup_home', usefulController.backup_home);
router.get('/port_home', usefulController.port_home);
router.get('/port_redirect_add', usefulController.port_redirect_add);
router.post('/port_redirect_add', usefulController.port_redirect_add);
router.get('/port_redirect_delete', usefulController.port_redirect_delete);
router.get('/upnp_home', usefulController.upnp_home);
router.get('/upnp_add', usefulController.upnp_add);
router.post('/upnp_add', usefulController.upnp_add);
router.get('/upnp_delete', usefulController.upnp_delete);
router.get('/system_ports_home', usefulController.system_ports_home);

router.get('/wifi_home', wifiController.wifi_home);
router.get('/wifi_scan', wifiController.wifi_scan);
router.get('/wifi_connect', wifiController.wifi_connect);
router.post('/wifi_connect', wifiController.wifi_connect);

router.get('/wireguard_home', wireguardController.wireguard_home);
router.get('/wireguard_start', wireguardController.wireguard_start);
router.get('/wireguard_stop', wireguardController.wireguard_stop);
router.get('/wireguard_enable', wireguardController.wireguard_enable);
router.get('/wireguard_disable', wireguardController.wireguard_disable);
router.get('/wireguard_status', wireguardController.wireguard_status);
router.get('/wireguard_set_port', wireguardController.wireguard_home);
router.post('/wireguard_set_port', wireguardController.wireguard_home);



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
