---
layout: default
title: Demonstrations
breadcrumb: Demonstrations
description: Bringing independent arm control, local sensing, obstacle avoidance and grasping together in a single reproducible simulation scenario
series: octopus_controller
chapter: 4
---

# Behaviour Showcase Scenario

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/behaviour-showcase.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The `scenarios/behaviour-showcase.json` setup demonstrates independent arm control, local contact sensing, obstacle avoidance and grasping in one scene.

## Load and play

From the project directory:

```sh
./scripts/run.sh scenarios/behaviour-showcase.json
```

The scene opens paused. Press **Space** to play or pause, **N** to advance one step while paused, and **D** to restore the original setup, paused.

## What to watch

| Behaviour          | Arm / object                                              | What happens                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multi-arm control  | Arms 1, 3, 5 and 7                                        | Four arms move towards separate objectives. Arms 5 and 7 complete unobstructed reaches while Arms 1 and 3 continue their own tasks.                                                    |
| Local sensing      | Arm 1 and the food above the body                         | Contact readings appear when the arm touches the food. Sustained contact by adjacent segments starts the grasping response. Select Arm 1 with **1** to inspect its sensing and status. |
| Obstacle avoidance | Arm 3 and the circle to the lower right of its attachment | The arm negotiates the obstacle on its curved approach and reaches the target at `[532, 460]`. Select it with **3** to watch its Avoiding status and progress.                         |
| Grasping           | Arm 1 and `final-meal`                                    | Arm 1 establishes a grip, stops and holds the food. The capture count increases. Its slower movement makes this the final interaction.                                                 |

Arms 2, 4, 6 and 8 stay idle to keep the active behaviours easier to follow. Each active arm has its own target. Arm 1 turns at 2 degrees/second per joint; the other active arms use 40 degrees/second. These are joint speed limits, not whole-arm rotation speeds.

## Viewing the individual behaviours

For a general view, play the whole scene and watch the independent reaches. For a closer view of avoidance, restart with **D**, select Arm 3 with **3**, then play. For sensing and grasping, restart, select Arm 1 with **1**, and watch its contact indicators and status as it approaches the food. Pause near contact and use **N** to inspect the transition in small steps.

The sensing and grasping stages are connected: this model senses contact, rather than detecting food at a distance. A grip requires sustained contact from at least two adjacent segments. Contact and Grasping are brief stages before Holding; they are not separate long-running tasks.

For an optional, more visible demonstration that the food is attached, select Arm 1 after it is Holding and press **T** to retract with the food. Alternatively, click a new destination to carry it there. These are manual follow-up actions, not commands stored in the scenario.

## Sequence and verification

The file describes a starting setup rather than a timed script. Independent movement and obstacle avoidance overlap; Arm 1's sensing and capture follow the other completed reaches. To present sensing before avoidance in a video, use separate runs or shots of the same setup in the desired order.

A 15-second simulation check confirmed that:

- All four assigned arms moved, while the four idle arms retained their starting poses.
- Arm 3 entered Avoiding and then reached its target within the normal 2-pixel tolerance.
- Arm 1 progressed through food contact, Grasping and Holding.
- Exactly one capture occurred, after Arm 3 had reached its target.

The scenario does not automatically carry food after capture. Holding is its final state. See _Scenarios_ for accepted fields, units and parameter ranges.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
