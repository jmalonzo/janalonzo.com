+++
draft = false
title = "Why use local component registrations in Vue?"
categories = ["Vue"]
description = "Highlights benefits of local component registration"
date = 2018-03-15T19:00:35+11:00
+++

Being new to [Vuejs](https://vuejs.org), I started registering my components globally so they are easily available to other components. That's what componentization is for, right? It turns out that in most cases that I've experienced, components are better off being registered locally.

There are a couple of reasons why you want to register them locally:

1. They, and the parent components that are using them, become more testable.
2. Explicit dependency makes bundling more efficient.

## Testability
When unit testing a component, and that component relies on a global component, more often that not you would need to add registration code in your unit test to register the global component. This tends to get unwieldy depending on how many global components you're using within that component. You can get away with this by using a *shallow* mounting mechanism, but what if you don't want that?

Local registration solves this issue by declaring your component dependency in the component definition itself using the **components:** property. By doing this, the sub-components are initialised along with the component your are writing the unit test for. And the good thing is you can still *shallow* mount if you prefer to test component sans its sub-components.

## Bundling

Another caveat of using global component registration is that you're going to have to register it somewhere in your codebase (e.g., global-components.ts, etc..), and then import that in other components where the global components are needed. The issue here is that now you have a module that is bundled in disparate components, even though only a handful of components are required in that module. Tree-shaking? sure. But it's not trivial to figure out if it's *really* tree-shaken. You have to know how your bundler does tree-shaking and be 100% confident that it actually did its job.

Again, local registration makes this easier to reason out. When you *import* a component module to be used as a sub-component, you're essentially making the dependency explicit, not just to other developers but also to module bundlers (e.g. webpack) - If a component is a sub-component of another component then it's highly likely that they will be in the same bundle too. No gotchas, no surprises.

These are *just* a couple of reasons why I've started to prefer local vs. global registration.