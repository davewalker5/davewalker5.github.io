---
layout: default
title: "Other Minds: Exploring the Evolution of Animal Minds"
description: "A reading project based on Peter Godfrey-Smith’s Other Minds, using cephalopods as a route into questions about nervous systems, intelligence, sentience and consciousness"
breadcrumb: Other Minds
---

Peter Godfrey-Smith's *Other Minds* uses cephalopods, particularly octopuses, to explore the evolution of nervous systems, intelligence, sentience and consciousness.

This is not intended as a chapter-by-chapter summary or formal review of the book. It is a synthesis of the ideas I found most interesting while reading it, together with some of the questions and connections that emerged in my notebook.

The central insight I take from the book is that minds should not simply be measured according to how closely they resemble our own. Different organisms face different ecological problems, possess different bodies and sensory systems, and have followed different evolutionary histories.

The important question is therefore not simply **"How intelligent is this animal?"**, but:

> **What does this animal need to be intelligent about?**

## Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.other_minds.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Sources

Godfrey-Smith, Peter. *Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness*. William Collins, 2017.

The diagrams included in this project are taken from my handwritten reading notes. They are my own visual summaries, interpretations and syntheses of concepts discussed in *Other Minds*, rather than figures reproduced from the book.
