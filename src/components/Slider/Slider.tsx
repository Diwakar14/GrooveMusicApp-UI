import React, { memo, useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { calculateTime } from '../../common/Utility';
import './Slider.scss';

interface SliderProps {
    name: string,
    min: string,
    max: string,
    onChange?: any,
    ref: any,
    minVal: string,
    maxVal: string,
}

const Slider = React.forwardRef((props: SliderProps, ref: any) => {
    const min = useRef<HTMLDivElement>(null);
    const max = useRef<HTMLDivElement>(null);

    const currentTime = useSelector((state: any) => state.PlayerReducer.currentTime);

    let { minVal, maxVal } = props;
    const handleOnInput = (e: any) => {
        props.onChange(e.target);
        if (min.current && props.name == "seek") {
            min.current.textContent = calculateTime(e.target.value);
        } else {
            if (max.current)
                max.current.textContent = e.target.value;
        }
    }

    useEffect(() => {
        if (min.current && props.name == "seek") {
            min.current.textContent = calculateTime(currentTime);
        }
    }, [currentTime]);

    useEffect(() => {
        if (min.current) {
            min.current.textContent = minVal;
        }
        if (max.current) {
            max.current.textContent = maxVal;
        }
    }, [minVal, maxVal]);

    return (
        <div className="sliderWrp">
            <div ref={min} className="min"></div>
            <input
                type="range"
                ref={ref}
                onInput={handleOnInput}
                name={props.name}
                className="slider"
                id={"slider_" + props.name}
                min={props.min}
                max={props.max} />
            <div ref={max} className="max"></div>
        </div>
    )
});


export default Slider;
