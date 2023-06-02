#!/bin/bash
#
# run netcat listening on 16888 to simulate a TCP/IP based server
# exec nc -l 16888 &>/dev/null &
#
mkdir -p /root/go/src/github.com/thetatoken/theta
git clone --branch master https://github.com/thetatoken/theta-protocol-ledger.git /root/go/src/github.com/thetatoken/theta
cp -r /root/go/src/github.com/thetatoken/theta/integration/privatenet /root/go/src/github.com/thetatoken/privatenet
# https://github.com/thetatoken/theta-mainnet-integration-guide/blob/master/docs/config.md
sed -i -e "s/HeightEnableValidatorReward uint64 = 4164982/HeightEnableValidatorReward uint64 = 20/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
#
sed -i -e "s/HeightEnableTheta2 uint64 = 5877350/HeightEnableTheta2 uint64 = 40/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
#
sed -i -e "s/HeightLowerGNStakeThresholdTo1000 uint64 = 8411427/HeightLowerGNStakeThresholdTo1000 uint64 = 50/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
# Adjust the blockheight at which smart contract support is enabled(50).
sed -i -e "s/HeightEnableSmartContract uint64 = 8411427/HeightEnableSmartContract uint64 = 50/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
#
sed -i -e "s/HeightSampleStakingReward uint64 = 9497418/HeightSampleStakingReward uint64 = 60/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
#
sed -i -e "s/HeightJune2021FeeAdjustment uint64 = 10709540/HeightJune2021FeeAdjustment uint64 = 70/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
#
sed -i -e "s/HeightEnableTheta3 uint64 = 10968061/HeightEnableTheta3 uint64 = 90/g" /root/go/src/github.com/thetatoken/theta/common/heights.go
# Lower the MinimumFundReserveDuration for easier testing of auto release of funds
sed -i -e "s/MinimumFundReserveDuration uint64 = 300/MinimumFundReserveDuration uint64 = 30/g" /root/go/src/github.com/thetatoken/theta/ledger/types/const.go
# Override default port 16888
echo '  port: 8080'  >> /root/go/src/github.com/thetatoken/privatenet/node/config.yaml
echo 'log:' >> /root/go/src/github.com/thetatoken/privatenet/node/config.yaml
echo '  levels: "*:info"'  >> /root/go/src/github.com/thetatoken/privatenet/node/config.yaml
mkdir -p /root/.thetacli
cp -r /root/go/src/github.com/thetatoken/theta/integration/privatenet/thetacli/* /root/.thetacli
chmod 700 /root/.thetacli/keys/encrypted

#/bin/bash -c "cd /root/go/src/github.com/thetatoken/theta ; make install"

/bin/bash -c "source /root/.bashrc ; echo \$THETA_HOME ; cd \$THETA_HOME ; make install ; start_theta.sh"

#sudo -u root 'echo $THETA_HOME ; cd $THETA_HOME ; make install ; exit'
#cd /root/go/src/github.com/thetatoken/theta
#make install

# exec /usr/local/bin/start_theta.sh &>/dev/null &

exec /bin/bash
