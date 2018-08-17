/**
 * Returns a gapi object after injecting a script tag and waiting
 * for it to do 'onload'
 */
export default (window, document) =>
  new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.id = "gapiLoader";
    scriptEle.src = "https://apis.google.com/js/api.js";
    scriptEle.async = true;
    scriptEle.defer = true;
    scriptEle.onload = () =>
      window.gapi && window.gapi.load
        ? window.gapi.load("client:auth2", {
            callback: () => resolve(window.gapi),
            onerror: reject
          })
        : reject("gapi object not found");
    document.head.appendChild(scriptEle);
  });
