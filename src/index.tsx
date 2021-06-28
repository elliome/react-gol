import * as React from "react";
import "./styles.scss";

interface golProps {
    cellSize?: number;
    minFrameTime?: number;
    fillStyle?: string;
    motionBlur?: number;
    initialCoverage?: number;
}

const gol = (props: golProps) => {
    const canvasRef = React.useRef(null);
    const [timestamp, setTimestamp] = React.useState(Date.now());
    const [style, setStyle] = React.useState<React.CSSProperties>({});

    let resetTimer: number;

    const config = {
        cellSize: props.cellSize ?? 12,
        minFrameTime: props.minFrameTime ?? 100,
        fillStyle: props.fillStyle ?? "#EEEEEE",
        motionBlur: props.motionBlur ?? 0.2,
        initialCoverage: props.initialCoverage ?? 0.125,
    };

    const handleResize = () => {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            reset();
        }, 250);
    };

    const reset = () => {
        setStyle({ opacity: 0 });
        setTimeout(() => {
            setTimestamp(Date.now());
            setStyle({ opacity: 1 });
        }, 500);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;

        const gridX = Math.round(canvas.width / config.cellSize);
        const gridY = Math.round(canvas.height / config.cellSize);

        let grid: Array<Array<number>> = Array(gridX);

        for (let x = 0; x < gridX; x++) {
            grid[x] = Array(gridY);
            for (let y = 0; y < gridY; y++) {
                grid[x][y] = Math.random() < config.initialCoverage ? 1 : 0;
            }
        }

        let requestId: number;
        let lastFrameTime = 0;

        context.fillStyle = config.fillStyle;

        const entropyStopper = setTimeout(
            () => reset(),
            1000 * config.minFrameTime
        );

        const render = () => {
            if (lastFrameTime < Date.now() - config.minFrameTime) {
                let tempGrid: Array<Array<number>> = [Array(gridX)];

                for (let x = 0; x < grid.length; x++) {
                    tempGrid[x] = Array(12);
                    for (let y = 0; y < grid[x].length; y++) {
                        let self = grid[x][y];

                        const top = getNeighbour(x, y - 1);
                        const topLeft = getNeighbour(x - 1, y - 1);
                        const topRight = getNeighbour(x + 1, y - 1);
                        const left = getNeighbour(x - 1, y);
                        const right = getNeighbour(x + 1, y);
                        const bot = getNeighbour(x, y + 1);
                        const botLeft = getNeighbour(x - 1, y + 1);
                        const botRight = getNeighbour(x + 1, y + 1);
                        const neighbours =
                            top +
                            topLeft +
                            topRight +
                            bot +
                            botLeft +
                            botRight +
                            left +
                            right;

                        if (self === 1) {
                            if (neighbours < 2) {
                                tempGrid[x][y] = 0;
                            } else if (neighbours > 3) {
                                tempGrid[x][y] = 0;
                            } else {
                                tempGrid[x][y] = 1;
                            }
                        } else {
                            if (neighbours == 3) {
                                tempGrid[x][y] = 1;
                            } else {
                                tempGrid[x][y] = 0;
                            }
                        }
                    }
                }

                grid = tempGrid;

                let imageData = context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                for (let i = 3; i < imageData.data.length; i += 4) {
                    if (!config.motionBlur) {
                        imageData.data[i] = 0;
                    } else {
                        imageData.data[i] -= config.motionBlur * 255;
                    }
                }

                context.putImageData(imageData, 0, 0);

                for (let x = 0; x < grid.length; x++) {
                    for (let y = 0; y < grid[x].length; y++) {
                        if (grid[x][y]) {
                            context.fillRect(
                                x * config.cellSize,
                                y * config.cellSize,
                                config.cellSize,
                                config.cellSize
                            );
                        }
                    }
                }

                lastFrameTime = Date.now();
            }
            requestId = requestAnimationFrame(render);
        };

        const getNeighbour = (x: number, y: number) => {
            if (x >= gridX) {
                x = 0;
                return 0;
            }
            if (x < 0) {
                x = gridX - 1;
                return 0;
            }
            if (y >= gridY) {
                y = 0;
                return 0;
            }
            if (y < 0) {
                y = gridY - 1;
                return 0;
            }

            return grid[x][y];
        };

        render();

        return () => {
            cancelAnimationFrame(requestId);
            window.removeEventListener("resize", handleResize);
            clearTimeout(entropyStopper);
        };
    }, [timestamp]);

    return <canvas ref={canvasRef} className={"canvas"} style={style}></canvas>;
};

export default gol;
