---
layout: post
title: "Finding the Music in Field Notes"
date: 2026-09-20 00:00:01
categories: [field-notes]
tags: [music, music-catalogue, catalogue-style-analysis, clustering, field-notes]
excerpt: "Adding music to Field Notes raised an unexpected question about the character of the site. Exploring my record collection, and discovering what its accumulated descriptions might reveal, helped provide an answer."
assets: "/images/music/catalogue-style-analysis/"
clustered_map:
  name: "catalogue-style-with-clustering.png"
  alt: "The collection from another perspective. Artists mapped by energy and intimacy, with colours indicating stylistic groupings and hexagonal shading showing concentrations of artists"
  caption: "The collection from another perspective. Artists mapped by energy and intimacy, with colours indicating stylistic groupings and hexagonal shading showing concentrations of artists"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

I've been expanding Field Notes with a section devoted to music.

That probably shouldn't be particularly surprising. Music has been an important part of my life for as long as I can remember, and collecting records has become a considerable enthusiasm.

Nevertheless, I was initially a little hesitant.

Field Notes already covers a variety of subjects, including wildlife, personal projects and the occasional investigation prompted by something that's caught my attention. Would adding music make the site more interesting, or would it simply make it less focused?

I was concerned about dilution.

I've become rather more relaxed about that.

And, somewhat unexpectedly, an analysis of my record collection has helped explain why.

## What belongs in Field Notes?

The difficulty with a site called _Field Notes_ is that it doesn't come with a particularly restrictive definition of what belongs there. Which is both a strength and a potential problem.

If the only criterion for inclusion is that something happens to interest me, the site could become a rather miscellaneous collection of unrelated material.

On the other hand, imposing an artificial restriction on subject matter seems equally undesirable.

The more I've thought about it, the more I've come to regard Field Notes as being defined less by its subjects than by my approach to them.

- Something catches my attention
- I become curious about it
- I investigate, experiment, observe, occasionally build something, and write down what I discover

Sometimes the result is a computer program. Sometimes it's a reflection on something I've read or an observation about my own experience.

And sometimes it's a record.

## The music itself

One of my earlier music posts began with an evening beside the River Kennet and the unexpected rediscovery of Fairground Attraction's *Perfect*.

That led to a renewed appreciation of Eddi Reader's voice, a copy of *The First of a Million Kisses* on vinyl, and some thoughts about musical connections that aren't necessarily captured by conventional genre labels.

In particular, I found myself considering what Eddi Reader's singing might have in common with musicians such as Julie London, Billie Holiday and Chet Baker.

Not because they sound alike - they don't - but because they share qualities of phrasing and musical personality that I find particularly compelling.

That was a very personal investigation, prompted by hearing a song I'd apparently forgotten how much I liked. And I think it's a good example of what I want the Music section to accommodate. Not simply reviews or recommendations, but the experience of listening, collecting and discovering.

The records themselves have stories, too. Their recordings, pressings, labels and sometimes rather unexpected peculiarities are all part of the pleasure of collecting.

But there is another aspect of the collection that I've become increasingly interested in.

The collection as a whole.

## What does a record collection look like?

My Music Catalogue application has evolved into something considerably more useful than a list of records. Alongside the usual catalogue information, it records descriptions of the musical character I associate with individual artists.

Energy, intimacy, warmth, vocal presence, ensemble type and moods are all part of that information.

These descriptions are necessarily subjective. They're my observations, recorded in a reasonably consistent form.

Individually, they're useful when browsing the catalogue, but I began wondering what might happen if I considered them together. After all, a record collection isn't normally assembled according to a carefully designed classification scheme. Mine certainly wasn't.

It's grown through years of listening, discoveries, changing enthusiasms and the occasional unexpected purchase. Might that accumulated collection possess a recognisable musical character? And might the descriptions I'd recorded reveal relationships that weren't immediately apparent when looking at artists individually?

There was only one sensible response.

I wrote some software.

## From descriptions to a style map

The resulting project, which I've called [Catalogue Style Analysis](/music/style/), takes the descriptions associated with artists in my catalogue and uses them to explore stylistic similarities.

The process involves constructing a numerical representation of those descriptions, applying deliberate weights to the characteristics, and using clustering to identify groups of artists with similar profiles.

The results can then be visualised.

One particularly useful representation places artists on a chart according to energy and intimacy, using colours to indicate cluster membership and hexagonal shading to show concentrations of artists.

The resulting map is rather satisfying to look at.

{% include fullwidth-image.html assets=page.assets img=page.clustered_map %}

But the interesting thing isn't the chart itself. It's what the chart encourages me to investigate.

Why do particular artists appear together? Why are some areas of the map more densely populated than others? Do those concentrations reflect characteristics of the music I tend to collect?

And are there unexpected relationships that might reward another listening session?

There are important limitations, of course:

- The software isn't listening to the records - it's analysing my descriptions of the artists
- The groupings depend upon the information I've recorded, the characteristics I've selected, their relative weighting and the number of clusters requested
- A two-dimensional chart can't tell the whole story of a multidimensional comparison

The analysis isn't discovering definitive musical genres or establishing objective truths about the artists.

It's providing another way of looking at my collection.

And, perhaps more importantly, suggesting new questions to take back to the records themselves.

## The collection looking back at me

There's something rather pleasing about using information accumulated through years of collecting to investigate the character of the collection.

I didn't set out to build a record collection that conformed to a particular statistical distribution - I bought records because I wanted to listen to them.

Over time, individual choices became a collection. And now the collection can be examined in ways that might reveal something about those choices.

In a sense, the analysis is as much about my musical preferences as it is about the artists. Not that I expect software to tell me what I like - I already have a reasonably effective method for establishing that:

> I play the records

But it may help me recognise relationships between the things I like, and perhaps understand a little more about why they appeal to me.

That's an interesting prospect.

## Back to Field Notes

Which brings me back to my original concern about adding music to the site. I was worried that another subject might dilute its character, but developing the Music section, and particularly undertaking the Catalogue Style Analysis, has helped me see the matter rather differently.

The Music Catalogue is something I built to support an existing enthusiasm, and its accumulated information has now become the basis for another investigation.

Different subject matter to other areas of _Field Notes_, certainly, but I think there's a recognisable approach connecting the different sections.

Field Notes isn't intended to be an encyclopaedia of my interests, nor does everything need to become an elaborate analytical exercise. Sometimes a song is simply wonderful, and that's worth writing about too.

But curiosity, observation, experimentation and the pleasure of following an unexpected connection seem to be recurring themes.

Music belongs quite comfortably among them.

And the catalogue analysis has given me something I hadn't anticipated when I began developing the Music section: A way of looking at years of listening and collecting from an entirely different perspective.

I'm rather pleased about that.

Now, having spent all this time analysing the collection, I think I'll go and listen to some of it.

{% include music-catalogue-invitation.html %}
