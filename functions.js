function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function triggerCustomEvent(category = -1, action = -1, label = -1) {
  if (getCookie("useremail") === null) {
    return -1;
  }
  if (category == -1 || action == -1 || label == -1) {
    return -1;
  }
  let data = JSON.stringify({
    websiteid: "73537740-b4ba-11ed-b063-59b10fd8cc4b",
    authkey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRlcnByaXNlX2lkIjo0NDExLCJpYXQiOjE2NzcyOTUxMzN9.oueDExZn6WlHWA838b_65wnUZntHnaZ_VACFfdrqWVY",
    web_subs_id: "-1",
    event: {
      event_type: "web_push",
      eventcategory: category,
      eventaction: action,
      eventlabel: label,
      value: "",
      valuetype: "",
      timestamp: new Date().toISOString().replace("T", " ").replace("Z", ""),
      contact_variables: {
        email: getCookie("useremail"),
      },
      variables: {},
    },
  });

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://app.factoreal.com/api/v1/registerwebcustomevent");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
  return -1;
}
