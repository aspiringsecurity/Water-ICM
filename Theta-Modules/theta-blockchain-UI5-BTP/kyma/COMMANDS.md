kubectl exec theta-68bb65c4cf-th26x --namespace theta --kubeconfig ~/.kube/theta-kubeconfig.yml -it -- /bin/bash


export KUBECONFIG=/Users/i830671/git/kubeconfig_lcfx.yml

kubectl config get-contexts

kubectl port-forward mssql-865fccf8d4-9rf9t -n dev 1433:1433

kubectl get pod mssql-865fccf8d4-9rf9t -n dev --template="{{(index (index .spec.containers 0).ports 0).containerPort}}"

k
kubectl port-forward mssql-865fccf8d4-9rf9t --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev 1433:1433 --insecure-skip-tls-verify=true


cd /Users/i830671/git/kyma-runtime-extension-samples/api-mssql-go

docker build -t alunde/api-mssql-go -f docker/Dockerfile .

docker push alunde/api-mssql-go

docker run -p 8000:8000  --name api-mssql-go \
-e MYAPP_username="sa" \
-e MYAPP_password="Yukon900" \
-e MYAPP_database="DemoDB" \
-e MYAPP_host="host.docker.internal" \
-e MYAPP_port="1433" \
-d alunde/api-mssql-go:latest


kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev apply -f ./k8s/deployment.yaml

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev get po

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml logs api-mssql-go-5b86f68f57-jmxk8 -c api-mssql-go -n dev

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml get pod api-mssql-go-5b86f68f57-jmxk8 -n dev -o yaml

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev apply -f ./k8s/configmap.yaml

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev apply -f ./k8s/apirule.yaml

https://api-mssql-go.fe879d9.kyma.shoot.live.k8s-hana.ondemand.com/orders


export KUBECONFIG=/Users/i830671/git/kubeconfig_lcfx.yml
export KUBECONFIG=~/.kube/lcfx-kubeconfig.yml

docker build -t alunde/fe-ui5-mssql -f docker/Dockerfile .

docker push alunde/fe-ui5-mssql

kubectl --kubeconfig ~/.kube/lcfx-kubeconfig.yml -n dev apply -f ./k8s/configmap.yaml

export KUBECONFIG=~/.kube/lcfx-kubeconfig.yml

kubectl -n dev apply -f ./k8s/deployment.yaml

kubectl -n dev apply -f ./k8s/apirule.yaml

$ kubectl -n dev apply -f ./k8s/event.yaml
subscription.eventing.kyma-project.io/api-mssql-go-event-sub created


cd /Users/i830671/git/kyma-runtime-extension-samples/sample-websockets
kubectl -n dev apply -f k8s/server.yaml
kubectl -n dev apply -f k8s/server2.yaml