module.exports = {
    getSubscriptions: getSubscriptions,
    createRoute: createRoute,
    deleteRoute: deleteRoute,
    getDestination: getDestination
};

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const axios = require('axios');
const qs = require('qs');

async function getSubscriptions(registry) {
    try {
        // get access token
        let options = {
            method: 'POST',
            url: registry.url + '/oauth/token?grant_type=client_credentials&response_type=token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(registry.clientid + ':' + registry.clientsecret).toString('base64')
            }
        };
        let res = await axios(options);
        try {
            // get subscriptions
            let options1 = {
                method: 'GET',
                url: registry.saas_registry_url + '/saas-manager/v1/application/subscriptions',
                headers: {
                    'Authorization': 'Bearer ' + res.data.access_token
                }
            };
            let res1 = await axios(options1);
            return res1.data;
        } catch (err) {
            console.log(err.stack);
            return err.message;
        }
    } catch (err) {
        console.log(err.stack);
        return err.message;
    }
};

// http://v3-apidocs.cloudfoundry.org/version/3.107.0/index.html#apps
async function getCFInfo(appname) {
    try {
        // get authentication url
        let options = {
            method: 'GET',
            url: appEnv.app.cf_api + '/info'
        };
        let res = await axios(options);
        try {
            // get access token
            let options1 = {
                method: 'POST',
                url: res.data.authorization_endpoint + '/oauth/token?grant_type=password',
                data: qs.stringify({
                    username: process.env.cf_api_user,
                    password: process.env.cf_api_password
                }),
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('cf:').toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            let res1 = await axios(options1);
            try {
                // get app guid
                let options2 = {
                    method: 'GET',
                    // url: appEnv.app.cf_api + '/v3/apps?organization_guids=' + appEnv.app.organization_id + '&space_guids=' + appEnv.app.space_id + '&names=' + appname,
                    url: appEnv.app.cf_api + '/v3/apps?include=space,space.organization',
                    headers: {
                        'Authorization': 'Bearer ' + res1.data.access_token
                    }
                };
                let res2 = await axios(options2);
                try {
                    // get domain guid
                    let options3 = {
                        method: 'GET',
                        url: appEnv.app.cf_api + '/v3/domains?names=' + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[1],
                        headers: {
                            'Authorization': 'Bearer ' + res1.data.access_token
                        }
                    };
                    let res3 = await axios(options3);
                    let results = {
                        'access_token': res1.data.access_token,
                        'app_id': res2.data.resources[0].guid,
                        'domain_id': res3.data.resources[0].guid
                    };
                    return results;
                } catch (err) {
                    console.log(err.stack);
                    return err.message;
                }
            } catch (err) {
                console.log(err.stack);
                return err.message;
            }
        } catch (err) {
            console.log(err.stack);
            return err.message;
        }
    } catch (err) {
        console.log(err.stack);
        return err.message;
    }
};

async function createRoute(tenantHost, appname) {
    getCFInfo(appname).then(
        async function (CFInfo) {
            try {
                // create route
                let options = {
                    method: 'POST',
                    url: appEnv.app.cf_api + '/v3/routes',
                    data: {
                        'host': tenantHost,
                        'relationships': {
                            'space': {
                                'data': {
                                    'guid': appEnv.app.space_id
                                }
                            },
                            'domain': {
                                'data': {
                                    'guid': CFInfo.domain_id
                                }
                            }
                        }
                    },
                    headers: {
                        'Authorization': 'Bearer ' + CFInfo.access_token,
                        'Content-Type': 'application/json'
                    }
                };
                let res = await axios(options);
                try {
                    // map route to app
                    let options2 = {
                        method: 'POST',
                        url: appEnv.app.cf_api + '/v3/routes/' + res.data.guid + '/destinations',
                        data: {
                            'destinations': [{
                                'app': {
                                    'guid': CFInfo.app_id
                                }
                            }]
                        },
                        headers: {
                            'Authorization': 'Bearer ' + CFInfo.access_token,
                            'Content-Type': 'application/json'
                        }
                    };
                    let res2 = await axios(options2);
                    console.log('Route created for ' + tenantHost);
                    return res2.data;
                } catch (err) {
                    console.log(err.stack);
                    return err.message;
                }
            } catch (err) {
                console.log(err.stack);
                return err.message;
            }
        },
        function (err) {
            console.log(err.stack);
            return err.message;
        });
};

// http://v3-apidocs.cloudfoundry.org/version/3.107.0/index.html#routes
async function deleteRoute(tenantHost, appname) {
    getCFInfo(appname).then(
        async function (CFInfo) {
            try {
                // get route id
                let options = {
                    method: 'GET',
                    url: appEnv.app.cf_api + '/v3/apps/' + CFInfo.app_id + '/routes?hosts=' + tenantHost,
                    headers: {
                        'Authorization': 'Bearer ' + CFInfo.access_token
                    }
                };
                let res = await axios(options);
                if (res.data.pagination.total_results === 1) {
                    try {
                        // delete route
                        let options2 = {
                            method: 'DELETE',
                            url: appEnv.app.cf_api + '/v3/routes/' + res.data.resources[0].guid,
                            headers: {
                                'Authorization': 'Bearer ' + CFInfo.access_token
                            }
                        };
                        let res2 = await axios(options2);
                        console.log('Route deleted for ' + tenantHost);
                        return res2.data;
                    } catch (err) {
                        console.log(err.stack);
                        return err.message;
                    }
                } else {
                    let errmsg = { 'error': 'Route not found' };
                    console.log(errmsg);
                    return errmsg;
                }
            } catch (err) {
                console.log(err.stack);
                return err.message;
            }
        },
        function (err) {
            console.log(err.stack);
            return err.message;
        });
};


async function getDestination(dest, subdomain, destination) {
    try {
        // use tenant subdomain to authenticate
        let url = dest.url.split('://')[0] + '://' + subdomain + dest.url.slice(dest.url.indexOf('.'));
        try {
            let options1 = {
                method: 'POST',
                url: url + '/oauth/token?grant_type=client_credentials',
                headers: {
                    Authorization: 'Basic ' + Buffer.from(dest.clientid + ':' + dest.clientsecret).toString('base64')
                }
            };
            let res1 = await axios(options1);
            try {
                options2 = {
                    method: 'GET',
                    url: dest.uri + '/destination-configuration/v1/destinations/' + destination,
                    headers: {
                        Authorization: 'Bearer ' + res1.data.access_token
                    }
                };
                let res2 = await axios(options2);
                return res2.data.destinationConfiguration;
            } catch (err) {
                console.log(err.stack);
                return err.message;
            }
        } catch (err) {
            console.log(err.stack);
            return err.message;
        }
    } catch (err) {
        console.log(err.stack);
        return err.message;
    }
};
