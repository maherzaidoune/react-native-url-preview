import React from "react";
import LinkPreview from "link-preview-js";
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
    LinkPreview.getPreview(text)
      .then(({ title, description, images, favicons }) => {
        this.setState({
          isUri: true,
          linkTitle: title || undefined,
          linkDesc: description || undefined,
          linkImg:
            images && images.length > 0
              ? images.find(element => element.endsWith(/.(jpeg|png|jpg)/))
              : undefined,
          linkFavicon:
            favicons && favicons.length > 0
              ? favicons[favicons.length - 1]
              : undefined
        });
      })
      .catch(error => {
        this.setState({ isUri: false });
        console.log("LinkPreview error : ", error);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== null) {
      this.getPreview(nextProps.text);
    } else {
      this.setState({ isUri: false });
    }
  }

  _onLinkPressed = () => {
    Linking.openURL(this.props.text.match(REGEX)[0]);
  };

  renderImage = (imageLink, faviconLink, imageStyle, faviconStyle) => {
    return imageLink ? (
      <Image
        style={imageStyle}
        source={{ uri: imageLink }}
        resizeMode={"contain"}
      />
    ) : faviconLink ? (
      <Image
        style={faviconStyle}
        source={{ uri: faviconLink }}
        resizeMode={"contain"}
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
    text,
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
    descriptionNumberOfLines
  ) => {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, containerStyle]}
        activeOpacity={0.9}
        onPress={() => this._onLinkPressed()}
      >
        {this.renderImage(imageLink, faviconLink, imageStyle, faviconStyle)}
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
      descriptionNumberOfLines
    } = this.props;
    return this.state.isUri
      ? this.renderLinkPreview(
          text,
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
          descriptionNumberOfLines
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
  descriptionNumberOfLines: Platform.isPad ? 4 : 3
};

RNUrlPreview.propTypes = {
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
