---
layout: default
title: Following the Fish
breadcrumb: Following the Fish
description: Exploring the detection and tracking of marine animals in underwater footage, from conventional computer vision to segmentation
series: from_encounter_to_evidence
chapter: 3
assets: "/images/encounter-to-evidence/"
movies: "/movies/encounter-to-evidence/"
fishtrack_review_window:
  name: "fishtrack-review-window.png"
  alt: "FishTrack interface for reviewing and selecting candidate marine animals before tracking."
  caption: "FishTrack's detection review interface, allowing automatically proposed regions of interest to be examined, corrected or rejected before tracking begins"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
fishtrack_analysis_window:
  name: "analysis-trajectories.png"
  alt: "FishTrack analysis interface displaying recorded tracking trajectories."
  caption: "FishTrack's analysis facilities provide a means of examining recorded trajectories, tracking continuity and interruptions"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
moorish_idol_tracking:
  name: "moorish-idol-fishtrack.mp4"
  caption: "Conventional computer-vision tracking of a Moorish idol (Zanclus cornutus). One of FishTrack's earliest experimental subjects, this sequence demonstrates successful tracking of the selected animal through successive video frames"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
titan_triggerfish_tracking:
  name: "titan-triggerfish-fishtrack.mp4"
  caption: "Side-by-side comparison of conventional computer-vision tracking (left) and SAM 2 segmentation-based tracking (right) of a titan triggerfish. As the animal rolls and its apparent shape changes, conventional tracking loses the subject while SAM 2 maintains the track. The sequence illustrates how different tracking methods respond to changes in appearance"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
manta_ray_tracking:
  name: "manta-ray-fishtrack.mp4"
  caption: "Side-by-side comparison of conventional computer-vision tracking (left) and SAM 2 segmentation-based tracking (right) of a reef manta ray. Conventional tracking methods lose the subject while SAM 2 is able to track the animal to the end of the sequence, demonstrating the potential of segmentation for tracking highly deformable subjects"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Following the Fish

_ReefFrame_ addressed the practical problem of preparing underwater footage so that its contents could be examined more easily but that prompted another question:

> Could software find an individual fish in a video recording and continue following it as it moved through the scene?

Finding and tracking individual animals in the resulting footage was a more exploratory project, not necessary for identifying species or creating natural-history records, but offering an opportunity to investigate what computer vision might achieve with the recordings.

This was the starting point for _FishTrack_, an experimental Python application for detecting, outlining and tracking marine animals through video sequences.

## A Deceptively Difficult Problem

Watching a fish swim across a video seems straightforward - a human observer can usually recognise the animal, follow its movement and distinguish it from the surrounding reef. For a computer, though, the task is considerably more complicated.

A coral reef contains an enormous amount of potentially confusing visual detail. Fish may be similar in colour to their surroundings, pass behind coral formations or overlap with other animals, with some moving quickly and others turning slowly or remaining almost stationary. Illumination changes as the camera moves, suspended particles drift through the water, and changes in the animal's orientation can dramatically alter its apparent shape.

The camera itself is also moving as the snorkeller adjusts position and turns towards animals of interest with the result that the background moves across the image, too, and a coral formation that is entirely stationary in the real world may appear to travel considerable distances between successive video frames. As a result, differences between frames cannot automatically be attributed to moving animals.

There is also the issue of _parallax_, where objects at different distances from the camera can appear to move by different amounts as the camera changes position. Even compensating for the apparent movement of the background cannot necessarily eliminate this effect.

Finding a fish, or _detection_, is only the beginning, as the tracking system must then decide whether an object appearing in the current frame is the same as that in the previous frame, a decision that must be repeated from frame to frame as the animal moves, turns, changes scale or temporarily disappears. A mistake may cause the tracker to lose the animal, follow part of the background or transfer its tracking identity to another animal.

## Conventional Computer Vision

_FishTrack_ began as a standalone command-line experiment using Python, OpenCV and NumPy designed with an intentionally modest remit:

> Could conventional computer-vision methods produce useful and understandable detections and tracks from real underwater recordings?

The first approach involved examining successive video frames, estimating camera movement and attempting to compensate for it before looking for independently moving regions. The idea was that, once much of the camera-induced movement had been accounted for, movement remaining in the image _might_ indicate the presence of a fish or other marine animal.

Candidate regions could then be filtered, outlined and associated across successive frames, with each identified track assigned a temporary identifier, allowing its apparent movement to be followed. When the system detected unwanted movement or lost an object, the hope was that the intermediate results from the processing stages would offer some indication of why that might have happened.

In practice, the difficulties of real reef footage rapidly became apparent:

- Movement could be detected where no fish was present
- A slowly moving animal might be difficult to distinguish from the background
- An animal could disappear behind coral, turn sharply or pass close to another fish

Even where the initial detection was correct, maintaining the track was far from guaranteed but these limitations were useful findings since the original objective was to explore which approaches worked, where they struggled and what could be learned from their behaviour.

## Finding is not Following

One of the most important distinctions to emerge from _FishTrack's_ development was the separation of three distinct tasks:

- _Detection_ attempts to identify where an animal might be in the initial frame
- _Segmentation_ attempts to determine which pixels in an image belong to an animal of interest
- _Tracking_ attempts to follow an object from frame-to-frame

It should be noted that a successful result in one task does not guarantee success in the other tasks in the sequence:

- A detected region might contain a single fish, several fish or something that is not an animal at all
- A segmentation system might produce a convincing outline without necessarily identifying the correct object
- A tracker might maintain a consistent identifier while gradually drifting onto the background or another individual

_FishTrack_ consequently developed several approaches to finding starting subjects and following them.

### Detection

The simplest method is manual selection, where the user draws a rectangular region around an animal of interest in the starting frame to provide the tracking system with an explicit starting point. It has the advantage that the decision about which animal to investigate remains with the observer though, as stated above, it doesn't ensure that selection will be successfully maintained by the tracking system.

_FishTrack_ also supports automatic detection using _Grounding DINO_, an object-detection model that accepts natural-language descriptions. Given a prompt such as `fish.`, it examines the starting frame and proposes rectangular regions that may contain matching objects. The proposals can be reviewed, corrected or rejected before processing begins, so an animal that has been missed can be selected manually while a region that contains coral rather than an animal can be removed.

The result is a useful combination of automated assistance and human judgement in which the model can suggest where to look but the user retains control over which subjects are accepted.

_Grounding DINO_ does not continue searching throughout the entire video - its role is to suggest starting regions, not to maintain tracks through subsequent frames.

{% include fullwidth-image.html assets=page.assets img=page.fishtrack_review_window %}

### Tracking

Once a starting region has been accepted, _FishTrack_ can use one of two tracking approaches:

| Tracking Method              | Description                                                                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conventional computer-vision | Combines camera-motion compensation, movement detection, association between observations and appearance-based tracking. It can also discover additional moving candidates later in a recording |
| SAM 2                        | A video-segmentation model that predicts a mask representing the pixels it associates with the selected object in successive frames                                                     |

The difference between the two techniques became particularly interesting when examining animals whose apparent shapes changed substantially during the recordings.

A rectangular tracking region is a useful abstraction, but a fish is not a rectangle! As an animal changes direction, its apparent proportions can alter dramatically such that a fish viewed from the side may appear broad and recognisable but the same animal turning towards or away from the camera may present a much narrower profile. A conventional tracker may struggle in such cases, when the appearance of the subject changes sufficiently that the region it is following no longer resembles the original selection.

_SAM 2_ takes a different approach, using an initial region of interest to create a mask for the selected object and then attempting to maintain that mask as the video progresses. The mask represents the model's prediction about which pixels belong to the object of interest so it's perfectly possible for the prediction to omit parts of the animal, include parts of the background or become associated with an incorrect subject. This became apparent in the tracking of a _Reef Manta Ray, Mobula alfredi_, discussed below.

Nevertheless, the technique does allow the resulting outline to expand, contract and change shape with the animal's movement, which is particularly useful for fish and rays, where the changing silhouette can be a prominent feature of the recording.

## Tracking Real Subjects

Three subjects provided particularly useful opportunities to examine _FishTrack's_ behaviour. They were not selected as part of a systematic performance benchmark but offered different practical challenges encountered while experimenting with the footage.

### Establishing the Approach

The first tracking subject was a _Moorish idol_, Zanclus cornutus, chosen because good, clear footage was available with which to test the application and because its distinctive body shape, contrasting markings and characteristic elongated dorsal filament made it a visually interesting subject for experimentation.

That footage was used to guide the development of the prototype of _FishTrack_ and establish the initial implementation for selection, tracking identity assignment and subsequent tracking through the sequence.

This was an important first step, and visual inspection showed that for this footage, at least, conventional computer-vision was successful in tracking the selected animal through the clip, though that did not guarantee similar success with different species or more complex scenes.

{% include fullwidth-movie.html assets=page.movies img=page.moorish_idol_tracking %}

### Handling Changes in Appearance

The next, more demanding, example involved a titan triggerfish. Once again, the test footage was clear but during the selected sequence the animal rolled, producing a substantial change in its orientation and silhouette, creating exactly the kind of problem that can defeat an appearance-based tracker.

The conventional tracking approach initially followed the animal but subsequently lost the track as its appearance changed, prompting the introduction of _SAM 2_ as an alternative tracking method. It was able to maintain tracking through the movement, demonstrating that the segmentation approach was better able to accommodate the changing outline, in this particular sequence at least.

The result is specific to the tested recording, starting conditions, model and configuration and doesn't mean that _SAM 2_ will always outperform conventional computer-vision on all footage, for all movement types and for all subjects.

It does demonstrate, though, that changes in an animal's apparent shape are central to the difficulty of tracking it, and that different methods can respond quite differently to those changes.

{% include fullwidth-movie.html assets=page.movies img=page.titan_triggerfish_tracking %}

### Continuously Changing Shape

Unlike a fish whose body remains relatively compact as it swims, _Reef Manta Rays, Mobula alfredi_, have broad pectoral fins that move continuously through the water causing the apparent shape of the animal to change considerably during each swimming cycle. Its fins rise, fall and curve, while the entire body may change orientation relative to the camera, resulting in a subject that is highly deformable, from the perspective of a tracking system.

Further, in the available sequences the animal was feeding in plankton-rich water that made the footage less clear than the other examples.

Conventional tracking encountered difficulties with changes in the animal's silhouette, while _SAM 2_ maintained tracks throughout, with the mask following the broad movement of the manta's fins. Importantly, though, the mask was not perfect - while it tracked the animal to the end of the test footage it didn't perfectly follow its outline. During one upwards beat, the mask is seen breaking into two with one section being lost before the former mask shape is regained on the next downwards beat.

This is due to the murkiness of the water and the resulting difficulties of distinguishing the paler underside of the manta from the background.

{% include fullwidth-movie.html assets=page.movies img=page.manta_ray_tracking %}

## Analysing Tracking Performance

Alongside the annotated tracking video, the application generates a JSON-format file recording per-frame tracking data that enables the inspection and comparison of tracking performance using the _Analysis_ facilities. The recorded track for two tracking sessions through a given video can be displayed side-by-side as a per-frame trajectory overlaid over the source footage, along with information about where the tracking data begins and ends.

This allows side-by-side comparison of tracks produced using different tracking methods or by a single tracking method using different parameters. The result is a display that highlights differences in continuity, showing the frames for which the two tracks report a position and highlighting the point where a subject is lost.

{% include fullwidth-image.html assets=page.assets img=page.fishtrack_analysis_window %}

Alongside the visual trajectory, numerical information from the tracking data can be displayed:

- Number of frames containing observations
- Coverage of the reported track
- Interruptions
- Path length in frame coordinates

The application also reports events that may indicate changes or discontinuities, such as a loss of tracking or an unusually large change in position, either directly reported by the processing backend or inferred from the recorded tracking information. For example, s large change in reported position may indicate a tracking problem but, alternatively, might reflect genuine movement or a change in viewing conditions in the footage.

The _Analysis_ functionality produces experimental results that complement the demonstration provided by the annotated videos. It promotes understanding of how consistently the tracking method report their observations, where subject loss occurs and what differences emerge between tracking methods.

## Tracking Data Limitations

Both the trajectories and the calculated metrics recorded by _FishTrack_ describe movement within the _frame_, with the trajectories expressed in pixel co-ordinates. They do not describe movement of the subject through the physical environment where the footage was recorded and so cannot be used to imply speed of movement or distance travelled.

Furthermore, while the tracker assigns an identity to an object, that identity is a generated artefact and there is no guarantee that it is associated with the same animal throughout the sequence. Overlapping animals and changes in appearance may cause an identity to drift onto the background or another individual

## The Measure of Success

It would be tempting to measure the success of _FishTrack_ simply by the number of recordings in which an animal was **successfully** followed but that would miss much of the value, challenge and enjoyment of understanding why a tracking method might fail:

- The early conventional computer-vision experiments established the difficulty of separating fish movement from camera movement and complex backgrounds
- The introduction of _Grounding DINO_ explored how detection could assist in selecting subjects, helping avoid genuine regions of interest being confused with other elements in the scene
- _SAM 2_ provided an alternative tracking approach that proved more successful when there were significant changes to the shape of animals during movement
- The development of tracking analysis made it possible to examine continuity, interruptions and the reported positions rather than relying solely on visually appealing overlays

A tracking failure is not necessarily a failed experiment. Understanding why an approach loses an animal is a useful outcome and, in this case, the experiments with selected footage and the understanding of where, and why, tracking failed were used used to guide each step in the development.

## Conclusions

_FishTrack_ is a useful and entertaining experimental application, demonstrating both the possibilities and the limitations of applying computer vision to opportunistically recorded wildlife footage, and further investigation will doubtless continue.

However, it does not contribute to species identification and, as such, sits outside the evidence pathway supported by the other applications:

- _ReefFrame_ was developed to facilitate preparation of footage and still images for examination
- _FishTrack_ arose purely from curiosity about using computer vision to follow individual animals through the footage
- _ReefTag_, the third application in the series, was developed to address the challenges of managing still images and the species identifications derived from them

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include reef-suite-invitation.html %}
