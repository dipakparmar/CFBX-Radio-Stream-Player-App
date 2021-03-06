"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PlayModeTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = "react-jinke-music-player-mobile";

var PlayModeTip = function PlayModeTip(_ref) {
  var visible = _ref.visible,
      title = _ref.title,
      text = _ref.text;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefix, "-play-model-tip"), {
      show: visible
    })
  }, _react.default.createElement("span", {
    className: "title"
  }, title), _react.default.createElement("span", {
    className: "text"
  }, text));
};

exports.PlayModeTip = PlayModeTip;

var PlayerMobile = function PlayerMobile(_ref2) {
  var name = _ref2.name,
      cover = _ref2.cover,
      singer = _ref2.singer,
      playing = _ref2.playing,
      duration = _ref2.duration,
      currentTime = _ref2.currentTime,
      loading = _ref2.loading,
      loadingIcon = _ref2.loadingIcon,
      themeSwitch = _ref2.themeSwitch,
      progressBar = _ref2.progressBar,
      progressChange = _ref2.progressChange,
      openAudioListsPanel = _ref2.openAudioListsPanel,
      progressAfterChange = _ref2.progressAfterChange,
      audioPrevPlay = _ref2.audioPrevPlay,
      audioNextPlay = _ref2.audioNextPlay,
      prevAudioIcon = _ref2.prevAudioIcon,
      nextAudioIcon = _ref2.nextAudioIcon,
      playIcon = _ref2.playIcon,
      pauseIcon = _ref2.pauseIcon,
      playMode = _ref2.playMode,
      downloadIcon = _ref2.downloadIcon,
      reloadIcon = _ref2.reloadIcon,
      playListsIcon = _ref2.playListsIcon,
      closeIcon = _ref2.closeIcon,
      onClose = _ref2.onClose,
      pause = _ref2.pause,
      playModeTipVisible = _ref2.playModeTipVisible,
      currentPlayModeName = _ref2.currentPlayModeName,
      extendsContent = _ref2.extendsContent,
      onPlay = _ref2.onPlay;
  return _react.default.createElement("div", {
    className: prefix
  }, _react.default.createElement(PlayModeTip, {
    visible: playModeTipVisible,
    title: playMode,
    text: currentPlayModeName
  }), _react.default.createElement("div", {
    className: "".concat(prefix, "-header group")
  }, _react.default.createElement("div", {
    className: "left item"
  }), _react.default.createElement("div", {
    className: "title",
    key: "audio-title"
  }, name), _react.default.createElement("div", {
    className: "right item",
    onTouchStart: onClose
  }, closeIcon)), _react.default.createElement("div", {
    className: "".concat(prefix, "-singer text-center group")
  }, _react.default.createElement("span", {
    className: "name",
    key: "singer-name"
  }, singer)), _react.default.createElement("div", {
    className: "".concat(prefix, "-switch text-center group")
  }, themeSwitch), _react.default.createElement("div", {
    className: "".concat(prefix, "-cover text-center")
  }, _react.default.createElement("img", {
    src: cover,
    alt: "cover",
    key: "cover",
    className: (0, _classnames.default)("cover", {
      "img-rotate-pause": pause || !cover
    })
  })), _react.default.createElement("div", {
    className: "".concat(prefix, "-progress group")
  }, _react.default.createElement("span", {
    key: "current-time",
    className: "current-time"
  }, loading ? "--" : currentTime), progressBar, _react.default.createElement("span", {
    key: "duration",
    className: "duration text-right"
  }, loading ? "--" : duration)), _react.default.createElement("div", {
    className: "".concat(prefix, "-toggle text-center group")
  }, loading ? loadingIcon : [_react.default.createElement("span", {
    className: "group prev-audio",
    title: "previous track",
    key: "prev-audio",
    onTouchStart: audioPrevPlay
  }, prevAudioIcon), _react.default.createElement("span", {
    className: "group play-btn",
    title: "play",
    key: "play-btn",
    onTouchStart: onPlay
  }, playing ? pauseIcon : playIcon), _react.default.createElement("span", {
    className: "group next-audio",
    title: "next track",
    key: "next-audio",
    onTouchStart: audioNextPlay
  }, nextAudioIcon)]), _react.default.createElement("div", {
    className: "".concat(prefix, "-operation group")
  }, _react.default.createElement("ul", {
    className: "items"
  }, _react.default.createElement("li", {
    className: "item",
    key: "item-player-mode"
  }, playMode), _react.default.createElement("li", {
    className: "item",
    key: "item-download-icon"
  }, downloadIcon), _react.default.createElement("li", {
    className: "item",
    key: "item-reload-icon"
  }, reloadIcon), extendsContent && extendsContent.length >= 1 ? extendsContent.map(function (content, i) {
    return _react.default.createElement("li", {
      className: "item",
      key: i
    }, content);
  }) : undefined, _react.default.createElement("li", {
    className: "item",
    key: "play-lists-icon",
    onTouchStart: openAudioListsPanel
  }, playListsIcon))));
};

var _default = PlayerMobile;
exports.default = _default;