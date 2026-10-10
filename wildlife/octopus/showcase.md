---
layout: default
title: Behaviour Showcase
breadcrumb: Behaviour Showcase
description: Bringing independent arm control, local sensing, obstacle avoidance and grasping together in a single reproducible simulation scenario
series: octopus_controller
chapter: 4
---

# Behaviour Showcase

What happens when several of the controller's behaviours are brought together in the same environment?

The earlier demonstrations examine reaching, local sensing, obstacle avoidance and grasping individually. This showcase takes the next step: **four arms are given different objectives within one shared scene**, allowing their movements and interactions to unfold alongside one another.

The result is not a prerecorded sequence of individually choreographed arm movements. A scenario defines the starting conditions; the existing arm controllers determine how each arm responds.

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/behaviour-showcase.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption>Four independently controlled arms pursue different objectives. The scene combines unobstructed reaching, obstacle avoidance, contact sensing and grasping.</figcaption>
</figure>

## Setting Up the Experiment

The showcase uses a saved scenario to specify the initial positions of the food, obstacle and arm targets, together with the relevant movement parameters.

Four arms are active: **Arms 1, 3, 5 and 7**. The remaining four stay idle, making it easier to follow the different behaviours without the scene becoming unnecessarily crowded.

Each active arm has its own objective. Arms 5 and 7 perform comparatively straightforward reaches; Arm 3 must negotiate an obstacle; and Arm 1 approaches food and eventually establishes a grasp.

One small but deliberate adjustment helps make the sequence readable. Arm 1 has a joint turning-speed limit of **2 degrees per second**, whereas the other active arms use **40 degrees per second**. These figures limit the speed of individual joints, not the rotation of the whole arm. The slower movement of Arm 1 allows the other reaches to complete before the final grasping interaction.

## What to Watch

| Behaviour             | Where to look      | What the simulation shows                                                                    |
| --------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| Independent movement  | Arms 1, 3, 5 and 7 | Several arms pursue separate objectives at the same time.                                    |
| Unobstructed reaching | Arms 5 and 7       | The arms reach their destinations while other arms continue working.                         |
| Obstacle avoidance    | Arm 3              | Local movement is redirected around the circular obstacle before the arm reaches its target. |
| Contact sensing       | Arm 1              | Contact readings appear when segments touch the food object above the body.                  |
| Grasping              | Arm 1              | Sustained contact by two adjacent segments leads to capture, followed by a Holding state.    |

There are two especially interesting aspects to this sequence.

First, **independence does not mean isolation**. The arms have their own targets and local movement states, but they operate in the same environment. A food object or obstacle is part of a shared scene rather than belonging to one particular arm.

Second, **contact is not the same thing as capture**. The model detects physical contact; it does not sense food at a distance. For grasping to begin, two adjacent segments must remain in contact with the same available food object for the required interval. Only then does the arm establish a hold.

The Contact and Grasping states may therefore be brief. The more readily visible result is Arm 1 holding the captured food, accompanied by an increase in the simulation's capture count.

## Why the Behaviours Occur in This Order

The order seen in the showcase is a consequence of the chosen starting conditions and movement parameters, **not a list of commands issued at particular times**.

Arms 5 and 7 have unobstructed reaches. Arm 3 has to adjust its movement around an obstacle before arriving at its target. Arm 1 moves more slowly towards its food object, making contact and capture the final interaction.

This distinction matters to the purpose of the experiment. The scenario establishes a repeatable arrangement in which several existing mechanisms can be observed together; it does not bypass those mechanisms to produce a predetermined animation.

A simulation check over 15 seconds confirmed the intended behaviours: all four assigned arms moved, Arm 3 entered its Avoiding state and reached its destination within the usual two-pixel tolerance, and Arm 1 progressed from food contact through Grasping to Holding. Exactly one capture was recorded, after Arm 3 had reached its target.

## What the Showcase Demonstrates

The showcase illustrates how **several relatively simple local mechanisms can operate together without the central controller prescribing every joint movement**.

That does not make this a faithful biological simulation of an octopus. Movement is geometric, contact sensing is simplified, and the model does not reproduce muscles, suckers or the nervous system in physiological detail.

Nevertheless, it provides a useful way to investigate the relationship between high-level objectives and local responses. An arm can continue towards a target while another avoids an obstacle and another makes contact with an object, all within the same simulated environment.

The more detailed _Central Controller_ and _Reach Controller and Arm Movement_ pages explain how responsibility is divided and how the local movement rules operate. The project's GitHub documentation contains the full scenario format and implementation details.

## Exploring the Scene Yourself

The [interactive Octopus Explorer](/wildlife/octopus/explorer/) allows you to investigate these behaviours directly in your browser, without installing any software.

You can select the Behaviour Showcase from the available scenarios, start and pause the simulation, advance it one step at a time, and inspect the activity of individual arms. You can also change movement parameters, assign new targets, and reposition food or obstacles to investigate how the arms respond to different conditions.

The explorer also supports **loading your own scenarios from JSON files**.

A scenario describes the starting conditions of an experiment, including the position of the octopus, food objects, obstacles, individual arm targets and movement parameters. Rather than specifying a sequence of movements, it establishes an environment in which the arm controllers operate according to their normal rules.

This means you can design your own experiments: perhaps investigating how different arm configurations affect reaching, creating more challenging obstacle arrangements, or exploring what happens when several arms pursue the same food object.

The scenario format, supported parameters and examples are documented in the [Octopus Controller GitHub repository](https://github.com/davewalker5/OctopusController). You can create a scenario using any text editor, save it as a JSON file, and load it into the browser-based explorer.

The aim is not simply to reproduce the demonstrations shown here, but to encourage further experimentation with the principles of distributed control and environmentally responsive movement.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
