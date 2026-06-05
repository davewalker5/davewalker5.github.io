---
layout: default
title: The Siphuncle
breadcrumb: The Siphuncle
description: Constructing a simplified internal siphuncle linking shell chambers and completing the chambered-shell framework
series: morphology
chapter: 5
---

# The Siphuncle

In chambered cephalopod shells, the chambers are not simply isolated empty spaces. They are connected by a narrow tube called the siphuncle.

The siphuncle passes through the chambered part of the shell and links the chambers together. In living chambered cephalopods, this structure is biologically important because it allows the animal to regulate gas and fluid within the chambers. In the model, it provides a simplified internal feature that helps make the chambered shell architecture more recognisable.

## A Simplified Tube Model

The current implementation treats the siphuncle as a small tube running through the chambered region of the shell.

It is not intended to be anatomically exact. Instead, it captures the basic visual and architectural idea:

- The siphuncle lies inside the shell
- It passes through the chambered region
- It threads from chamber to chamber
- It is offset from the centre of the chamber
- It stops near the boundary between the chambered shell and the living body chamber

This makes it especially useful for nautilus-like and ammonite-like presets where internal chamber structure is visible.

## Using the Existing Shell Mesh

Like the septum builder, the siphuncle builder begins with the completed shell mesh.

The shell mesh is already organised as a sequence of aperture rings. Each ring represents a growth stage.

For each selected growth stage, the model extracts the corresponding aperture ring and estimates its centre:

```
x(c) = mean( x(ring) )
y(c) = mean( y(ring) )
z(c) = mean( z(ring) )
```

These centres provide a rough internal path through the shell.

## Limiting the Siphuncle to the Chambered Region

The siphuncle should not usually continue all the way to the final open mouth of the shell.

The newest part of the shell is treated as the living body chamber, while the older part contains the internal chambers.

The parameter:

```
siphuncle_end_fraction
```

controls where the siphuncle stops along the growth path.

For example, a value of 0.98 means the siphuncle continues through almost all of the shell but stops just before the final aperture region.

This prevents the tube from running visibly into the open mouth or through the flared lip.

## Chamber-Aligned Placement

If chamber_spacing is supplied, siphuncle rings are placed at approximately the same intervals as the chamber septa.

This makes the tube appear to pass through the sequence of chambers rather than following an unrelated sampling pattern.

In simplified terms:

<pre>
septum    septum    septum    septum
  |         |         |         |
  O---------O---------O---------O
           siphuncle tube
</pre>

This visual alignment is important. Without it, the siphuncle may still be geometrically valid, but it can appear disconnected from the chamber system.

## Offsetting the Tube

Real siphuncles do not necessarily pass through the exact centre of each chamber.

The model therefore offsets the siphuncle position away from the chamber centre.

A local chamber radius is estimated from the aperture ring:

```
r(local) = mean( sqrt( (x - x(c))^2 + (y - y(c))^2) )
```

The siphuncle centre is then placed at:

```
x(s) = x(c) + o r(local) * cos(theta)
y(s) = y(c) + o r(local) * sin(theta)
z(s) = z(c)
```

where o is the siphuncle_offset parameter.

This keeps the siphuncle rotating with the shell growth path while moving it away from the geometric centre of the chamber.

## Building the Tube

At each selected siphuncle position, the model creates a small circular ring:

```
x = x(s) + r(s) * cos(phi)
z = z(s) + r(s) * sin(phi)
```

where r(s) is the siphuncle radius and phi runs around the circular cross-section.

Neighbouring rings are then stitched together to form a continuous triangular tube mesh.

The parameter tube_points controls how many vertices are used around each circular tube section. Higher values produce a smoother tube.

## Terminal Ring

When the siphuncle is aligned with chamber spacing, the final chosen chamber interval may not land exactly at the intended stopping point.

The optional terminal ring ensures that an extra ring is added near siphuncle_end_fraction.

This prevents the siphuncle from appearing to stop too early inside the shell.

## Summary

The siphuncle builder creates a simplified internal tube by:

- Extracting aperture ring centres from the shell mesh
- Selecting growth stages within the chambered region
- Optionally aligning tube rings with septum spacing
- Offsetting the tube from the chamber centre
- Creating circular tube cross-sections
- Stitching neighbouring tube rings into a continuous mesh

Together with the septa, the siphuncle turns the shell from a simple external surface into a recognisable chambered cephalopod architecture.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
