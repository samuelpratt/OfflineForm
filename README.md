# Offline Form Submission

This is a PoC of a offline send using a service worker. If you turn off your network connection and push send in /form.html
then the contents of the form will be sent to /api/Post next time the network is up.

# References

* https://www.twilio.com/blog/2017/02/send-messages-when-youre-back-online-with-service-workers-and-background-sync.html
* https://developers.google.com/web/ilt/pwa/live-data-in-the-service-worker#storing_data_with_indexeddb
* This uses the Promises IDB library from https://github.com/jakearchibald/idb
