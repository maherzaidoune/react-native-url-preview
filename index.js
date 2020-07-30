import React from "react";
import {getLinkPreview} from "link-preview-js";
import PropTypes from "prop-types";
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";

const REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;

export default class RNUrlPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined
    };
    this.getPreview(props.text);
  }

  getPreview = text => {
    const { onError, onLoad } = this.props;
    getLinkPreview(text)
      .then(data => {
        onLoad(data);
        this.setState({
          isUri: true,
          linkTitle: data.title ? data.title : undefined,
          linkDesc: data.description ? data.description : undefined,
          linkImg:
            data.images && data.images.length > 0
              ? data.images.find(function(element) {
                  return (
                    element.includes(".png") ||
                    element.includes(".jpg") ||
                    element.includes(".jpeg")
                  );
                })
              : undefined,
          linkFavicon:
            data.favicons && data.favicons.length > 0
              ? data.favicons[data.favicons.length - 1]
              : undefined
        });
      })
      .catch(error => {
        onError(error);
        this.setState({ isUri: false });
      });
  };

  componentDidUpdate(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.getPreview(nextProps.text);
    } else if (nextProps.text == null) {
      this.setState({ isUri: false });
    }
  }

  _onLinkPressed = () => {
    Linking.openURL(this.props.text.match(REGEX)[0]);
  };

  renderImage = (
    imageLink,
    faviconLink,
    imageStyle,
    faviconStyle,
    imageProps
  ) => {
    return imageLink ? (
      <Image style={imageStyle} source={{ uri: imageLink }} {...imageProps} />
    ) : faviconLink ? (
      <Image
        style={faviconStyle}
        source={{ uri: faviconLink }}
        {...imageProps}
      />
    ) : null;
  };
  renderText = (
    showTitle,
    title,
    description,
    textContainerStyle,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines
  ) => {
    return (
      <View style={textContainerStyle}>
        {showTitle && (
          <Text numberOfLines={titleNumberOfLines} style={titleStyle}>
            {title}
          </Text>
        )}
        {description && (
          <Text
            numberOfLines={descriptionNumberOfLines}
            style={descriptionStyle}
          >
            {description}
          </Text>
        )}
      </View>
    );
  };
  renderLinkPreview = (
    containerStyle,
    imageLink,
    faviconLink,
    imageStyle,
    faviconStyle,
    showTitle,
    title,
    description,
    textContainerStyle,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines,
    imageProps
  ) => {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, containerStyle]}
        activeOpacity={0.9}
        onPress={() => this._onLinkPressed()}
      >
        {this.renderImage(
          imageLink,
          faviconLink,
          imageStyle,
          faviconStyle,
          imageProps
        )}
        {this.renderText(
          showTitle,
          title,
          description,
          textContainerStyle,
          titleStyle,
          descriptionStyle,
          titleNumberOfLines,
          descriptionNumberOfLines
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {
      text,
      containerStyle,
      imageStyle,
      faviconStyle,
      textContainerStyle,
      title,
      titleStyle,
      titleNumberOfLines,
      descriptionStyle,
      descriptionNumberOfLines,
      imageProps
    } = this.props;
    return this.state.isUri
      ? this.renderLinkPreview(
          containerStyle,
          this.state.linkImg,
          this.state.linkFavicon,
          imageStyle,
          faviconStyle,
          title,
          this.state.linkTitle,
          this.state.linkDesc,
          textContainerStyle,
          titleStyle,
          descriptionStyle,
          titleNumberOfLines,
          descriptionNumberOfLines,
          imageProps
        )
      : null;
  }
}

const styles = {
  containerStyle: {
    flexDirection: "row"
  }
};

RNUrlPreview.defaultProps = {
  onLoad: () => {},
  onError: () => {},
  text: null,
  containerStyle: {
    backgroundColor: "rgba(239, 239, 244,0.62)",
    alignItems: "center"
  },
  imageStyle: {
    width: Platform.isPad ? 160 : 110,
    height: Platform.isPad ? 160 : 110,
    paddingRight: 10,
    paddingLeft: 10
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10
  },
  textContainerStyle: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10
  },
  title: true,
  titleStyle: {
    fontSize: 17,
    color: "#000",
    marginRight: 10,
    marginBottom: 5,
    alignSelf: "flex-start",
    fontFamily: "Helvetica"
  },
  titleNumberOfLines: 2,
  descriptionStyle: {
    fontSize: 14,
    color: "#81848A",
    marginRight: 10,
    alignSelf: "flex-start",
    fontFamily: "Helvetica"
  },
  descriptionNumberOfLines: Platform.isPad ? 4 : 3,
  imageProps: { resizeMode: "contain" }
};

RNUrlPreview.propTypes = {
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  text: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  imageStyle: ViewPropTypes.style,
  faviconStyle: ViewPropTypes.style,
  textContainerStyle: ViewPropTypes.style,
  title: PropTypes.bool,
  titleStyle: Text.propTypes.style,
  titleNumberOfLines: Text.propTypes.numberOfLines,
  descriptionStyle: Text.propTypes.style,
  descriptionNumberOfLines: Text.propTypes.numberOfLines
};
