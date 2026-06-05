---
layout: default
title: Chamber Septa
breadcrumb: Chamber Septa
description: Modelling internal chamber walls through nested growth surfaces and simplified cephalopod shell architecture
series: morphology
chapter: 4
---

# Chamber Septa

The shell mesh describes the external geometry of the shell, but many molluscan shells contain important internal structures as well.

In chambered cephalopods such as nautiluses and ammonites, the animal occupies only the newest chamber at the shell opening. As growth proceeds, the animal moves forward and seals off older parts of the shell by constructing curved internal walls known as septa.

The spaces between successive septa form the shell's chambers.

The current model implements a simplified septum generator that creates a series of curved chamber walls inside the existing shell geometry.

## Growth and Chamber Formation

The shell mesh can be viewed as a sequence of aperture rings representing successive stages of growth.

Rather than placing a septum at every growth stage, the model inserts chamber walls at intervals along the growth path.

The spacing between chambers is controlled by the parameter:

```
chamber_spacing
```

which specifies how far growth must progress before a new chamber wall is created.

Small values produce many closely spaced chambers. Larger values produce fewer, larger chambers.

## Using Existing Shell Geometry

Unlike the shell mesh builder, which constructs new geometry from aperture dimensions, the septum generator begins with the completed shell mesh.

For a chosen growth stage, the corresponding aperture ring is extracted from the shell surface.

This ring becomes the outer boundary of the new septum and that septum must fill this opening while remaining attached to the shell wall around its entire edge.

## Finding the Growth Direction

Real septa are not flat partitions. They are curved structures that project backward into the older part of the shell.

To determine which direction is "backward", the model estimates the local growth direction.

This is done by comparing the positions of neighbouring aperture rings before and after the current growth stage.

The resulting direction vector is:

```
d = dx / | dx |
```

where dx represents the local direction of shell growth.

This vector provides an estimate of the shell's longitudinal axis at that point.

## Building a Curved Septum

A simple flat disc would fill the aperture but would not resemble a biological septum.

Instead, the model constructs each septum as a shallow bowl.

The aperture ring forms the outer edge of the bowl.

Additional nested rings are then generated between the aperture edge and the centre.

The parameter:

```
septum_rings
```

controls how many intermediate rings are used.

More rings produce a smoother surface.

With the edge ring uppermost, the process can be visualised as:

<pre>
***********

 *********
  *******
   *****
    ***
     *
</pre>

Each nested ring lies closer to the centre of the aperture.

## Creating Concavity

Once the nested rings have been created, their positions are displaced along the local growth direction.

The displacement is greatest at the centre of the septum and decreases smoothly toward the edge.

The model uses:

```
offset = -D(1 - t^2)
```

where:

- D is the septum depth
- t represents progress from the centre to the edge

This produces a shallow concave surface.

At the aperture rim:

```
t = 1
```

and the displacement becomes zero.

At the centre:

```
t = 0
```

and the displacement reaches its maximum value.

The result is a bowl-shaped chamber wall attached smoothly to the shell.

## Constructing the Mesh

The nested rings are stitched together using triangles.

Each pair of neighbouring rings forms a narrow band of the septum surface.

These bands are divided into triangular patches in the same way that neighbouring aperture rings are connected during shell construction.

The completed mesh forms a continuous curved partition spanning the shell interior.

## Chamber Age and Colour

Each septum is assigned a colour value based on its position along the growth sequence.

Older chambers nearer the apex are rendered darker.

Newer chambers nearer the shell opening are rendered lighter.

This colouring is purely illustrative but helps reveal the order in which chambers were formed.

## A Simplified Biological Model

Real cephalopod septa are considerably more complex.

Nautilus septa are gently curved and relatively simple, while many ammonites developed highly folded septa that produced intricate suture patterns where the septum met the shell wall.

The current implementation does not attempt to model these complexities.

Instead it focuses on the core architectural idea:

- Growth occurs at the aperture
- Older shell regions are partitioned by septa
- Each septum is attached to the shell wall
- Successive septa create a sequence of chambers

This provides a useful approximation of chamber formation while remaining computationally simple.

## Summary

The septum generator creates internal chamber walls by:

- Selecting aperture rings at intervals along the growth path
- Estimating the local growth direction
- Constructing nested rings within the aperture
- Displacing those rings to form a shallow bowl
- Stitching the rings into a triangular mesh
- Colouring chambers according to their age

The resulting structures transform a simple shell surface into a chambered shell architecture resembling that of nautiloids and ammonites.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
