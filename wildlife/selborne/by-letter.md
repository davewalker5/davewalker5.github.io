---
layout: default
title: "Selborne Field Guide A-Z"
permalink: /wildlife/selborne/by-letter/
---

<h1>{{ page.title }}</h1>

{% include selborne-navigation.html active="by-letter" %}

{% assign letters = "A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z" | split: "|" %}

<nav class="selborne-alpha-nav" aria-label="Alphabetical navigation">
  {% for letter in letters %}
    <a href="#{{ letter | downcase }}">{{ letter }}</a>{% unless forloop.last %} <span aria-hidden="true">|</span> {% endunless %}
  {% endfor %}
</nav>

{% assign terms = site.data.selborne.terms | sort: "title" %}

{% for letter in letters %}
  {% assign letter_terms = "" | split: "" %}
  {% for term in terms %}
    {% assign initial = term.title | slice: 0, 1 | upcase %}
    {% if initial == letter %}
      {% assign letter_terms = letter_terms | push: term %}
    {% endif %}
  {% endfor %}

{% if letter_terms.size > 0 %}
<section class="selborne-letter-group" id="{{ letter | downcase }}">
  <h2>{{ letter }}</h2>
  <ul>
    {% for term in letter_terms %}
      <li>
        <a href="{{ term.path | relative_url }}">{{ term.title }}</a>
        {% if term.summary %}
          — {{ term.summary }}
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</section>
{% endif %}
{% endfor %}
