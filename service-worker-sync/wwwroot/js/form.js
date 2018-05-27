function saveAndSubmit() {
    var messageText = document.getElementById("messageText").value;
    if (messageText == "") {
        alert("enter some text!");
        return;
    }

    var message = {
        "messageText": messageText,
    };
    navigator.serviceWorker.ready.then(function (swRegistration) {
        console.log("Sending Sync message");
        return swRegistration.sync.register("sendMessages");
    });
}