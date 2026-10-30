---
layout: default
title: Hazards and Local Avoidance
breadcrumb: Hazards and Local Avoidance
description: Exploring how local hazard detection and recoil differ from simply steering an octopus-inspired arm around physical obstacles
series: octopus_controller
chapter: 3
---

# Hazards and Local Avoidance

An obstacle and a hazard may both cause an arm to change course, but they represent two quite different problems. An **obstacle** is a physical constraint:

> The arm cannot move through this region

A **hazard** represents something different:

> The arm could enter this region, but should actively prefer not to

That distinction introduces a new kind of local behaviour into Octopus Controller. Instead of merely finding a route around geometry, an arm can respond to an aversive stimulus by moving away from it — even when that initially takes the arm further from its assigned target.

## Obstacles and Hazards

Obstacle avoidance is primarily geometric. When an obstacle interferes with a local movement request, the arm redirects that request around the obstacle while keeping its original destination unchanged. A separate safety check rejects any proposed movement that would physically cross the obstacle.

Hazards do not work like that. A hazardous region remains physically accessible. The arm is not prevented from entering it by collision rules. Instead, detection produces an **aversive response**.

The basic distinction can be summarised as:

| Property                                    | Obstacle            | Hazard             |
| ------------------------------------------- | ------------------- | ------------------ |
| Can the arm enter the region?               | No                  | Yes                |
| Why is it avoided?                          | Physical constraint | Aversive response  |
| Initial reaction                            | Steer around        | Recoil / move away |
| May movement temporarily oppose the target? | Usually not         | Yes                |
| Original goal retained?                     | Yes                 | Usually            |
| Central intervention required?              | No                  | Not necessarily    |

Two trajectories may eventually curve around the same **area of the environment** — for example, around the space occupied by an obstacle in one experiment and by a hazardous region in another — but the reason for doing so is different.

- With an obstacle, the arm changes course because that space is physically unavailable
- With a hazard, the arm changes course because local control is actively driving it away from something aversive, even though the space itself remains physically accessible

## Detection and Recoil

The important addition is **recoil**. Without it, a hazard becomes little more than an obstacle with a different appearance. When a local part of an arm detects a hazard, the immediate response is instead to increase its separation from the stimulus.

Conceptually:

```text
Arm pursuing target
        ↓
Hazard detected locally
        ↓
Recoil from hazard
        ↓
Increase separation
        ↓
Reassess local movement
        ↓
Resume pursuit if possible
```

The recoil may temporarily move the arm away from its assigned destination. The central objective has not necessarily changed but the local controller has simply encountered information that temporarily takes priority over direct progress towards it. This provides another example of the distinction at the heart of Octopus Controller:

> The central controller specifies what an arm should achieve; local control influences how it behaves while attempting to achieve it

## Attraction and Aversion

A reaching arm can therefore be thought of as operating under two competing influences. The target produces an attractive influence:

```text
move towards this
```

while a detected hazard produces an aversive influence:

```text
move away from this
```

The resulting movement depends on their interaction. A weak or distant hazard may only deflect the arm. A closer or stronger encounter may produce an obvious withdrawal before the arm resumes its original task. This makes hazard avoidance qualitatively different from ordinary obstacle steering: the controller is no longer responding solely to geometry, but to a locally perceived cost associated with part of the environment.

## Local Autonomy

Hazard detection is deliberately a local concern and the central controller does not need to calculate the detailed withdrawal movement. For a hazard that can be handled locally, the central objective remains unchanged throughout but this raises an interesting question:

> How much environmental difficulty can an arm resolve for itself before the central controller needs to become involved?

That question becomes particularly important as the project develops towards priority signalling and conflict resolution.

## A Simple Experiment

A useful comparison is to place the same target beyond two different kinds of environmental feature.

### Experiment A — Obstacle

```text
Arm → obstacle → target
```

Expected behaviour:

```text
approach
   ↓
local steering
   ↓
detour around obstacle
   ↓
continue towards target
```

### Experiment B — Hazard

```text
Arm → hazard → target
```

Expected behaviour:

```text
approach
   ↓
hazard detected
   ↓
recoil
   ↓
increase separation
   ↓
redirect movement
   ↓
continue towards target if possible
```

The final paths may look superficially similar.

The interesting difference lies in the mechanism that produced them.

## When Avoidance Becomes Conflict

Local recoil does not necessarily constitute a conflict with the central controller. An arm can withdraw briefly, move around a hazard and then continue towards its original target without the overall objective changing. In that case, the question remains:

> How should I carry out this objective?

A different problem begins when local avoidance can no longer coexist comfortably with the current task. For example:

```text
CENTRAL:
Reach food

LOCAL ARM:
Hazard directly blocks preferred approach
```

or:

```text
ARM 2:
Maintain grip on food

ARM 5:
Critical hazard detected
```

At this point, the issue is no longer simply how an arm should move. The system must decide which valid instruction, response or priority should take precedence. That changes the question to:

> Which objective should win?

This is the boundary between **local hazard response** and **conflict resolution**. Hazard avoidance remains primarily a local mechanism: detect, recoil, increase separation and attempt to continue. In contrast, conflict resolution operates at a higher level and becomes necessary when different goals, responses or arms make incompatible demands on the system.

Those rules are explored separately in **Conflict Resolution**.

## What the Model Does — and Does Not — Represent

Hazards in Octopus Controller are computationally aversive environmental features. They should not be interpreted as models of pain, nociception or the subjective experience of a real octopus. Likewise, recoil is a behavioural mechanism in the simulation rather than a claim about the precise neural circuitry responsible for withdrawal responses in living animals.

The purpose is narrower:

> To investigate how local sensory information can temporarily redirect behaviour without every environmental response being prescribed centrally

This adds another layer to the project's broader exploration of distributed control:

- The central controller can express an intention
- The arm can pursue it
- The arm can also encounter something in the environment and locally respond by moving away before attempting to continue

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
