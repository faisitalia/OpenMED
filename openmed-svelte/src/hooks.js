export async function getSession(event) {
  return {
    cookie: event?.request?.headers?.get('cookie')
  };
}

// export async function handle({ event, resolve }) {
//   event.locals.session = event?.request?.headers;

//   return resolve(event);
// }
