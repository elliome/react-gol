# Game of Life component for react

A simple React component adds [Conway's Game of Life](https://www.google.com/search?client=safari&rls=en&q=conway%27s+game+of+life&ie=UTF-8&oe=UTF-8).

## Usage

Import `ReactGol` and add it to your project like so

```
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

```
    cellSize: number (default: 12);
    minFrameTime: number (default: 100);
    fillStyle: string (default: '#EEEEEE');
    motionBlur: number (default: 50);
    initialCoverage: number (default: .125);
```


To customise this component, pass in props like so

```
import ReactGol from 'react-gol'

function App() {
  return (
    <div>
      <ReactGol cellSize={4} motionBlur={0} fillStyle={'red'} />
    </div>
  );
}
```
