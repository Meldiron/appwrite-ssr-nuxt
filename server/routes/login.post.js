import * as setCookieParser from "set-cookie-parser";

const { AppwriteEndpoint, AppwriteProject, AppwriteHostname, SsrHostname } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const fetch = event.fetch;

  try {
    const response = await fetch(
      `${AppwriteEndpoint}/account/sessions/anonymous`,
      {
        method: "POST",
        headers: {
          "x-appwrite-project": AppwriteProject,
          cookie: "",
          cookies: "",
        },
      }
    );

    const json = await response.json();

    if (json.code >= 400) {
      throw createError({
        statusCode: 400,
        statusMessage: json.message,
      });
    }

    const ssrHostname =
      SsrHostname === "localhost" ? SsrHostname : "." + SsrHostname;
    const appwriteHostname =
      AppwriteHostname === "localhost"
        ? AppwriteHostname
        : "." + AppwriteHostname;

    const cookiesStr = (response.headers.get("set-cookie") ?? "")
      .split(appwriteHostname)
      .join(ssrHostname);

    const cookiesArray = setCookieParser.splitCookiesString(cookiesStr);
    const cookiesParsed = cookiesArray.map((cookie) =>
      setCookieParser.parseString(cookie)
    );

    for (const cookie of cookiesParsed) {
      setCookie(event, cookie.name, cookie.value, {
        domain: cookie.domain,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path,
        maxAge: cookie.maxAge,
        httpOnly: cookie.httpOnly,
        expires: cookie.expires,
      });
    }

    return json;
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err.message,
    });
  }
});
