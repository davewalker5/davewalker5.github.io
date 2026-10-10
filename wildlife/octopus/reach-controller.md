---
layout: default
title: Reach Controller and Arm Movement
breadcrumb: Reach Controller and Arm Movement
description: Exploring how local requests, joint constraints, contact sensing and obstacle avoidance allow an octopus-inspired arm to reach and grasp
series: octopus_controller
chapter: 2
assets: "/images/modelling/octopus/"
obstacle_illustration:
    name: "obstacle-illustration.png"
    alt: "An arm's starting and ending poses may both be clear while its swept movement crosses an obstacle"
    caption: "An arm's starting and ending poses may both be clear while its swept movement crosses an obstacle"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
vector_diagram:
    name: "vector-diagram.png"
    alt: "Calculating the position of an arm segment"
    caption: "Calculating the position of an arm segment. Each segment extends a fixed distance L from the preceding joint, at an angle θ(i). The horizontal and vertical components of that displacement determine the position of the next joint. By repeating this calculation from the fixed base, the simulation constructs the complete flexible arm."
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Reach Controller and Arm Movement

How can an octopus-inspired arm reach towards an object without a central controller calculating the position of every part of it?

This is the question behind the reach controller. **The central controller supplies an objective, but movement is worked out locally along the arm.** Neighbouring segments exchange requests, joints turn within limits, and contact with the environment can change what happens next.

The model is deliberately geometric. It does not simulate muscles, tissue forces or the actual neural circuitry of an octopus. What it does offer is a way to investigate how a chain of simple, constrained movements can produce useful reaching, obstacle avoidance and grasping.

## An Arm Made of Connected Segments

Each simulated arm consists of a chain of segments of fixed length. One end is attached to the body; the other is the arm's tip. A segment can change its angle relative to its neighbour, but only within a permitted range. The first segment can rotate freely about its attachment to the body.

The important consequence is that the arm cannot simply place its tip wherever it likes. Every proposed movement must preserve the connections and lengths of the segments, respect the bending limits, and avoid turning a joint too quickly.

The geometry can be expressed quite simply. If each segment has length _L_, its next joint position is found by moving that distance from the previous joint in the segment's current direction:

<!-- $$
\mathbf{p}_i=\mathbf{p}_{i-1}+L
\begin{pmatrix}\cos\theta_i\\\sin\theta_i\end{pmatrix}
$$ -->

{% include fullwidth-image.html assets=page.assets img=page.vector_diagram %}

Here, _p<sub>i</sub>_ is the position of joint _i_, and _θ<sub>i</sub>_ is the direction of its segment.

The simulator builds the arm from the fixed base outwards, ensuring that the segments stay connected rather than allowing individual joint positions to drift apart.

Each arm begins with a gentle curve. This is intentional: a completely straight arm trying to reach a nearer point along its own axis has no obvious direction in which to fold. A slight initial bend provides a consistent starting direction.

## How a Reach Request Travels Along the Arm

This is the central idea of the local controller.

When an arm receives an instruction to reach a position, **the target is supplied to the final segment**. The rest of the arm is not given a complete sequence of joint angles. Instead, each segment asks its neighbour towards the base for an attachment position that would help it move towards its own requested endpoint.

```text
Target position
      ↓
Final segment
      ↓ requested attachment
Previous segment
      ↓ requested attachment
Earlier segments
      ↓
Base-side segment
```

Requests are passed from neighbour to neighbour, using the previous update's messages. Information therefore travels progressively along the arm rather than being transmitted instantaneously to every joint.

This distinction matters. Each segment is responding to a relatively local request, yet the collective result can move the tip towards a distant destination. The central controller does not have to prescribe the resulting pose.

A request is not an instruction that must be obeyed exactly. A segment might be unable to reach its requested position because of its fixed length, the bending limits of its joints or an obstacle in its path. Its neighbours must then continue adjusting.

## Small Movements, Repeated Frequently

The controller does not try to move the arm into its final pose in one step. It makes a series of small adjustments.

After the neighbour requests have been exchanged, the simulator considers actual joint movements from the base towards the tip. Each joint turns towards its local goal, subject to a maximum bend and a maximum turning speed. Smaller adjustments are eased to discourage overshooting when the requests themselves are still changing.

The simulator performs **120 updates per simulated second**. Because neighbour requests advance one link per update, this rate also affects the speed at which information propagates along the arm; it is not merely a visual refresh setting.

A normal reach is considered complete when the tip comes within **two pixels** of the target. This tolerance provides a practical stopping condition, not a guarantee that all targets can be reached. A target may lie beyond the arm's total length, or bending limits and obstacles may prevent a solution even when it is close enough in principle.

## Sensing Contact

Movement becomes more interesting when the arm can respond to its surroundings.

In the simulation, each segment has a narrow sensing strip extending **three pixels** around it, including its ends. This is a simplified stand-in for the sensory capabilities of a biological arm, not a model of individual suckers.

To determine whether a segment touches a circular object, the controller finds the nearest point on that segment to the object's centre. Contact occurs when the distance is no greater than the object's radius plus the sensing radius:

$$
\text{distance to segment}\leq R+3
$$

For example, a circular object with radius 14 pixels is detected when its centre comes within 17 pixels of a segment. Several segments can detect the same object, and one segment can detect several objects.

These readings describe contact in the arm's current position. **Sensing does not mean detecting food from a distance**, and a contact reading does not automatically mean the arm has grasped something.

## Finding a Way Around Obstacles

An arm reaching for a target may encounter an obstacle. Rather than having the central controller calculate a complete route, each segment looks a short distance ahead along its current local request — at most three segment lengths.

When an obstacle lies sufficiently close to this lookahead, the segment redirects its request towards a point around the obstacle's circular boundary. The controller follows a consistent clockwise preference in screen coordinates to avoid switching direction with tiny changes in geometry.

The intended destination of the arm remains unchanged. Only the local request has been adjusted.

This is **local steering, not global path planning**. It can produce useful detours, but it can also become trapped when obstacles are crowded together or joints have too little freedom to bend.

## Why the Movement Between Positions Matters

There is a subtle geometric problem here. Even if the arm starts in a clear position and ends in another clear position, it may have crossed an obstacle *during* the movement.

{% include fullwidth-image.html assets=page.assets img=page.obstacle_illustration %}

*Checking movement between poses: safe-looking endpoints are not sufficient if a segment sweeps through an obstacle along the way.*

The controller therefore checks more than the proposed final pose. It samples intermediate configurations and adds conservative allowances for how far each segment could have travelled between samples. If a proposed movement would violate the clearance rules, the **whole movement is rejected** and the arm remains in its previous pose for that update.

This safety check is distinct from obstacle steering. Steering suggests a movement that may go around an obstacle; the movement check decides whether that particular attempt is safe.

The distinction is important because the model favours a blocked arm over one that passes through an obstacle. Its conservative checks may reject some movements that a more exact calculation would allow.

## From Contact to Grasping

Touching food is not enough to capture it. The model requires **two neighbouring segments to remain in contact with the same available food object for a quarter of a simulated second**.

During that interval the arm holds its pose. If the qualifying contact pair or object changes, the timer starts again; if contact is lost, the attempt does not complete. An idle arm does not initiate a new grasp merely because it happens to touch food.

Once capture succeeds, the food becomes attached to the arm at the segment involved in the grasp. Its position is preserved relative to that segment as the arm moves. In effect, the simulator uses a *rigid attachment* rather than modelling grip pressure, friction or continuous wrapping by suckers.

With food attached, the arm can be assigned a new destination. The reach controller then adjusts its movements to bring **the food's centre**, rather than merely the arm tip, towards that point. The arm can also retract, carrying the object to a location near its attachment to the body, or release it in place.

Carried food must pass its own obstacle checks: an opening might be wide enough for the arm but too narrow for the object it is carrying.

## How the Rules Work Together

A reach is not one indivisible action. It is a sequence of local checks and adjustments, with sensing and grasping changing the outcome when necessary.

```text
Arm receives an objective
          ↓
Refresh contact observations
          ↓
Already holding food?
    ├─ Yes → Hold or pursue a carrying objective
    └─ No  → Check for sustained adjacent contacts
                     ↓
             Grasp if eligible
                     ↓
       Exchange neighbour requests
                     ↓
          Steer around obstacles
                     ↓
       Apply joint and speed limits
                     ↓
        Check movement for safety
                     ↓
       Accept movement or hold pose
                     ↓
         Refresh visible state
```

This is a conceptual outline rather than a complete listing of every update branch: an arm establishing a grasp pauses its movement, and an arm holding food without a new objective stays still.

What I find interesting is the separation between **knowing where an arm is supposed to go** and **working out which constrained local adjustments might get it there**. The central controller specifies the first; the arm's connected segments work on the second.

## What the Model Does — and Does Not — Show

The simulation can reach targets, register local contact, steer around obstacles, grasp food and carry it without central instructions for every joint. This is a useful illustration of distributed control, but it is not a simulation of octopus neurophysiology.

The body remains fixed, segments cannot stretch, and the controller does not calculate muscle forces or water resistance. Arms can pass through one another and through the body because arm-to-arm collision handling is not implemented. Local obstacle steering does not guarantee that a route will be found.

Those limitations matter. They distinguish the behaviour produced by the model from the far richer behaviour of an actual octopus, and they provide useful questions for future experiments.

The _Demonstrations_ section shows the individual behaviours in action, while the [Octopus Explorer](/wildlife/octopus/explorer/) lets you experiment with arm targets, parameters, food and obstacles yourself.

For the full mathematical derivations — including neighbour requests, swept-movement bounds and the geometry of carrying — see the technical documentation in the [Octopus Controller GitHub repository](https://github.com/davewalker5/OctopusController).

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
