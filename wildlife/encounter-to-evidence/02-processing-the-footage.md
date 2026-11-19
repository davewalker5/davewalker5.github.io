---
layout: default
title: Processing the Footage
breadcrumb: Processing the Footage
description: From underwater GoPro footage to images suitable for careful examination, and the development of ReefFrame as the first stage in the evidence pathway
series: from_encounter_to_evidence
chapter: 2
assets: "/images/encounter-to-evidence/"
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
---

# Processing the Footage

The first software problem was to make the video practical to work with.

The GoPro cameras had captured a substantial amount of underwater footage during our stay on Moofushi, covering encounters with fish, sharks and other marine life, sometimes individually and sometimes in considerable numbers. The footage also preserved movement, behaviour and the wider context of the reef environment.

However, underwater recording presents particular difficulties. Available light changes with depth, suspended particles can reduce clarity, colours are affected by the passage of light through water and a moving camera introduces further complications, particularly when the person holding it is also swimming. The original recordings were valuable precisely because they preserved the encounters as they happened but the challenge was to make their contents easier to inspect without losing the connection to those original observations.

This became the starting point for _ReefFrame_.

## From Shell Scripts to a Focused Application

My initial approach was to use [FFmpeg](https://ffmpeg.org/), the well-established open-source multimedia processing toolkit that provides an extensive range of video-processing capabilities, including format conversion, stabilisation, adjustments to brightness and contrast, colour processing and extraction of individual frames. I assembled _FFmpeg_ commands into Bash shell scripts, a pragmatic starting point that allowed the processing to be automated and provided a way to experiment with different adjustments. 

However, as the work developed, the limitations of the approach became increasingly apparent. Different recordings benefited from different combinations of processing operations so a setting that improved one recording might be less useful for another. Experimenting with alternative values involved duplicating and editing individual scripts and keeping track of which processing operations had been applied. In short, managing the collection of scripts was becoming a problem in its own right.

What was needed was not another general-purpose video editor but a focused application that would make a relatively small set of useful processing operations easy to configure, repeat and apply consistently. _ReefFrame_ emerged from that requirement.

Built in Python with a _PySide6_ desktop interface, it provides a graphical front end to _FFmpeg_ and _FFprobe_. It doesn't attempt to replace _FFmpeg's_ processing capabilities but, instead, organises them into a workflow suited to preparing recorded footage for subsequent examination. Processing produces separate outputs, leaving the source recordings intact and available for reference and comparison and ensuring derived outputs can be traced back to their source.

{% include fullwidth-image.html assets=page.assets img=page.reef_frame_screenshot %}

## Processing Underwater Footage

_ReefFrame_ supports several kinds of adjustment, each addressing a different practical difficulty with the recordings.

### Stabilisation

Movement is part of snorkelling and even with a camera designed for action recording, footage may include unwanted rotation, changes in direction and small, repeated movements as the swimmer adjusts position. All of which can make it difficult to follow an animal or examine details that remain visible for only a short period.

_ReefFrame_ uses _FFmpeg's_ "VidStab" facilities to analyse camera movement and apply smoothing, making an extended sequence less distracting and helping maintain a more consistent view of the recorded subjects.

It's not a remedy for every form of movement, however, as severe motion blur cannot be undone simply by stabilising the picture and the transformations used to compensate for movement may require cropping the image.

### Visibility, Contrast and Colour

Underwater footage can have subdued contrast, strong colour casts and regions in which potentially useful detail is difficult to distinguish so _ReefFrame_ provides a series of adjustments to address these problems:

- Brightness and contrast adjustments can make features more readily distinguishable
- Colour correction changes the relative contributions of the red, green and blue channels
- Gamma correction and shadow uplift can improve the visibility of midtones and darker regions

The application also includes a "dehazing" operation, although the name requires some qualification. It uses brightness and contrast adjustments to reduce the _appearance_ of haze rather than physically removing suspended particles from the image or reconstructing the underwater light field. These operations can make a meaningful difference to the usefulness of a recording:

- An animal that is difficult to distinguish against its surroundings may become easier to examine
- A region of shadow may reveal visible features more clearly
- Colour adjustments may reduce an intrusive cast that makes the scene difficult to interpret

However, it's important to note that the improvements operate on information already captured by the camera and cannot reconstruct missing detail or guarantee that the displayed colours represent the animal's appearance under natural illumination. This distinction becomes particularly important when the resulting material is used for identification rather than simply presentation.

{% include fullwidth-image.html assets=page.assets img=page.reef_frame_comparison %}

## A Processing Pipeline

As _ReefFrame_ developed, its processing capabilities became more flexible so while the application initially offered individual operations and a fixed enhancement sequence this subsequently evolved into a configurable _Enhancement Pipeline_, in which selected processing stages can be combined into a single job:

- Stabililsation
- Brightness and contrast adjustments
- Colour correction
- Gamma correction and shadow uplift

This capability is important for two reasons. First, not every recording needs the same treatment such that a sequence affected by camera movement might benefit primarily from stabilisation, while another recording may require adjustments to contrast or colour. A configurable pipeline allows an appropriate combination of operations to be selected without imposing every available correction on every video.

Second, combining compatible operations avoids repeatedly encoding the video between stages, a process that requires repeated lossy encoding that can introduce further changes to the footage. The configurable pipeline applies a single final rendering irrespective of how many processing stages are required.

The application also provides practical facilities for experimenting with and reusing settings:

- Short trial sections can be processed before committing to an entire recording
- Comparison outputs place the original and processed material alongside one another, making the effects of the chosen adjustments easier to assess
- Reusable presets allow configurations to be saved and applied again, while remembered settings simplify repeated work

These are primarily usability features, but they also support a more disciplined approach to processing. Rather than relying on an informal sequence of commands and adjustments, the application provides an identifiable set of processing operations that can be evaluated, repeated and revised, making preparation of the footage more consistent and understandable.

The detailed operations, parameters and implementation are documented separately in the _ReefFrame_ Wiki. For this case study, their importance lies in what they make possible at the next stage of the evidence pathway.

## The Importance of Still Images

Although _ReefFrame_ can produce enhanced video, its most important output for _From Encounter to Evidence_ is arguably much simpler: An individual still image extracted from a known position in a recording. Video is particularly valuable for preserving movement and context, showing how an animal was swimming, its relationship to other animals, and the surroundings in which the encounter occurred, but it is less convenient when the task is to examine several individuals within a scene, compare their visible characteristics and record separate identifications.

A still image makes that work considerably easier. The frame can be viewed at leisure, enlarged and inspected repeatedly, individual animals can be marked, and tentative identifications can be reconsidered, all without needing to navigate continuously through the video. _ReefFrame_ therefore provides facilities to extract individual frames from recordings and save them as PNG images.

The selected position in the footage is incorporated into the output filename. Combined with the relationship to the source recording, this provides a means of locating the moment from which the image was extracted. For example, an extracted frame might be represented by a filename such as:

`GOPR0524-003-enhanced-00-00-03.png`

The filename identifies the processed recording and a position three seconds into that recording. This naming convention is more than a convenience for organising files as it establishes a practical route back through the processing chain:

_Extracted still image → processed recording → original footage → recorded encounter_

Frames were selected because they offered useful opportunities to examine and identify marine life, not according to a predetermined ecological sampling scheme, so the resulting collection is a set of selected observational opportunities rather than an unbiased sample of all the animals encountered.

That limitation is important, but it does not diminish the practical value of the extracted images. It simply defines how they should be understood and used.

## Improvement is Not New Evidence

There is a potentially misleading aspect to image enhancement insofar as a processed image may look considerably more informative than the original. Greater contrast, stronger colours and reduced camera movement can give the impression that information has somehow been recovered from the recording but, while a processing operation may make an existing feature easier to _recognise_, there is a fundamental distinction between making recorded information more visible and establishing information that was never recorded.

Processing transforms the information contained in the recording but it cannot independently establish the accuracy of the resulting appearance, something that has a direct bearing on species identification:

- Increasing brightness may reveal detail in a dark region, but it may also make sensor noise more prominent
- Increasing contrast can improve separation between features while simultaneously removing subtle tonal differences
- Colour correction may make a scene easier to interpret without providing reliable evidence of an animal's true colour
- Stabilisation can improve viewing continuity, but it cannot recreate detail lost to motion blur

If an identification depends on a particular visible characteristic, it is important to consider whether that characteristic is genuinely present in the source material or has been exaggerated, obscured or distorted by processing. Where necessary, the enhanced image can be compared with the original recording and its surrounding frames.

As a result, for _From Encounter to Evidence_, the purpose of processing is quite specific - to improve the practical accessibility of recorded observations while keeping interpretations within the limits of what the source material can support. An uncertain identification remains uncertain where the visible evidence is insufficient, however attractive or convincing the processed image may appear.

## Preparing the Ground for ReefTag

With _ReefFrame_ the footage could now be prepared using repeatable processing operations, and selected moments could be extracted as individual images that could be related back to their source recordings and be inspected closely for the purpose of species identification.

However, an image is not yet a structured natural-history observation:

- A frame containing several reef fish still needs to be examined
- Individual animals need to be located within it
- Their identities need to be considered
- The resulting identifications need to be recorded in a form that can be stored, reviewed and eventually analysed

There is also the question of uncertainty as some animals may be readily identifiable, while others may be partly obscured, poorly oriented or simply beyond confident identification from the available evidence.

Organising the images and identifications requires a different kind of application, one concerned not with preparing footage and still images but with describing what can be observed within them. That became the role of _ReefTag_.

In retrospect, _ReefFrame_ represents the first software stage in a process that had not been fully anticipated when the footage was originally recorded. What began as an attempt to make some GoPro recordings easier to work with became a dedicated application, and that application created the conditions for a further stage of structured observation.

The objective was never simply to produce more attractive underwater pictures. It was to make the recordings sufficiently accessible that their contents could be examined carefully, identified where possible and connected to the original encounters.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include reef-suite-invitation.html %}
