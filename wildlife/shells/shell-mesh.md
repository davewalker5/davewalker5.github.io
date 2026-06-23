---
layout: default
title: Building the Shell Mesh
breadcrumb: Building the Shell Mesh
description: Generating three-dimensional shell forms by sweeping apertures along growth paths and constructing triangular surface meshes
series: morphology
chapter: 3
---

# Building the Shell Mesh

The logarithmic spiral defines the growth path of the shell, but it does not yet create a visible shell surface. To turn the growth curve into a three-dimensional form, the model sweeps an aperture along the spiral and stitches the resulting aperture rings together into a mesh.

In biological terms, the shell is treated as a record of accretionary growth. The aperture represents the growing edge of the shell. As the organism grows, this aperture moves, expands and changes shape. The visible shell is the accumulated surface left behind by that moving aperture.

## From Growth Path to Aperture Rings

The mesh builder receives the spiral coordinates:

```
x, y, r, theta
```

along with aperture width and height values calculated for each point on the spiral.

At each growth step, the model places an elliptical aperture around the current point on the path. The aperture is described by an angle _phi_, running around the rim of the opening:

```
phi = 0 ... 2 * pi
```

The local aperture coordinates are:

```
x(local) = a(w) * cos(phi)
z(local) = a(h) * sin(phi)
```

where a(w) and a(h) are the aperture semi-width and semi-height.

This creates a ring of points representing the shell opening at one moment in growth.

## Following the Spiral

Each aperture ring is rotated so that it follows the direction of coiling rather than remaining fixed in world coordinates.

The local aperture width coordinate is projected into the horizontal plane using the current spiral angle:

```
x(p) = x + x(local) * cos(theta)
y(p) = y + x(local) * cos(theta)
```

This means each aperture turns with the spiral as shell growth proceeds.

## Axial Growth

For flat-coiled shells such as nautilus-like or ammonite-like forms, the shell can remain mostly in one plane.

For high-spired gastropod forms, the growth path must also rise through space. The mesh builder therefore assigns a vertical centre position:

```
z(centre) = z(path)
```

or, if no explicit path is supplied:

```
z(centre) = z(scale) * theta
```

This axial translation allows the same logarithmic growth system to produce both flat planispiral forms and high-spired tower shells.

## Aperture Inclination

The model also supports a simple aperture tilt. This is implemented as a shear:

```
z(p) = z(centre) + z(local) + k * x(local)
```

where k is the aperture tilt value.

This does not create the shell's upward climb; that comes from the axial path. Instead, the shear makes one side of the aperture sit slightly higher than the other.

This small geometric adjustment is especially useful for high-spired gastropod shells. It helps neighbouring whorls read as overlapping shell growth rather than as a separate coiled tube.

## Stitching the Surface

Once the aperture rings have been generated, neighbouring rings are connected together.

Each pair of adjacent rings forms a band of shell surface. The rectangular patches between corresponding points on the two rings are split into triangles, producing the triangular mesh used for rendering.

In simplified form:

1. Generate one aperture ring.
2. Generate the next aperture ring.
3. Connect matching points between the two rings.
4. Repeat along the full growth path.

The result is a continuous surface representing the shell wall laid down through growth.

## Growth Ribs and Segmentation

Growth ornamentation can be generated in several ways. The simplest approach uses a periodic sinusoidal modulation of aperture size:

```
f(rib) = 1 + A * sin(F * theta)
```

where A controls rib strength and F controls rib frequency. This factor is applied directly to the aperture dimensions, so the ribs are part of the geometry rather than just a colour effect. Low frequencies produce broad, widely spaced ribs. Higher frequencies produce finer, more closely spaced growth lines.

The framework also supports segmented ornamentation, in which the shell is divided into discrete growth intervals. In orthocone-like forms these segments can be aligned with chamber spacing, producing annulated shells whose external ornamentation reflects the underlying chamber architecture.

These two approaches illustrate an important principle of the model: shell ornamentation can be generated either as a continuous variation in growth or as a sequence of discrete growth events.

## Aperture Lip

Many mature shells have a thickened or flared final aperture. The model simulates this by enlarging the aperture during the final part of growth.

The parameter lip_start controls where this final flare begins. For example, a value of 0.88 means the lip begins forming after 88% of the growth path has been completed.

The flare then increases toward the final aperture according to:

```
f(lip) = 1 + S * t^p
```

where S controls flare strength, t is progress through the lip-forming stage, and p controls how gradual or abrupt the flare appears.

## Shell Wall Thickness

A shell rendered as a single surface appears infinitely thin at the aperture. To avoid this, the mesh builder can generate a simplified shell wall.

Each outer aperture ring is duplicated as a smaller inner ring. The outer rings form the external shell surface, while the inner rings form the inner shell wall.

At the final aperture, the outer and inner rings are stitched together to create a visible rim. This gives the shell mouth a more convincing thickness and allows transparent or cutaway views to show an inside surface.

This is not a true normal-offset wall model. It is a deliberately simple approximation, but it works well visually for exploratory shell morphology.

## Pigmentation

Each vertex is also assigned a colour value. The current model uses a simple mathematical banding pattern based on growth position and aperture position.

Growth-position variation creates bands laid down as the shell grows. Aperture-position variation adds streaking or flame-like effects around the shell surface.

This pigmentation is procedural and stylised, but it helps reveal the geometry of the mesh and gives the models a more shell-like appearance.

## Summary

The mesh builder converts the abstract growth model into a visible shell by:

- Placing aperture rings along the logarithmic growth path
- Rotating each aperture with the direction of coiling
- Optionally lifting the path through axial translation
- Inclining the aperture profile with a simple shear
- Stitching neighbouring aperture rings into a triangular surface
- Adding geometric ribs, aperture flare, wall thickness and pigmentation

The logarithmic spiral defines the path of growth. The mesh builder turns that path into an accumulated shell surface.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
