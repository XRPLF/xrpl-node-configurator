<template>
  <pre><code>
[server]
port_rpc_admin_local
port_peer
port_ws_admin_local

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 51235
ip = 0.0.0.0
protocol = peer

[port_ws_admin_local]
port = 6006
ip = 127.0.0.1
admin = 127.0.0.1
protocol = ws
send_queue_limit = 500

#-------------------------------------------------------------------------------

[node_size]
medium

# This is primary persistent datastore for rippled.  This includes transaction
# metadata, account states, and ledger headers.  Helpful information can be
# found at https://xrpl.org/capacity-planning.html#node-db-type
# type=NuDB is recommended for non-validators with fast SSDs. Validators or
#    slow / spinning disks should use RocksDB. Caution: Spinning disks are
#    not recommended. They do not perform well enough to consistently remain
#    synced to the network.
# online_delete=512 is recommended to delete old ledgers while maintaining at
#    least 512.
# advisory_delete=0 allows the online delete process to run automatically
#    when the node has approximately two times the "online_delete" value of
#    ledgers. No external administrative command is required to initiate
#    deletion.
[node_db]
type=NuDB
path=/var/lib/rippled/db/nudb
online_delete=512
advisory_delete=0

# This is the persistent datastore for shards. It is important for the health
# of the ripple network that rippled operators shard as much as practical.
# NuDB requires SSD storage. Helpful information can be found at
# https://xrpl.org/history-sharding.html
#[shard_db]
#path=/var/lib/rippled/db/shards/nudb
#max_historical_shards=50
#
# This optional section can be configured with a list
# of paths to use for storing historical shards. Each
# path must correspond to a unique filesystem.
#[historical_shard_paths]
#/path/1
#/path/2

[database_path]
/var/lib/rippled/db

# This needs to be an absolute directory reference, not a relative one.
# Modify this value as required.
[debug_logfile]
/var/log/rippled/debug.log

[sntp_servers]
time.windows.com
time.apple.com
time.nist.gov
pool.ntp.org

# To use the XRP test network
# (see https://xrpl.org/connect-your-rippled-to-the-xrp-test-net.html),
# use the following [ips] section:
# [ips]
# r.altnet.rippletest.net 51235

# File containing trusted validator keys or validator list publishers.
# Unless an absolute path is specified, it will be considered relative to the
# folder in which the rippled.cfg file is located.
[validators_file]
validators.txt

# Turn down default logging to save disk space in the long run.
# Valid values here are trace, debug, info, warning, error, and fatal
[rpc_startup]
{ "command": "log_level", "severity": "warning" }

# If ssl_verify is 1, certificates will be validated.
# To allow the use of self-signed certificates for development or internal use,
# set to ssl_verify to 0.
[ssl_verify]
1
  </code></pre>
</template>

<script>
export default {
  name: 'RippledCfg'
}
</script>
