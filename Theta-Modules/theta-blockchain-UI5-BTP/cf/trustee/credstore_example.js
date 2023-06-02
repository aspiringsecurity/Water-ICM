const fetch = require('node-fetch');
const jose = require('node-jose');

function checkStatus(response) {
    if (!response.ok) throw Error("Unexpected status code: " + response.status);
    return response;
}

async function decryptPayload(privateKey, payload) {
    const key = await jose.JWK.asKey(
        `-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`, 
        "pem", 
        {alg: "RSA-OAEP-256", enc: "A256GCM"}
    );
    const decrypt = await jose.JWE.createDecrypt(key).decrypt(payload);
    const result = decrypt.plaintext.toString();
    return result;
}

async function encryptPayload(publicKey, payload) {
    const key = await jose.JWK.asKey(
        `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`, 
        "pem", 
        {alg: "RSA-OAEP-256"}
    );    
    const options = {
        contentAlg: "A256GCM",
        compact: true,
        fields: {"iat": Math.round(new Date().getTime() / 1000)}
    };
    const result = await jose.JWE.createEncrypt(options, key).update(Buffer.from(payload, "utf8")).final();
    return result;
}

function headers(binding, namespace, init) {
    const result = new fetch.Headers(init);
    result.set("Authorization", `Basic ${Buffer.from(`${binding.username}:${binding.password}`).toString("base64")}`);
    result.set("sapcp-credstore-namespace", namespace);
    return result;
}

async function fetchAndDecrypt(privateKey, url, method, headers, body) {
    const result = await fetch(url, {method, headers, body})
        .then(checkStatus)
        .then(response => response.text())
        .then(payload => decryptPayload(privateKey, payload))
        .then(JSON.parse);
    return result;
}

async function readCredential(binding, namespace, type, name) {
    return fetchAndDecrypt(
        binding.encryption.client_private_key,
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`, 
        "get", 
        headers(binding, namespace)
    );
}

async function writeCredential(binding, namespace, type, credential) {
    return fetchAndDecrypt(
        binding.encryption.client_private_key,
        `${binding.url}/${type}`, 
        "post", 
        headers(binding, namespace, {"Content-Type": "application/jose"}), 
        await encryptPayload(binding.encryption.server_public_key, JSON.stringify(credential))
    );
}

async function deleteCredential(binding, namespace, type, name) {
    await fetch(
        `${binding.url}/${type}?name=${encodeURIComponent(name)}`, 
        {
            method: "delete",
            headers: headers(binding, namespace)
        }
    ).then(checkStatus);
}

// Run this to inject the ENV like when app is deployed to CF
// cf copyenv theta-trustee | source /dev/stdin

const binding = JSON.parse(process.env.VCAP_SERVICES).credstore[0].credentials;
let password = {
    name: "privkey", 
    value: "0x93a90ea508331dfdf27fb79757d4250b4e84954927ba0073cd67454ac432c737", 
    username: "user1", 
    metadata: "{\"url\": \"https://www.example.com/path\"}"
};

// SAP Help Portal : SAP Credential Store : Code Example
// https://help.sap.com/viewer/601525c6e5604e4192451d5e7328fa3c/Cloud/en-US/decad8fa526c40138d2a6843fb6a82bb.html

// Credstore Cockpit
// https://cockpit.eu10.hana.ondemand.com/cockpit/#/globalaccount/71f51ce6-c6b5-4583-a6ac-49e392506619/subaccount/bc6ba931-d86a-4804-8e5a-60429930e9b3/org/9afb8943-cb19-4cef-9a1f-c74df59feecf/space/51be80b4-5bec-41e1-9844-b10fe818b6bb/service/af1390d0-2b82-4de8-a1c8-5cc162b57de3/instance/24148380-9c90-48f2-964f-d6139aeb5dfd/namespace/privatenet/credentials

// Load the Environment 
// cf copyenv theta-trustee | source /dev/stdin

async function doMain() {

    console.log("binding: " + JSON.stringify(binding, null, 2));
    var result = null;

    try {
        //result = await writeCredential(binding, "privatenet", "password", password);
        //console.log("write result:" + JSON.stringify(result));

        result = await readCredential(binding, "privatenet", "password", password.name);
        console.log("read result:" + JSON.stringify(result));

        result = await readCredential(binding, "privatenet", "password", "privkey");
        console.log("read result:" + JSON.stringify(result));
        //await deleteCredential(binding, "privatenet", "password", password.name);
        /*
        let key = {
            name: "key1", 
            value: jose.util.randomBytes(32).toString("base64"), 
            format: "aes", 
            metadata: "256 bits"
        };
        console.log(await writeCredential(binding, "privatenet", "key", key));
        console.log(await readCredential(binding, "namespace1", "key", key.name));
        await deleteCredential(binding, "namespace1", "key", key.name);
        */
    } catch (e) {
        console.log(e);
    }
}

doMain();