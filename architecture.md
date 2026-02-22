# Architecture Overview

## What this project is
Algorithm Visualizer is a React + Vite single-page app that lets users:
- generate a random integer array,
- choose a sorting algorithm,
- visualize bar-by-bar sorting progress with adjustable speed,
- read algorithm explanations and view code snippets in C++/Java/Python.

## Tech stack
- **Build/tooling:** Vite, ESLint
- **UI runtime:** React 19
- **Styling:** Tailwind utility classes (applied directly in JSX) plus app/global CSS files
- **Extra UI libs:**
  - `react-syntax-highlighter` for code block rendering
  - `react-icons` for copy/check icons

## High-level module structure

```text
src/
  main.jsx                 # App bootstrap
  App.jsx                  # Main state + control panel + bar chart + section switching
  index.css, App.css       # Global/app styles
  algorithms/              # Async sorting implementations used by visualizer
    index.js               # Aggregated exports
    bubbleSort.js
    mergeSort.js
    insertionSort.js
    quickSort.js
    selectionSort.js
    isSorted.js            # Shared pre-check helper
  components/              # Informational views + footer
    BubbleSort.jsx
    MergeSort.jsx
    InsertionSort.jsx
    QuickSort.jsx
    SelectionSort.jsx
    Footer.jsx
    index.js               # Aggregated exports
public/                    # Static assets (social/media logos)
```

## Runtime architecture

### 1) App initialization
- `src/main.jsx` mounts `<App />` into `#root` using React’s `createRoot`.

### 2) Main orchestrator (`App.jsx`)
`App.jsx` is the central coordinator and owns nearly all runtime state:
- `array`: current list being visualized
- `arraySize`: number of bars (10–100)
- `speed`: delay control (1–100)
- `algortihm`: selected algorithm key
- `sorting`: disables controls while sorting
- `completed`: toggles success state/colors/message

Responsibilities:
- **Array generation:** `resetArray()` creates random values.
- **User controls:** algorithm select, sort button, reset button, size/speed sliders.
- **Sorting dispatch:** `handleSort()` switches on selected algorithm and awaits async sorter.
- **Visualization:** renders one vertical bar per array element and updates color after completion.
- **Content routing:** conditionally renders algorithm-specific info/code component under chart.

### 3) Sorting engine layer (`src/algorithms/*`)
Each sorter follows the same contract:

```js
async (array, setArray, speed) => { ... }
```

Design pattern used across sorters:
1. Clone input (`arr = [...array]`) to avoid direct state mutation.
2. Optional early exit via `isSorted(arr)`.
3. Perform algorithm steps.
4. On each meaningful update:
   - call `setArray([...arr])` to trigger UI rerender,
   - await a delay (`setTimeout`) based on `speed`.

This creates an animation loop where algorithm progress directly drives visual state.

### 4) Educational content layer (`src/components/*Sort.jsx`)
For each algorithm, there is a matching component that provides:
- textual explanation,
- complexity notes,
- usage guidance,
- language toggle between C++ / Java / Python snippets,
- copy-to-clipboard interaction.

These are presentation-focused components independent of visualization state.

### 5) Footer and static assets
`Footer.jsx` renders copyright + profile/source links using icons from `public/`.

## Data flow summary
1. User changes controls in `App`.
2. `App` updates React state.
3. User starts sort.
4. `App` calls selected async sorting function.
5. Sorting function repeatedly pushes intermediate arrays through `setArray`.
6. Bar chart rerenders each step until done.
7. `App` marks completion and shows post-sort state.

## Extensibility guide
To add a new algorithm:
1. Create `src/algorithms/<newAlgo>.js` with the same async signature.
2. Export it from `src/algorithms/index.js`.
3. Add a matching educational component in `src/components/<NewAlgo>.jsx`.
4. Export from `src/components/index.js`.
5. Add option + switch case + conditional render in `App.jsx`.

## Current architectural characteristics
- **Simple and centralized:** fast to understand; `App.jsx` is the control hub.
- **Animation by state updates:** straightforward React-driven rendering model.
- **Tight coupling between UI and algorithm timing:** sort functions directly control frame cadence via delays.
- **Educational + interactive blend:** visualization and explanatory docs are integrated in one page.
