---
layout: default
title: Demonstrations
breadcrumb: Demonstrations
description: Exploring the individual behaviours of an octopus-inspired controller, from flexible arm movement and local sensing to obstacle avoidance and grasping
series: octopus_controller
chapter: 3
---

# Demonstrations

## Exploring the Controller's Behaviour

How does a collection of relatively simple movement rules become a system capable of reaching towards objects, responding to obstacles and grasping food?

One way to investigate this is to begin with a single flexible arm and progressively introduce additional capabilities.

The five demonstrations below follow that approach. Each builds upon the preceding experiments, moving from basic arm movement to independent multi-arm control, local contact sensing, obstacle avoidance and grasping.

The important question is not simply whether the controller can perform these tasks, but **how increasingly complex behaviour can arise from local control mechanisms without every movement being prescribed centrally**.

These are computational experiments inspired by the organisation of the octopus nervous system, rather than attempts to reproduce its biology in complete detail.

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

The third demonstration introduces local contact sensing.

Until this point, movement has been determined primarily by the arm's assigned destination and its geometric constraints. Now, individual segments can also detect when they come into contact with objects in the simulated environment.

This introduces an important distinction between reaching towards an intended destination and responding to something the arm actually touches.

Rather than detecting objects at a distance, the model uses sensing regions associated with individual segments to identify physical contact.

In biological octopuses, sensory receptors distributed along the arms and associated with the suckers contribute to the animal's ability to investigate and manipulate objects. The simulation explores a simplified version of the principle that sensory information acquired locally can influence behaviour.

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

## Investigating the Behaviours Yourself

The [interactive Octopus Explorer](/wildlife/octopus/explorer/) allows you to experiment with these behaviours directly in your browser.

You can assign movement targets, adjust individual arm parameters, reposition food and obstacles, and examine how the controller responds to different conditions.

The explorer also supports predefined scenarios and allows you to upload your own experimental configurations as JSON files.

For an example of several behaviours operating together, the next chapter, **Behaviour Showcase**, presents a reproducible scenario combining independent movement, obstacle avoidance, local contact sensing and grasping.

Instructions for creating your own scenarios are available in the [Octopus Controller GitHub repository](https://github.com/davewalker5/OctopusController).

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
