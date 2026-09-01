self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      title: "WPBL",
      body: event.data ? event.data.text() : "New WPBL notification"
    };
  }

  const title = data.title || "WPBL";

  const options = {
    body: data.body || "New WPBL notification",
    icon: "https://raw.githubusercontent.com/asnehpets/GLOAT-League/main/approved-wpbl-logo.png",
    badge: "https://raw.githubusercontent.com/asnehpets/GLOAT-League/main/approved-wpbl-logo.png",
    data: {
      url: data.url || "https://asnehpets.github.io/WPBL/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "https://asnehpets.github.io/WPBL/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(windowClients => {
      for (const client of windowClients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
