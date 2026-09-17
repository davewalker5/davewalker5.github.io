---
layout: post
title: Teaching a Z80 Neuron to Learn
date: 2026-09-17 00:00:01
categories: [field-notes]
tags: [computing, rc2014, z80, basic, programming, retro-computing, neural-networks, artificial-intelligence, machine-learning, gradient-descent, reflection]
excerpt: "Having built a fixed artificial neuron in Microsoft BASIC on a Z80, the obvious next question was whether I could make it learn."
series: The Computing Continuum
series_order: 11
assets: "/images/blog/"
---

*Or: apparently “for now” means about two days*

A couple of days ago I wrote about implementing a single artificial neuron in Microsoft BASIC on my RC2014.

It was deliberately simple.

- One input
- One weight
- One bias
- One activation function

And, importantly:

> **It did not learn**

I even wrote:

> And I deliberately stopped there ... for now

Apparently “for now” means about two days.

Because having built a fixed neuron, the next question was inevitable:

> **Can I make it learn?**

So I did. In Microsoft BASIC. On a Z80. Obviously.

## What Was Missing?

The original neuron performed a forward pass:

> input &rarr; weight &rarr; bias &rarr; activation &rarr; output

Its weight and bias were fixed:

```text
w = 2
b = -6
```

If I wanted different behaviour, I had to edit those values myself. That was useful because it made the effect of the parameters visible, but it was not training. There was:

* No loss function
* No gradient
* No parameter update
* No mechanism for learning from examples

So the new version adds those pieces. The neuron still has only one input, one weight and one bias. But now it begins with:

```text
w = 0
b = 0
```

and works out useful values for itself.

That feels like quite a significant change.

## Give It Some Examples

The training data is deliberately tiny:

```text
0 -> 0
1 -> 0
2 -> 0
4 -> 1
5 -> 1
6 -> 1
```

Each pair says:

> Given this input, this is the answer I want

The neuron doesn't initially know how to separate those examples. With both weight and bias set to zero:

```text
z = wx + b
```

becomes:

```text
z = 0
```

for every input.

So before training, every example looks identical to it. That is an appealingly blank starting point.

## The Step Function Had to Go

The fixed neuron used a step activation:

```text
if z > 0 then y = 1
otherwise y = 0
```

That was perfect for demonstrating a threshold but it has a problem if I want to train the neuron. A step function jumps abruptly between zero and one. Away from that jump its derivative is zero, and at the jump itself the derivative is not defined.

That gives gradient descent very little useful information about how to improve the parameters.

So the trainable version uses a sigmoid instead:


$$
p = \sigma(z) = \frac{1}{1+e^{-z}}
$$

Instead of jumping directly to zero or one, it produces a probability between them. For example:

```text
z = -2  ->  p ≈ 0.119
z =  0  ->  p = 0.500
z =  2  ->  p ≈ 0.881
```

That smooth change is important because now the neuron has information about not just whether it is right or wrong, but *how wrong* it is.

## From Output to Error

That requires another new idea:

> **Loss**

The neuron needs some way of measuring the difference between what it predicted and what the correct answer was. For this experiment I used binary cross-entropy. In plain English, it asks something very close to:

> How much probability did I give to the correct answer?

If the correct answer is `1` and the neuron predicts:

```text
0.99
```

the loss is tiny.

If it predicts:

```text
0.01
```

the loss is large.

Which seems entirely reasonable. The important thing is that the loss gives training something to minimise. The neuron is no longer just producing an answer, it has a measure of how good that answer was.

## Which Way Should the Parameters Move?

This is where the part I really wanted to understand begins.

- The neuron has made predictions
- It has targets
- It has some measure of error

Now:

> **How does it know how to change the weight and bias?**

The answer is gradients. For each training pass, the program calculates two values:

```text
dw
db
```

These describe how the loss would change if the weight or bias moved slightly. Then the update is:

```text
new weight = weight - learning rate * dw
new bias   = bias   - learning rate * db
```

The learning rate controls how big each step is.

And that is gradient descent.

I had understood the words before.

Writing the loop made the mechanism considerably more concrete.

## A Training Loop in BASIC

Conceptually, the whole process now looks something like this:

> training examples &rarr; calculate predictions &rarr; compare with targets &rarr; calculate gradients &rarr; calculate new weight and bias &rarr; apply update &rarr; repeat

Or, in less dignified terms:

> guess &rarr; see how wrong the guess was &rarr; nudge the numbers &rarr; guess again

Repeated often enough, the nudges start producing useful behaviour and there is something wonderfully satisfying about seeing that process laid bare in Microsoft BASIC.

## One Epoch at a Time

The program trains on all six examples as one batch and one complete pass through them is an epoch. For each epoch:

1. Calculate the predictions for all six examples
2. Compare those predictions with the target labels
3. Calculate the weight and bias gradients
4. Calculate the next weight and bias
5. Apply both updates
6. Repeat

The default version performs 200 updates.

That is enough for all six training examples to classify correctly. If I let it run for 2,000 updates, the probabilities become much more confident and the loss drops further but 2,000 updates in Microsoft BASIC on a Z80 raises another important subject.

## Training Takes Time

It turns out that gradient descent on a Z80 is not blisteringly quick.

Who knew?

The original implementation used 2,000 updates and with six training examples, that meant many thousands of individual evaluations. And the RC2014 faithfully performed every one of them ...

... Slowly.

This was educational in its own way. Modern machine learning discussions often talk about training as though it were an abstract operation:

> Train the model

But training is computation. Repeated computation. Potentially enormous amounts of it.

Watching a Z80 grind through even this microscopic example makes that rather difficult to forget.

## So I Optimised It

The default was eventually reduced from:

```text
2000 updates
```

to:

```text
200 updates
```

That cuts the number of training example evaluations by about ninety percent.

I also stopped calculating the numerical loss on every update.

The gradients do not need the reported loss value in order to update the parameters, so the program calculates loss only when it actually needs to display it:

* Initially
* At checkpoints
* At the end

The learning rule remains the same.

The Z80 simply does less unnecessary work.

Which feels like another useful lesson hiding inside the experiment.

## Watching It Learn

At the beginning:

```text
w = 0
b = 0
```

so every prediction is:

```text
0.5
```

After the first batch, the program calculates the gradients and adjusts the parameters. Then it evaluates the same six examples again.

- The predictions change
- So the gradients change
- So the next adjustment changes

And gradually the neuron develops a boundary between:

```text
0, 1, 2
```

and:

```text
4, 5, 6
```

After the default 200 updates, it has learned values roughly around:

```text
w ≈ 1.006
b ≈ -2.393
```

which corresponds to a decision boundary around:

```text
x ≈ 2.38
```

Everything below that boundary falls into one class, everything above it falls into the other.

The important thing is that I did not choose that boundary - the training process did. That is the bit that feels different.

## The Parameters Aren't Magic

One of the reasons I wanted to do this exercise was that phrases like:

> The network learns its weights

can sound almost mystical if the mechanism underneath them is hidden.

There is nothing mystical happening here.

The program:

* Starts with numbers
* Makes predictions
* Calculates errors
* Calculates gradients
* Changes the numbers slightly
* Repeats

Eventually the numbers become useful.

That does not make modern neural networks simple - clearly they are not.

But it does make this particular piece of the process considerably less mysterious.

## And Yes, There Are LEDs

Naturally, the trainable version still has Digital I/O and LCD variants.

The LEDs remain off while training happens.

Once training finishes, the neuron uses the learned parameters to classify inputs.

Class `0`:

```text
00000000
```

Class `1`:

```text
00000001
```

So once again an abstract calculation ends up switching a physical LED.

The LCD version also reports training checkpoints before eventually displaying the predicted class and probability.

Something like:

```text
CLASS: 1
P: .836465
```

I remain absurdly pleased by this.

## The Neuron Is Learning This Time

The previous post contained the line:

> **The neuron isn't learning, but I am**

That was true.

Now things have become slightly more complicated.

The neuron actually *is* learning, in the limited and precise sense that its parameters are being adjusted from examples in order to reduce a loss function.

And I am still learning too.

Which is really the point.

The wider Neural Network project on my laptop has never been about building an AI system.

I want an insight into how these systems work.

The RC2014 version takes that goal to its most extreme form:

* One neuron
* One input
* One weight
* One bias
* Six examples
* One loss function
* One training loop

Nothing is hidden unless I choose to hide it.

## Visibility, Again

I seem to keep arriving at the same idea with this machine.

> Visibility

With the fixed neuron, I could see:

```text
x
wx
b
z
y
```

Now I can also see:

```text
prediction
target
loss
gradient
new weight
new bias
```

That matters to me.

- I can watch a parameter change and understand why it changed
- I can alter the learning rate and see training become slower
- I can increase it and watch the updates become more aggressive
- I can train for longer and see the loss continue to fall
- I can reverse the labels and watch the sign of the learned weight reverse

The system is small enough that experimentation produces understanding almost immediately.

## This Is Still Gloriously Pointless

Let us be clear. Nobody should use an RC2014 running Microsoft BASIC as a serious machine-learning platform. There are somewhat better options available.

But judged purely by what the program can *do*, this misses the point. The purpose of the exercise is not to produce a useful artificial intelligence. It is to expose one small piece of machine learning until I can see how it works.

- The fixed neuron showed me the forward pass
- The trainable neuron shows me how the parameters can move

And because every part is small enough to inspect, terms like:

* Sigmoid
* Loss
* Gradient
* Learning rate
* Epoch
* Decision boundary

... feel a little less like vocabulary and a little more like mechanisms.

That is worth considerably more to me than producing something impressive.

## What Next?

This is still only one neuron.

- It still has one input
- It still produces a binary classification
- It cannot solve anything requiring multiple decision boundaries
- It certainly isn't a neural network

Yet.

Which is an extremely dangerous word to type at the end of an RC2014 experiment!

For the moment, though, I have a Z80 computer that can:

* Start with zero-valued parameters
* Examine labelled examples
* Calculate predictions
* Measure error
* Calculate gradients
* Adjust its own weight and bias
* And use what it has learned to classify new inputs

In BASIC.

On an RC2014.

There are unquestionably easier ways to learn about gradient descent.

But very few of them involve sitting in front of a Z80 and watching the loss fall.

And that, I think, was rather the point.

{% include rc2014-invitation.html %}
