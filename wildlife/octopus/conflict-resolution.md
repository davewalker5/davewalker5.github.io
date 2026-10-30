---
layout: default
title: Conflict Resolution
breadcrumb: Conflict Resolution
description: Exploring how an octopus-inspired distributed controller resolves competing goals, local responses and claims between independent arms
series: octopus_controller
chapter: 4
---

# Conflict Resolution

Distributed control becomes most interesting when different parts of the system want different things. As far as possible, the central controller allows individual arms to pursue objectives, respond to obstacles, recoil from hazards and grasp objects using local rules but some situations cannot be resolved by local adjustment alone.

- An arm may be trying to reach food while hazard avoidance pushes it away
- One arm may be holding an object while another detects a threat requiring withdrawal
- Two arms may attempt to claim the same resource
- An arm may encounter an incidental opportunity while already carrying out an assigned task

These situations introduce a new question:

> How should a distributed system decide what takes priority when several parts of it are making legitimate but incompatible demands?

That is the role of conflict resolution.

## From Local Response to Arbitration

A hazard response by itself is not necessarily a conflict. An arm can recoil, increase its distance from the hazard and then resume its original task without changing the wider objective. Conflict begins when two requirements are genuinely incompatible.

For example:

- _Reach the food_ vs. _withdraw from danger_
- _Maintain the grip_ vs. _release and retreat_
- _Arm 2 claims the food_ vs. _arm 5 claims the same food_

At that point, the system needs an arbitration rule and, to fulfil this role, the simulator implements simple, explicit priorities rather than a complex decision-making model.

## Approach Versus Avoidance

The most direct conflict occurs when an arm is trying to approach a target while a hazard response tells it to move away. In this case:

> Local hazard avoidance takes precedence over reaching

The reaching objective is not necessarily discarded, but immediate avoidance is allowed to override direct progress towards it. This preserves the distinction between a longer-term objective to reach a target and an immediate local priority to move away from the hazard.

The arm may resume reaching once the hazard response no longer dominates.

## Hold Versus Withdraw

A stronger conflict occurs when an arm is already holding food but the system needs to withdraw. Maintaining the grip and retreating safely may not be compatible and the central controller therefore gives withdrawal higher priority.

When withdrawal overrides holding:

```text
hazard response
    ↓
withdrawal takes priority
    ↓
held food is released
```

For critical danger, the response can escalate beyond one arm and trigger withdrawal across all arms, an important step beyond purely local avoidance since a local event can now affect the behaviour of the wider system.

## Competing Arms

Another conflict arises when more than one arm attempts to claim the same food object. The central controller resolves this using a deterministic ordering:

1. Existing ownership wins
2. If there is no existing owner, the previous winner is preferred
3. If that still does not resolve the conflict, arm number provides the final ordering

The losing arm yields the resource but retains its task. This is a deliberately simple rule that answers the question:

> Who gets the object now?

It does not attempt to answer broader questions of fairness or long-term efficiency. For example, there is currently no fairness timeout that forces a repeatedly losing arm to receive priority later.

## Exploration Versus Existing Task

An arm may encounter something potentially interesting while already carrying out an assigned task. The central controller gives the assigned task priority over incidental discoveries. In particular:

> Assigned food takes precedence over unassigned or incidental food encounters

This prevents local contact from silently replacing an existing objective. The distinction mirrors a broader principle in the controller:

> Sensing something is not the same as being assigned to pursue it

## A Simple Priority Structure

The current implementation can be understood as a small set of fixed priorities. Conceptually:

```text
critical withdrawal
        ↓
local hazard avoidance
        ↓
maintain valid ownership / grip
        ↓
assigned task
        ↓
incidental opportunity
```

This is not intended as a model of biological decision-making but, rather, is a transparent first arbitration scheme that makes conflicts visible and reproducible.

## Why Fixed Priorities?

The purpose of the implementation is clarity. A more elaborate controller could introduce:

| Feature                             | Description                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changing priorities                 | Allow the importance of a goal to rise or fall as circumstances change rather than remaining fixed throughout the task                                  |
| Fairness between arms               | Prevent the same arm from repeatedly winning conflicts simply because it has an existing advantage or lower identifier                                  |
| Timeouts                            | Allow a temporary claim, priority or winning decision to expire if it is not successfully acted upon within a reasonable interval                       |
| Confidence values                   | Let arms or controllers indicate how certain they are about a detection, opportunity or proposed response, so uncertain information carries less weight |
| Reward estimates                    | Compare the likely value of different outcomes, such as a nearby food item versus a more valuable but difficult target                                  |
| Automatic reassignment              | Transfer a task to another arm if the arm that originally won the conflict can no longer make useful progress                                           |
| Learned priorities                  | Allow experience to modify which behaviours or goals are preferred instead of relying entirely on priorities chosen in advance                          |
| Negotiated cooperation between arms | Allow several arms to coordinate their actions or divide responsibilities rather than resolving every overlap by selecting a single winner              |
| Long-term resource allocation       | Consider how tasks and opportunities are distributed across several arms over time rather than resolving each conflict independently                    |

Those mechanisms are interesting but they would make it harder to see why a particular decision occurred. Fixed priorities make the behaviour easier to inspect:

```text
conflict detected
    ↓
compare priorities
    ↓
apply deterministic rule
    ↓
record visible outcome
```

This makes it possible to see:

- Which conflict occurred
- Which rule was applied
- Which arm or behaviour won
- Which arm yielded
- Whether an existing task was retained
- Whether food was released
- Whether withdrawal remained local or escalated

The purpose is not merely to produce a successful result, but to make the decision process understandable.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
