---
layout: default
title: Octopus Controller
breadcrumb: Octopus Controller
description: Exploring how an octopus-inspired simulation uses distributed arm control, local sensing and grasping to turn simple movement rules into coordinated behaviour
permalink: /wildlife/octopus/
---

# Octopus Controller

An octopus has eight extraordinarily flexible arms and an unusual nervous system, with substantial neural processing taking place outside its central brain. How, then, does it coordinate all those arms without prescribing every detail of their movement?

That question provided the starting point for **Octopus Controller**, a computational experiment exploring how individual arms can pursue objectives through local movement rules, sensory contact and responses to their surroundings.

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/octopus/behaviour-showcase.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

The model is deliberately simplified. It is not an attempt to reproduce octopus neurophysiology, nor to claim that an octopus moves according to these particular algorithms. Instead, it provides a way to investigate a broader question: **how much central control is necessary when the parts of a system can make useful adjustments locally?**

## Intention and movement

Imagine asking one arm to reach a particular position. That instruction describes an *intention*, but it says nothing about the angles of the arm's individual segments or how those segments should negotiate an obstacle.

In Octopus Controller, those responsibilities are separated. A central controller gives an arm its objective, while the arm's local controller works out how its connected segments should move. Nearby obstacles can modify movement requests, and sustained contact with food can initiate a grasp without a separate central instruction.

The arrangement can be understood at three levels:

| Level                 | Responsibility                                            | Example                                                                   |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| Central controller    | Assign objectives to arms and receive significant reports | Ask Arm 3 to reach a position                                             |
| Individual arm        | Manage its movement, contact and grasping state           | Continue reaching or establish a grip on food                             |
| Neighbouring segments | Exchange movement requests and obey local limits          | Ask the next segment towards the body for a different attachment position |

The same arrangement applies to all eight arms. One arm can hold food while another reaches past an obstacle and several others remain idle. They operate independently in a shared environment, although the simulation still has rules for shared concerns such as which arm owns a captured food object.

For the detailed division of responsibilities, see the **Central Controller** chapter. The **Reach Controller and Arm Movement** chapter explores how the connected segments actually move, including the mathematics behind the model.

## What can the controller do?

The simulation brings together several behaviours, building from movement towards interaction with objects:

1. **Flexible reaching.** Each arm comprises connected, fixed-length segments with limits on how sharply neighbouring segments can bend
2. **Local control.** Movement requests pass between neighbouring segments rather than every segment independently aiming at the distant target
3. **Independent arms.** Each of the eight arms maintains its own objective, geometry and activity state
4. **Contact sensing.** Segments detect contact with food and obstacles in the simulated environment
5. **Obstacle avoidance.** Nearby boundaries influence local movement, while a separate safety check rejects movements that would pass through obstacles
6. **Grasping and carrying.** Sustained contact with food by adjacent segments can establish a grip. The arm can then hold, carry, retract with or release the object

These capabilities are illustrated individually in the **Demonstrations** chapter, then brought together in the **Behaviour Showcase**, which uses a repeatable scenario to place several arms in different situations at once.

## Explore the simulation

Reading about distributed control is one thing; watching the individual arms respond to a changing environment makes the idea considerably easier to investigate.

The interactive Octopus Explorer lets you select scenarios, inspect individual arms, move targets and environmental objects, and adjust movement parameters. You can also pause the simulation or advance it one step at a time to examine movements and contact events that might otherwise pass too quickly to see.

<p class="feature-invite-action">
  <a href="/wildlife/octopus/explorer/">Launch the Octopus Explorer</a>
</p>

A few experiments worth trying:

- Move one arm's target and see whether the other arms continue pursuing their own objectives.
- Change the number of segments, their length, the maximum permitted bend or the turning speed, and observe the effect on reaching.
- Place food where only one segment touches it, then move it until two adjacent segments can make sustained contact.
- Put an obstacle in the path of a reach, and see whether local steering can negotiate a route around it.
- Try carrying food through a gap that is wide enough for the arm but too narrow for the food object.

The initial **Behaviour Showcase** scenario is a useful place to begin. It combines independent reaches, obstacle avoidance, contact sensing and grasping in one scene. The scenario specifies starting conditions; it does not prescribe a timed sequence of arm movements.

## What the simulation does not attempt to reproduce

The octopus in this experiment occupies a flat, two-dimensional world. Its central body and arm attachment points stay fixed, the segments retain their lengths, and the geometry does not simulate muscle forces, tissue deformation or water resistance.

Contact-sensing regions act as simplified stand-ins for the much richer sensory abilities of real octopus arms. Grasping produces a rigid attachment once the model's contact conditions are met; it does not simulate sucker adhesion, gripping pressure or friction. Arms can pass across one another and the body because arm-to-arm collisions are not included.

Nor does local steering guarantee a successful route. A target may be out of reach, an arm may be unable to bend sufficiently, or obstacles may leave it blocked even when another path might exist. The central controller does not autonomously choose between food sources or plan cooperative actions involving several arms.

These are deliberate boundaries. By keeping the rules relatively straightforward, the experiment makes it easier to see what local control achieves — and where it reaches its limits.

## Contents

The following pages develop the investigation from the distinction between central intentions and local movement through to individual demonstrations, a combined behavioural experiment and the story of Charles, the octopus who helped inspire the project.

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.octopus_controller.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## A tribute to Charles 🐙

One of the inspirations behind this project is **Charles**, a common octopus described in P. B. Dews's 1959 account of lever-operating experiments. Charles could operate the apparatus, but also applied enough force to bend and eventually break its lever, investigated the experimental lamp and directed jets of water towards people near his tank.

The story is entertaining, but it also offers a useful reminder: an animal's behaviour need not remain confined to the task an experimenter has devised. Charles provides an affectionate inspiration for a project concerned with flexible movement, environmental interaction and behaviour that may not always follow the expected path.

The full story appears in **A Tribute to Charles** in the contents above.

## Acknowledgements and further reading

Peter Godfrey-Smith's *Other Minds* was an important inspiration for this exploration of cephalopod intelligence and the unfamiliar organisation of octopus nervous systems. It helped motivate the questions that eventually became this computational experiment.

P. B. Dews's original paper provides the account of Albert, Bertram and Charles, including the memorable observations of Charles's interactions with the experimental apparatus. The project is affectionately dedicated to Charles — though it makes no claim to reproduce his personality or motivations.

**References**

- Godfrey-Smith, P. (2016). *Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness*.
- Dews, P. B. (1959). “Some Observations on an Operant in the Octopus.” *Journal of the Experimental Analysis of Behavior*, 2(1), 57–63. [https://doi.org/10.1901/jeab.1959.2-57](https://doi.org/10.1901/jeab.1959.2-57).

{% include octopus-controller-invitation.html %}
