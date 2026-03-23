console.log(JSON.stringify({
  hasSanityAuthToken: !!process.env.SANITY_AUTH_TOKEN,
  sanityAuthTokenLength: process.env.SANITY_AUTH_TOKEN ? process.env.SANITY_AUTH_TOKEN.length : 0,
  hasSanityApiToken: !!process.env.SANITY_API_TOKEN,
  sanityApiTokenLength: process.env.SANITY_API_TOKEN ? process.env.SANITY_API_TOKEN.length : 0,
}, null, 2))
