---
title: 'Liquid objects: blog'
description: >-
  Information about a specific
  [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in
  the store.
api_name: liquid
source_url:
  html: 'https://shopify.dev/docs/api/liquid/objects/blog'
  md: 'https://shopify.dev/docs/api/liquid/objects/blog.md'
---

# blog

Information about a specific [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in the store.

## Properties

* * all\_​tags

    array of [string](https://shopify.dev/docs/api/liquid/basics#string)

  * All of the tags on the articles in the blog.

    This includes tags of articles that aren't in the current pagination view.

  * articles

    array of [article](https://shopify.dev/docs/api/liquid/objects/article)

  * The articles in the blog.

    Tip

    Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many articles to show per page, up to a limit of 50.

  * articles\_​count

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The total number of articles in the blog. This total doesn't include hidden articles.

  * comments\_​enabled?

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if comments are enabled for the blog. Returns `false` if not.

  * handle

    [string](https://shopify.dev/docs/api/liquid/basics#string)

  * The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the blog.

  * id

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The ID of the blog.

  * metafields

    array of [metafield](https://shopify.dev/docs/api/liquid/objects/metafield)

  * The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the blog.

    Tip

    To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit the [Shopify Help Center](https://help.shopify.com/manual/metafields).

  * moderated?

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the blog is set to [moderate comments](https://help.shopify.com/manual/online-store/blogs/managing-comments). Returns `false` if not.

  * next\_​article

    [article](https://shopify.dev/docs/api/liquid/objects/article)

  * The next (older) article in the blog.

    Returns `nil` if there is no next article.

    This property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output `next` links.

  * previous\_​article

    [article](https://shopify.dev/docs/api/liquid/objects/article)

  * The previous (newer) article in the blog.

    Returns `nil` if there is no previous article.

    This property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output `previous` links.

  * tags

    array of [string](https://shopify.dev/docs/api/liquid/basics#string)

  * A list of all of the tags on all of the articles in the blog.

    Unlike [`blog.all_tags`](https://shopify.dev/docs/api/liquid/objects/blog#blog-all_tags), this property only returns tags of articles that are in the filtered view.

  * template\_​suffix

    [string](https://shopify.dev/docs/api/liquid/basics#string)

  * The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the blog.

    The name doesn't include the `blog.` prefix, or the file extension (`.json` or `.liquid`).

    If a custom template isn't assigned to the blog, then `nil` is returned.

  * title

    [string](https://shopify.dev/docs/api/liquid/basics#string)

  * The title of the blog.

  * url

    [string](https://shopify.dev/docs/api/liquid/basics#string)

  * The relative URL of the blog.

##### Example

```json
{
  "all_tags": [],
  "articles": [],
  "articles_count": 3,
  "comments_enabled?": true,
  "handle": "potion-notions",
  "id": 78580613185,
  "metafields": {},
  "moderated?": true,
  "next_article": {},
  "previous_article": {},
  "tags": [],
  "template_suffix": "",
  "title": "Potion Notions",
  "url": "/blogs/potion-notions"
}
```

## Templates using blog

[Theme architecture](https://shopify.dev/themes/architecture/templates/blog)

[blog template](https://shopify.dev/themes/architecture/templates/blog)

[Theme architecture](https://shopify.dev/themes/architecture/templates/article)

[article template](https://shopify.dev/themes/architecture/templates/article)