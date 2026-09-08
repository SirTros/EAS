self.addEventListener("push", event => {

    let data = {};

    try {
        data = event.data
            ? event.data.json()
            : {};
    } catch (error) {

        data = {
            text: event.data
                ? event.data.text()
                : "Nové nouzové upozornění."
        };
    }

    const title = "SirTros-city EAS";

    const options = {

        body:
            data.text ||
            "Bylo přijato nové nouzové upozornění.",

        icon: "./icon.png",

        badge: "./icon.png",

        tag:
            data.alertId
                ? `sirtros-city-eas-${data.alertId}`
                : "sirtros-city-eas",

        renotify: true,

        requireInteraction: true,

        data: {
            alertId: data.alertId || null,
            type: data.type || null
        }

    };

    event.waitUntil(

        self.registration.showNotification(
            title,
            options
        )

    );

});


self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        event.waitUntil(

            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            }).then(clientList => {

                for (const client of clientList) {

                    if ("focus" in client) {
                        return client.focus();
                    }

                }

                if (clients.openWindow) {
                    return clients.openWindow("./");
                }

            })

        );

    }
);
