---
layout: default
title: Reach Controller and Arm Movement
breadcrumb: Reach Controller and Arm Movement
description: Exploring how neighbouring segments coordinate flexible reaching, contact sensing, obstacle avoidance and grasping in an octopus-inspired simulation
series: octopus_controller
chapter: 2
---

# Reach Controller and Arm Movement

How does an octopus-inspired arm find its way towards an object when no central controller specifies the position of every segment?

In Octopus Controller, **reaching is the result of repeated small adjustments along a connected, flexible arm**. The tip receives a destination, neighbouring segments exchange requests, and each joint turns only as far and as quickly as its limits allow. Contact sensing, obstacle avoidance and grasping all build upon the same underlying geometry.

This chapter looks inside that local process. The equations are included because they explain *why* the simulation behaves as it does, but each is accompanied by an account of what it means for the arm you can see on screen. This is a deliberately simplified geometric model, not a reconstruction of octopus muscles or neurobiology.

## Describing the Arm

The first detail to establish is how positions are represented. The origin is at the upper-left of the simulated world. Positions increase to the right and downwards, so a positive angle turns clockwise on the screen. Distances are in pixels, angles in radians and time in simulation seconds. Degrees are used only for some display labels.

| Symbol   | Meaning                                                                          |
| -------- | -------------------------------------------------------------------------------- |
| N        | Number of segments                                                               |
| L        | Fixed length of each segment in one arm                                          |
| p₀ to pₙ | Joint positions, from the fixed base to the tip                                  |
| αᵢ       | Bend of segment i relative to its parent; α₁ is the freely rotating base heading |
| θᵢ       | Absolute heading of segment i                                                    |
| b        | Maximum permitted relative bend                                                  |
| ω        | Maximum change in a joint angle per second                                       |
| Δt       | Duration of one update                                                           |
| t        | Target position for the tip                                                      |
| c, R     | Centre and radius of an environmental object                                     |

Segments in the explanation are numbered 1 through N. Segment i connects the preceding joint to joint i. Bold symbols in the equations are positions or vectors, with horizontal and vertical components.

Two mathematical operations recur throughout the model:

$$
\mathrm{clip}(x,a,b)=\min\bigl(b,\max(a,x)\bigr)
$$

Clipping keeps a number between a lower and an upper limit. A requested turn larger than the limit is reduced to the limit, rather than allowed to overshoot it.

$$
\mathrm{wrap}(x)=((x+\pi)\bmod 2\pi)-\pi
$$

Wrapping expresses an angle between minus π and π. It chooses the short turn across the boundary between those two equivalent directions: changing from 179 degrees to minus 179 degrees needs a turn of only 2 degrees.

## Building a Connected Arm

The heading of each segment is the sum of all bends from the base to that segment:

$$
\theta_i=\sum_{j=1}^{i}\alpha_j,
\qquad
\mathbf{u}(\theta)=
\begin{pmatrix}\cos\theta\\\sin\theta\end{pmatrix}
$$

The vector u points one unit in the chosen direction. Multiplying it by the segment length gives the displacement from one joint to the next:

$$
\mathbf{p}_i=\mathbf{p}_{i-1}+L\mathbf{u}(\theta_i),
\qquad i=1,\ldots,N
$$

Starting from the fixed base, this rule constructs the whole chain. Connections and segment lengths remain exact because positions are rebuilt from angles; individual points are not allowed to drift independently.

```text
Fixed base → Segment 1 → Segment 2 → … → Final segment and tip
```

Each arm starts with a gentle curve, and that is deliberate. A perfectly straight chain aimed towards a closer point on the same line has no obvious preferred folding direction. A small consistent bend breaks that symmetry without random motion.

## Reaching Through Neighbour Requests

The interesting part of the reach controller is that **a segment does not continually calculate how the distant tip should move**. It receives a requested endpoint from its immediate neighbour towards the tip. In response, it asks its neighbour towards the base for a useful attachment position.

Let qᵢ be the attachment position requested by segment i. Let φᵢ be the absolute heading proposed with that request. The endpoint goal for segment i is:

$$
\mathbf{e}_i=
\begin{cases}
\mathbf{q}_{i+1}^{\mathrm{old}}, & i<N,\\
\mathbf{t}, & i=N.
\end{cases}
$$

Only the final segment receives the actual target. Every other segment reads the previous update's message from its neighbour. New requests are saved for the next update, so information moves back by one neighbour link per update rather than instantly crossing the entire chain.

```text
  Target
    ↓
Final segment
    ↓ requested attachment
Previous segment
    ↓ requested attachment
Previous segment
    ↓ requested attachment
   ...
    ↓
Base-side segment
```

Before using an endpoint goal, a segment may redirect it around a nearby obstacle. That redirection is described later. Call the resulting local endpoint goal gᵢ.

The segment first measures the direction from its current attachment towards that goal:

$$
\beta_i=\mathrm{atan2}
\left(g_{i,y}-p_{i-1,y},\ g_{i,x}-p_{i-1,x}\right)
$$

The two-argument angle function finds a heading in any direction, including directly above or below the joint. If the two positions coincide, there is no direction to measure, so the existing heading is retained.

For a segment with a neighbour towards the tip, the proposed heading also respects that neighbour's proposed bend:

$$
\phi_i^{\mathrm{new}}=
\phi_{i+1}^{\mathrm{old}}+
\mathrm{clip}
\left(
\mathrm{wrap}(\beta_i-\phi_{i+1}^{\mathrm{old}}),-b,b
\right)
$$

The final segment has no next neighbour, so its proposed heading is simply βᵢ. Constraining the other proposals prevents neighbours repeatedly asking for a fold their bend limits cannot allow.

The requested attachment is one segment length backwards from the endpoint goal:

$$
\mathbf{q}_i^{\mathrm{new}}=
\mathbf{g}_i-L\mathbf{u}(\phi_i^{\mathrm{new}})
$$

This is a request, not a command to move a joint there immediately. The fixed base, neighbouring constraints and speed limits may prevent it being fulfilled exactly.

## Turning Gradually

The neighbour requests establish what each segment would *like* to achieve. The next question is what it is actually allowed to do. After exchanging requests, movement is considered from the base towards the tip. Each segment receives the attachment produced by its already-considered parent. The local obstacle check is repeated from that attachment because it may have moved.

Let sᵢ be this attachment and θₚ the parent's proposed absolute heading. At the base, θₚ is zero. The desired relative angle and the remaining angular error are:

$$
\widehat{\alpha}_i=
\mathrm{atan2}(g_{i,y}-s_{i,y},\ g_{i,x}-s_{i,x})-\theta_p
$$

$$
\varepsilon_i=\mathrm{wrap}(\widehat{\alpha}_i-\alpha_i)
$$

Subtracting the parent heading converts a direction in the world into a bend relative to the parent. The error describes how far the joint would need to turn to point at its current local goal.

Small errors are eased towards zero, and large turns are limited by speed:

$$
\delta_i=
\mathrm{clip}
\left(
\varepsilon_i\left(1-e^{-k\Delta t}\right),
-\omega\Delta t,\omega\Delta t
\right),
\qquad k=20\ \mathrm{s}^{-1}
$$

Easing avoids repeatedly overshooting requests that are still changing as messages travel between neighbours. The speed limit bounds each joint's change, even when the requested direction is far away.

For joints other than the base:

$$
\alpha_i^{\mathrm{trial}}=
\mathrm{clip}(\alpha_i+\delta_i,-b,b),
\qquad i>1
$$

The base instead wraps its heading and can rotate freely. If its goal coincides with its attachment, a segment makes no new turn. These trial angles become the actual pose only if the obstacle movement check accepts them.

Ordinary arrival means that the tip lies within two pixels of the target. Movement can still be required when obstacle contact needs resolving. A target outside the total length cannot be reached:

$$
\|\mathbf{p}_N-\mathbf{t}\|\leq 2
\quad\text{is the arrival tolerance,}
\qquad
\|\mathbf{t}-\mathbf{p}_0\|>NL
\quad\text{is beyond total reach.}
$$

Being inside the total length does not guarantee a solution: bend limits and obstacles can still prevent reaching.

The simulation uses 120 updates per second. That also fixes the request propagation rate at 120 neighbour links per simulated second. Changing the update rate would change that delay; it is not just a drawing preference.

## Sensing Contact Along an Arm

Reaching alone is only part of the problem. The arm also needs to register when it touches something. In the simulation, a sensing strip covers each segment with a radius of three pixels, including rounded coverage around both ends. A circular object touches the strip when its centre lies within the sum of the object radius and the sensing radius.

To measure that distance, first find the closest point on the segment. Let a and z be its endpoints, and v the vector from a to z:

$$
\mathbf{v}=\mathbf{z}-\mathbf{a},
\qquad
u=\mathrm{clip}
\left(
\frac{(\mathbf{c}-\mathbf{a})\mathbin{\cdot}\mathbf{v}}
{\mathbf{v}\mathbin{\cdot}\mathbf{v}},0,1
\right)
$$

The dot product measures how much one vector points along another. Here it gives the fraction of the segment nearest the object's centre. Clipping the fraction prevents detecting contact along an imaginary extension beyond the endpoints.

$$
\mathbf{h}=\mathbf{a}+u\mathbf{v},
\qquad
\|\mathbf{c}-\mathbf{h}\|\leq R+s,
\qquad s=3
$$

The point h is the sensing location. The inequality is the contact test: exact touching counts. For a zero-length segment, h is simply a, avoiding division by zero.

For example, if the closest distance is 16 pixels, an object of radius 14 touches a sensing strip of radius 3 because 16 is less than 17. The thickness used to draw the arm does not change this calculation.

```text
 Segment endpoints ──┐
                     ├→ Closest point to object centre
Object centre/radius ┘                ↓
                       Compare distance with combined radii
                                      ↓
                       Contact observation for that segment
```


Each segment can report several objects, and several segments can report the same object. Contact counts in the display count distinct sensing segments rather than the total number of observations. Readings are replaced on each refresh so moving or deleting an object clears stale contact.

Sensing describes the current pose. It does not record every contact along motion between updates. Obstacle movement checks separately consider that intervening movement.

## Steering Around Obstacles

An arm must also cope with objects blocking its route. Rather than computing a complete path centrally, each segment looks ahead along its local goal direction, but only for up to three segment lengths:

$$
\mathbf{d}=\mathbf{g}-\mathbf{a},
\qquad
\ell=\min(\|\mathbf{d}\|,3L),
\qquad
\mathbf{z}=\mathbf{a}+\ell\frac{\mathbf{d}}{\|\mathbf{d}\|}
$$

If the direction has effectively zero length, the goal is left unchanged. Otherwise, the closest-point calculation above is applied to this short lookahead segment.

An obstacle begins influencing steering when the lookahead comes within its radius plus the arm clearance and an early-warning margin:

$$
\|\mathbf{c}-\mathbf{h}\|<R+a+m,
\qquad a=3,\quad m=8
$$

If more than one obstacle qualifies, the segment chooses the one whose centre is nearest its attachment. That choice is local steering guidance; the later safety check still considers every obstacle.

The segment aims ahead around the selected circular boundary:

$$
\rho=\mathrm{atan2}(a_y-c_y,a_x-c_x),
\qquad
\mathbf{g}_{\mathrm{avoid}}=
\mathbf{c}+(R+a+m+w)\mathbf{u}(\rho+\eta),
\qquad w=5,\quad\eta=0.4
$$

The extra five pixels leave room for the short straight approach to the next boundary point. The positive angular step consistently follows the circle clockwise in screen coordinates. Using a fixed preference avoids rapidly switching sides because of tiny numerical differences.

This replaces the segment's local goal, not the arm's true destination. There is no search through a map or precomputed series of waypoints for the whole arm.

```text
Local endpoint request
          ↓
Obstacle in short lookahead?
    ├─ No  → Keep original request ──────────┐
    └─ Yes → Aim around nearest boundary ────┤
                                             ↓
                                  Apply joint limits
                                             ↓
                                  Check swept movement
                                      ├─ Safe → Accept trial pose
                                      └─ Unsafe → Keep old pose
```


## Checking Movement Between Poses

There is a subtle problem with checking obstacles only at the start and end of an update: **a clear starting pose and a clear ending pose are not enough**. A segment might swing through a small obstacle between them. The movement check therefore interpolates the joint angles and conservatively covers the intervals between samples.

Let Δαⱼ be the trial change in joint j, using the shortest wrapped change for the freely rotating base. Other relative bends use their direct difference. The absolute heading change of segment i is:

$$
\Delta\theta_i=\sum_{j=1}^{i}\Delta\alpha_j,
\qquad
T_i=L\sum_{j=1}^{i}|\Delta\theta_j|
$$

An arc of radius L and angle magnitude Δθ has length L times that magnitude. Adding these contributions gives Tᵢ, an upper bound on how far a point on segment i can travel, including motion inherited from earlier segments.

The longest bound determines the number of samples:

$$
M=\max\left(1,\left\lceil\frac{T_N}{2}\right\rceil\right),
\qquad
f_k=\frac{k+\tfrac12}{M},
\qquad k=0,\ldots,M-1
$$

The ceiling rounds upwards. More potential movement produces more samples, keeping each interval's travel bound at most two pixels.

At each midpoint, interpolate the angles and rebuild the arm:

$$
\alpha_j(f_k)=\alpha_j+f_k\Delta\alpha_j,
\qquad
P_i=\frac{T_i}{2M}
$$

Pᵢ covers the greatest possible motion from that midpoint to either edge of its time interval. Let dᵢₖ be the distance from an obstacle centre to segment i at the sample, and dᵢ₀ its distance at the original pose. Every segment and obstacle must satisfy:

$$
d_{ik}-P_i\geq\min(R+a,d_{i0})-\epsilon,
\qquad \epsilon=10^{-8}\ \text{pixels}
$$

Subtracting the padding accounts for movement between samples. A normally clear segment must preserve the obstacle radius plus arm clearance. If an obstacle was placed over an existing arm, the smaller original distance permits a retreat but not a deeper overlap. The tiny tolerance accommodates floating-point rounding.

If any check fails, the whole trial pose is rejected. The neighbour requests remain available to evolve on later updates. A destination inside an obstacle's clearance region is also marked blocked rather than pursued through the obstacle.

The guard enforces geometric constraints; it does not find an alternative path. Its conservative bounds can reject a movement that a more exact check might allow. Local boundary following can also become trapped, particularly among several obstacles or under tight bend limits.

## Grasping, Carrying and Retraction

Contact is not yet a grasp. To capture food, the model requires two consecutive segments to contact the same unclaimed food object. The selected contact pair and object must remain eligible for a quarter of a simulated second:

$$
\tau_{\mathrm{new}}=
\begin{cases}
\tau+\Delta t, & \text{same eligible pair and object},\\
\Delta t, & \text{new eligible pair and object},\\
0, & \text{no eligible candidate},
\end{cases}
\qquad
\tau\geq 0.25\ \text{seconds for capture.}
$$

The arm holds its pose during this interval. Idle arms do not start new grasps, and pausing does not advance the timer. A mere target arrival or contact from separated segments is insufficient.

On capture, the object is attached to the end of the last segment in the qualifying pair. Let pⱼ be that endpoint and θⱼ its heading. A rotation matrix turns a vector into that segment's coordinate frame:

$$
\mathcal{R}(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix},
\qquad
\mathbf{o}=\mathcal{R}(-\theta_j)(\mathbf{c}-\mathbf{p}_j)
$$

The stored offset o records the existing attachment without snapping the object. As the arm moves, the object's centre follows:

$$
\mathbf{c}_{\mathrm{new}}=
\mathbf{p}_{j,\mathrm{new}}+
\mathcal{R}(\theta_{j,\mathrm{new}})\mathbf{o}
$$

This is a rigid latch. Adjacent contacts establish it, but subsequent holding does not require continued contact from both original segments. The model does not simulate grip pressure or friction.

When the requested destination is for held food, the tip objective is adjusted by the current offset between tip and object:

$$
\mathbf{t}_{\mathrm{tip}}=
\mathbf{t}_{\mathrm{food}}+(\mathbf{p}_N-\mathbf{c})
$$

Repeated corrections move the object itself towards the destination. Retraction chooses a point 40 pixels outward from the fixed base along the arm's initial heading:

$$
\mathbf{t}_{\mathrm{retract}}=
\mathbf{p}_0+40\mathbf{u}(\theta_{\mathrm{initial}})
$$

The arm holds again once the object's centre is within two pixels. Segment lengths remain unchanged during retraction.

A carried object also needs its own obstacle check because it may be wider than the arm. Its travel bound includes motion of the attachment and rotation of the stored offset:

$$
T_{\mathrm{food}}=
L\sum_{i=1}^{j}|\Delta\theta_i|
+\|\mathbf{o}\|\,|\Delta\theta_j|
$$

The same midpoint-and-padding method applies, using the sum of the food and obstacle radii as the required distance. Unlike the arm check, it does not add the three-pixel arm clearance. An unsafe payload movement restores the old arm angles and leaves the object attached in its original position.

## Bringing the Rules Together

```text
Arm objective
      ↓
Refresh local contacts
      ↓
Already holding food?
  ├─ Yes → Hold or set carrying objective ───┐
  └─ No                                      │
       ↓                                     │
  Adjacent food contacts eligible?           │
       ├─ Yes → Wait for sustained contact   │
       │         ↓                           │
       │       Capture and report            │
       └─ No ────────────────────────────────┤
                                             ↓
                                Exchange neighbour requests
                                             ↓
                                Steer around local obstacles
                                             ↓
                                Apply bend and speed limits
                                             ↓
                                Check movement for safety
                                             ↓
                                Accept safe pose or hold
                                             ↓
                                Refresh contacts and status
```


Taken together, these rules describe the arm as a local controller rather than a passive chain whose every joint is positioned from above. The diagram groups the rules conceptually. A held arm with no movement assignment stays still, and a grasping arm pauses movement while contact matures. Obstacle steering is considered both when forming local requests and when applying turns from updated attachments.

The result is reaching, contact sensing and capture **without central, segment-by-segment instructions**. The central controller can specify the goal, but the arm works out how far it can move towards that goal within its local constraints.

This remains a deliberately limited model. It has no arm-to-arm collision response, no body motion, no muscle physics and no guarantee that local rules will discover every possible route. Those limitations are useful to recognise: they help distinguish what the simulation actually demonstrates from the much richer capabilities of living octopuses.

The **Demonstrations** chapter shows these rules at work, from single-arm movement to multi-arm sensing, obstacle avoidance and grasping.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include octopus-controller-invitation.html %}
