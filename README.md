# CIS 566 Homework 4: L-systems

## Objective

- Design a set of formal grammar rules to create a plant life using an L-system program
- Implement your own set of classes to handle the L-system grammar expansion and drawing
- Rasterized L-system using faceted geometry

## Techniques

Collection of classes to represent an L-system

- created `Turtle, ExpansionRule, DrawingRule`, and `LSystem` class inside the lsystem folder

Instanced rendering

- Set up the code in `main.ts` and `ShaderProgram.ts` to pass a collection of transformation data to the GPU to draw L-System geometric components
- Created `setInstanceVBOTransform` function inside mesh class to pass transform data for instance rendering

![](fin0.png)
![](fin1.png)

Lsystem scene progress:

lsystem experimentation with turtle renderer: ![](lsystem.png)

- using https://kevs3d.co.uk/dev/lsystems/ to experiment with the lsystem grammar

houdini tree: ![](htree1.jpg) ![](htree2.jpg)

- experimenting with houdini

progress1: ![](progress2.png)

- coded a background with fbm noise
- imported a costumized star obj as the flower

next steps: unable to complete the lsystem due to illness ;-; will try to make it work in the future!

## General Information

Name: Amelia Peng

PennKey: pqy

Live Demo (WIP): https://ameliapqy.github.io/hw04-l-systems/

Resources:

- https://kevs3d.co.uk/dev/lsystems/
- https://www.sidefx.com/docs/houdini/nodes/sop/lsystem.html
