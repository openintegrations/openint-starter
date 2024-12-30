# OpenInt SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

## Getting Started

```bash
git clone https://github.com/openintegrations/openint-starter
cd openint-starter
pnpm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Add your OpenInt API key to the `.env` file:

```bash
OPENINT_API_KEY=OPENINT_API_KEY_GOES_HERE
```

Finally, set the hardcoded `END_USER_ID` in the `app/(dashboard)/dashboard/integrations/sync/page.tsx` file:

```js
const tokenResponse = await openint
  .POST("/connect/token", {
    body: { customerId: "END_USER_ID" },
  })
  .catch((err) => {
    console.error("Error fetching token:", err);
    return { data: { token: null } };
  });
```

Finally, run the Next.js development server:

```bash
pnpm dev
```

Enjoy the demo integrations pages!

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Changing default base URL

You can point the OpenInt API to a new host by passing `baseUrl` to the `initOpenIntSDK` function:

```js
const openint = initOpenIntSDK({
  baseUrl: "http://localhost:4000/api/v0",
  headers: { "x-apikey": process.env.OPENINT_API_KEY ?? "" },
});
```

And the openInt embed component

```js
<OpenIntConnectEmbed
  baseUrl="http://localhost:4000"
  width={800}
  height={700}
  params={{ token: clientToken }}
/>
```
