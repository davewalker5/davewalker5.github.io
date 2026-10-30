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

The important addition is **recoil**. Without it, a hazard becomes little more than an obstacle with a different appearance. When a local part of an arm detects a sufficiently strong hazard, the immediate response is instead to increase its separation from the stimulus. Milder hazards can still bias movement away from themselves without producing a distinct timed recoil.

Detection and exposure are deliberately different. An arm can detect a hazard while still outside its hazardous region and begin avoiding it before actually entering. **Exposure** occurs only when part of the arm penetrates the hazardous region itself.

Conceptually:

```text
Ordinary reaching
        ↓
Hazard detected locally
        ↓
Avoid or recoil away
        ↓
Increase separation
        ↓
Leave sensing range
        ↓
Briefly reassess
        ↓
Resume pursuit if possible
```

The brief reassessment is useful because leaving sensing range for a single update does not necessarily mean the encounter is over. The arm may have only just moved beyond the hazard's detection boundary, or a small change in its geometry on the next update may bring part of it back within range. Returning immediately to ordinary reaching could therefore produce an abrupt cycle of:

```text
avoid
  ↓
resume reaching
  ↓
detect hazard again
  ↓
avoid again
```

Instead, the controller retains the recent hazard response for a short period after detection has ceased. During this reassessment period, the arm is effectively asking:

> Has the hazard genuinely been cleared, or have I only just moved beyond its sensing range?

The arm therefore does not instantly treat the situation as normal. It briefly preserves the influence of the recent encounter, allowing its movement to settle away from the hazard before ordinary target-directed reaching fully resumes. Conceptually:

```text
hazard detected
      ↓
recoil / avoid
      ↓
hazard no longer detected
      ↓
brief reassessment
      ↓
remain clear?
   ├─ No  → return to avoidance
   └─ Yes → resume ordinary reaching
```

This introduces a small amount of persistence into the response without giving the arm any long-term memory of the hazard. It is simply a way of avoiding rapid switching between **avoidance** and **reaching** when the arm is moving close to the edge of the hazard's sensing range.

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

The simulator answers this with a simple escalation scheme. Mild encounters remain entirely local. More significant encounters are reported to central control while the arm continues to respond locally. Serious encounters request withdrawal, and prolonged exposure can escalate an encounter that was initially less severe.

| Encounter   | Response                                                 |
| ----------- | -------------------------------------------------------- |
| Mild        | Handled locally by avoidance or recoil                   |
| Significant | Local response continues and central control is informed |
| Serious     | The arm requests withdrawal                              |
| Sustained   | Continued exposure can escalate the response             |

Reports are not cancelled the instant conditions improve. Once a significant hazard has been escalated, it remains active until the arm has remained clear long enough to establish that the danger has genuinely passed. This prevents a response from flickering on and off around the edge of a hazardous region.

This creates a progression from **local reaction** to **central awareness** without requiring every hazard encounter to become a whole-system problem.

## When Escape Is Constrained

Hazard response can itself run into a physical obstacle. An arm may want to move away from a hazard only to find that the complete withdrawal movement would cross a solid boundary.

In that situation, the controller does not simply abandon every part of the proposed response. It can attempt more limited safe movements, allowing some joints — particularly towards the tip — to move away while other parts of the arm remain constrained.

This remains local recovery rather than route planning. The arm is still obeying the same segment lengths, bend limits, turning speeds and obstacle checks; it is simply trying to make whatever safe progress away from danger remains available.

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
