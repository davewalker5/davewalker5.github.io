---
layout: post
title: "RC2014: Taking a Z80 on the Train"
date: 2026-09-19 00:00:01
categories: [field-notes]
tags: [computing, rc2014, z80, basic, programming, retro-computing, emulation, development-tools, reflection]
excerpt: "I wanted to keep developing programs for my physical RC2014 when I couldn't take the computer with me. So I made the development environment portable instead."
series: The Computing Continuum
series_order: 12
assets: "/images/blog/"
digital_io:
  name: "digitalio-preview.png"
  alt: "RC2014 Digital I/O emulator window showing eight numbered input buttons and eight LEDs, with several LEDs illuminated to represent the output from the emulated Z80."
  caption: "The emulated RC2014 Digital I/O card. Eight buttons, eight LEDs, and no physical hardware required — at least until it's time to run the program on the real thing!"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
lcd:
  name: "lcd-preview.png"
  alt: "RC2014 LCD emulator window displaying two rows of characters on a simulated 16×2 LCD, including a demonstration of custom glyphs."
  caption: "The emulated RC2014 16×2 LCD, complete with custom glyph support. Another peripheral I can now develop for without having the physical RC2014 connected."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

*Or: making a computer portable without actually moving it*

My last RC2014 Field Notes post ended with the word:

> Yet

Which, as I observed at the time, is an extremely dangerous word to type at the end of an RC2014 experiment.

Predictably, something else has happened.

But this time it isn't another application, game, mathematical experiment or attempt to make a Z80 do something that nobody in their right mind would ask it to do.

This time I've been working on the development environment itself.

Because I realised there was something rather inconvenient about my RC2014.

> **I can't take it everywhere**

## A Rather Inconvenient Computer

One of the principal pleasures of the RC2014 is that it's a physical computer.

There's something enormously satisfying about writing a program in Microsoft BASIC, loading it onto a real Z80 and watching it do something useful, entertaining or occasionally gloriously pointless. And I've become particularly fond of the peripherals.

The Digital I/O card lets me interact with programs through buttons and LEDs. The LCD provides another way of displaying information. The SID-Ulator sound card brings music and sound generation into the equation. These have become important parts of the project. Quite a few of the applications I've written use one or more of them.

But there's a practical problem: The RC2014, its serial connection and assorted peripheral hardware aren't things I can casually take out of my bag on a train.

My MacBook, on the other hand, is.

And I do sometimes find myself with time, an idea for a program and no RC2014 conveniently available.

Which led to a question:

> Could I take the RC2014 development environment with me, even when I can't take the RC2014?

The answer, predictably, was to make another project out of it.

## Enter the Emulator

There are, of course, existing Z80 emulators. I'm not suggesting that I've invented the idea of emulating a computer from the 1970s. That would be a rather ambitious claim!

Instead, I started with [EtchedPixels EmulatorKit](https://github.com/EtchedPixels/EmulatorKit), which already provides an RC2014 emulation environment.

That gave me the foundation I needed. But my objective wasn't simply to run Microsoft BASIC on an emulated Z80. I wanted an environment in which I could develop and experiment with the programs in my existing RC2014 catalogue. And that meant addressing the peripherals.

Because quite a lot of the fun happens when a BASIC program does something outside BASIC itself.

## Eight Buttons and Eight LEDs

The Digital I/O card was an obvious candidate. I've written quite a few programs that use it, from Logic Gates and Digital Dice to Memory, LED Animations and Reaction Timer.

The card is wonderfully simple.

- Eight input bits
- Eight output bits
- Read the inputs, do something interesting, write the outputs

Except that, without the physical card, there are no buttons to press and no LEDs to illuminate. So I added a graphical Digital I/O panel to the emulator.

{% include fullwidth-image.html assets=page.assets img=page.digital_io %}

It has eight buttons and eight LEDs, with the bits arranged from 7 to 0. The buttons can be operated using the mouse or keyboard, and inputs can be latched to allow several buttons to be pressed simultaneously. The LEDs reflect the output from the emulated Z80.

For example:

```basic
OUT 1,165
```

Illuminates LEDs 7, 5, 2 and 0.

And:

```basic
PRINT INP(1)
```

Reads the current input byte. Which means I can now write and experiment with Digital I/O programs without needing to have the physical card connected.

I am, naturally, absurdly pleased by this.

## An LCD Without an LCD

Next came the LCD module. The physical RC2014 LCD is a 16×2 character display, and I've used it in several programs where a conventional terminal isn't really the most interesting place to present information. So the emulator now has a separate LCD window.

{% include fullwidth-image.html assets=page.assets img=page.lcd %}

It emulates an HD44780-compatible display, including ordinary character output, custom glyphs, cursor behaviour and display shifting.

It's not intended to reproduce every electrical and timing characteristic of the physical LCD, but it provides the functionality needed for developing and testing my programs.

And yes, I did make it display a custom glyph ... Using the custom glyph support ... Because obviously I did.

## And Then There's Sound

The SID-Ulator sound card presented a somewhat different problem.

I wanted programs that use the RC2014 sound hardware to produce sound through the MacBook.

Rather than attempting to write a SID synthesis engine myself, I integrated the existing [libresidfp](https://github.com/libsidplayfp/libresidfp) library.

The result supports the 6581 and 8580 SID models, audio playback through the Mac and optional WAV recording.

So the emulator now supports three of the peripherals that have become important to my project:

- Digital I/O
- LCD
- SID-Ulator sound

Together with Microsoft BASIC and Small Computer Monitor, that gives me a rather useful portable development environment.

Not bad for something that started with wanting to write a bit of BASIC on a train.

## One More Thing: Getting the Programs In

There was another practical issue to address: Quite a few of my BASIC programs are no longer particularly small.

Pasting a substantial listing into an emulator requires the emulated serial interface to keep up with the incoming data. If it doesn't, the result can be missing characters, missing lines or a program that simply doesn't work.

So I also added improved serial input handling, including buffering and flow control. That makes it possible to paste longer BASIC listings reliably, without having to introduce artificial delays between individual lines.

It's not the most visually interesting feature of the release. But it is quite important if the whole point is to make the environment useful for developing actual programs.

And it illustrates something I've found repeatedly when building software.

> Sometimes the less glamorous parts are the ones that make everything else possible

## The Physical RC2014 Still Matters

I want to make an important distinction here.

> **The emulator isn't intended to replace my physical RC2014**

In fact, for my purposes, it would be rather pointless without the physical computer.

The whole reason for pursuing this project is that I enjoy making a real Z80 do interesting things.

I enjoy interacting with the physical hardware. I enjoy seeing the actual LEDs respond to a program. I enjoy watching the LCD display something I've calculated. I enjoy hearing the sound card produce music.

A modern MacBook can perform calculations considerably faster than an RC2014 but that isn't really the point.

The satisfaction comes from writing something that runs on the older machine, within its capabilities and constraints.

The emulator simply makes the process of getting there more flexible.

I can write and experiment with a program on the train, refine it on the MacBook and then run it on the physical RC2014 when I get home.

There may still be differences between emulated and physical hardware, of course, and the real machine remains the final destination for testing.

But I no longer need to be sitting in front of it every time I want to try an idea.

**The RC2014 hasn't become portable but developing for it has**

And that was the objective.

## Making Tools to Make Things

There's something else about this release that I find interesting.

Over the course of the project, I've gradually accumulated more than just a catalogue of BASIC programs.

I've developed supporting tools and documentation. I've built a MIDI converter to help prepare music for the sound card. And now I've added an emulation environment that allows me to work on the programs away from the hardware.

These aren't really separate from the RC2014 project. They're things I've made because I wanted to do something with the RC2014 and encountered a practical problem along the way.

- The MIDI converter makes it easier to experiment with music
- The emulator makes it easier to develop programs when the hardware isn't available

And both create opportunities for further experimentation.

There's a rather enjoyable cycle developing here:

> Have an idea &rarr; encounter a limitation &rarr; make something to overcome it &rarr; discover more things to try

Of course, there's always the danger that making the tools becomes a larger undertaking than the original idea but I don't regard that as necessarily a bad thing.

Provided I'm still enjoying the process and learning something along the way, it's all part of the same adventure.

## A Few Sensible Limitations

This is a development environment, not a claim to have reproduced every aspect of the physical RC2014.

The emulator uses the existing EmulatorKit Z80 and RC2014 implementation, with additional support for the peripherals I've been working with.

There are limitations.

The peripheral timing isn't a perfect reproduction of the physical hardware. The LCD implementation concentrates on the display mode I use. The Digital I/O panel doesn't simulate electrical effects such as switch bounce, and its refresh behaviour makes it unsuitable for precise reaction-time measurements.

So I wouldn't use it to establish whether a timing-sensitive program will behave correctly on the real machine: That's what the real machine is for.

I've also documented the build process, configuration, dependencies and testing in the repository.

The current implementation has been built and tested on Apple Silicon macOS, with the required upstream sources and libraries obtained separately.

The intention is to provide a reproducible local development environment, not a mysterious prebuilt executable that may or may not work on somebody else's computer.

## So What Have I Actually Gained?

Something quite simple, really.

> Freedom to work on the RC2014 project in more places

- If I have an idea for a Digital I/O program while travelling, I can try it
- If I want to experiment with LCD output, I can
- If I want to work on a BASIC program without having to connect the physical machine, I can do that too

And because the environment supports the peripherals used by a growing part of my program catalogue, I'm not restricted to programs that only produce terminal output.

This is what makes the emulator particularly useful to me.

It supports the things I actually want to make.

Which brings me back to something I've said before about this project.

The question isn't really:

> What can the RC2014 do?

It's:

> **What can I make out of it?**

And now I have a few more opportunities to find out.

## Taking a Z80 on the Train

I started working on the RC2014 because I enjoy retrocomputing.

- I like the constraints of an older machine
- I like understanding what the software is doing
- I like that relatively simple programs can produce visible, tangible results
- And I particularly like the process of having an idea and turning it into something that runs on actual hardware

None of that has changed.

I've simply made it possible to pursue those interests in circumstances where the physical computer isn't available.

The RC2014 can stay at home.

I can take the MacBook on the train, write some BASIC, experiment with the peripherals and work through whatever idea has most recently captured my attention.

And when I get home, I can run it on the real thing.

On a Z80.

Which, I think, is rather the point.

{% include rc2014-invitation.html %}
