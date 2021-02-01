import React, { useState, useRef, useCallback, useEffect } from 'react'
import { AppContainer, ClearBtn, ColorInput, Controls, DownloadBtn, UploadBtn } from "./Styles";

export const Canvas = () => {
    const canvasRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    const [src, setSrc] = useState('');
    const [thickness, setThickness] = useState(1);
    const [lineColor, setLineColor] = useState('black');

    const startPaint = useCallback(e => {
        const coordinates = getCoordinates(e);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const paint = useCallback(
        e => {
            if (isPainting) {
                const newMousePosition = getCoordinates(e);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const getCoordinates = e => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        return {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop};
    };

    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = lineColor;
            context.lineJoin = 'round';
            context.lineWidth = thickness;
            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();
            context.stroke();
        }
    };

    const saveCanvas = () => {
        const canvas = canvasRef.current;
        const data = canvas.toDataURL('image/png');
        setSrc(data)
    }

    const changeLineColor = e => {
        setLineColor(e.target.value)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const uploadImg = (e) => {
        try {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, 900, 900)
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        } catch (e) {
            console.log(e);
        }

    }

    const handleChange = e => {
        setThickness(e.target.value);
    }

    return (
        <>
            <h1>Welcome to React drawing 🎨</h1>
            <AppContainer>
                <Controls>
                    <select onChange={handleChange}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    <ColorInput onChange={changeLineColor}/>
                    <DownloadBtn onClick={saveCanvas} download={`myMasterpiece-${Date.now()}.png`} href={src}>Download
                        💾</DownloadBtn>
                    <ClearBtn onClick={clearCanvas}>Clear 🧹</ClearBtn>
                    <UploadBtn>
                        Upload 📤 <input accept="image/x-png,image/gif,image/jpeg" style={{display: 'none'}}
                                         onChange={uploadImg} type="file"/>
                    </UploadBtn>
                </Controls>
                <canvas id='resetCanvas' ref={canvasRef} height='900px' width='900px'/>
            </AppContainer>
        </>
    );
}

