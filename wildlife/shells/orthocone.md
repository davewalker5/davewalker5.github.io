---
layout: default
title: Orthocone-Like Shell
breadcrumb: Orthocone-Like Shell
description: A straight-shelled cephalopod form generated through linear growth, with internal chamber septa and a longitudinal siphuncle
series: morphology
chapter: 13
assets: "/images/modelling/shells/"
orthocone:
  name: "orthocone.png"
  alt: "Orthocone Shell Growth"
  caption: "Orthocone Shell Growth"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
images:
  - name: "orthocone-opaque-aperture.png"
    alt: "Simulation of Orthocone-Like Shell"
    caption: "Simulation of Orthocone-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "orthocone-transparent-iso.png"
    alt: "Simulation of Orthocone-Like Shell Showing Internal Structure"
    caption: "Simulation of Orthocone-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Orthocone-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

While many shell-bearing organisms produce coiled shells, numerous extinct cephalopods evolved shells that grew along a largely straight axis. These forms, often referred to as orthocones, are particularly common among early nautiloid cephalopods.

Unlike logarithmic spiral shells, where the shell aperture follows a continuously expanding curved path, orthocone shells grow along a predominantly linear trajectory. Growth occurs by expansion of the shell aperture while maintaining a broadly constant orientation, producing the characteristic tapering cone-shaped shell.

Within the shell morphology model, the orthocone provides a useful contrast to spiral growth forms and demonstrates how different shell architectures can emerge from alternative growth trajectories.

## The Growth Axis

{% include fullwidth-image.html assets=page.assets img=page.orthocone %}

The orthocone model is based on a simple linear growth path. The shell centreline is defined as:

```
x = L * t
y = 0
z = 0
```

where:

- x is position along the shell growth axis
- L is the total shell length
- t varies from 0 to 1 during growth

Unlike a logarithmic spiral, the growth path does not rotate around a central point. Instead, successive apertures are positioned along a straight axis.

The growth trajectory therefore represents a gradual extension of the shell away from its earliest point of origin.

## Simulating Aperture Growth

As with the logarithmic spiral model, the shell is treated as the accumulated record of a growing aperture.

At each position along the growth axis, an aperture is imagined to exist representing the shell opening at that stage of development.

The figure above shows a sequence of elliptical apertures positioned along a straight growth path. As the shell extends, the apertures increase in size, producing the characteristic taper of an orthocone shell.

Although shown here in two dimensions, the same principle forms the basis of the three-dimensional shell model. The shell surface emerges by sweeping successive apertures along the growth trajectory and connecting neighbouring growth stages together.

## Aperture Sizing Modes

The model currently supports two approaches to aperture expansion.

### Linear Expansion

In linear mode, aperture dimensions increase steadily along the shell axis:

```
r = r0 * (1 + g * x)
```

where:

- r0 is the initial aperture radius
- g is the growth-rate parameter
- x is position along the growth axis

Aperture dimensions are then derived from the calculated radius:

```
width = k(w) * r
height = k(h) * r
```

where k(w) and k(h) are user-defined scaling factors.

This produces a shell whose taper remains approximately constant throughout growth.

### Exponential Expansion

Alternatively, aperture growth may follow an exponential relationship:

```
r = r0 * e^(g * x)
```

where:

- r0 is the initial aperture radius
- g is the growth-rate parameter

This produces shells whose rate of expansion increases progressively through time.

Although less typical of many orthocones, exponential growth can be useful for exploring alternative shell morphologies and transitional forms.

## Growth Phase and Ornamentation

Unlike spiral shells, the orthocone growth path does not naturally provide a rotational parameter that can be used to drive pigmentation bands, growth ribs or other periodic shell features.

To allow such structures to be modelled, the system maintains a separate growth phase variable that advances independently of the shell orientation.

This separation allows:

- Shell orientation to remain fixed along the growth axis
- Pigmentation patterns to repeat periodically
- Growth ribs to be generated around the shell circumference

while preserving the underlying orthocone geometry.

This distinction between growth trajectory and growth phase forms part of the broader shell morphology framework.

## Growth Coordinates and Growth Phase

The orthocone model highlights an important distinction within the shell morphology framework between a shell's growth trajectory and its growth phase.

For logarithmic spiral shells, the angular growth parameter θ serves two purposes simultaneously:

- It describes the position of the shell along its growth path.
- It provides a convenient phase parameter for periodic structures such as pigmentation bands, ribs and chamber placement.

In an orthocone, these concepts become separate.

Because the shell grows along a straight axis rather than a spiral, the position of the shell during growth is more naturally represented by distance along the shell axis. Chamber placement therefore uses the axial growth coordinate rather than an angular parameter.

A separate growth phase variable is maintained for periodic shell features. This allows pigmentation bands, ribs and other repeating structures to be generated without affecting the underlying shell trajectory.

This distinction revealed that many shell features depend not on angular position itself, but on progression through growth. In the broader framework, growth coordinates can therefore be viewed as a general measure of developmental position, with logarithmic spiral angle representing only one possible implementation.

## Internal Chamber Architecture

Orthocones provide a particularly useful model for visualising internal shell structures.

Like many cephalopods, orthocones developed a series of internal chambers separated by curved partitions known as septa. As the animal grew, new septa were deposited behind the living chamber, leaving a sequence of gas-filled chambers within the shell.

Within the model, septa are generated by reconstructing aperture profiles at selected growth intervals and forming inward-curving bowl-shaped surfaces. Chamber spacing is controlled using the shell's growth coordinate, allowing septa to be placed at regular intervals along the shell axis.

Because orthocones lack overlapping whorls, their chamber structure is exposed much more clearly than in coiled shells. The resulting models make it easy to inspect:

- chamber spacing
- septal curvature
- chamber volume progression
- siphuncle placement

For this reason, orthocones have proved particularly useful as diagnostic and validation models during development of the chamber-generation system. Geometric issues that may be hidden within coiled shells often become immediately visible in an orthocone.

## The Siphuncle

A characteristic feature of chambered cephalopod shells is the siphuncle, a tubular structure that passes through successive septa and links the shell's internal chambers. In living and extinct cephalopods, the siphuncle played an important role in regulating chamber fluids and controlling buoyancy.

Within the orthocone model, the siphuncle is represented as a continuous tube extending longitudinally through the chambered portion of the shell. Because the shell grows along a straight axis, the siphuncle also follows a straight path, remaining approximately parallel to the shell's centreline.

The orthocone proved particularly useful during development of the siphuncle-generation system because it exposed several assumptions inherited from the spiral-shell models. In coiled shells, the siphuncle follows a curved growth trajectory and naturally inherits the orientation of the surrounding shell geometry. Applying the same approach to a straight shell produced subtle geometric artefacts, including an unintended lateral waviness and oblique tube terminations.

Correct representation of the orthocone siphuncle required treating the shell as a distinct geometric case. The siphuncle tube is constructed along the shell's growth axis, while its circular cross-sections are generated within the aperture plane. This ensures that the tube remains straight and that its terminal surfaces are perpendicular to the direction of growth.

The model also allows the siphuncle to be displaced from the shell centreline. In many orthoconic cephalopods the siphuncle occupied a marginal or sub-marginal position rather than lying centrally within the shell. Offsetting the siphuncle within the aperture cross-section produces a more recognisable cephalopod anatomy and highlights the relationship between the siphuncle and the surrounding chamber structure.

More broadly, the orthocone demonstrated that internal structures must be generated within the local coordinate system of the shell architecture rather than assuming a single geometric framework for all shell forms. As with chamber generation, the simplicity of the orthocone made such issues immediately visible and provided a valuable validation model during development.

## From Growth Axis to Shell

The orthocone growth axis defines only the shell trajectory and aperture size.

The visible shell itself is created in a separate stage by generating aperture rings along the growth path and connecting them together into a continuous mesh. Additional processes such as shell-wall thickness, growth ribs, pigmentation patterns and aperture modification are then applied to produce the final shell geometry.

The orthocone therefore represents an alternative growth architecture to the logarithmic spiral. Rather than generating a coiled shell through rotational expansion, it produces a straight tapering shell through linear extension and aperture enlargement.

Both approaches are implemented within the same computational framework, illustrating how diverse shell morphologies can emerge from different growth trajectories combined with a common mesh-generation process.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
