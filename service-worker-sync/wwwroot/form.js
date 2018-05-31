function saveAndSubmit() {
    var messageText = document.getElementById("messageText").value;
    if (messageText == "") {
        alert("enter some text!");
        return;
    }

    var message = {
        "messageText": messageText,
    };

    idb.open('messages', 1, function (upgradeDb) {
        upgradeDb.createObjectStore('outbox', {
            autoIncrement: true,
            keyPath: 'id'
        });
    }).then(function (db) {
        console.log("Message added to db is " + JSON.stringify(message));
        var transaction = db.transaction('outbox', 'readwrite');
        return transaction.objectStore('outbox').put(message);
    }).then(function () {
        navigator.serviceWorker.ready.then(function (swRegistration) {
            console.log("Sending Sync message");
            return swRegistration.sync.register("sendMessages");
        });
    });

    
}