chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url === "https://api-ui.hyperliquid.xyz/info") {
      if (details.requestBody && details.requestBody.raw) {
        const body = JSON.parse(new TextDecoder('utf-8').decode(details.requestBody.raw[0].bytes));
        if (body.type === "legalCheck") {
          console.log('Intercepting Hyperliquid check');
          const customResponse = {"ipAllowed":true,"acceptedTerms":true,"userAllowed":true};
          return { redirectUrl: "data:application/json," + encodeURIComponent(JSON.stringify(customResponse)) };
        }
      }
    }
  },
  {urls: ["<all_urls>"]},
  ["requestBody", "blocking"]
);
