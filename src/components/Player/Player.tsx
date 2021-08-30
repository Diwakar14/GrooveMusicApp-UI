import './Player.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { BASE_URL, calculateTime } from '../../common/Utility';
import Color, { useColor } from 'color-thief-react';
import Slider from '../Slider/Slider';
import Controls from './Controls/Controls';
import MusicInfo from './MusicInfo/MusicInfo';
import { UpdateCurrentTime } from '../../redux/actions/playerActions';
import Equalizer from '../Equalizer/Equalizer';

const Player = (props: any) => {
    const audio = useRef<HTMLAudioElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const player = useRef<HTMLDivElement>(null);
    const seekSlider = useRef<any>(null);
    const volSlider = useRef<any>(null);
    const vcanvas = useRef<HTMLCanvasElement>(null);

    const [mounted, setMounted] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [playerTheme, setPlayerTheme] = useState('#000');
    const [fullScreen, setFullScreen] = useState(false);
    const [playing, setPlaying] = useState({ _id: null, title: '', art: '', artist: { title: '' }, album: { title: '' } }) as any;
    const initialStyle = { opacity: spring(0), height: spring(13.6) };

    const [mediaMetaData, setMediaMetaData] = useState({ current: '', duration: '' });

    let { _id, title, artist, album, art, type } = props.playing;

    let source: any = null;
    let audioCtx = new AudioContext();
    let analyser = audioCtx.createAnalyser();

    const playPause = async () => {
        if (type === 'audio') {
            if (audio.current?.paused) {
                audio.current?.play();
                setIsPlaying(true);
            } else {
                audio.current?.pause();
                setIsPlaying(false);
            }
        } else {
            if (video.current?.paused) {
                video.current?.play();
                setIsPlaying(true);
            } else {
                video.current?.pause();
                setIsPlaying(false);
            }
        }
    }




    const Effects = () => {

        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;

        let distortion = audioCtx.createWaveShaper();
        let gainNode = audioCtx.createGain();
        let biquadFilter = audioCtx.createBiquadFilter();
        let convolver = audioCtx.createConvolver();

        // biquadFilter.type = "highpass";

        if (vcanvas.current) {
            vcanvas.current.width = window.innerWidth;
            vcanvas.current.height = window.innerHeight - 90;
        }

        let WIDTH = vcanvas.current?.width as number;
        let HEIGHT = vcanvas.current?.height as number;


        let canvasCtx = vcanvas.current?.getContext('2d');
        let bufferLength = 0;
        let dataArray: any;

        const init = () => {

            if (audio.current) {

                audio.current.crossOrigin = "anonymous";
                source.connect(distortion);
                distortion.connect(biquadFilter);
                biquadFilter.connect(gainNode);
                convolver.connect(gainNode);
                gainNode.connect(analyser);

                analyser.connect(audioCtx.destination);
                analyser.fftSize = 2048;
                bufferLength = analyser.fftSize;
                dataArray = new Uint8Array(bufferLength);
            }
            frameLooper();
        }


        const frameLooper = () => {

            window.requestAnimationFrame(frameLooper);
            analyser.getByteTimeDomainData(dataArray);

            if (canvasCtx) {
                canvasCtx.fillStyle = 'rgba(255, 255, 255,0)';
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                canvasCtx.lineWidth = 1;
                canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
            }

            canvasCtx?.beginPath();
            canvasCtx?.clearRect(0, 0, WIDTH, HEIGHT);

            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT / 2;

                if (i === 0) {
                    canvasCtx?.moveTo(x, y);
                } else {
                    canvasCtx?.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx?.lineTo(WIDTH, HEIGHT / 2);
            canvasCtx?.stroke();
        }

        init();

    }

    const handleFullPlayer = () => {
        setFullScreen(!fullScreen);
    }

    const handleSeekChange = (rangeInput: any) => {
        player.current?.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        if (type === 'audio') {
            if (audio.current) {
                audio.current.currentTime = rangeInput.value;
            }

        } else {
            if (video.current) {
                video.current.currentTime = rangeInput.value;
            }
        }
    }

    const handleVolSlider = (rangeInput: any) => {
        volSlider.current?.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        if (audio.current && type === 'audio') {
            audio.current.volume = (rangeInput.value) / 100
        } else {
            if (video.current)
                video.current.volume = (rangeInput.value / 100);
        }
    }

    const handleAudioProgress = (e: any) => {
        if (audio.current || video.current) {
            displayBufferedAmount();
        }
    }

    const handleTimeUpdate = () => {
        if (type === 'audio') {
            if (seekSlider.current && audio.current) {
                player.current?.style.setProperty('--seek-before-width', audio.current.currentTime / audio.current.duration * 100 + '%');
                seekSlider.current.value = audio.current?.currentTime;
                props.UpdateCurrentTime(audio.current?.currentTime)
            }
        } else {

            if (seekSlider.current && video.current) {
                player.current?.style.setProperty('--seek-before-width', video.current.currentTime / video.current.duration * 100 + '%');
                seekSlider.current.value = video.current?.currentTime;
                props.UpdateCurrentTime(video.current?.currentTime)
                if (video.current?.currentTime === video.current?.duration) {
                    handleFullPlayer();
                }
            }
        }

    }

    const displayBufferedAmount = () => {
        let bufferedAmount = 0;
        if (type === 'audio') {
            if (audio.current) {
                if (audio.current.buffered.length > 0)
                    bufferedAmount = Math.floor(audio.current?.buffered.end(audio.current.buffered.length - 1));
            }
        } else {
            if (video.current) {
                if (video.current.readyState > 3) {
                    if (video.current.buffered.length > 0)
                        bufferedAmount = Math.floor(video.current.buffered.end(0));
                }
            }
        }
        player.current?.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.current.max) * 100}%`);
    }

    const setMediaDuration = () => {
        displayBufferedAmount();
        setMediaMetaData({ current: '0:00', duration: calculateTime(type === 'audio' ? audio.current?.duration : video.current?.duration) });
    }


    const handleLoadedMetaData = (e: any) => {
        setMediaDuration();

        if (type === 'audio' && audio.current) {
            audio.current.volume = .5;
            audio.current.play();
        } else if (video.current) {
            video.current.volume = .5;
            video.current.play();
        }

        if (volSlider.current) {
            volSlider.current.max = 100;
            volSlider.current.value = 50;
            player.current?.style.setProperty('--volume-before-width', '50%');
        }

    }




    useEffect(() => {
        setPlaying({ _id, title, artist, album, art });
        setIsPlaying(true);
        if (audio.current?.readyState as number > 3 && audio.current) {
            if (source === null && mounted === 0) {
                // source = audioCtx.createMediaElementSource(audio.current as any);
                // Effects();
                if (source) {
                    setMounted(1)
                }
            }
        }
        if (type === 'video')
            handleFullPlayer();

    }, [_id]);



    useEffect(() => {
        if (audio.current) {
            source = audioCtx.createMediaElementSource(audio.current as any);
            Effects();
        }
    }, []);


    useEffect(() => {
        if (audio.current?.readyState as number > 0 && type === 'audio') {
            setMediaDuration();
            if (audio.current?.paused) {
                setIsPlaying(false);
            }
        }
        console.log('Component did mount...2')
    }, []);


    return (
        <Motion
            style={
                fullScreen
                    ? {
                        opacity: spring(1),
                        height: spring(100)
                    }
                    : initialStyle
            }
        >
            {interpolatesStyle => {
                return <div className="container-fixed ui-wrapper" style={{ height: interpolatesStyle.height + 'vh' }}>
                    <Color src={BASE_URL + playing.art} format="rgbArray" crossOrigin="Anonymous">
                        {({ data, loading, error }: any) => {
                            if (data) {
                                let colorSum = (data[0] + data[1] + data[2]);
                                if (colorSum < 382) {
                                    setPlayerTheme('#fff')
                                } else {
                                    setPlayerTheme('#000')
                                }
                            }
                            return <div className="bg-blur" style={{ background: `rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, .8)` }}></div>

                        }}
                    </Color>
                    <div ref={player} className="playerWrapper">
                        <div className="visual-player" style={{ height: (interpolatesStyle.height - 13.55) + 'vh', opacity: interpolatesStyle.opacity }}>

                            {
                                type === 'video'
                                    ? <video
                                        ref={video}
                                        preload="metadata"
                                        onProgress={handleAudioProgress}
                                        onLoadedMetadata={handleLoadedMetaData}
                                        onTimeUpdate={handleTimeUpdate}
                                        src={"http://localhost:8000/play/" + playing._id}
                                        style={{ width: '100%', height: '100%' }}>
                                    </video>
                                    : <canvas ref={vcanvas} style={{ height: '100%' }} />
                            }
                            {/* {
                                interpolatesStyle.height === 100
                                    ? <div className="status">
                                        {playing.title}
                                    </div>
                                    : null
                            } */}

                        </div>



                        <div className="player" style={{ color: playerTheme }}>
                            {
                                type !== 'video'
                                    ? <audio
                                        ref={audio}
                                        preload="metadata"
                                        src={playing._id != undefined ? "http://localhost:8000/play/" + playing._id : ''}
                                        onProgress={handleAudioProgress}
                                        onLoadedMetadata={handleLoadedMetaData}
                                        onTimeUpdate={handleTimeUpdate}
                                    />
                                    : null
                            }

                            <MusicInfo
                                onVisualPlayer={handleFullPlayer}
                                art={playing.art}
                                title={playing.title}
                                album={playing.album?.title}
                                artist={playing.artist?.title}
                            />


                            <div className="ctrl-wrp">
                                <Controls theme={playerTheme} isPlaying={isPlaying} onPlayPause={playPause} />

                                <div className="seek-wrp">
                                    <Slider
                                        minVal={mediaMetaData.current || '0:00'}
                                        maxVal={mediaMetaData.duration || '0:00'}
                                        ref={seekSlider}
                                        name="seek"
                                        min="0"
                                        max={`${type === 'audio' ? audio.current?.duration : video.current?.duration}`}
                                        onChange={handleSeekChange} />
                                </div>
                            </div>
                            <div className="vol">
                                <button><i className="ui-icon-low-volume" style={{ color: playerTheme }}></i></button>
                                <Slider minVal={'0'} maxVal={`100`} ref={volSlider} name="vol" min="0" max={`100`} onChange={handleVolSlider} />
                            </div>
                        </div>
                    </div>

                </div>
            }
            }
        </Motion>

    )
}

const mapStateToProps = (state: any) => {
    let { playing } = state.PlayerReducer;
    return { playing }
}

export default connect(mapStateToProps, { UpdateCurrentTime })(Player)
