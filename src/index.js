/**
 * @version 3.5.0
 * @name react-jinke-music-player
 * @description Maybe the best beautiful HTML5 responsive player component for react :)
 * @author Jinke.Li <1359518268@qq.com>
 */

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isMobile from "is-mobile";
import Slider from "rc-slider/lib/Slider";
import Switch from "rc-switch";
import { formatTime, createRandomNum, arrayEqual } from "./utils";
import AudioListsPanel from "./components/AudioListsPanel";
import AudioPlayerMobile from "./components/PlayerMobile";
import Draggable from "react-draggable";

import FaHeadphones from "react-icons/lib/fa/headphones";
import FaMinusSquareO from "react-icons/lib/fa/minus-square-o";
import FaPlayCircle from "react-icons/lib/fa/play-circle";
import FaPauseCircle from "react-icons/lib/fa/pause-circle";
import Reload from "react-icons/lib/fa/refresh";
import MdVolumeDown from "react-icons/lib/md/volume-down";
import MdVolumeMute from "react-icons/lib/md/volume-mute";
import Download from "react-icons/lib/fa/cloud-download";
import LoadIcon from "react-icons/lib/fa/spinner";
import LoopIcon from "react-icons/lib/md/repeat-one";
import RepeatIcon from "react-icons/lib/md/repeat";
import ShufflePlayIcon from "react-icons/lib/ti/arrow-shuffle";
import OrderPlayIcon from "react-icons/lib/md/view-headline";
import PlayLists from "react-icons/lib/md/queue-music";
import NextAudioIcon from "react-icons/lib/md/skip-next";
import PrevAudioIcon from "react-icons/lib/md/skip-previous";
import CloseBtn from "react-icons/lib/md/close";

import "rc-slider/assets/index.css";
import "rc-switch/assets/index.css";

const ISMOBILE = isMobile();

const AnimatePlayIcon = () => (
  <FaPlayCircle className="react-jinke-music-player-play-icon" />
);
const AnimatePauseIcon = () => (
  <FaPauseCircle className="react-jinke-music-player-pause-icon" />
);

const Load = () => (
  <span className="loading group" key="loading">
    <LoadIcon />
  </span>
);

const PlayModel = ({ visible, value }) => (
  <div
    className={classNames("play-mode-title", {
      "play-mode-title-visible": visible
    })}
    key="play-mode-title"
  >
    {value}
  </div>
);

//
const CircleProcessBar = ({ progress = 0, r = 45 } = {}) => {
  const _progress = progress.toFixed(2);
  const perimeter = Math.PI * 2 * r;
  const strokeDasharray = `${~~(perimeter * _progress)} ${~~(
    perimeter *
    (1 - _progress)
  )}`;
  return (
    <svg className="audio-circle-process-bar">
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="stroke"
        strokeDasharray={strokeDasharray}
      />
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="bg"
        strokeDasharray="0 1000"
      />
    </svg>
  );
};

const sliderBaseOptions = {
  min: 0,
  step: 0.01,
  trackStyle: { backgroundColor: "#31c27c" },
  handleStyle: { backgroundColor: "#31c27c", border: "2px solid #fff" }
};

export default class ReactJkMusicPlayer extends PureComponent {
  initPlayId = -1; //
  NETWORK_STATE = {
    NETWORK_EMPTY: 0, //
    NETWORK_IDLE: 1, //
    NETWORK_LOADING: 2, //
    NETWORK_NO_SOURCE: 3 //
  };
  READY_SUCCESS_STATE = 4;
  state = {
    playId: this.initPlayId, //
    name: "", //
    cover: "", //
    singer: "", //
    musicSrc: "", //
    isMobile: ISMOBILE,
    toggle: false,
    pause: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    isLoop: false,
    isMute: false,
    soundValue: 100,
    isDrag: false, //
    currentX: 0,
    currentY: 0,
    moveX: 0,
    moveY: 0,
    isMove: false,
    loading: false,
    audioListsPanelVisible: false,
    playModelNameVisible: false,
    theme: this.lightThemeName,
    extendsContent: [], //
    playMode: "", //
    currentAudioVolume: 0, //
    init: false,
    initAnimate: false,
    isInitAutoplay: false,
    loadProgress: 0
  };
  static defaultProps = {
    audioLists: [],
    theme: "dark",
    mode: "mini",
    playModeText: {
      order: "order",
      orderLoop: "orderLoop",
      singleLoop: "singleLoop",
      shufflePlay: "shufflePlay"
    },
    defaultPlayMode: "order",
    defaultPosition: {
      left: 0,
      top: 0
    },
    controllerTitle: <FaHeadphones />,
    panelTitle: "PlayList",
    closeText: "close",
    openText: "open",
    notContentText: "no music",
    checkedText: "",
    unCheckedText: "",
    once: false, //audioPlay 
    drag: true,
    toggleMode: true, //
    showMiniModeCover: true, //
    showDownload: true,
    showPlay: true,
    showReload: true,
    showPlayMode: true,
    showThemeSwitch: true,
    playModeTipVisible: false, //
    autoPlay: true,
    defaultVolume: 100,
    showProgressLoadBar: true, //
    seeked: true,
    playModeShowTime: 600, //
    bounds: "body", //
    showMiniProcessBar: false, //
    loadAudioErrorPlayNext: true, // 
    preload: false //
  };
  static propTypes = {
    audioLists: PropTypes.array.isRequired,
    theme: PropTypes.oneOf(["dark", "light"]),
    mode: PropTypes.oneOf(["mini", "full"]),
    defaultPlayMode: PropTypes.oneOf([
      "order",
      "orderLoop",
      "singleLoop",
      "shufflePlay"
    ]),
    drag: PropTypes.bool,
    seeked: PropTypes.bool,
    autoPlay: PropTypes.bool,
    playModeText: PropTypes.object,
    panelTitle: PropTypes.string,
    closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    openText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    notContentText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    controllerTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    defaultPosition: PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    audioAbort: PropTypes.func,
    audioVolumeChange: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    audioSeeked: PropTypes.func,
    audioDownload: PropTypes.func,
    showDownload: PropTypes.bool,
    showPlay: PropTypes.bool,
    showReload: PropTypes.bool,
    showPlayMode: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    showMiniModeCover: PropTypes.bool,
    toggleMode: PropTypes.bool,
    once: PropTypes.bool,
    extendsContent: PropTypes.array,
    checkedText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    defaultVolume: PropTypes.number,
    playModeShowTime: PropTypes.number,
    bounds: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showMiniProcessBar: PropTypes.bool,
    loadAudioErrorPlayNext: PropTypes.bool,
    preload: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["auto", "metadata", "none"])
    ])
  };
  constructor(props) {
    super(props);
    this.audio = null; //
    this.lightThemeName = "light";
    this.darkThemeName = "dark";
    //
    this.toggleModeName = {
      full: "full",
      mini: "mini"
    };
    this.targetId = "music-player-controller";
    this.openPanelPeriphery = 1; //panel
    this.x = 0;
    this.y = 0;
    this.isDrag = false;

    const {
      playModeText: { order, orderLoop, singleLoop, shufflePlay }
    } = props;
    //
    this.PLAYMODE = {
      order: {
        key: "order",
        value: order
      },
      orderLoop: {
        key: "orderLoop",
        value: orderLoop
      },
      singleLoop: {
        key: "singleLoop",
        value: singleLoop
      },
      shufflePlay: {
        key: "shufflePlay",
        value: shufflePlay
      }
    };
    this._PLAY_MODE_ = Object.values(this.PLAYMODE);
    this._PLAY_MODE_LENGTH_ = this._PLAY_MODE_.length;
  }
  render() {
    const {
      className,
      controllerTitle,
      closeText,
      openText,
      notContentText,
      drag,
      style,
      showDownload,
      showPlay,
      showReload,
      showPlayMode,
      showThemeSwitch,
      panelTitle,
      checkedText,
      unCheckedText,
      audioLists,
      toggleMode,
      showMiniModeCover,
      extendsContent,
      defaultPlayMode,
      seeked,
      showProgressLoadBar,
      bounds,
      defaultPosition,
      showMiniProcessBar,
      preload
    } = this.props;

    const {
      toggle,
      playing,
      duration,
      currentTime,
      isMute,
      soundValue,
      moveX,
      moveY,
      loading,
      audioListsPanelVisible,
      pause,
      theme,
      name,
      cover,
      singer,
      musicSrc,
      playId,
      isMobile,
      playMode,
      playModeTipVisible,
      playModelNameVisible,
      initAnimate,
      loadProgress
    } = this.state;

    const preloadState =
      preload === false || preload === "none"
        ? {}
        : preload === true
          ? { preload: "auto" }
          : { preload };

    const panelToggleAnimate = initAnimate
      ? { show: audioListsPanelVisible, hide: !audioListsPanelVisible }
      : { show: audioListsPanelVisible };

    const _playMode_ = this.PLAYMODE[playMode || defaultPlayMode];

    const currentPlayMode = _playMode_["key"];
    const currentPlayModeName = _playMode_["value"];

    const isShowMiniModeCover = showMiniModeCover
      ? {
          style: {
            backgroundImage: `url(${cover})`
          }
        }
      : {};

    const _currentTime = formatTime(currentTime);
    const _duration = formatTime(duration);

    const progressHandler = seeked
      ? {
          onChange: this.onHandleProgress,
          onAfterChange: this.audioSeeked
        }
      : {};
    //
    const ProgressBar = (
      <Slider
        max={Math.ceil(duration)}
        defaultValue={0}
        value={currentTime}
        {...progressHandler}
        {...sliderBaseOptions}
      />
    );

    //
    const DownloadComponent = showDownload ? (
      <span
        className="group audio-download"
        {...{ [ISMOBILE ? "onTouchStart" : "onClick"]: this.downloadAudio }}
      >
        <Download />
      </span>
    ) : (
      undefined
    );

    //
    const ThemeSwitchComponent = showThemeSwitch ? (
      <span className="group theme-switch">
        <Switch
          className="theme-switch"
          onChange={this.themeChange}
          checkedChildren={checkedText}
          unCheckedChildren={unCheckedText}
          checked={theme === this.lightThemeName}
        />
      </span>
    ) : (
      undefined
    );

    //
    const ReloadComponent = showReload ? (
      <span
        className="group reload-btn"
        {...(ISMOBILE
          ? { onTouchStart: this.audioReload }
          : { onClick: this.audioReload })}
        key="reload-btn"
        title="reload"
      >
        <Reload />
      </span>
    ) : (
      undefined
    );

    //
    const PlayModeComponent = showPlayMode ? (
      <span
        className={classNames("group loop-btn")}
        {...(ISMOBILE
          ? { onTouchStart: this.togglePlayMode }
          : { onClick: this.togglePlayMode })}
        key="play-mode-btn"
        title={this.PLAYMODE[currentPlayMode]["value"]}
      >
        {this.renderPlayModeIcon(currentPlayMode)}
      </span>
    ) : (
      undefined
    );

    const AudioController = (
      <div
        className={classNames("react-jinke-music-player")}
        key="react-jinke-music-player"
        style={defaultPosition}
      >
        <div className={classNames("music-player")} key="music-player">
          {showMiniProcessBar ? (
            <CircleProcessBar
              progress={currentTime / duration}
              r={isMobile ? 30 : 45}
            />
          ) : (
            undefined
          )}
          <div
            key="controller"
            id={this.targetId}
            className="scale music-player-controller"
            {...isShowMiniModeCover}
          >
            {loading ? (
              <Load />
            ) : (
              <Fragment>
                <span className="controller-title" key="controller-title">
                  {controllerTitle}
                </span>
                <div key="setting" className="music-player-controller-setting">
                  {toggle ? closeText : openText}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div
        className={classNames(
          "react-jinke-music-player-main",
          {
            "light-theme": theme === this.lightThemeName,
            "dark-theme": theme === this.darkThemeName
          },
          className
        )}
        style={style}
      >
        {toggle && isMobile ? (
          <AudioPlayerMobile
            playing={playing}
            loading={loading}
            pause={pause}
            name={name}
            singer={singer}
            cover={cover}
            themeSwitch={ThemeSwitchComponent}
            duration={_duration}
            currentTime={_currentTime}
            progressBar={ProgressBar}
            onPlay={this.onPlay}
            currentPlayModeName={this.PLAYMODE[currentPlayMode]["value"]}
            playMode={PlayModeComponent}
            audioNextPlay={this.audioNextPlay}
            audioPrevPlay={this.audioPrevPlay}
            playListsIcon={<PlayLists />}
            reloadIcon={ReloadComponent}
            downloadIcon={DownloadComponent}
            nextAudioIcon={<NextAudioIcon />}
            prevAudioIcon={<PrevAudioIcon />}
            playIcon={<AnimatePlayIcon />}
            pauseIcon={<AnimatePauseIcon />}
            closeIcon={<CloseBtn />}
            loadingIcon={<Load />}
            playModeTipVisible={playModeTipVisible}
            openAudioListsPanel={this.openAudioListsPanel}
            onClose={this.onHidePanel}
            extendsContent={extendsContent}
          />
        ) : (
          undefined
        )}

        {toggle ? (
          undefined
        ) : drag ? (
          <Draggable
            bounds={bounds}
            position={{ x: moveX, y: moveY }}
            onDrag={this.controllerMouseMove}
            onStop={this.controllerMouseUp}
            onStart={this.controllerMouseMove}
          >
            {AudioController}
          </Draggable>
        ) : (
          <Fragment>{AudioController}</Fragment>
        )}
        {toggle ? (
          isMobile ? (
            undefined
          ) : (
            <div key="panel" className="music-player-panel translate">
              <section className="panel-content" key="panel-content">
                <div
                  className={classNames("img-content", "img-rotate", {
                    "img-rotate-pause": !playing
                  })}
                  style={{ backgroundImage: `url(${cover})` }}
                  key="img-content"
                />
                <div
                  className="progress-bar-content"
                  key="progress-bar-content"
                >
                  <span className="audio-title">
                    {name} {singer ? `- ${singer}` : ""}
                  </span>
                  <section className="audio-main">
                    <span key="current-time" className="current-time">
                      {loading ? "--" : _currentTime}
                    </span>
                    <div className="progress-bar" key="progress-bar">
                      {showProgressLoadBar ? (
                        <div
                          className="progress-load-bar"
                          key="progress-load-bar"
                          style={{ width: `${Math.min(loadProgress, 100)}%` }}
                        />
                      ) : (
                        undefined
                      )}

                      {ProgressBar}
                    </div>
                    <span key="duration" className="duration">
                      {loading ? "--" : _duration}
                    </span>
                  </section>
                </div>
                <div className="player-content" key="player-content">
                  {/*player-content*/}
                  {loading ? (
                    <span>
                      <Load />
                    </span>
                  ) : showPlay ? (
                    <span className="group">
                      <span
                        className="group prev-audio"
                        title="previous track"
                        {...(ISMOBILE
                          ? { onTouchStart: this.audioPrevPlay }
                          : { onClick: this.audioPrevPlay })}
                      >
                        <PrevAudioIcon />
                      </span>
                      <span
                        className="group play-btn"
                        key="play-btn"
                        ref={node => (this.playBtn = node)}
                        {...(ISMOBILE
                          ? { onTouchStart: this.onPlay }
                          : { onClick: this.onPlay })}
                        title="play"
                      >
                        {playing ? (
                          <span>
                            <AnimatePauseIcon />
                          </span>
                        ) : (
                          <span>
                            <AnimatePlayIcon />
                          </span>
                        )}
                      </span>
                      <span
                        className="group next-audio"
                        title="next track"
                        {...(ISMOBILE
                          ? { onTouchStart: this.audioNextPlay }
                          : { onClick: this.audioNextPlay })}
                      >
                        <NextAudioIcon />
                      </span>
                    </span>
                  ) : (
                    undefined
                  )}

                  {/**/}
                  {ReloadComponent}
                  {/**/}
                  {DownloadComponent}
                  {/*  */}
                  {ThemeSwitchComponent}

                  {/*  */}
                  {extendsContent && extendsContent.length >= 1
                    ? extendsContent.map((content, i) => content)
                    : undefined}

                  {/**/}
                  <span
                    className="group play-sounds"
                    key="play-sound"
                    title="sounds"
                  >
                    {isMute ? (
                      <span
                        className="sounds-icon"
                        {...(ISMOBILE
                          ? { onTouchStart: this.onSound }
                          : { onClick: this.onSound })}
                      >
                        <MdVolumeMute />
                      </span>
                    ) : (
                      <span
                        className="sounds-icon"
                        {...(ISMOBILE
                          ? { onTouchStart: this.onMute }
                          : { onClick: this.onMute })}
                      >
                        <MdVolumeDown />
                      </span>
                    )}
                    <Slider
                      max={1}
                      value={soundValue}
                      onChange={this.audioSoundChange}
                      className="sound-operation"
                      {...sliderBaseOptions}
                    />
                  </span>

                  {/**/}
                  {PlayModeComponent}

                  {/**/}
                  <span
                    className="group audio-lists-btn"
                    key="audio-lists-btn"
                    title="play lists"
                    {...(ISMOBILE
                      ? { onTouchStart: this.openAudioListsPanel }
                      : { onClick: this.openAudioListsPanel })}
                  >
                    <span className="audio-lists-icon">
                      <PlayLists />
                    </span>
                    <span className="audio-lists-num">{audioLists.length}</span>
                  </span>

                  {/**/}
                  {toggleMode ? (
                    <span
                      className="group hide-panel"
                      key="hide-panel-btn"
                      {...(ISMOBILE
                        ? { onTouchStart: this.onHidePanel }
                        : { onClick: this.onHidePanel })}
                    >
                      <FaMinusSquareO />
                    </span>
                  ) : (
                    undefined
                  )}
                </div>
                {/*  */}
                <PlayModel
                  visible={playModelNameVisible}
                  value={currentPlayModeName}
                />
              </section>
            </div>
          )
        ) : (
          undefined
        )}
        {/*  */}
        <AudioListsPanel
          playId={playId}
          pause={pause}
          loading={loading ? <Load /> : undefined}
          visible={audioListsPanelVisible}
          audioLists={audioLists}
          notContentText={notContentText}
          onPlay={this.audioListsPlay}
          onCancel={this.closeAudioListsPanel}
          playIcon={<AnimatePlayIcon />}
          pauseIcon={<AnimatePauseIcon />}
          closeIcon={<CloseBtn />}
          panelTitle={panelTitle}
          isMobile={ISMOBILE}
          panelToggleAnimate={panelToggleAnimate}
        />
        <audio
          key="audio"
          className="music-player-audio"
          {...preloadState}
          src={musicSrc}
          ref={node => (this.audio = node)}
        />
      </div>
    );
  }
  //
  togglePlayMode = () => {
    this.setState(({ playMode }) => {
      let index = this._PLAY_MODE_.findIndex(({ key }) => key === playMode);
      if (index === this._PLAY_MODE_LENGTH_ - 1) {
        return {
          playMode: this._PLAY_MODE_[0]["key"],
          playModelNameVisible: true,
          playModeTipVisible: true
        };
      } else {
        return {
          playMode: this._PLAY_MODE_[++index]["key"],
          playModelNameVisible: true,
          playModeTipVisible: true
        };
      }
    });
    clearTimeout(this.playModelTimer);
    this.playModelTimer = setTimeout(() => {
      this.setState({ playModelNameVisible: false, playModeTipVisible: false });
    }, this.props.playModeShowTime);
  };
  //
  renderPlayModeIcon = playMode => {
    let IconNode = "";
    const animateName = "react-jinke-music-player-mode-icon";
    switch (playMode) {
      case this.PLAYMODE["order"]["key"]:
        IconNode = <OrderPlayIcon className={animateName} />;
        break;
      case this.PLAYMODE["orderLoop"]["key"]:
        IconNode = <RepeatIcon className={animateName} />;
        break;
      case this.PLAYMODE["singleLoop"]["key"]:
        IconNode = <LoopIcon className={animateName} />;
        break;
      case this.PLAYMODE["shufflePlay"]["key"]:
        IconNode = <ShufflePlayIcon className={animateName} />;
        break;
      default:
        IconNode = <OrderPlayIcon className={animateName} />;
    }
    return IconNode;
  };
  /**
   * 
   */
  audioListsPlay = (playId, ignore = false) => {
    const { audioLists } = this.props;
    const { playId: currentPlayId, pause, playing } = this.state;

    if (Array.isArray(audioLists) && audioLists.length === 0) {
      /*eslint-disable no-console*/
      return console.warn("Your playlist has no songs. and cannot play !");
      /*eslint-disable no-console*/
    }
    //
    if (playId === currentPlayId && !ignore) {
      this.setState({ pause: !pause, playing: !playing });
      return pause ? this.audio.play() : this._pauseAudio();
    }

    const { name, cover, musicSrc, singer } = audioLists[playId];

    this.setState(
      {
        name,
        cover,
        musicSrc,
        singer,
        playId,
        currentTime: 0,
        duration: 0,
        playing: false,
        loading: true,
        loadProgress: 0
      },
      () => {
        this.audio.load();
      }
    );
  };
  openAudioListsPanel = () => {
    this.setState(({ audioListsPanelVisible, initAnimate }) => ({
      initAnimate: true,
      audioListsPanelVisible: !audioListsPanelVisible
    }));
  };
  closeAudioListsPanel = e => {
    e.stopPropagation();
    this.setState({ audioListsPanelVisible: false });
  };
  themeChange = value => {
    this.setState({
      theme: value ? this.lightThemeName : this.darkThemeName
    });
  };
  downloadAudio = () => {
    const { name, musicSrc } = this.state;
    this.downloadNode = document.createElement("a");
    this.downloadNode.setAttribute("download", name);
    this.downloadNode.setAttribute("name", name);
    this.downloadNode.setAttribute("href", musicSrc);
    this.downloadNode.click();
    this.downloadNode = undefined;

    this.props.audioDownload &&
      this.props.audioDownload(this.getBaseAudioInfo());
  };
  controllerMouseMove = (e, { deltaX, deltaY }) => {
    const isMove =
      Math.abs(deltaX) >= this.openPanelPeriphery ||
      Math.abs(deltaY) >= this.openPanelPeriphery;
    this.setState({
      isMove
    });
  };
  controllerMouseUp = (e, { x, y }) => {
    if (!this.state.isMove) {
      this.openPanel();
    }
    this.setState({ moveX: x, moveY: y });
    return false;
  };
  controllerMouseOut = e => {
    e.preventDefault();
    this.isDrag = false;
  };
  onHandleProgress = value => {
    this.audio.currentTime = value;
  };
  onSound = () => {
    this.setAudioVolume(this.state.currentAudioVolume);
  };
  setAudioVolume = value => {
    this.audio.volume = value;
    this.setState({
      currentAudioVolume: value,
      soundValue: value
    });
  };
  stopAll = target => {
    target.stopPropagation();
    target.preventDefault();
  };
  getBoundingClientRect = ele => {
    const { left, top } = ele.getBoundingClientRect();
    return {
      left,
      top
    };
  };
  //
  audioLoop = () => {
    this.setState(({ isLoop }) => {
      return {
        isLoop: !isLoop
      };
    });
  };
  //
  audioReload = () => {
    this.handlePlay(this.PLAYMODE["singleLoop"]["key"]);
  };
  openPanel = () => {
    this.props.toggleMode && this.setState({ toggle: true });
  };
  //
  onHidePanel = e => {
    this.setState({ toggle: false, audioListsPanelVisible: false });
  };
  //
  getBaseAudioInfo() {
    const { cover, name, musicSrc, soundValue } = this.state;
    const {
      currentTime,
      duration,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate
    } = this.audio;
    return {
      cover,
      name,
      musicSrc,
      volume: soundValue,
      currentTime,
      duration,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate
    };
  }
  //
  onPlay = () => {
    if (this.props.audioLists.length >= 1) {
      //
      const { playing } = this.state;
      if (playing === true) {
        this._pauseAudio();
      } else {
        this.getAudioLength();
        this.loadAudio();
      }
    }
  };
  //
  _pauseAudio = () => {
    this.audio.pause();
    this.setState({ playing: false, pause: true });
  };
  pauseAudio = () => {
    this.props.audioPause && this.props.audioPause(this.getBaseAudioInfo());
  };
  loadStart = () => {
    this.setState({ loading: true });
  };
  //
  loadAudio = () => {
    const { autoPlay } = this.props;
    const { isInitAutoplay, loadProgress } = this.state;
    const { readyState, networkState } = this.audio;
    const maxLoadProgress = 100;
    this.setState({ loading: true });
    if (loadProgress < maxLoadProgress) {
      this.setState({ loadProgress: loadProgress + 1 });
    }
    if (
      readyState === this.READY_SUCCESS_STATE &&
      networkState !== this.NETWORK_STATE.NETWORK_NO_SOURCE
    ) {
      const isAutoPlay = autoPlay === false && !isInitAutoplay;
      this.setState(
        {
          playing: true,
          loading: false,
          pause: false,
          loadProgress: maxLoadProgress
        },
        () => {
          if (isAutoPlay) {
            this.audio.volume = 0;
          }
          this.audio.play();
          if (isAutoPlay) {
            setTimeout(() => {
              this._pauseAudio();
              this.audio.volume = this.defaultVolume;
              this.setState({ isInitAutoplay: true });
            }, 0);
          }
        }
      );
    }
  };
  //
  getAudioLength = () => {
    this.setState({
      duration: this.audio.duration
    });
  };
  //
  loadAudioError = e => {
    const { playMode } = this.state;
    const { loadAudioErrorPlayNext } = this.props;
    if (loadAudioErrorPlayNext) {
      this.handlePlay(playMode);
    }

    const info = this.getBaseAudioInfo();
    this.props.loadAudioError &&
      this.props.loadAudioError({
        ...e,
        audioInfo: info,
        errMsg: this.audio.error || null
      });
  };
  //isNext true  false
  /*eslint-disable no-unused-vars */
  handlePlay = (playMode, isNext = true) => {
    let IconNode = "";
    let { playId } = this.state;
    const audioListsLen = this.props.audioLists.length;
    switch (playMode) {
      //
      case this.PLAYMODE["order"]["key"]:
        IconNode = <OrderPlayIcon />;
        if (playId === audioListsLen - 1) return this._pauseAudio();
        this.audioListsPlay(isNext ? ++playId : --playId);
        break;

      //
      case this.PLAYMODE["orderLoop"]["key"]:
        IconNode = <RepeatIcon />;
        if (isNext) {
          if (playId === audioListsLen - 1) playId = this.initPlayId;
          this.audioListsPlay(++playId);
        } else {
          if (playId - 1 === this.initPlayId) playId = audioListsLen;
          this.audioListsPlay(--playId);
        }
        break;

      //
      case this.PLAYMODE["singleLoop"]["key"]:
        IconNode = <LoopIcon />;
        this.audio.currentTime = 0;
        this.audioListsPlay(playId, true);
        break;

      //
      case this.PLAYMODE["shufflePlay"]["key"]:
        {
          IconNode = <ShufflePlayIcon />;
          let randomPlayId = createRandomNum(0, audioListsLen - 1);
          this.audioListsPlay(randomPlayId, true);
        }
        break;
      default:
        IconNode = <OrderPlayIcon />;
    }
  };
  /*eslint-disable no-unused-vars */
  //
  audioEnd = () => {
    this.props.audioEnded && this.props.audioEnded(this.getBaseAudioInfo());
    this.handlePlay(this.state.playMode);
  };
  /**
   * 
   */
  audioPrevAndNextBasePlayHandle = (isNext = true) => {
    const { playMode } = this.state;
    let _playMode = "";
    switch (playMode) {
      case this.PLAYMODE["shufflePlay"]["key"]:
        _playMode = playMode;
        break;
      default:
        _playMode = this.PLAYMODE["orderLoop"]["key"];
        break;
    }
    this.handlePlay(_playMode, isNext);
  };
  //
  audioPrevPlay = () => {
    this.audioPrevAndNextBasePlayHandle(false);
  };
  //
  audioNextPlay = () => {
    this.audioPrevAndNextBasePlayHandle(true);
  };
  //
  audioTimeUpdate = () => {
    const currentTime = this.audio.currentTime;
    this.setState({ currentTime });
    this.props.audioProgress &&
      this.props.audioProgress(this.getBaseAudioInfo());
  };
  //
  audioSoundChange = value => {
    this.setAudioVolume(value);
  };
  audioVolumeChange = () => {
    if (this.audio.volume <= 0) {
      this.setState({ isMute: true });
    } else {
      this.setState({ isMute: false });
    }
    this.props.audioVolumeChange &&
      this.props.audioVolumeChange(this.state.currentAudioVolume);
  };
  audioPlay = () => {
    this.props.audioPlay && this.props.audioPlay(this.getBaseAudioInfo());
  };
  //
  audioSeeked = () => {
    if (this.props.audioLists.length >= 1) {
      this.loadAudio();
      this.props.audioSeeked && this.props.audioSeeked(this.getBaseAudioInfo());
    }
  };
  //
  onMute = () => {
    this.setState(
      {
        isMute: true,
        soundValue: 0,
        currentAudioVolume: this.audio.volume
      },
      () => {
        this.audio.volume = 0;
      }
    );
  };
  //
  audioAbort = e => {
    const audioInfo = this.getBaseAudioInfo();
    const _err = Object.assign({}, e, audioInfo);
    this.props.audioAbort && this.props.audioAbort(_err);
  };
  toggleMode = mode => {
    if (mode === this.toggleModeName["full"]) {
      this.setState({ toggle: true });
    }
  };
  bindMobileAutoPlayerEvents = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.audio.play();
    });
  };
  unBindEvents = (...options) => {
    this.bindEvents(...options);
  };
  /**
   * audio
   */
  bindEvents = (
    target = this.audio,
    eventsNames = {
      waiting: this.loadAudio,
      canplay: this.onPlay,
      error: this.loadAudioError,
      ended: this.audioEnd,
      seeked: this.audioSeeked,
      pause: this.pauseAudio,
      play: this.audioPlay,
      timeupdate: this.audioTimeUpdate,
      volumechange: this.audioVolumeChange,
      stalled: this.loadAudioError, //
      abort: this.audioAbort,
      loadstart: this.loadStart
    },
    bind = true
  ) => {
    const { once } = this.props;
    for (let name in eventsNames) {
      const _events = eventsNames[name];
      bind
        ? target.addEventListener(name, _events, {
            once: !!(once && name === "play")
          })
        : target.removeEventListener(name, _events);
    }
  };
  getPlayInfo = (audioLists = []) => {
    const { name = "", cover = "", singer = "", musicSrc = "" } =
      audioLists[0] || {};
    return { name, cover, singer, musicSrc };
  };
  initPlayInfo = (audioLists, cb) => {
    this.setState(this.getPlayInfo(audioLists), cb);
  };
  // props  audioLists
  componentWillReceiveProps({ audioLists }) {
    if (!arrayEqual(audioLists)(this.props.audioLists)) {
      this.initPlayInfo(audioLists);
      this.bindEvents(this.audio);
    }
  }
  //state 
  componentWillMount() {
    const { theme, mode, audioLists, defaultPlayMode } = this.props;

    //'mini'  'full' 
    this.toggleMode(mode);

    if (audioLists.length >= 1) {
      //
      this.setState(({ playId }) => {
        let _playId = playId;
        return {
          ...this.getPlayInfo(audioLists),
          playId: ++_playId,
          theme,
          playMode: defaultPlayMode
        };
      });
    } else {
      this.setState({
        name: "",
        singer: "",
        cover: "",
        init: true,
        playing: false,
        loading: false
      });
    }
  }
  listenerIsMobile = ({ matches }) => {
    this.setState({
      isMobile: !!matches
    });
  };
  componentWillUnmount() {
    this.unBindEvents(this.audio, undefined, false);
    this.media.removeListener(this.listenerIsMobile);
    this.media = undefined;
  }
  componentDidMount() {
    const { audioLists } = this.props;
    this.media = window.matchMedia(
      "(max-width: 768px) and (orientation : portrait)"
    );
    this.media.addListener(this.listenerIsMobile);
    // [0-100]
    this.defaultVolume =
      Math.max(0, Math.min(this.props.defaultVolume, 100)) / 100;
    this.setAudioVolume(this.defaultVolume);
    if (audioLists.length >= 1) {
      this.bindEvents(this.audio);
    }
  }
}
