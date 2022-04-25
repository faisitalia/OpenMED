import { usersEndpoint } from "$lib/uri.js";

export async function getSession(event) {
  // // The following is now commented out as we need the backend to be fixed
  // const cookie = event?.request?.headers?.get('cookie');
  // // If there's no cookies, no session can be restored
  // if (!cookie) return null;

  // // If there's a cookie, then we can fetch the session
  // const response = await fetch(
  //   `${usersEndpoint}/currentuser`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'cookie': cookie
  //     }
  //   }
  // );

  // // If something goes wrong with this call, we can't authenticate
  // if (!response.ok) return null;

  // // If we got a proper response body, we extract its currentUser prop
  // const responseBody = await response.json();
  // const currentUser = responseBody.currentUser;
  // // If it's null, then the server doesn't recognize this user
  // if (!currentUser) return null;

  // // If everything went smooth, we now have our server-rendered
  // // session object usable for when we hop back into the site!
  // return { ...currentUser };

  return {
    id: "some id",
    user: 'user',
    name: 'Fabrizio',
    roles: ['doctor'],
  }
}
