"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _libraryMusic = _interopRequireDefault(require("react-icons/lib/md/library-music"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AudioListsPanel = function AudioListsPanel(_ref) {
  var audioLists = _ref.audioLists,
      visible = _ref.visible,
      notContentText = _ref.notContentText,
      onCancel = _ref.onCancel,
      onPlay = _ref.onPlay,
      pause = _ref.pause,
      playId = _ref.playId,
      loading = _ref.loading,
      playIcon = _ref.playIcon,
      pauseIcon = _ref.pauseIcon,
      closeIcon = _ref.closeIcon,
      isMobile = _ref.isMobile,
      panelTitle = _ref.panelTitle,
      panelToggleAnimate = _ref.panelToggleAnimate;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("audio-lists-panel", panelToggleAnimate),
    key: "audio-list-panel"
  }, _react.default.createElement("div", {
    className: "audio-lists-panel-header"
  }, _react.default.createElement("h2", {
    className: "title"
  }, _react.default.createElement("span", {
    key: "panel-title"
  }, panelTitle, " / "), _react.default.createElement("span", {
    className: "num",
    key: "num"
  }, audioLists.length), _react.default.createElement("span", _extends({
    key: "close-btn",
    className: "close-btn"
  }, _defineProperty({}, isMobile ? "onTouchStart" : "onClick", onCancel)), closeIcon))), _react.default.createElement("div", {
    className: (0, _classnames.default)("audio-lists-panel-content", {
      "no-content": audioLists.length < 1
    }),
    key: "audio-lists-panel-content"
  }, audioLists.length >= 1 ? _react.default.createElement("ul", null, audioLists.map(function (audio, i) {
    var name = audio.name,
        singer = audio.singer;
    return _react.default.createElement("li", _extends({
      key: i,
      title: pause ? "Click to play" : playId === i ? "Click to pause" : "Click to play",
      className: (0, _classnames.default)("audio-item", {
        playing: playId === i
      }, {
        pause: pause
      })
    }, _defineProperty({}, isMobile ? "onTouchStart" : "onClick", function () {
      return onPlay(i);
    })), _react.default.createElement("span", {
      className: "group player-status",
      key: "player-status"
    }, _react.default.createElement("span", {
      className: "player-icons",
      key: "player-icons-".concat(i)
    }, playId === i && loading ? loading : playId === i ? pause ? playIcon : pauseIcon : undefined)), _react.default.createElement("span", {
      className: "group player-name",
      key: "player-name"
    }, name), _react.default.createElement("span", {
      className: "group player-time",
      key: "player-time"
    }, singer));
  })) : _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", null, _react.default.createElement(_libraryMusic.default, null)), _react.default.createElement("span", {
    className: "no-data",
    key: "no-data"
  }, notContentText))));
};

var _default = AudioListsPanel;
exports.default = _default;