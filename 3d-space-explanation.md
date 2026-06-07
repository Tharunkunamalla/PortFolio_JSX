# 3D Space Explanation

This note explains how the 3D projects page works, how the math is used, and how the cursor and keyboard controls behave.

## What Starts The 3D Page

The 3D view is mounted from `src/App.jsx` through the `/projects-3d` route. That route renders `Projects3DPage`, which then renders the actual `Projects3D` scene.

`Projects3DPage` also starts the space audio, adds the back button, and keeps the page full-screen. The visual scene itself is inside `Projects3D`.

## Scene Setup

The scene is built with `@react-three/fiber` and `@react-three/drei`.

Inside the `<Canvas>` the code sets:

- a camera at `[0, 0.5, 9]`
- fog from distance `20` to `80`
- a dark background color `#0c0c10`
- ambient light
- a star field with `5000` stars
- the moving comet layer
- the camera controller
- pointer lock controls
- the project cards

The outer wrapper also sets `cursor-crosshair`, but the actual mouse cursor behavior depends on the `Cursor` component and the current route.

## How The 3D Space Is Structured

The scene is not a free-floating game world with physics. It is a controlled scene with a fixed camera and several visual layers:

1. background stars
2. moving comets
3. title text in 3D space
4. an instruction card
5. project cards arranged in a curve

The scene feels deep because several objects are placed at different `z` positions and the camera can move slightly with keyboard input.

## Project Card Layout Math

Each project card is positioned with polar coordinates converted into 3D coordinates.

The math is:

```text
angle = (index / max(1, total - 1)) * PI - PI / 2
radius = 30
x = sin(angle) * radius
z = -cos(angle) * radius - 24
y = (index % 2 === 0 ? 0.5 : -0.5) * 2
rotY = -angle
```

### What That Means

- `angle` spreads the cards from left to right across a semicircle.
- `sin(angle) * radius` gives the left/right position.
- `-cos(angle) * radius` pushes cards forward and backward along the depth axis.
- `-24` shifts the whole arc farther away from the camera.
- `y` adds a small alternating up/down offset so the row does not look perfectly flat.
- `rotY = -angle` rotates each card so it roughly faces the center of the arc.

This is basically a semicircle built from trigonometry.

## Camera Movement And Keyboard Keys

The camera movement is handled by `CameraController`.

### Key State

The component keeps a small state object:

```text
w, a, s, d, q, e
```

`keydown` sets the corresponding key to `true`, and `keyup` sets it back to `false`.

### Movement Math

Every animation frame, the code computes the camera directions from the camera’s quaternion:

- `dir` starts as forward direction `(0, 0, -1)`
- `right` starts as right direction `(1, 0, 0)`

Then both vectors are rotated by the camera quaternion:

```text
applyQuaternion(camera.quaternion)
```

That means the movement direction always follows where the camera is facing.

Then the code flattens those vectors so movement stays horizontal:

```text
dir.y = 0
right.y = 0
```

That removes vertical drift when moving forward, backward, left, or right.

### Final Movement Rules

- `W` moves forward
- `S` moves backward
- `A` moves left
- `D` moves right
- `Q` moves up
- `E` moves down

The target velocity is built from those inputs, then the current velocity is slowly interpolated toward it:

```text
velocity.lerp(targetVelocity, damping)
```

This is important because it makes movement smooth instead of instant.

## The Math Behind The Smooth Movement

The movement uses a few key vector operations from `three.js`.

### 1. Quaternion Rotation

The camera has an orientation represented by a quaternion. Applying that quaternion to a direction vector converts world-space movement into camera-relative movement.

So if the camera turns left, pressing `W` still moves “forward” relative to where the camera is looking.

### 2. Normalization

After rotation the vectors are normalized.

That means they are turned into unit vectors with length `1`, so the direction is preserved but the size is controlled.

### 3. Scalar Multiplication

Each movement direction is multiplied by `speed = 0.4`.

That sets the base step size for movement each frame.

### 4. Linear Interpolation

`lerp(targetVelocity, damping)` moves the current velocity a little bit toward the target velocity every frame.

With `damping = 0.05`, the movement has inertia:

- pressing a key ramps up movement gradually
- releasing a key slows movement gradually

This is why the camera feels less mechanical.

## Pointer Lock And Mouse Look

`PointerLockControls` is what allows mouse-look in the 3D scene.

When the scene is active:

- clicking the scene requests pointer lock
- the mouse is hidden by the browser pointer lock API
- moving the mouse changes the camera orientation

There is no custom mouse-drag math in this code. `PointerLockControls` handles the actual look rotation.

The page also listens for a pointer down event on the outer container and re-enables controls, which helps if the scene had previously been paused.

### ESC Key Behavior

The code does not add a custom `Escape` key handler.

Instead, `PointerLockControls` relies on the browser’s pointer lock behavior. Pressing `ESC` exits pointer lock, which makes the cursor reappear and stops the locked mouse look.

That is why the on-screen note says pressing `ESC` shows the cursor again.

## Why The Cursor Changes

The cursor behavior is controlled in `src/components/layout/Cursor.jsx`.

### Normal Pages

On most pages:

- the native cursor is hidden with `document.body.style.cursor = 'none'`
- a small dot follows the mouse
- a larger ring trails behind with a slower animation
- hovering links and buttons scales the cursor up slightly

This is animated with GSAP.

### 3D Page

On `/projects-3d` the custom cursor component returns `null`.

That means:

- the custom dot and ring are not rendered
- the body cursor is restored to normal

This is deliberate, because the 3D page already uses pointer lock and needs the browser cursor behavior to feel natural.

## How The Comets Work

The comet layer is a small procedural animation built with instanced meshes.

### Why Instanced Meshes Are Used

Instead of creating one mesh per comet, the code uses two `instancedMesh` objects:

- one for orange fire comets
- one for white comets

This is more efficient because many objects can share the same geometry and material.

### Spawn Math

Each comet spawns on a sphere with radius `120` around the center.

The spherical coordinates are:

```text
theta = random() * 2PI
phi = acos((random() * 2) - 1)
```

Then they are converted into Cartesian coordinates:

```text
x = radius * sin(phi) * cos(theta)
y = radius * sin(phi) * sin(theta)
z = radius * cos(phi) - 20
```

This is standard spherical-to-Cartesian conversion.

### Direction Math

After spawning, each comet chooses a rough target near the center area.

Then it computes:

```text
dir = normalize(target - position)
velocity = dir * randomSpeed
```

That means the comet points from its spawn position toward the center region and moves inward.

### Tail Length And Rotation

The comet stores a `scaleZ` value for trail length.

As it moves, the code:

- updates position with `addScaledVector(velocity, delta)`
- rotates the instance to face the travel direction with `lookAt(target)`
- stretches it on the Z axis with `scale.set(1, 1, scaleZ)`

So the comet looks like a streak instead of a cube.

### Fade Effect

The comet geometry uses vertex colors with alpha values.

The front of the box uses a brighter color, and the back uses an alpha of `0`, so the tail fades out.

The materials also use:

- `transparent`
- `opacity={0.9}`
- `depthWrite={false}`
- `blending={THREE.AdditiveBlending}`

Additive blending makes the comets glow more strongly against the dark background.

## Why The Scene Feels Deep

The depth effect comes from several things working together:

- camera perspective with `fov: 50`
- objects placed at different `z` distances
- fog fading distant objects
- glowing stars and comets
- curved card layout
- semi-transparent HTML overlays inside 3D space

The scene is not physically simulating space. It is using layered depth, trigonometry, and camera movement to create the illusion of a large environment.

## Page Flow Summary

1. `App.jsx` routes to `/projects-3d`.
2. `Projects3DPage` loads the 3D scene and plays space audio.
3. `Projects3D` creates the canvas, stars, comets, camera, and cards.
4. `CameraController` reads keyboard state and moves the camera every frame.
5. `PointerLockControls` handles mouse look and ESC exit.
6. `Cursor.jsx` disables the custom cursor on this page so the browser cursor and pointer lock can take over.

## Short Version

The 3D page is built from simple math and animation, not heavy physics.

- trigonometry arranges the project cards in an arc
- vectors and quaternions turn WASD movement into camera-relative motion
- interpolation smooths movement
- spherical coordinates spawn comets around the scene
- pointer lock handles mouse look
- the cursor is disabled on the 3D page so the browser can manage interaction normally
