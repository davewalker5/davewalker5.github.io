---
layout: default
title: "Selborne Field Guide by Category"
permalink: /wildlife/selborne/by-category/
---

<h1>{{ page.title }}</h1>

{% include selborne-navigation.html active="by-category" %}

{% assign categories = site.data.selborne.by_category | sort %}

<nav class="selborne-category-nav" aria-label="Category navigation">
  {% for category in categories %}
    {% assign category_name = category[0] %}
    <a href="#{{ category_name | slugify }}">{{ category_name | capitalize }}</a>
    {% unless forloop.last %}<span aria-hidden="true"> | </span>{% endunless %}
  {% endfor %}
</nav>

{% for category in categories %}
  {% assign category_name = category[0] %}
  {% assign slugs = category[1] %}

  <section class="selborne-category-group" id="{{ category_name | slugify }}">
    <h2>{{ category_name | capitalize }}</h2>
    <ul>
      {% for slug in slugs %}
        {% assign term = site.data.selborne.terms | where: "slug", slug | first %}
        {% if term %}
          <li>
            <a href="{{ term.path | relative_url }}">{{ term.title }}</a>
            {% if term.summary %}
              — {{ term.summary }}
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </section>
{% endfor %}
