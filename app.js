var dataToSave = [];

let url = 'https://swapi.co/api/people/1/';

function getReqUsingCallback(url, callback) {
    let request = new XMLHttpRequest();
    request.onload = function () {
        console.log(`Response from ${url} has arrived!`);
        console.log(request.response);
        if (callback) {
            callback(request.response);
        };
    }
    request.onerror = function () {
        let message = `Error accessing URL at ${url}`;
        callback(new Error(msg));
    }
    request.open('GET', url);
    request.send();
}

function getReqUsingPromise(url) {
    let newPromise = new Promise((resolve, reject) => {  // these 2 parameters are required. They are funcs that must be called with the success value or error;
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
        request.onload = function () {
            console.log(`Promise response from ${url} has arrived!`);
            console.log(request.response);
            resolve(request.response);
        }

        request.onerror = function () {
            let message = `Error accessing URL at ${url}`;
            reject(new Error(msg));
        }

    });

    return newPromise;

}

getReqUsingCallback(url, function (err, res) {
    if (err) console.log(err)
    else {
        console.log(res);
    }
});

getReqUsingCallback(url, function (err, res) {
    if (err) console.log(err)
    else {
        console.log('response 1 received');
        dataToSave.push(res);
        getReqUsingCallback(url, function (err, res) {
            if (err) console.log(err)
            else {
                console.log('response 2 received');
                dataToSave.push(res);
                getReqUsingCallback(url, function (err, res) {
                    if (err) console.log(err)
                    else {
                        console.log('response 3 received');
                        dataToSave.push(res);
                    }
                });
            }
        });
    }
});

getReqUsingPromise(url)
    .then((response, err) => {
        if (err) throw err;
        console.log(response)
        dataToSave.push(response)
    })
    .catch(() => {
        console.log('error')
    });

let aBunchOfGetRequestsINeed = [getReqUsingPromise(url), getReqUsingPromise(url), getReqUsingPromise(url)];

Promise.all(aBunchOfGetRequestsINeed)
    .then(allTheResponseData => {
        dataToSave.push(allTheResponseData);
    });