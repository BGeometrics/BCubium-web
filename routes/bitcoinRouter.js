var express = require('express');
var router = express.Router();

const bitcoinController = require('../controllers/bitcoinController');
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
router.get('/bitcoin_restart', bitcoinController.bitcoin_restart);
router.get('/bitcoin_opreturn_home', bitcoinController.bitcoin_opreturn_home);
router.post('/bitcoin_opreturn_message', bitcoinController.bitcoin_opreturn_message);
router.get('/bitcoin_opreturn_message', bitcoinController.bitcoin_opreturn_message);
router.post('/bitcoin_load_wallet', bitcoinController.bitcoin_load_wallet);
router.get('/bitcoin_load_wallet', bitcoinController.bitcoin_load_wallet);
router.post('/bitcoin_create_wallet', bitcoinController.bitcoin_create_wallet);
router.get('/bitcoin_create_wallet', bitcoinController.bitcoin_create_wallet);
router.get('/bitcoin_opreturn_show_txs', bitcoinController.bitcoin_opreturn_show_txs);
router.get('/bitcoin_opreturn_show_message', bitcoinController.bitcoin_opreturn_show_message);

router.get('/lnd_start', lndController.lnd_start);
router.get('/lnd_stop', lndController.lnd_stop);
router.get('/lnd_enable', lndController.lnd_enable);
router.get('/lnd_disable', lndController.lnd_disable);
router.get('/lnd_status', lndController.lnd_status);
router.get('/lnd_home', lndController.lnd_home);
router.get('/lnd_wallet_delete', lndController.lnd_wallet_delete);
router.get('/lnd_wallet_create', lndController.lnd_wallet_create);
router.get('/lnd_wallet_backup', lndController.lnd_wallet_backup);
router.get('/lnd_restart', lndController.lnd_restart);
router.get('/lnd_wallet_home', lndController.lnd_wallet_home);

router.get('/tor_enable', torController.tor_enable);
router.get('/tor_disable', torController.tor_disable);
router.get('/tor_status', torController.tor_status);
router.get('/tor_restart', torController.tor_restart);

router.get('/btcrpcexplorer_start', btcrpcexplorerController.btcrpcexplorer_start);
router.get('/btcrpcexplorer_stop', btcrpcexplorerController.btcrpcexplorer_stop);
router.get('/btcrpcexplorer_enable', btcrpcexplorerController.btcrpcexplorer_enable);
router.get('/btcrpcexplorer_disable', btcrpcexplorerController.btcrpcexplorer_disable);
router.get('/btcrpcexplorer_status', btcrpcexplorerController.btcrpcexplorer_status);
router.get('/btcrpcexplorer_home', btcrpcexplorerController.btcrpcexplorer_home);
router.get('/btcrpcexplorer_restart', btcrpcexplorerController.btcrpcexplorer_restart);

router.get('/rtl_start', rtlController.rtl_start);
router.get('/rtl_stop', rtlController.rtl_stop);
router.get('/rtl_enable', rtlController.rtl_enable);
router.get('/rtl_disable', rtlController.rtl_disable);
router.get('/rtl_restart', rtlController.rtl_restart);
router.get('/rtl_status', rtlController.rtl_status);

router.get('/firewall_enable', firewallController.firewall_enable);
router.get('/firewall_disable', firewallController.firewall_disable);
router.get('/firewall_status', firewallController.firewall_status);
router.get('/firewall_restart', firewallController.firewall_restart);

router.get('/openvpn_start', openvpnController.openvpn_start);
router.get('/openvpn_stop', openvpnController.openvpn_stop);
router.get('/openvpn_enable', openvpnController.openvpn_enable);
router.get('/openvpn_disable', openvpnController.openvpn_disable);
router.get('/openvpn_status', openvpnController.openvpn_status);
router.get('/openvpn_home', openvpnController.openvpn_home);
router.get('/openvpn_set_port', openvpnController.openvpn_home);
router.post('/openvpn_set_port', openvpnController.openvpn_home);
router.get('/openvpn_restart', openvpnController.openvpn_restart);

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
router.get('/graphics_home', usefulController.graphics_home);
router.get('/router_open', usefulController.router_open);
router.get('/settings_home', usefulController.settings_home);
router.get('/password_change', usefulController.password_change);
router.post('/password_change', usefulController.password_change);
router.get('/reboot_node', usefulController.reboot_node);
router.get('/halt_node', usefulController.halt_node);
router.get('/glances_start', usefulController.glances_start);

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
router.get('/wireguard_set_port', wireguardController.wireguard_set_publicIP_port);
router.post('/wireguard_set_port', wireguardController.wireguard_set_publicIP_port);
router.get('/wireguard_restart', wireguardController.wireguard_restart);
router.get('/wireguard_update_publicIP', wireguardController.wireguard_update_publicIP);



module.exports = router;
