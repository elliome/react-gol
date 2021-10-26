# Game of Life component for react

A simple React component adds [Conway's Game of Life](https://www.google.com/search?client=safari&rls=en&q=conway%27s+game+of+life&ie=UTF-8&oe=UTF-8) to your website.

## Installation
Install `react-gol` from [NPM](https://www.npmjs.com/package/react-gol)
```
npm i react-gol
```

## Usage

Import `ReactGol` and add it to your project like so

```js
import ReactGol from 'react-gol'

function App() {
  return (
    <div>
      <ReactGol />
    </div>
  );
}
```
## Config

Avaliable props

```js
    cellSize: Number        // (default: 12);
    minFrameTime: Number    // (default: 100);
    fillStyle: String       // (default: '#EEEEEE');
    motionBlur: Number      // (default: 50);
    initialCoverage: Number // (default: .125);
```


To customise this component, pass in props like so

```js
import ReactGol from 'react-gol'

function App() {
  return (
    <div>
      <ReactGol cellSize={4} motionBlur={0} fillStyle={'red'} />
    </div>
  );
}
```
