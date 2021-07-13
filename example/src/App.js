import "./App.css";
import ReactGol from "react-gol";
import { useEffect, useState } from "react";

function App() {
    const [color, setColor] = useState("#00ff00");

    const changeColor = () => {
        setColor(
            `#${Math.round(Math.random() * 255).toString(16)}${Math.round(
                Math.random() * 255
            ).toString(16)}${Math.round(Math.random() * 255).toString(16)}`
        );
    };

    useEffect(() => {
        const timer = setInterval(changeColor, 4000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        console.log(color);
    }, [color]);

    return (
        <div className="App">
            <ReactGol
                cellSize={4}
                motionBlur={0}
                minFrameTime={50}
                fillStyle={color}
            />
        </div>
    );
}

export default App;
