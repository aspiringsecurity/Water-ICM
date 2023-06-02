```
cd cf ; mkdir -p mta_archives ; mbt build -p=cf -t=mta_archives --mtar=theta.mtar
```

# Deploy Command:
```
cf deploy mta_archives/theta.mtar -f
```

# Initial Deploy One Time:
```
source ./inital_deploy
```

# Subsequent Build+Deploy Commands:
```
mbt build -p=cf -t=mta_archives --mtar=theta.mtar ; cf deploy mta_archives/theta.mtar -f -m theta-trustee
cf map-route theta-app cfapps.eu10.hana.ondemand.com --hostname theta-theta-dev
cf map-route theta-app cfapps.eu10.hana.ondemand.com --hostname subawseu10-theta-dev
cf map-route theta-app cfapps.eu10.hana.ondemand.com --hostname theta-suba-theta-dev
```

# Undeploy Command:
```
cf undeploy theta -f --delete-services
```
