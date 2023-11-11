import https from "https";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export async function scrapePage(endpoint: string): Promise<jsdom.JSDOM> {
  return new Promise((resolve, reject) => {
    https
      .get(endpoint, (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          const dom = new JSDOM(data);
          resolve(dom);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
}

export function isNotAuthorized(page: jsdom.JSDOM): boolean {
  return (
    page.window.document.body.textContent?.includes("Access Denied") || false
  );
}
