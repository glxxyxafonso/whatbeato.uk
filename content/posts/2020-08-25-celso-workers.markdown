---
categories: blog workers
date: "2020-08-25T00:08:00Z"
excerpt: This blog migrated to Cloudflare Workers
title: Blog migrated to Cloudflare Workers
aliases:
- /blog/workers/2020/08/25/celso-workers
---

This blog just migrated to [Cloudflare Workers][1], Cloudflare's serverless edge computing solution, because you know, it rocks.

This is the workflow I had in mind:

- I write a new blog post using markdown.
- I can test things locally before going live.
- When done, I git add the new post to my repo, then push it to Github.
- Website gets burned to static files.
- Website is published to the cloud at Cloudflare.
- I get a success/failure notification in my Telegram.
- Done, it's live.

My goal was to fully automate this sequence of events.

I'm using a [Jekyll][3], a popular static site generator, Github and [Github Actions][4], [Wrangler][2], and Cloudflare Workers (Sites) combo.

This is how I did it, tech-wise, step by step:

## Installation

First, you can clone this [repo][30].

```
git clone git@github.com:celso/celso.io.git
```

Then instal install [wrangler][2],  a CLI tool to operate the Cloudflare Workers, [Jekyll][3], and its dependencies, using bundler.

```
cd celso.io
npm i @cloudflare/wrangler -g
sudo gem install bundler
bundle install
```

## Cloudflare Tokens

Then you need a Cloudflare account (free) and a Cloudflare Workers Bundled subscription, which will give you access to the [Workers KV][5] (which is where your blog will be stored at the edge). Bundled is notably cheap and will provide you with access to the lowest latency in the network. Also, you get increased CPU time limits, which enable other interesting applications you can do in the future.

You also need to add your website or blog domain to Cloudflare, which is free. [Here's how][6].

Now you need to get the following info from your Cloudflare dashboard.

 - Email
 - Account ID
 - Zone ID
 - Workers API token

### Email

This one's easy. It's your Cloudflare account e-mail.

### Account and Zone ID

You can find both your account and zone IDs when you log into Cloudflare and select your zone, in the right column of the page.

![Screenshot](/assets/workers1.png?raw=true)

### API token

To get an API token, go to your profile page (top right corner), and click the "API Tokens" tab.

![Screenshot](/assets/workers2.png?raw=true)

Now click the "Create Token" button, then use the "Edit Cloudflare Workers" template. In the next screen, you can restrict the token to a specific account and zone. Choose the account and zone that correspond to your website domain. Click "Continue to summary." Click "Create Token."

![Screenshot](/assets/workers3.png?raw=true)

Copy the token; you're going to need it.

## Wrangler

Wrangler is a CLI tool from Cloudflare that you can use to build, preview and publish your Worker code. You can check Wrangler's documentation [here][7].

In a new project, you'd use something like this to initialize a wrangler template for a Worker site.

```
wrangler init celso-io --site
```

This will both create a [wrangler.toml][8] file and a [workers-site][9] subdirectory with the source code that will handle your website's requests. You can go through [this source][10] if you want to understand how the engine interacts with the [Workers KV][11] database (where your blog static files will be stored) and serves each HTTP request.

My repo was previously initialized, you can check my [wrangler.toml][8] file:

```
name = "celso-io"
type = "webpack"

[env.staging]
workers_dev = true

[env.production]
workers_dev = false
route = "celso.io/*"

[dev]
port=9000
ip="127.0.0.1"

[site]
bucket = "./_site"
entry-point = "workers-site"
```

You can find more information about the configuration options [here][12]. As you can see, I make use of the [environments][13] feature. I also don't have any IDs or keys in the configuration. These will be passed through shell environment variables both with local development, staging and production. More on this later.

## Routes

To run your worker code with each request on your domain, you need to configure a worker route in your Cloudflare Dashboard. Go to your account, click the "Workers" button in the top navigation bar, and then click "Add route." Here's mine:

![Screenshot](/assets/workers4.png?raw=true)

You can only configure your route after you publish your worker using wrangler; otherwise, it won't show up in the dashboard. If you look at my [wrangler.toml][8], you'll find the same route regexp. In my dashboard screenshot, you can also see that the configured route corresponds to the [[worker.name]][[-worker.env]] nomenclature.

Read [this document][14] to know more about Routes.

## Environment variables and tokens

I didn't want any secrets or IDs in the source code or configuration files, so I found a way to pass this information to wrangler using environment variables under different contexts. Here's how.

Get your previously configured Cloudflare tokens ready.

### Local testing and staging

For this, we're going to use a dotenv file. Create a .env file in the root of your project, like this:

**cat .env**

```
CF_ZONE_ID = "b5xxxxxxxxxxxxxxxxxxxxxc3"
CF_ACCOUNT_ID = "13xxxxxxxxxxxxxxxxxxxxx03"
CF_API_TOKEN = "SQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxFv"
CF_EMAIL = "yyyy@celso.io"
```

.env files are local only and must be git ignored, they should never get into your repository.

That's it.

### Production

Introducing **Github Actions**, Github's CI/CD feature.

[GitHub Actions][16] allow you to automate your software deployment workflow. It's powerful, simple to use, and guess what, it has an incredibly generous **[free tier][17]** that anyone can use (2,000 free computing minutes per month).

A Github action is basically a workflow consisting of a list of tasks running in sequence. The workflows use what Github calls runners, which are Linux containers running your software on their VMs cloud. You can trigger a workflow on any Github event (ex: a git push to your repo).

Check [this page][16] for more information.

Here's my [workflow][18]:

{% raw %}
```
name: Deploy blog to cloudflare
on:
    push:
        branches:
            - master

jobs:
    build:
        name: Building
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Use Github Actions cache
              uses: actions/cache@v1
              with:
                  path: vendor/bundle
                  key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
                  restore-keys: |
                      ${{ runner.os }}-gems-
            - name: Burn jekyll website
              run: |
                  sudo gem install bundler
                  bundle config path vendor/bundle
                  bundle install
                  bundle exec jekyll build
            - name: Publish to Cloudflare
              uses: cloudflare/wrangler-action@1.3.0
              with:
                  apiToken: ${{ secrets.CF_API_TOKEN }}
                  environment: 'production'
              env:
                  CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
                  CF_ZONE_ID: ${{ secrets.CF_ZONE_ID }}
                  CF_EMAIL: ${{ secrets.CF_EMAIL }}
            - name: Telegram notification
              if: cancelled() == false
              uses: xinthink/action-telegram@v1.1
              with:
                  botToken: ${{ secrets.TELEGRAM_BOT_TOKEN }}
                  chatId: ${{ secrets.TELEGRAM_CHAT_ID }}
                  jobStatus: ${{ job.status }}
                  skipSuccess: false
```
{% endraw %}

Before we proceed, you need to go to your repo settings in Github and click the "Secrets" tab in the left sidebar. You then need to add your secrets for:

- CF_ACCOUNT_ID
- CF_API_TOKEN
- CF_EMAIL
- CF_ZONE_ID.

You can optionally add:

- TELEGRAM_BOT_TOKEN-
- TELEGRAM_CHAT_ID

More on this later.

This tells Github to store your tokens and keys securey, in their password manager. You can then use these in your workflows, as environment variables.

![Screenshot](/assets/workers5.png?raw=true)

### Telegram

My final workflow step is to send me a Telegram message with the result of my blog publication. You can skip this step if you want. If you want to use it, then you need TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.

To get the TELEGRAM_BOT_TOKEN, you need to create your own bot first. [Here's how to do it][19].

Now create a Telegram group and add your newly created bot to it. Then [do this][20] to discover your TELEGRAM_CHAT_ID.

### Workflow step by step

Going back to my [workflow][18].

I'm running a ubuntu container with five steps.

**Step 1: actions/checkout**

```
    - uses: actions/checkout@v2
```

[actions/checkout][21] checks-out your repository so that the rest if the workflow can use it.

**Step 2: actions/cache**

{% raw %}
```
    uses: actions/cache@v1
    with:
        path: vendor/bundle
        key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
        restore-keys: |
            ${{ runner.os }}-gems-
```
{% endraw %}

[actions/cache][22] is an optional cache module to improve your workflow build times.

**Step 3: burn jekyll website**

```
    - name: Burn jekyll website
      run: |
          sudo gem install bundler
          bundle config path vendor/bundle
          bundle install
          bundle exec jekyll build
```

There are a few Jekyll actions in the [marketplace][23], but none worked well for me, so I'm doing this manually, issuing the necessary shell commands in sequence. I install bundler, install Jekyll and its [dependencies][24], and then burn my blog with *jekyll build*. I won't go into Jekyll in this post, click [here][3] to find its documentation if you need help.

**Step 4: cloudflare/wrangler-action**

{% raw %}
```

    - name: Publish to Cloudflare
      uses: cloudflare/wrangler-action@1.3.0
      with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          environment: 'production'
      env:
          CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
          CF_ZONE_ID: ${{ secrets.CF_ZONE_ID }}
          CF_EMAIL: ${{ secrets.CF_EMAIL }}
```
{% endraw %}

[cloudflare/wrangler-action][25] automates [wrangler][7] inside a Github action. Once your website is burned, it will use your [wrangler.toml][8], your tokens (via Github secrets, via environment variables) and publish everything to your Cloudflare Worker.

When this step is finished, your new website should be available.

**Step 5: xinthink/action-telegram**

{% raw %}
```
    - name: Telegram notification
      if: cancelled() == false
      uses: xinthink/action-telegram@v1.1
      with:
          botToken: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          chatId: ${{ secrets.TELEGRAM_CHAT_ID }}
          jobStatus: ${{ job.status }}
          skipSuccess: false
```
{% endraw %}

[xinthink/action-telegram][26] is optional if you want to get a notification in your Telegram when the workflow finishes with the result.

### Local and staging tests

You can use npm to test everything locally or upload your Worker to Cloudflare's staging environment, using npm. See my [package.json][27] for options.

You need [dotenv][29].

```
npm install dotenv -g
```

Then you can:

- npm run jekyll-serve - run jekyll as local server
- npm run jekyll-build - run jekyll and burn the website
- npm run dev - test the worker locally, using [wrangler dev][28]
- npm run staging - publish your worker to the staging environment at Cloudflare
- npm run publish - publish your worker to the production route, just like your Github workflow will do

### Show me

This is what you should see if your Github action workflow works as expected.

![Screenshot](/assets/workers6.png?raw=true)

## Final notes

This was fun to put together. It took me about an hour to tweak everything and get this automated workflow running. It's the tip of the iceberg though, Cloudflare Workers have a lot of potential for other applications and I will be exploring them in the future.

I also wanted this blog repo to go public so that anyone could look around, [so here it is][30].

I hope you find this tutorial useful. If you have questions, drop them in the issues, maybe I can help.

[1]: https://workers.cloudflare.com/
[2]: https://github.com/cloudflare/wrangler
[3]: https://jekyllrb.com/
[4]: https://github.com/features/actions
[5]: https://developers.cloudflare.com/workers/learning/how-kv-works
[6]: https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website
[7]: https://developers.cloudflare.com/workers/cli-wrangler
[8]: https://github.com/celso/celso.io/blob/master/wrangler.toml
[9]: https://github.com/celso/celso.io/blob/master/workers-site
[10]: https://github.com/celso/celso.io/blob/master/workers-site/index.js
[11]: https://blog.cloudflare.com/workers-kv-is-ga/
[12]: https://developers.cloudflare.com/workers/cli-wrangler/configuration
[13]: https://developers.cloudflare.com/workers/cli-wrangler/configuration#environments
[14]: https://developers.cloudflare.com/workers/platform/routes
[15]: https://github.com/celso/celso.io/blob/master/.gitignore
[16]: https://github.com/features/actions
[17]: https://github.com/pricing
[18]: https://github.com/celso/celso.io/blob/master/.github/workflows/deploy.yml
[19]: https://core.telegram.org/bots#3-how-do-i-create-a-bot
[20]: https://stackoverflow.com/a/32572159
[21]: https://github.com/actions/checkout
[22]: https://github.com/actions/cache
[23]: https://github.com/marketplace?type=actions&query=jekyll
[24]: https://github.com/celso/celso.io/blob/master/Gemfile
[25]: https://github.com/cloudflare/wrangler-action
[26]: https://github.com/xinthink/action-telegram
[27]: https://github.com/celso/celso.io/blob/master/package.json
[28]: https://blog.cloudflare.com/announcing-wrangler-dev-the-edge-on-localhost/
[29]: https://www.npmjs.com/package/dotenv
[30]: https://github.com/celso/celso.io/
[31]: https://github.com/celso/celso.io/issues