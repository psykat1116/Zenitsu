# This Is A Fast Search API To Look at How [Redis](https://redis.io/) has a shorter response time As It stores data As a Key-Value Pair Inside Cache Memory or RAM. 
## But It Does Not Work As It Should. The reason may be that the Redis database is far from my MongoDB database. So, MongoDB will give me a Comparatively Better Result. You Can Also Choose PostgreSQL.

## Getting Started
```bash
https://github.com/psykat1116/Zenitsu.git
cd zenitsu
npm i
```

## Environmental Variable
```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
DATABASE_URL=
BACKEND_URL=
```

## Get Redis
I Used [Upstash](https://upstash.com/) For My Redis Database Provider. It Has a Very Generous Free Tier. You Can Choose Any Other Of Your Choice.
Create An Account & Create A Redis Database Nearest To Your Location Then Get The Two ENV Variable `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`

## Get MongoDB
I use [MongoDB](https://www.mongodb.com/) You Can Choose Any Other You Want Just Get The Database URL & Past In The ENV File. But You Need To make some Minor Change In The `schema.prisma` file.

## Upload CountryList To Databases
<strong>THIS IS A MANDATORY STEP</strong>. We Have To Manually Upload Our File Into Our Database.
In the Case Of `Redis` Don't Forget to replace The Env Variables With The Originals Otherwise It Will Not Work. After Success Uploading into DB don't forget to replace it with old process.env.variable_name for security.

```bash
npx tsx lib/SeedRedis.ts
npx tsx lib/SeedMongoDB.ts
```

## Deploy Backend In Cloudflare Workers
<strong>THIS IS AN OPTIONAL STEP</strong>. 
If You Want To Deploy Your Backend Into Cloudflare Workers You Can Do The Steps Otherwise Leave This. You Need To Create an Account & Verify Your Email Before Doing It.
- Create a `wrangler.toml` in the root directory
- ```bash
  name = "any_name"
  compatibility_date = "2024-04-02"

  [vars]
  UPSTASH_REDIS_REST_URL = "your redis URL"
  UPSTASH_REDIS_REST_TOKEN = "your redis rest token"
  ```
- ```bash npm run deploy ```
- You Will Get Your Hosted Backend URL. If Lost Re Run `npm run deploy`.
- Add The URL into the env variables `BACKEND_URL`.

If Don't Want To Deploy In Cloudflare Workers Or Others Hosting Providers Please Remove prefix from `/app/page.tsx` Line No `33` before `/api/search?q=${input}`

Finally, Run The Below Command & See the Result in To [http://localhost:3000](http://localhost:3000).
```bash
npm run dev
```
