---
title:   Getting started with Google Calendar API
date:    2014-11-24
blog: true
tags:
- apis
- dev
draft: true
---

I have begun experimenting with [Google Apps Application APIs][0], with the intention of building a Javascript client-side application to interface with Google Calendar. I'm going to demonstrate what I've learned with a scenario flow for accessing the Google Calendar REST API.

# What I've learned

Google APIs use the OAuth 2.0 protocol for authentication and authorization. In this scenario, *Authentication* is the process of verifying the identity of a user, and *Authorization* is the process of determing which actions are allowed, usually based on the identity of the user. They are usually both referred to as *auth*, because both are requirements that are central to the security of a system. To understand more about the OAuth2 protocol, refer to [this][2] guide.

# Steps

In this scenario, we will use Google APIs OAuth2 protocol to request an authorization token, which will allow us to access the [Google Calendar API][3]

## Setting up the service

We need to set up the service (google) so it will recognize the client.

1. First, go to the [Google Developers Console][4] and set up a new Project.
2. Click on the Project to select it,
3. Afterwards, click on the **Credentials** item in the menu, under the **APIs & Auth** section of the menu.
4. Click the **Create new Client ID** button.
5. Select **Installed Application**

On the page, you will see a section titled **Client ID for native application**. Within the section, there should be 3 items:
1. Client ID
2. Client Secret
3. Redirect URIs

Next, click on **Consent screen** under the **APIs & Auth** section of the menu, and create your consent screen. Be sure to choose a support email address. This screen is what the user will see when he or she authenticates with the Google OAuth2 protocol.

## Getting an authorization code

The authorization code is used to request a Google APIs Authorization token from Google's OAuth2 protocol.

Make a GET request to this URI: `https://accounts.google.com/o/oauth2/auth`

Provide these query parameters:

1. *response_type*=code
  - This is to tell the service that we want an authorization code
2. *client_id*=[Your Client ID]
3. *redirect_uri*=urn:ietf:wg:oauth:2.0:oob
  - I'll explain this later
4. *scope*=https://www.googleapis.com/auth/calendar

Your request should look like this:

    https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=[Your CLIENTID]&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar

This will redirect to a page where the user can log into Google and grant access to your app.

After you grant access to your app, it will redirect you to a special page with an authorization code. This is why we chose `urn:ietf:wg:oauth:2.0:oob` as the `redirect_uri`. With this code, the application can request an *Authorization Token* from Google APis.

Be sure to copy the authorization code, we will use this in the next step.

## Getting an authorization token

Make a POST request to this URI: `https://accounts.google.com/o/oauth2/token`

In the header, set `Content-Type` to `application/x-www-form-urlencoded`.
In the request body, set these parameters:

1. *code*=[Authorization code from pervious step]
2. *client_id*=[Your Client ID]
3. *grant_type*=authorization_code
4. *secret*=[Your Client Secret]
5. *redirect_uri*urn:ietf:wg:oauth:2.0:oob

After you make this request, you will get a JSON response. In the body data, there will be a property called `access_token`. This is the token we will use to access the Google Calendar API.

## Making an API request.

Make a GET request to this URI:
`https://www.googleapis.com/calendar/v3/users/me/calendarList`

In the header, set `Authorization` to `Bearer [Your Token]`

After you make this request, you will get a JSON response containing the user's calendar list on Google Calendar. To understand this response, consult Google's [Resource Representation for CalendarList][5].

For general API documentation, see [this reference][6].

## Play with the API explorer

Visit the [Calendar API explorer][7] to explore the API without needing to write any code.  

[0]: https://developers.google.com/google-apps/app-apis
[1]: https://developers.google.com/accounts/docs/OAuth2
[2]: http://aaronparecki.com/articles/2012/07/29/1/oauth2-simplified
[3]: https://developers.google.com/google-apps/calendar/firstapp
[4]: https://console.developers.google.com/project
[5]:  https://developers.google.com/google-apps/calendar/v3/reference/calendarList#resource
[6]: https://developers.google.com/google-apps/calendar/v3/reference/
[7]: https://developers.google.com/apis-explorer/#s/calendar/v3/
