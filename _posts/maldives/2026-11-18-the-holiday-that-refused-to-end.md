---
layout: default
title: "Moofushi: The Holiday That Refused to End"
breadcrumb: "The Holiday That Refused to End"
date: 2026-11-18
categories: ["travel", "maldives", "field-notes"]
tags: ["maldives", "moofushi", "marine-life", "natural-history", "wildlife-observation", "citizen-science", "conservation", "reef-frame", "fish-track", "reef-tag", "nature-recorder", "underwater-video", "software-development", "reflection"]
excerpt: "The holiday ended, but the curiosity didn't. How two weeks in the Maldives inspired three software applications, thousands of wildlife identifications, a natural history case study and two films."
description: "A personal reflection on how an extraordinary Maldives holiday continued through underwater video, software development, wildlife recording, conservation and scientific curiosity."
series: maldives2026
series_order: 8
assets: "/images/maldives/"
turtle_nest_site:
  name: "turtle-nest-site.jpg"
  alt: "Wooden sea turtle nesting-site marker standing in the white sand at Constance Moofushi, showing an illustration of a turtle and recording a nest laid on 7 October 2026"
  caption: "A sea turtle nesting site at Moofushi, marked to protect the eggs laid on 7 October 2026. A modest sign, but one that captures much of what makes this island so meaningful to me"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
reef_frame_screenshot:
  name: "reef-frame-screenshot.png"
  alt: "ReefFrame desktop application showing its interface for preparing, enhancing and processing underwater video recordings"
  caption: "ReefFrame — what began as a collection of FFmpeg scripts has become a dedicated application for processing and enhancing the underwater footage recorded during our Maldives holiday"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
reef_frame_comparison:
  name: "reef-frame-comparison.png"
  alt: "Comparison of original underwater footage and a version processed using ReefFrame to improve its visual appearance"
  caption: "Before and after — ReefFrame's enhancement operations can improve the visibility and appearance of underwater recordings, although they cannot recover detail that was never captured"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
titan_triggerfish_tracking:
  name: "titan-triggerfish-fishtrack.jpg"
  alt: "FishTrack tracking demonstration featuring a Titan Triggerfish in underwater footage recorded in the Maldives"
  caption: "Tracking a Titan Triggerfish — an early FishTrack experiment investigating whether computer-vision techniques could follow individual animals through moving underwater footage"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
titan_triggerfish_analysis:
  name: "titan-triggerfish-analysis.png"
  alt: "FishTrack analysis output illustrating computer-vision tracking of a Titan Triggerfish during an underwater video sequence"
  caption: "Understanding the tracking results — the Titan Triggerfish's rolling movement provided an interesting comparison between conventional computer vision and SAM 2, which maintained the track when the conventional approach lost it"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
reef_tag_identification:
  name: "reef-tag-identification.png"
  alt: "ReefTag application displaying an underwater photograph with markers used to record individual marine wildlife identifications"
  caption: "From photographs to observations — ReefTag provides a workspace for identifying individual animals, recording species information and preserving links to the original underwater footage"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
observational_composition:
  name: "fish-observational-composition.png"
  alt: "Chart showing the species composition of fish identifications recorded from the Maldives snorkelling footage"
  caption: "Observational composition — the distribution of fish identifications reflects both the animals appearing in the footage and the character of the recorded encounters, including large mixed shoals and smaller groups"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
maldives_richness_chart:
  name: "maldives-richness-chart.png"
  alt: "Nature Recorder species-richness map showing recorded wildlife observations from the October 2026 visit to Constance Moofushi in the Maldives"
  caption: "Eighty-three species! Nature Recorder's species-richness map brings together the wildlife observations from our two-week visit, including marine life, birds and other animals recorded on and around Moofushi"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
nurse_shark_encounter:
  name: "nurse-shark-005.jpg"
  alt: "A shark sweeps past and, beneath it, a little gathering of yellow and black sergeant majors adds a wonderful splash of colour"
  caption: "A shark sweeps past and, beneath it, a little gathering of yellow and black sergeant majors adds a wonderful splash of colour"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

On 25 October, towards the end of our holiday at [Constance Moofushi](https://www.constancehotels.com/), I wrote a final chapter of our Maldives travel journal entitled *Counting the Uncountable* in which I was trying to understand just how much we'd experienced during our fortnight on that tiny island in the Indian Ocean. The conclusion was rather lovely:

> We came to Moofushi for a holiday
> We spent two weeks being curious
> And we were very happy indeed

At the time, I thought I was bringing the experience to a close: We'd enjoyed two extraordinary weeks, accumulated a remarkable collection of wildlife observations, photographs and video, and I'd written extensively about our adventures. There were, of course, some 70 GB of photographic and video material waiting to be examined when we got home and I suspected that might keep me occupied for a while!

I had absolutely no idea! 😊

{% include fullwidth-image.html assets=page.assets img=page.turtle_nest_site %}

## A Holiday Becomes Three Software Projects

The first challenge was relatively straightforward: Much of our GoPro footage had been recorded underwater, where the loss of colour, reduced contrast, suspended particles and inevitable camera movement made it less than ideal. I'd already been experimenting with _FFmpeg_ and shell scripts to improve the recordings but as the number of processing operations increased, so did the complexity of managing them and so [ReefFrame](https://github.com/davewalker5/ReefFrame) was born.

What started as a convenient way to bring those scripts together has become a Python desktop application for processing underwater footage. It can convert video formats, compress recordings, improve contrast and colour, reduce haze, stabilise shaky footage and extract still images and more recent development has introduced configurable enhancement pipelines, reusable presets and facilities for comparing processing results.

I'm particularly pleased that _ReefFrame_ remains a focused application. It doesn't pretend to be a general-purpose video editor but, rather, it does a relatively small collection of useful things, and does them well.

{% include fullwidth-image.html assets=page.assets img=page.reef_frame_screenshot %}
{% include fullwidth-image.html assets=page.assets img=page.reef_frame_comparison %}

However, processing the footage raised another question.

> Could I use computer vision to identify and follow individual fish as they moved through a recording?

That question led to [FishTrack](https://github.com/davewalker5/FishTrack). Initially, I experimented with conventional computer-vision techniques to detect movement and track objects between frames but the difficulties were immediately apparent. Fish change direction, disappear behind coral, overlap, turn, roll and change their apparent shape and, of course, the camera itself is moving!

I subsequently introduced more sophisticated techniques, including _Grounding DINO_ for object detection and _SAM 2_ for video segmentation and tracking and some of the experiments have been fascinating: A Titan Triggerfish (*Balistoides viridescens*) rolling in the water defeated conventional tracking, while SAM 2 maintained its track. Reef manta rays (*Mobula alfredi*), with their extraordinary movements and constantly changing outlines, provided another particularly satisfying challenge.

_FishTrack_ remains experimental and I certainly wouldn't claim to have solved the problem of tracking marine wildlife! It does, though, allow me to investigate what works, what doesn't, and why and I've learned an enormous amount along the way.

{% include fullwidth-image.html assets=page.assets img=page.titan_triggerfish_tracking %}
{% include fullwidth-image.html assets=page.assets img=page.titan_triggerfish_analysis %}

Then came the third application. As _ReefFrame_ produced more and more useful still images, I needed a way to examine them systematically and identify the animals they contained. There were simply too many images, and too many individual fish, to manage comfortably through informal notes so I developed [ReefTag](https://github.com/davewalker5/ReefTag).

_ReefTag_ allows me to browse photographs, mark individual animals, record species identifications and maintain a catalogue of observed marine life. The original footage references and recording dates are preserved, allowing identifications to be traced back to their supporting evidence and animals that cannot be identified confidently can be marked as unknown and revisited later. Importantly, the resulting observations can be transferred into _Nature Recorder_, the natural history recording application I developed, in its first incarnation at least, more years ago than I care to remember!

{% include fullwidth-image.html assets=page.assets img=page.reef_tag_identification %}

Three new applications, then, each emerging from a practical question prompted by examining our footage. Needless to say, none of them was planned when we boarded the seaplane for Moofushi!

## From Encounter to Evidence

The software development has been enormously enjoyable, but undoubtedly the most satisfying achievement has been what it has enabled me to do with the wildlife observations themselves. I've now worked through the recorded snorkelling material from four excursions, extracting representative images and systematically identifying the marine life visible in them and the scale of the exercise rather surprised me.

The _ReefTag_ statistics, following completion of the exercise, are:

| Measure                        | Total |
| ------------------------------ | ----: |
| Images examined and catalogued |   319 |
| Identifications recorded       | 1,703 |
| Species represented in ReefTag |    58 |
| Unknown identification markers |    59 |

Some individual images contained extraordinary numbers of animals with one photograph alone producing 72 identifications, while others contained just one or two. That difference is interesting in itself as the third excursion included large, mixed shoals of fish, while much of the fourth, recorded around Moofushi's local reefs, consisted of encounters with individuals or smaller groups. The resulting statistics therefore tell us something about the character of the recorded observations, rather than simply about the number of fish living on the reef: An important distinction.

{% include fullwidth-image.html assets=page.assets img=page.observational_composition %}

I've transferred the identification data into _Nature Recorder_, where it joins the observations made during the holiday itself — birds, insects, reptiles, sharks, rays and all the other wildlife that made Moofushi so fascinating. The resulting species-richness map contains **83 recorded species** across the various wildlife categories.

**_Eighty-three!_**

From two weeks spent principally on one tiny island that's approximately 400 metres long, with a circumference, including the water villa jetties, of only 2.1 kilometres!

Of course, the records include snorkelling excursions beyond the island itself, and this isn't a comprehensive biodiversity survey and nor can the numbers tell me how many fish inhabit the reef, or whether particular populations are increasing or declining, but they do represent a substantial body of genuine, documented observations which is rather satisfying.

{% include fullwidth-image.html assets=page.assets img=page.maldives_richness_chart %}

_Nature Recorder_ can consolidate repeated identifications into unique species sightings per day, reducing some of the distortions caused by repeatedly photographing the same animals.

The underlying evidence also remains traceable as the original GoPro recordings lead to processed footage, timestamped still images and _ReefTag_ identification records. Capture dates are preserved, and the original footage can be revisited when an identification needs checking. It's a simple arrangement, but one that works extremely well for my purposes and the outcome has been sufficiently interesting that I've developed a separate _Field Notes_ case study entitled *From Encounter to Evidence*, due to be published shortly.

That project examines how recreational wildlife footage can become structured, traceable and analysable natural history observations, while acknowledging the limitations of the original material - it seems a natural extension of my longstanding interest in natural history and my obsession with recording things!

## Two Movies — And Counting!

Of course, there has also been the rather less scientific business of making films! 😊

One of the original reasons for processing the GoPro material was simply to make the footage more enjoyable to watch. The underwater encounters were wonderful at the time, and I wanted to preserve something of that experience in a form that could be revisited and shared so I've now produced two movies from our Maldives material.

There's something particularly satisfying about seeing the original recordings transformed into finished films. Footage that began as a collection of files on a memory card becomes a coherent visual record of the animals and places we encountered: The reef mantas gliding through the water, the sharks, the astonishing diversity of reef fish, the colours, movement and atmosphere of the underwater world.

<div class="blog-image-grid blog-image-grid--1-col no-print">
  <figure>
    <div id="video-wrap" class="report-image-wrap">
      <video id="recording-video" class="responsive" controls preload="metadata">
        <source id="recording-source" src="{{ site.assets_url }}/movies/maldives/beneath-the-surface.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <figcaption>
      <span class="caption">
        Beneath the Surface — A short film exploring the coral reefs and marine wildlife of South Ari Atoll, Maldives, featuring colourful reef fish, turtles, manta rays and tawny nurse sharks. Running time: 7 minutes 5 seconds.
      </span>
      <span class="credit">
          David Walker, Field Notes Journal
            (
            
              <a href="https://creativecommons.org/licenses/by/4.0" rel="license noopener" target="_blank">
                CC BY 4.0
              </a>
            )
      </span>
    </figcaption>
  </figure>
</div>

<div class="blog-image-grid blog-image-grid--1-col no-print">
  <figure>
    <div id="video-wrap" class="report-image-wrap">
      <video id="recording-video" class="responsive" controls preload="metadata">
        <source id="recording-source" src="{{ site.assets_url }}/movies/maldives/a-place-to-return-to.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <figcaption>
      <span class="caption">
        A Place to Return To — A photographic journey through Constance Moofushi, Maldives, celebrating the island's landscapes, wildlife, everyday life and changing skies through photographs taken eleven years apart. Running time: 6 minutes 58 seconds
      </span>
      <span class="credit">
        David Walker, Field Notes Journal
        (
          <a href="https://creativecommons.org/licenses/by/4.0" rel="license noopener" target="_blank">
            CC BY 4.0
          </a>
        )
      </span>
    </figcaption>
  </figure>
</div>

Unlike the structured natural history records, the films don't need to answer a scientific question - they can simply celebrate what we saw, a useful reminder that not everything needs to become data. Some experiences deserve to be preserved simply because they were beautiful, exciting or moving.

There is still plenty of material to explore, so I doubt the film-making is finished.

Two movies, then ... and counting! 😉

## An Interest That Began in 1979

The work has also reinforced something that has been a driving principle throughout my adult life, and indeed since I was fourteen: My love of wildlife and the natural world, and my determination to do what I can to protect it.

I can trace much of that back to David Attenborough's *Life on Earth*, which I watched when it was first broadcast in 1979. It was revolutionary television at the time and certainly, in my recollection, there hadn't been natural history footage anything like it. It wasn't simply a television programme I enjoyed, though - it helped shape my interests, my curiosity and my values, and its influence has stayed with me ever since.

Nearly five decades later, here I am developing software to investigate marine wildlife, recording species observations, supporting conservation organisations and still finding extraordinary pleasure in learning about the natural world. I think fourteen-year-old me would have approved! 😉

Our encounters with the tawny nurse sharks (*Nebrius ferrugineus*) were particularly affecting. Being so close to those beautiful animals, and subsequently considering the threats they face, brought home the vulnerability of the marine environment in a very personal way.

{% include fullwidth-image.html assets=page.assets img=page.nurse_shark_encounter %}

Unsurprisingly, I'm already involved with several conservation organisations — the RSPB, WWF, the Marine Conservation Society and the Manta Trust. I've also adopted a manta ray through the latter, adding another small connection to the animals that made our time in the Maldives so memorable.

There's something here that I don't want to lose sight of. When I was snorkelling alongside those nurse sharks, I wasn't mentally cataloguing their biology or thinking about the scientific value of the encounter. I was simply utterly captivated by the wonder of sharing the water with such magnificent animals.

Ultimately, that's what motivates my interest in wildlife and conservation - these animals don't need to justify their existence through their usefulness to us, or even through what we can learn from studying them. They're extraordinary living creatures with whom we share this blue planet, and I believe they're worth protecting for that reason alone.

The scientific curiosity, the research, the recording and the analysis come afterwards. They're important to me — enormously so — but they're ways of understanding and appreciating something I already value.

> The wonder comes first, the science follows

That doesn't diminish the importance of the scientific work. I believe that careful natural history recording, preserving evidence, documenting uncertainty and making observations available for subsequent analysis are entirely consistent with the principles of citizen science. Perhaps, eventually, some of the records might be useful beyond my own collection, but even if they aren't, I think the work has value.

I've learned a great deal about the animals we encountered, about the methods used to study them, and about the limitations of the evidence we can obtain from recreational footage and that learning has deepened my appreciation of the experience itself.

## The Third Incomparable, Revisited

Before leaving Moofushi, I wrote another personal reflection describing the island as my *third incomparable*, alongside our honeymoon and the Tanzanian safari. Not only do I still feel that way, but the process of examining the recordings, building the software, identifying the wildlife and creating the films has strengthened that conviction.

The significance of Moofushi isn't simply that it's extraordinarily beautiful, although it certainly is and nor is it just the wonderful food, the people, the water villa, the sound of the surf on the reef, or even the remarkable wildlife. It's the way the place connects with so many things that matter to me. Unexpectedly, it has continued to do so long after we've returned home.

- I've spent hours examining the fish we swam among, revisiting encounters with sharks and rays, investigating unfamiliar species and developing software inspired by what we saw
- I've created records, charts, maps, films and written accounts
- I've learned things about the wildlife that I didn't know while we were there

Perhaps most importantly, I've thoroughly enjoyed doing all of it. In a sense, the holiday has continued — not because I'm trying to cling to it, but because it generated so much that was worth exploring afterwards.

## Counting the Uncountable — Again

On 25 October, I tried to count the experiences we'd accumulated during two weeks on a tiny island. Now, less than a month later, I find myself contemplating another inventory.

- Three new software applications
- Four recorded snorkelling excursions examined
- 319 images catalogued
- 1,703 identifications
- 58 species in the ReefTag database
- 83 species recorded across the wider Moofushi visit
- A substantial natural history case study
- Two movies
- An extraordinary amount of learning, experimentation, writing and enjoyment

I could probably count the hours I've spent on all this, too, but I think I'll resist that particular temptation! 😊 The most interesting thing isn't the quantity of work, or even the results themselves, it's that none of it was anticipated.

- We went to Moofushi for a holiday
- We spent two weeks being curious, observing wildlife and enjoying ourselves enormously
- Somehow, after coming home, the curiosity kept going

I thought the holiday had ended on 25 October but it turns out that only the travelling had ended.

And I'm still very happy indeed. 😊

{% include reef-suite-invitation.html %}
{% include beneath-the-surface-invitation.html %}
{% include a-place-to-return-to-invitation.html %}
