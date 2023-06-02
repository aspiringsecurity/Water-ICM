#!/bin/bash
#
# run netcat listening on 1234 to simulate a TCP/IP based server
# exec nc -l 1234 &>/dev/null &
#
#
#echo "Sleepy..."
#sleep 10
# Start the MySQL Server
#
echo "THETA Private Network Start."
cd $THETA_HOME ; echo "" >> /root/.bashrc ; echo 'echo "...Theta Private Net has started."' >> ~/.bashrc ; echo 'echo "screen -x theta"' >> ~/.bashrc ; screen -d -m -S theta /bin/bash -c "sleep 2 ; exec theta start --config=../privatenet/node --password qwertyuiop"

