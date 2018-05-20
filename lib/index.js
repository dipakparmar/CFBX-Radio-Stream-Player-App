"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isMobile = _interopRequireDefault(require("is-mobile"));

var _Slider = _interopRequireDefault(require("rc-slider/lib/Slider"));

var _rcSwitch = _interopRequireDefault(require("rc-switch"));

var _utils = require("./utils");

var _AudioListsPanel = _interopRequireDefault(require("./components/AudioListsPanel"));

var _PlayerMobile = _interopRequireDefault(require("./components/PlayerMobile"));

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

var _headphones = _interopRequireDefault(require("react-icons/lib/fa/headphones"));

var _minusSquareO = _interopRequireDefault(require("react-icons/lib/fa/minus-square-o"));

var _playCircle = _interopRequireDefault(require("react-icons/lib/fa/play-circle"));

var _pauseCircle = _interopRequireDefault(require("react-icons/lib/fa/pause-circle"));

var _refresh = _interopRequireDefault(require("react-icons/lib/fa/refresh"));

var _volumeDown = _interopRequireDefault(require("react-icons/lib/md/volume-down"));

var _volumeMute = _interopRequireDefault(require("react-icons/lib/md/volume-mute"));

var _cloudDownload = _interopRequireDefault(require("react-icons/lib/fa/cloud-download"));

var _spinner = _interopRequireDefault(require("react-icons/lib/fa/spinner"));

var _repeatOne = _interopRequireDefault(require("react-icons/lib/md/repeat-one"));

var _repeat = _interopRequireDefault(require("react-icons/lib/md/repeat"));

var _arrowShuffle = _interopRequireDefault(require("react-icons/lib/ti/arrow-shuffle"));

var _viewHeadline = _interopRequireDefault(require("react-icons/lib/md/view-headline"));

var _queueMusic = _interopRequireDefault(require("react-icons/lib/md/queue-music"));

var _skipNext = _interopRequireDefault(require("react-icons/lib/md/skip-next"));

var _skipPrevious = _interopRequireDefault(require("react-icons/lib/md/skip-previous"));

var _close = _interopRequireDefault(require("react-icons/lib/md/close"));

require("rc-slider/assets/index.css");

require("rc-switch/assets/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ISMOBILE = (0, _isMobile.default)();

var AnimatePlayIcon = function AnimatePlayIcon() {
  return _react.default.createElement(_playCircle.default, {
    className: "react-jinke-music-player-play-icon"
  });
};

var AnimatePauseIcon = function AnimatePauseIcon() {
  return _react.default.createElement(_pauseCircle.default, {
    className: "react-jinke-music-player-pause-icon"
  });
};

var Load = function Load() {
  return _react.default.createElement("span", {
    className: "loading group",
    key: "loading"
  }, _react.default.createElement(_spinner.default, null));
};

var PlayModel = function PlayModel(_ref) {
  var visible = _ref.visible,
      value = _ref.value;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("play-mode-title", {
      "play-mode-title-visible": visible
    }),
    key: "play-mode-title"
  }, value);
}; //


var CircleProcessBar = function CircleProcessBar() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$progress = _ref2.progress,
      progress = _ref2$progress === void 0 ? 0 : _ref2$progress,
      _ref2$r = _ref2.r,
      r = _ref2$r === void 0 ? 45 : _ref2$r;

  var _progress = progress.toFixed(2);

  var perimeter = Math.PI * 2 * r;
  var strokeDasharray = "".concat(~~(perimeter * _progress), " ").concat(~~(perimeter * (1 - _progress)));
  return _react.default.createElement("svg", {
    className: "audio-circle-process-bar"
  }, _react.default.createElement("circle", {
    cx: r,
    cy: r,
    r: r - 1,
    fill: "none",
    className: "stroke",
    strokeDasharray: strokeDasharray
  }), _react.default.createElement("circle", {
    cx: r,
    cy: r,
    r: r - 1,
    fill: "none",
    className: "bg",
    strokeDasharray: "0 1000"
  }));
};

var sliderBaseOptions = {
  min: 0,
  step: 0.01,
  trackStyle: {
    backgroundColor: "#31c27c"
  },
  handleStyle: {
    backgroundColor: "#31c27c",
    border: "2px solid #fff"
  }
};

var ReactJkMusicPlayer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ReactJkMusicPlayer, _PureComponent);

  //
  function ReactJkMusicPlayer(props) {
    var _this;

    _classCallCheck(this, ReactJkMusicPlayer);

    _this = _possibleConstructorReturn(this, (ReactJkMusicPlayer.__proto__ || Object.getPrototypeOf(ReactJkMusicPlayer)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "initPlayId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: -1
    });
    Object.defineProperty(_assertThisInitialized(_this), "NETWORK_STATE", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        NETWORK_EMPTY: 0,
        //
        NETWORK_IDLE: 1,
        //
        NETWORK_LOADING: 2,
        //
        NETWORK_NO_SOURCE: 3 //

      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "READY_SUCCESS_STATE", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 4
    });
    Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        playId: _this.initPlayId,
        //
        name: "",
        //
        cover: "",
        //
        singer: "",
        //
        musicSrc: "",
        //
        isMobile: ISMOBILE,
        toggle: false,
        pause: false,
        playing: false,
        duration: 0,
        currentTime: 0,
        isLoop: false,
        isMute: false,
        soundValue: 100,
        isDrag: false,
        //
        currentX: 0,
        currentY: 0,
        moveX: 0,
        moveY: 0,
        isMove: false,
        loading: false,
        audioListsPanelVisible: false,
        playModelNameVisible: false,
        theme: _this.lightThemeName,
        extendsContent: [],
        //
        playMode: "",
        //
        currentAudioVolume: 0,
        //
        init: false,
        initAnimate: false,
        isInitAutoplay: false,
        loadProgress: 0
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "togglePlayMode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState(function (_ref3) {
          var playMode = _ref3.playMode;

          var index = _this._PLAY_MODE_.findIndex(function (_ref4) {
            var key = _ref4.key;
            return key === playMode;
          });

          if (index === _this._PLAY_MODE_LENGTH_ - 1) {
            return {
              playMode: _this._PLAY_MODE_[0]["key"],
              playModelNameVisible: true,
              playModeTipVisible: true
            };
          } else {
            return {
              playMode: _this._PLAY_MODE_[++index]["key"],
              playModelNameVisible: true,
              playModeTipVisible: true
            };
          }
        });

        clearTimeout(_this.playModelTimer);
        _this.playModelTimer = setTimeout(function () {
          _this.setState({
            playModelNameVisible: false,
            playModeTipVisible: false
          });
        }, _this.props.playModeShowTime);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "renderPlayModeIcon", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(playMode) {
        var IconNode = "";
        var animateName = "react-jinke-music-player-mode-icon";

        switch (playMode) {
          case _this.PLAYMODE["order"]["key"]:
            IconNode = _react.default.createElement(_viewHeadline.default, {
              className: animateName
            });
            break;

          case _this.PLAYMODE["orderLoop"]["key"]:
            IconNode = _react.default.createElement(_repeat.default, {
              className: animateName
            });
            break;

          case _this.PLAYMODE["singleLoop"]["key"]:
            IconNode = _react.default.createElement(_repeatOne.default, {
              className: animateName
            });
            break;

          case _this.PLAYMODE["shufflePlay"]["key"]:
            IconNode = _react.default.createElement(_arrowShuffle.default, {
              className: animateName
            });
            break;

          default:
            IconNode = _react.default.createElement(_viewHeadline.default, {
              className: animateName
            });
        }

        return IconNode;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioListsPlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(playId) {
        var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var audioLists = _this.props.audioLists;
        var _this$state = _this.state,
            currentPlayId = _this$state.playId,
            pause = _this$state.pause,
            playing = _this$state.playing;

        if (Array.isArray(audioLists) && audioLists.length === 0) {
          /*eslint-disable no-console*/
          return console.warn("Your playlist has no songs. and cannot play !");
          /*eslint-disable no-console*/
        } //


        if (playId === currentPlayId && !ignore) {
          _this.setState({
            pause: !pause,
            playing: !playing
          });

          return pause ? _this.audio.play() : _this._pauseAudio();
        }

        var _audioLists$playId = audioLists[playId],
            name = _audioLists$playId.name,
            cover = _audioLists$playId.cover,
            musicSrc = _audioLists$playId.musicSrc,
            singer = _audioLists$playId.singer;

        _this.setState({
          name: name,
          cover: cover,
          musicSrc: musicSrc,
          singer: singer,
          playId: playId,
          currentTime: 0,
          duration: 0,
          playing: false,
          loading: true,
          loadProgress: 0
        }, function () {
          _this.audio.load();
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "openAudioListsPanel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState(function (_ref5) {
          var audioListsPanelVisible = _ref5.audioListsPanelVisible,
              initAnimate = _ref5.initAnimate;
          return {
            initAnimate: true,
            audioListsPanelVisible: !audioListsPanelVisible
          };
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "closeAudioListsPanel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        e.stopPropagation();

        _this.setState({
          audioListsPanelVisible: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "themeChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_value) {
        _this.setState({
          theme: _value ? _this.lightThemeName : _this.darkThemeName
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "downloadAudio", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var _this$state2 = _this.state,
            name = _this$state2.name,
            musicSrc = _this$state2.musicSrc;
        _this.downloadNode = document.createElement("a");

        _this.downloadNode.setAttribute("download", name);

        _this.downloadNode.setAttribute("name", name);

        _this.downloadNode.setAttribute("href", musicSrc);

        _this.downloadNode.click();

        _this.downloadNode = undefined;
        _this.props.audioDownload && _this.props.audioDownload(_this.getBaseAudioInfo());
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "controllerMouseMove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e, _ref6) {
        var deltaX = _ref6.deltaX,
            deltaY = _ref6.deltaY;

        var isMove = Math.abs(deltaX) >= _this.openPanelPeriphery || Math.abs(deltaY) >= _this.openPanelPeriphery;

        _this.setState({
          isMove: isMove
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "controllerMouseUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e, _ref7) {
        var x = _ref7.x,
            y = _ref7.y;

        if (!_this.state.isMove) {
          _this.openPanel();
        }

        _this.setState({
          moveX: x,
          moveY: y
        });

        return false;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "controllerMouseOut", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        e.preventDefault();
        _this.isDrag = false;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onHandleProgress", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_value2) {
        _this.audio.currentTime = _value2;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onSound", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setAudioVolume(_this.state.currentAudioVolume);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "setAudioVolume", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_value3) {
        _this.audio.volume = _value3;

        _this.setState({
          currentAudioVolume: _value3,
          soundValue: _value3
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "stopAll", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(target) {
        target.stopPropagation();
        target.preventDefault();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getBoundingClientRect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(ele) {
        var _ele$getBoundingClien = ele.getBoundingClientRect(),
            left = _ele$getBoundingClien.left,
            top = _ele$getBoundingClien.top;

        return {
          left: left,
          top: top
        };
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioLoop", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState(function (_ref8) {
          var isLoop = _ref8.isLoop;
          return {
            isLoop: !isLoop
          };
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioReload", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.handlePlay(_this.PLAYMODE["singleLoop"]["key"]);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "openPanel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.toggleMode && _this.setState({
          toggle: true
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onHidePanel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        _this.setState({
          toggle: false,
          audioListsPanelVisible: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onPlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.audioLists.length >= 1) {
          //
          var playing = _this.state.playing;

          if (playing === true) {
            _this._pauseAudio();
          } else {
            _this.getAudioLength();

            _this.loadAudio();
          }
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "_pauseAudio", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.audio.pause();

        _this.setState({
          playing: false,
          pause: true
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "pauseAudio", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.audioPause && _this.props.audioPause(_this.getBaseAudioInfo());
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "loadStart", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          loading: true
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "loadAudio", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var autoPlay = _this.props.autoPlay;
        var _this$state3 = _this.state,
            isInitAutoplay = _this$state3.isInitAutoplay,
            loadProgress = _this$state3.loadProgress;
        var _this$audio = _this.audio,
            readyState = _this$audio.readyState,
            networkState = _this$audio.networkState;
        var maxLoadProgress = 100;

        _this.setState({
          loading: true
        });

        if (loadProgress < maxLoadProgress) {
          _this.setState({
            loadProgress: loadProgress + 1
          });
        }

        if (readyState === _this.READY_SUCCESS_STATE && networkState !== _this.NETWORK_STATE.NETWORK_NO_SOURCE) {
          var isAutoPlay = autoPlay === false && !isInitAutoplay;

          _this.setState({
            playing: true,
            loading: false,
            pause: false,
            loadProgress: maxLoadProgress
          }, function () {
            if (isAutoPlay) {
              _this.audio.volume = 0;
            }

            _this.audio.play();

            if (isAutoPlay) {
              setTimeout(function () {
                _this._pauseAudio();

                _this.audio.volume = _this.defaultVolume;

                _this.setState({
                  isInitAutoplay: true
                });
              }, 0);
            }
          });
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getAudioLength", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          duration: _this.audio.duration
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "loadAudioError", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        var playMode = _this.state.playMode;
        var loadAudioErrorPlayNext = _this.props.loadAudioErrorPlayNext;

        if (loadAudioErrorPlayNext) {
          _this.handlePlay(playMode);
        }

        var info = _this.getBaseAudioInfo();

        _this.props.loadAudioError && _this.props.loadAudioError(_objectSpread({}, e, {
          audioInfo: info,
          errMsg: _this.audio.error || null
        }));
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handlePlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(playMode) {
        var isNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var IconNode = "";
        var playId = _this.state.playId;
        var audioListsLen = _this.props.audioLists.length;

        switch (playMode) {
          //
          case _this.PLAYMODE["order"]["key"]:
            IconNode = _react.default.createElement(_viewHeadline.default, null);
            if (playId === audioListsLen - 1) return _this._pauseAudio();

            _this.audioListsPlay(isNext ? ++playId : --playId);

            break;
          //

          case _this.PLAYMODE["orderLoop"]["key"]:
            IconNode = _react.default.createElement(_repeat.default, null);

            if (isNext) {
              if (playId === audioListsLen - 1) playId = _this.initPlayId;

              _this.audioListsPlay(++playId);
            } else {
              if (playId - 1 === _this.initPlayId) playId = audioListsLen;

              _this.audioListsPlay(--playId);
            }

            break;
          //

          case _this.PLAYMODE["singleLoop"]["key"]:
            IconNode = _react.default.createElement(_repeatOne.default, null);
            _this.audio.currentTime = 0;

            _this.audioListsPlay(playId, true);

            break;
          //

          case _this.PLAYMODE["shufflePlay"]["key"]:
            {
              IconNode = _react.default.createElement(_arrowShuffle.default, null);
              var randomPlayId = (0, _utils.createRandomNum)(0, audioListsLen - 1);

              _this.audioListsPlay(randomPlayId, true);
            }
            break;

          default:
            IconNode = _react.default.createElement(_viewHeadline.default, null);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioEnd", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.audioEnded && _this.props.audioEnded(_this.getBaseAudioInfo());

        _this.handlePlay(_this.state.playMode);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioPrevAndNextBasePlayHandle", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var isNext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var playMode = _this.state.playMode;
        var _playMode = "";

        switch (playMode) {
          case _this.PLAYMODE["shufflePlay"]["key"]:
            _playMode = playMode;
            break;

          default:
            _playMode = _this.PLAYMODE["orderLoop"]["key"];
            break;
        }

        _this.handlePlay(_playMode, isNext);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioPrevPlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.audioPrevAndNextBasePlayHandle(false);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioNextPlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.audioPrevAndNextBasePlayHandle(true);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioTimeUpdate", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var currentTime = _this.audio.currentTime;

        _this.setState({
          currentTime: currentTime
        });

        _this.props.audioProgress && _this.props.audioProgress(_this.getBaseAudioInfo());
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioSoundChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_value4) {
        _this.setAudioVolume(_value4);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioVolumeChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.audio.volume <= 0) {
          _this.setState({
            isMute: true
          });
        } else {
          _this.setState({
            isMute: false
          });
        }

        _this.props.audioVolumeChange && _this.props.audioVolumeChange(_this.state.currentAudioVolume);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioPlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.audioPlay && _this.props.audioPlay(_this.getBaseAudioInfo());
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioSeeked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.audioLists.length >= 1) {
          _this.loadAudio();

          _this.props.audioSeeked && _this.props.audioSeeked(_this.getBaseAudioInfo());
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onMute", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isMute: true,
          soundValue: 0,
          currentAudioVolume: _this.audio.volume
        }, function () {
          _this.audio.volume = 0;
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioAbort", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        var audioInfo = _this.getBaseAudioInfo();

        var _err = Object.assign({}, e, audioInfo);

        _this.props.audioAbort && _this.props.audioAbort(_err);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "toggleMode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(mode) {
        if (mode === _this.toggleModeName["full"]) {
          _this.setState({
            toggle: true
          });
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "bindMobileAutoPlayerEvents", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        document.addEventListener("DOMContentLoaded", function () {
          _this.audio.play();
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "unBindEvents", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var _this2;

        (_this2 = _this).bindEvents.apply(_this2, arguments);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "bindEvents", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.audio;
        var eventsNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          waiting: _this.loadAudio,
          canplay: _this.onPlay,
          error: _this.loadAudioError,
          ended: _this.audioEnd,
          seeked: _this.audioSeeked,
          pause: _this.pauseAudio,
          play: _this.audioPlay,
          timeupdate: _this.audioTimeUpdate,
          volumechange: _this.audioVolumeChange,
          stalled: _this.loadAudioError,
          //
          abort: _this.audioAbort,
          loadstart: _this.loadStart
        };
        var bind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var once = _this.props.once;

        for (var name in eventsNames) {
          var _events = eventsNames[name];
          bind ? target.addEventListener(name, _events, {
            once: !!(once && name === "play")
          }) : target.removeEventListener(name, _events);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getPlayInfo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var audioLists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _ref9 = audioLists[0] || {},
            _ref9$name = _ref9.name,
            name = _ref9$name === void 0 ? "" : _ref9$name,
            _ref9$cover = _ref9.cover,
            cover = _ref9$cover === void 0 ? "" : _ref9$cover,
            _ref9$singer = _ref9.singer,
            singer = _ref9$singer === void 0 ? "" : _ref9$singer,
            _ref9$musicSrc = _ref9.musicSrc,
            musicSrc = _ref9$musicSrc === void 0 ? "" : _ref9$musicSrc;

        return {
          name: name,
          cover: cover,
          singer: singer,
          musicSrc: musicSrc
        };
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "initPlayInfo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(audioLists, cb) {
        _this.setState(_this.getPlayInfo(audioLists), cb);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "listenerIsMobile", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref10) {
        var matches = _ref10.matches;

        _this.setState({
          isMobile: !!matches
        });
      }
    });
    _this.audio = null; //

    _this.lightThemeName = "light";
    _this.darkThemeName = "dark"; //

    _this.toggleModeName = {
      full: "full",
      mini: "mini"
    };
    _this.targetId = "music-player-controller";
    _this.openPanelPeriphery = 1; //panel

    _this.x = 0;
    _this.y = 0;
    _this.isDrag = false;
    var _props$playModeText = props.playModeText,
        order = _props$playModeText.order,
        orderLoop = _props$playModeText.orderLoop,
        singleLoop = _props$playModeText.singleLoop,
        shufflePlay = _props$playModeText.shufflePlay; //

    _this.PLAYMODE = {
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
    _this._PLAY_MODE_ = Object.values(_this.PLAYMODE);
    _this._PLAY_MODE_LENGTH_ = _this._PLAY_MODE_.length;
    return _this;
  }

  _createClass(ReactJkMusicPlayer, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          controllerTitle = _props.controllerTitle,
          closeText = _props.closeText,
          openText = _props.openText,
          notContentText = _props.notContentText,
          drag = _props.drag,
          style = _props.style,
          showDownload = _props.showDownload,
          showPlay = _props.showPlay,
          showReload = _props.showReload,
          showPlayMode = _props.showPlayMode,
          showThemeSwitch = _props.showThemeSwitch,
          panelTitle = _props.panelTitle,
          checkedText = _props.checkedText,
          unCheckedText = _props.unCheckedText,
          audioLists = _props.audioLists,
          toggleMode = _props.toggleMode,
          showMiniModeCover = _props.showMiniModeCover,
          extendsContent = _props.extendsContent,
          defaultPlayMode = _props.defaultPlayMode,
          seeked = _props.seeked,
          showProgressLoadBar = _props.showProgressLoadBar,
          bounds = _props.bounds,
          defaultPosition = _props.defaultPosition,
          showMiniProcessBar = _props.showMiniProcessBar,
          preload = _props.preload;
      var _state = this.state,
          toggle = _state.toggle,
          playing = _state.playing,
          duration = _state.duration,
          currentTime = _state.currentTime,
          isMute = _state.isMute,
          soundValue = _state.soundValue,
          moveX = _state.moveX,
          moveY = _state.moveY,
          loading = _state.loading,
          audioListsPanelVisible = _state.audioListsPanelVisible,
          pause = _state.pause,
          theme = _state.theme,
          name = _state.name,
          cover = _state.cover,
          singer = _state.singer,
          musicSrc = _state.musicSrc,
          playId = _state.playId,
          isMobile = _state.isMobile,
          playMode = _state.playMode,
          playModeTipVisible = _state.playModeTipVisible,
          playModelNameVisible = _state.playModelNameVisible,
          initAnimate = _state.initAnimate,
          loadProgress = _state.loadProgress;
      var preloadState = preload === false || preload === "none" ? {} : preload === true ? {
        preload: "auto"
      } : {
        preload: preload
      };
      var panelToggleAnimate = initAnimate ? {
        show: audioListsPanelVisible,
        hide: !audioListsPanelVisible
      } : {
        show: audioListsPanelVisible
      };
      var _playMode_ = this.PLAYMODE[playMode || defaultPlayMode];
      var currentPlayMode = _playMode_["key"];
      var currentPlayModeName = _playMode_["value"];
      var isShowMiniModeCover = showMiniModeCover ? {
        style: {
          backgroundImage: "url(".concat(cover, ")")
        }
      } : {};

      var _currentTime = (0, _utils.formatTime)(currentTime);

      var _duration = (0, _utils.formatTime)(duration);

      var progressHandler = seeked ? {
        onChange: this.onHandleProgress,
        onAfterChange: this.audioSeeked
      } : {}; //

      var ProgressBar = _react.default.createElement(_Slider.default, _extends({
        max: Math.ceil(duration),
        defaultValue: 0,
        value: currentTime
      }, progressHandler, sliderBaseOptions)); //


      var DownloadComponent = showDownload ? _react.default.createElement("span", _extends({
        className: "group audio-download"
      }, _defineProperty({}, ISMOBILE ? "onTouchStart" : "onClick", this.downloadAudio)), _react.default.createElement(_cloudDownload.default, null)) : undefined; //

      var ThemeSwitchComponent = showThemeSwitch ? _react.default.createElement("span", {
        className: "group theme-switch"
      }, _react.default.createElement(_rcSwitch.default, {
        className: "theme-switch",
        onChange: this.themeChange,
        checkedChildren: checkedText,
        unCheckedChildren: unCheckedText,
        checked: theme === this.lightThemeName
      })) : undefined; //

      var ReloadComponent = showReload ? _react.default.createElement("span", _extends({
        className: "group reload-btn"
      }, ISMOBILE ? {
        onTouchStart: this.audioReload
      } : {
        onClick: this.audioReload
      }, {
        key: "reload-btn",
        title: "reload"
      }), _react.default.createElement(_refresh.default, null)) : undefined; //

      var PlayModeComponent = showPlayMode ? _react.default.createElement("span", _extends({
        className: (0, _classnames.default)("group loop-btn")
      }, ISMOBILE ? {
        onTouchStart: this.togglePlayMode
      } : {
        onClick: this.togglePlayMode
      }, {
        key: "play-mode-btn",
        title: this.PLAYMODE[currentPlayMode]["value"]
      }), this.renderPlayModeIcon(currentPlayMode)) : undefined;

      var AudioController = _react.default.createElement("div", {
        className: (0, _classnames.default)("react-jinke-music-player"),
        key: "react-jinke-music-player",
        style: defaultPosition
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)("music-player"),
        key: "music-player"
      }, showMiniProcessBar ? _react.default.createElement(CircleProcessBar, {
        progress: currentTime / duration,
        r: isMobile ? 30 : 45
      }) : undefined, _react.default.createElement("div", _extends({
        key: "controller",
        id: this.targetId,
        className: "scale music-player-controller"
      }, isShowMiniModeCover), loading ? _react.default.createElement(Load, null) : _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", {
        className: "controller-title",
        key: "controller-title"
      }, controllerTitle), _react.default.createElement("div", {
        key: "setting",
        className: "music-player-controller-setting"
      }, toggle ? closeText : openText)))));

      return _react.default.createElement("div", {
        className: (0, _classnames.default)("react-jinke-music-player-main", {
          "light-theme": theme === this.lightThemeName,
          "dark-theme": theme === this.darkThemeName
        }, className),
        style: style
      }, toggle && isMobile ? _react.default.createElement(_PlayerMobile.default, {
        playing: playing,
        loading: loading,
        pause: pause,
        name: name,
        singer: singer,
        cover: cover,
        themeSwitch: ThemeSwitchComponent,
        duration: _duration,
        currentTime: _currentTime,
        progressBar: ProgressBar,
        onPlay: this.onPlay,
        currentPlayModeName: this.PLAYMODE[currentPlayMode]["value"],
        playMode: PlayModeComponent,
        audioNextPlay: this.audioNextPlay,
        audioPrevPlay: this.audioPrevPlay,
        playListsIcon: _react.default.createElement(_queueMusic.default, null),
        reloadIcon: ReloadComponent,
        downloadIcon: DownloadComponent,
        nextAudioIcon: _react.default.createElement(_skipNext.default, null),
        prevAudioIcon: _react.default.createElement(_skipPrevious.default, null),
        playIcon: _react.default.createElement(AnimatePlayIcon, null),
        pauseIcon: _react.default.createElement(AnimatePauseIcon, null),
        closeIcon: _react.default.createElement(_close.default, null),
        loadingIcon: _react.default.createElement(Load, null),
        playModeTipVisible: playModeTipVisible,
        openAudioListsPanel: this.openAudioListsPanel,
        onClose: this.onHidePanel,
        extendsContent: extendsContent
      }) : undefined, toggle ? undefined : drag ? _react.default.createElement(_reactDraggable.default, {
        bounds: bounds,
        position: {
          x: moveX,
          y: moveY
        },
        onDrag: this.controllerMouseMove,
        onStop: this.controllerMouseUp,
        onStart: this.controllerMouseMove
      }, AudioController) : _react.default.createElement(_react.Fragment, null, AudioController), toggle ? isMobile ? undefined : _react.default.createElement("div", {
        key: "panel",
        className: "music-player-panel translate"
      }, _react.default.createElement("section", {
        className: "panel-content",
        key: "panel-content"
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)("img-content", "img-rotate", {
          "img-rotate-pause": !playing
        }),
        style: {
          backgroundImage: "url(".concat(cover, ")")
        },
        key: "img-content"
      }), _react.default.createElement("div", {
        className: "progress-bar-content",
        key: "progress-bar-content"
      }, _react.default.createElement("span", {
        className: "audio-title"
      }, name, " ", singer ? "- ".concat(singer) : ""), _react.default.createElement("section", {
        className: "audio-main"
      }, _react.default.createElement("span", {
        key: "current-time",
        className: "current-time"
      }, loading ? "--" : _currentTime), _react.default.createElement("div", {
        className: "progress-bar",
        key: "progress-bar"
      }, showProgressLoadBar ? _react.default.createElement("div", {
        className: "progress-load-bar",
        key: "progress-load-bar",
        style: {
          width: "".concat(Math.min(loadProgress, 100), "%")
        }
      }) : undefined, ProgressBar), _react.default.createElement("span", {
        key: "duration",
        className: "duration"
      }, loading ? "--" : _duration))), _react.default.createElement("div", {
        className: "player-content",
        key: "player-content"
      }, loading ? _react.default.createElement("span", null, _react.default.createElement(Load, null)) : showPlay ? _react.default.createElement("span", {
        className: "group"
      }, _react.default.createElement("span", _extends({
        className: "group prev-audio",
        title: "previous track"
      }, ISMOBILE ? {
        onTouchStart: this.audioPrevPlay
      } : {
        onClick: this.audioPrevPlay
      }), _react.default.createElement(_skipPrevious.default, null)), _react.default.createElement("span", _extends({
        className: "group play-btn",
        key: "play-btn",
        ref: function ref(node) {
          return _this3.playBtn = node;
        }
      }, ISMOBILE ? {
        onTouchStart: this.onPlay
      } : {
        onClick: this.onPlay
      }, {
        title: "play"
      }), playing ? _react.default.createElement("span", null, _react.default.createElement(AnimatePauseIcon, null)) : _react.default.createElement("span", null, _react.default.createElement(AnimatePlayIcon, null))), _react.default.createElement("span", _extends({
        className: "group next-audio",
        title: "next track"
      }, ISMOBILE ? {
        onTouchStart: this.audioNextPlay
      } : {
        onClick: this.audioNextPlay
      }), _react.default.createElement(_skipNext.default, null))) : undefined, ReloadComponent, DownloadComponent, ThemeSwitchComponent, extendsContent && extendsContent.length >= 1 ? extendsContent.map(function (content, i) {
        return content;
      }) : undefined, _react.default.createElement("span", {
        className: "group play-sounds",
        key: "play-sound",
        title: "sounds"
      }, isMute ? _react.default.createElement("span", _extends({
        className: "sounds-icon"
      }, ISMOBILE ? {
        onTouchStart: this.onSound
      } : {
        onClick: this.onSound
      }), _react.default.createElement(_volumeMute.default, null)) : _react.default.createElement("span", _extends({
        className: "sounds-icon"
      }, ISMOBILE ? {
        onTouchStart: this.onMute
      } : {
        onClick: this.onMute
      }), _react.default.createElement(_volumeDown.default, null)), _react.default.createElement(_Slider.default, _extends({
        max: 1,
        value: soundValue,
        onChange: this.audioSoundChange,
        className: "sound-operation"
      }, sliderBaseOptions))), PlayModeComponent, _react.default.createElement("span", _extends({
        className: "group audio-lists-btn",
        key: "audio-lists-btn",
        title: "play lists"
      }, ISMOBILE ? {
        onTouchStart: this.openAudioListsPanel
      } : {
        onClick: this.openAudioListsPanel
      }), _react.default.createElement("span", {
        className: "audio-lists-icon"
      }, _react.default.createElement(_queueMusic.default, null)), _react.default.createElement("span", {
        className: "audio-lists-num"
      }, audioLists.length)), toggleMode ? _react.default.createElement("span", _extends({
        className: "group hide-panel",
        key: "hide-panel-btn"
      }, ISMOBILE ? {
        onTouchStart: this.onHidePanel
      } : {
        onClick: this.onHidePanel
      }), _react.default.createElement(_minusSquareO.default, null)) : undefined), _react.default.createElement(PlayModel, {
        visible: playModelNameVisible,
        value: currentPlayModeName
      }))) : undefined, _react.default.createElement(_AudioListsPanel.default, {
        playId: playId,
        pause: pause,
        loading: loading ? _react.default.createElement(Load, null) : undefined,
        visible: audioListsPanelVisible,
        audioLists: audioLists,
        notContentText: notContentText,
        onPlay: this.audioListsPlay,
        onCancel: this.closeAudioListsPanel,
        playIcon: _react.default.createElement(AnimatePlayIcon, null),
        pauseIcon: _react.default.createElement(AnimatePauseIcon, null),
        closeIcon: _react.default.createElement(_close.default, null),
        panelTitle: panelTitle,
        isMobile: ISMOBILE,
        panelToggleAnimate: panelToggleAnimate
      }), _react.default.createElement("audio", _extends({
        key: "audio",
        className: "music-player-audio"
      }, preloadState, {
        src: musicSrc,
        ref: function ref(node) {
          return _this3.audio = node;
        }
      })));
    } //

  }, {
    key: "getBaseAudioInfo",
    //
    value: function getBaseAudioInfo() {
      var _state2 = this.state,
          cover = _state2.cover,
          name = _state2.name,
          musicSrc = _state2.musicSrc,
          soundValue = _state2.soundValue;
      var _audio = this.audio,
          currentTime = _audio.currentTime,
          duration = _audio.duration,
          muted = _audio.muted,
          networkState = _audio.networkState,
          readyState = _audio.readyState,
          played = _audio.played,
          paused = _audio.paused,
          ended = _audio.ended,
          startDate = _audio.startDate;
      return {
        cover: cover,
        name: name,
        musicSrc: musicSrc,
        volume: soundValue,
        currentTime: currentTime,
        duration: duration,
        muted: muted,
        networkState: networkState,
        readyState: readyState,
        played: played,
        paused: paused,
        ended: ended,
        startDate: startDate
      };
    } //

  }, {
    key: "componentWillReceiveProps",
    // props  audioLists
    value: function componentWillReceiveProps(_ref12) {
      var audioLists = _ref12.audioLists;

      if (!(0, _utils.arrayEqual)(audioLists)(this.props.audioLists)) {
        this.initPlayInfo(audioLists);
        this.bindEvents(this.audio);
      }
    } //state 

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this4 = this;

      var _props2 = this.props,
          theme = _props2.theme,
          mode = _props2.mode,
          audioLists = _props2.audioLists,
          defaultPlayMode = _props2.defaultPlayMode; //'mini'  'full' 

      this.toggleMode(mode);

      if (audioLists.length >= 1) {
        //
        this.setState(function (_ref13) {
          var playId = _ref13.playId;
          var _playId = playId;
          return _objectSpread({}, _this4.getPlayInfo(audioLists), {
            playId: ++_playId,
            theme: theme,
            playMode: defaultPlayMode
          });
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
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unBindEvents(this.audio, undefined, false);
      this.media.removeListener(this.listenerIsMobile);
      this.media = undefined;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var audioLists = this.props.audioLists;
      this.media = window.matchMedia("(max-width: 768px) and (orientation : portrait)");
      this.media.addListener(this.listenerIsMobile); // [0-100]

      this.defaultVolume = Math.max(0, Math.min(this.props.defaultVolume, 100)) / 100;
      this.setAudioVolume(this.defaultVolume);

      if (audioLists.length >= 1) {
        this.bindEvents(this.audio);
      }
    }
  }]);

  return ReactJkMusicPlayer;
}(_react.PureComponent);

exports.default = ReactJkMusicPlayer;
Object.defineProperty(ReactJkMusicPlayer, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
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
    controllerTitle: _react.default.createElement(_headphones.default, null),
    panelTitle: "PlayList",
    closeText: "close",
    openText: "open",
    notContentText: "no music",
    checkedText: "",
    unCheckedText: "",
    once: false,
    //audioPlay 
    drag: true,
    toggleMode: true,
    //
    showMiniModeCover: true,
    //
    showDownload: true,
    showPlay: true,
    showReload: true,
    showPlayMode: true,
    showThemeSwitch: true,
    playModeTipVisible: false,
    //
    autoPlay: true,
    defaultVolume: 100,
    showProgressLoadBar: true,
    //
    seeked: true,
    playModeShowTime: 600,
    //
    bounds: "body",
    //
    showMiniProcessBar: false,
    //
    loadAudioErrorPlayNext: true,
    // 
    preload: false //

  }
});
Object.defineProperty(ReactJkMusicPlayer, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    audioLists: _propTypes.default.array.isRequired,
    theme: _propTypes.default.oneOf(["dark", "light"]),
    mode: _propTypes.default.oneOf(["mini", "full"]),
    defaultPlayMode: _propTypes.default.oneOf(["order", "orderLoop", "singleLoop", "shufflePlay"]),
    drag: _propTypes.default.bool,
    seeked: _propTypes.default.bool,
    autoPlay: _propTypes.default.bool,
    playModeText: _propTypes.default.object,
    panelTitle: _propTypes.default.string,
    closeText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    openText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    notContentText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    controllerTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    defaultPosition: _propTypes.default.shape({
      top: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
      left: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
    }),
    audioPlay: _propTypes.default.func,
    audioPause: _propTypes.default.func,
    audioEnded: _propTypes.default.func,
    audioAbort: _propTypes.default.func,
    audioVolumeChange: _propTypes.default.func,
    loadAudioError: _propTypes.default.func,
    audioProgress: _propTypes.default.func,
    audioSeeked: _propTypes.default.func,
    audioDownload: _propTypes.default.func,
    showDownload: _propTypes.default.bool,
    showPlay: _propTypes.default.bool,
    showReload: _propTypes.default.bool,
    showPlayMode: _propTypes.default.bool,
    showThemeSwitch: _propTypes.default.bool,
    showMiniModeCover: _propTypes.default.bool,
    toggleMode: _propTypes.default.bool,
    once: _propTypes.default.bool,
    extendsContent: _propTypes.default.array,
    checkedText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    unCheckedText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    defaultVolume: _propTypes.default.number,
    playModeShowTime: _propTypes.default.number,
    bounds: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    showMiniProcessBar: _propTypes.default.bool,
    loadAudioErrorPlayNext: _propTypes.default.bool,
    preload: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(["auto", "metadata", "none"])])
  }
});