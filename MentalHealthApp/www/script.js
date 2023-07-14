// CORDOVA CODES
console.log("SCRIPTJS SUCCESSFULY LOADED");

document.addEventListener("deviceready", onDeviceReady, false);

window.parent.sendNotif = (to, title, message) => {
  const serverKey =
    "AAAAGL9LrQw:APA91bGLMn01d-FEDLPmoLECXxnzDX2izkblFlAc2rm0igZ3Vq5bebfAYaWezbbt07VjrdyCH8esJVQ4iZzKEC05OwsnT68KeVA3yl765B6XEesLiuYQx2W2gwxrppuoDSzMZq6EX3BK";
  const deviceToken =
    "c98sXgqR_pg:APA91bEPK4-B6lgDpYmOwqs-m2kQ89JdGD8vLx99tfnLMjKcJQ4LRjpFgybft2N34nviXh2n_VsB1Yhf1t4MYPlhzt9btl81Pa4fsXUuQnju85Ij6zbJ4_XeVMsBSzbiA2ITJxdy4H_x";

  const url = "https://fcm.googleapis.com/fcm/send";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `key=${serverKey}`,
  };

  const body = JSON.stringify({
    to: to,
    notification: {
      title: title,
      body: message,
    },
  });

  fetch(url, {
    method: "POST",
    headers,
    body,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Notification sent successfully!");
      } else {
        console.error(
          "Failed to send notification:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};

function onDeviceReady() {
  // Now safe to use device APIs

  console.log("DEVICE READY IS READY AND TRIGGERED");

  console.log(cordova.plugins.notification.local.launchDetails);

  cordova.plugins.backgroundMode.enable();

  // Cordova plugin PUSH
  window.push = PushNotification.init({
    android: {},
    browser: {},
    ios: {
      alert: "true",
      badge: "true",
      sound: "true",
    },
    windows: {},
  });

  window.push.on("registration", (data) => {
    // data.registrationId
    console.log(data.registrationId);
    window.notificationRegistrationId = data.registrationId;
    console.log(window.notificationRegistrationId);
  });

  window.push.on("notification", (data) => {
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
    console.log(data);

    let notificationSetup = {
      title: data.title,
      text: data.message,
      data: data.additionalData || undefined,
      icon: data.image || undefined,
    };

    if (data.additionalData.button) {
      notificationSetup["actions"] = [
        {
          id: data.additionalData.button?.toLowerCase().replace(" ", "_"),
          title: data.additionalData.button,
        },
      ];
    }

    console.log(notificationSetup);

    cordova.plugins.notification.local.schedule(notificationSetup);
  });

  window.push.on("error", (e) => {
    // e.message
  });





  // CORDOVA NOTIFICATION ON CLICK EVENT
  cordova.plugins.notification.local.on('click', data => {
    console.log(data);
  }, );
}
