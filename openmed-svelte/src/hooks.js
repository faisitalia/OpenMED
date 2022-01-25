// import { parseCookies } from "$lib/utils.js";

// export async function getSession(event) {
//   const cookie = event.locals.session;

//   console.log("from getSession");
//   console.log(cookie);

//   return cookie
//     ? { cookie: cookie }
//     : {};
// }

// export async function handle({ event, resolve }) {
//   let cookies = event.request.headers.get('cookie');
//   console.log("from handle");

//   if (cookies) cookies = parseCookies(cookies);
//   console.log(cookies);

//   event.locals.session = cookies;
//   // event.locals.session = event.request.headers.get('cookie');

//   return resolve(event);
// }
