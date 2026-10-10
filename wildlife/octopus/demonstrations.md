---
layout: default
title: Demonstrations
breadcrumb: Demonstrations
description: Exploring the individual behaviours of an octopus-inspired controller, from flexible arm movement and local sensing to obstacle avoidance and grasping
series: octopus_controller
chapter: 3
---

# Demonstrations

## Overview

Octopus Controller explores the control of flexible, octopus-inspired arms through a series of increasingly sophisticated simulations.

The demonstrations progress from controlling a single arm to coordinating multiple arms, responding to local sensory information, navigating around obstacles and interacting with objects through grasping.

The underlying theme is **distributed control**: investigating how relatively simple control mechanisms, operating at the level of individual arms, can contribute to more complex and coordinated behaviour.

These demonstrations illustrate the capabilities of the simulation rather than attempting to reproduce the biological nervous system of an octopus in complete detail.

## 1. Single-Arm Controller

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/01-single-arm-controller.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The first demonstration establishes the basic movement capabilities of a single flexible arm.

Unlike a conventional rigid robotic manipulator, an octopus arm can bend continuously along its length, allowing it to adopt a wide range of shapes while reaching towards a target.

This demonstration illustrates:

- Control of a flexible, multi-segment arm
- Changes in arm curvature during movement
- Movement of the arm towards a specified target

**Significance:** Establishes the fundamental control mechanism used in subsequent demonstrations. More complex behaviours depend upon the ability to position and reshape individual arms.

## 2. Multi-Arm Controller

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/02-multiple-arm-controller.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The second demonstration extends the single-arm controller to a complete arrangement of eight arms.

Each arm can move independently, allowing the system to represent multiple simultaneous movements without treating the entire animal as a single rigid mechanism.

This demonstration illustrates:

- Eight flexible arms arranged around a central body
- Independent movement and positioning of individual arms
- Simultaneous operation of multiple arm controllers

**Significance:** Introduces the multi-arm architecture and provides the foundation for investigating distributed control.

In an octopus, the central nervous system interacts with substantial neural circuitry distributed throughout the arms. This simulation takes inspiration from that organisation while adopting a simplified computational model.

## 3. Local Sensing

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/03-local-sensing.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The third demonstration introduces local environmental sensing.

Rather than relying exclusively on predefined movement targets, individual arms can respond to information concerning nearby objects.

This is an important step towards modelling behaviour in which the environment influences how an arm moves.

This demonstration illustrates:

- Detection of objects within a local sensing region
- Arm responses informed by nearby environmental features
- The interaction between sensory information and movement control

**Significance:** Introduces sensory feedback into the control process.

Biological octopus arms possess extensive sensory capabilities, including receptors associated with their suckers. These allow an arm to acquire information about objects it encounters.

The simulation explores the broader computational principle that local sensory input can influence an appendage's behaviour without requiring every response to be individually specified by a central controller.

## 4. Obstacle Avoidance

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/04-obstacle-avoidance.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The fourth demonstration introduces environmental constraints in the form of obstacles.

Reaching a target is no longer simply a matter of moving towards a destination. The arm must modify its movement in response to objects that obstruct its path.

This demonstration illustrates:

- Detection of nearby obstacles
- Modification of arm movement in response to environmental constraints
- Continued target-directed movement while negotiating obstacles

**Significance:** Extends the controller from basic target-directed movement towards environmentally responsive navigation.

Obstacle avoidance is particularly relevant to flexible appendages because the available movement strategies extend beyond those of conventional rigid-jointed manipulators. An arm may change its curvature and configuration to negotiate the surrounding environment.

## 5. Grasping

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/05-grasping.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The fifth demonstration extends the controller from positioning an arm to interacting with an object.

An arm approaches a target and changes its configuration to produce a grasping movement.

This demonstration illustrates:

- Target-directed reaching
- Curvature changes associated with grasping
- Object interaction through coordinated arm movement

**Significance:** Introduces an important functional behaviour: object manipulation.

Grasping requires movement to be organised around an interaction with the environment, rather than merely achieving a particular position.

It also provides a foundation for future experiments involving contact feedback, adaptive gripping and cooperation between multiple arms.

---

## From Movement to Behaviour

Considered together, the five demonstrations represent a progression in the capabilities of the control system:

| Stage | Capability         | Principal development                          |
| ----- | ------------------ | ---------------------------------------------- |
| 1     | Single-arm control | Flexible movement towards a target             |
| 2     | Multi-arm control  | Simultaneous operation of eight arms           |
| 3     | Local sensing      | Movement informed by environmental information |
| 4     | Obstacle avoidance | Movement adapted to environmental constraints  |
| 5     | Grasping           | Purposeful interaction with objects            |

The progression illustrates how additional capabilities can be built upon a relatively simple movement controller.

Of particular interest is the relationship between central coordination and local control. In biological octopuses, the nervous system distributes substantial sensory processing and motor control throughout the arms.

The simulation provides a simplified experimental framework for exploring aspects of this organisation.

## Scope and Limitations

Octopus Controller is a biologically inspired computational experiment, not a detailed neurophysiological model.

The demonstrations should therefore be understood as examples of simulated control behaviours rather than evidence that the biological mechanisms employed by real octopuses have been reproduced.

In particular, the simulation does not establish that its behaviours arise through the same neural processes observed in living animals.

Nevertheless, it provides a useful foundation for investigating distributed control, sensory feedback and the relationship between local and coordinated behaviour.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
