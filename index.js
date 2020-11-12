import React, { useState, useEffect } from 'react';
import { getLinkPreview } from 'link-preview-js';
import PropTypes from 'prop-types';
import { Image, Linking, Platform, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

const REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;

export const RNUrlPreview = props => {
  const [isUri, setIsUri] = useState(false)
  const [linkTitle, setLinkTitle] = useState(undefined)
  const [linkImg, setLinkImg] = useState(undefined)
  const [linkDesc, setLinkDesc] = useState(undefined)
  const [linkFavicon, setLinkFavicon] = useState(undefined)

  getPreview = text => {
    const { onError, onLoad } = props;
    getLinkPreview(text)
      .then(data => {
        onLoad(data);

        setIsUri(true);
        setLinkTitle(data.title);
        setLinkDesc(data.description);

        const linkImage = data.images && data.images.length > 0
          ? data.images.find(function (element) {
            return element.includes('.png') || element.includes('.jpg') || element.includes('.jpeg');
          })
          : undefined;
        setLinkImg(linkImage);

        const linkFavicon = data.favicons && data.favicons.length > 0 ? data.favicons[data.favicons.length - 1] : undefined;
        setLinkFavicon(linkFavicon);

      })
      .catch(error => {
        onError(error);
        setIsUri(false);
      });
  };
  useEffect(() => {
    if (props.text) {
      getPreview(props.text);
    } else if (props.text == null) {
      setIsUri(false);
    }
  }, [props.text]);


  _onLinkPressed = () => {
    Linking.openURL(props.text.match(REGEX)[0]);
  };

  renderImage = (imageLink, faviconLink, imageStyle, faviconStyle, imageProps) => {
    return imageLink ? (
      <Image style={imageStyle} source={{ uri: imageLink }} {...imageProps} />
    ) : faviconLink ? (
      <Image style={faviconStyle} source={{ uri: faviconLink }} {...imageProps} />
    ) : null;
  };
  renderText = (showTitle, showDescription, title, description, textContainerStyle, titleStyle, descriptionStyle, titleNumberOfLines, descriptionNumberOfLines) => {
    return (
      <View style={textContainerStyle}>
        {showTitle && (
          <Text numberOfLines={titleNumberOfLines} style={titleStyle}>
            {title}
          </Text>
        )}
        {showDescription && (
          <Text numberOfLines={descriptionNumberOfLines} style={descriptionStyle}>
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
    showDescription,
    title,
    description,
    textContainerStyle,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines,
    imageProps,
  ) => {
    return (
      <TouchableOpacity style={[styles.containerStyle, containerStyle]} activeOpacity={0.9} onPress={() => _onLinkPressed()}>
        {renderImage(imageLink, faviconLink, imageStyle, faviconStyle, imageProps)}
        {renderText(showTitle, showDescription, title, description, textContainerStyle, titleStyle, descriptionStyle, titleNumberOfLines, descriptionNumberOfLines)}
      </TouchableOpacity>
    );
  };

  const {
    text,
    containerStyle,
    imageStyle,
    faviconStyle,
    textContainerStyle,
    title,
    description,
    titleStyle,
    titleNumberOfLines,
    descriptionStyle,
    descriptionNumberOfLines,
    imageProps,
  } = props;

  return isUri
    ? renderLinkPreview(
      containerStyle,
      linkImg,
      linkFavicon,
      imageStyle,
      faviconStyle,
      title,
      description,
      linkTitle,
      linkDesc,
      textContainerStyle,
      titleStyle,
      descriptionStyle,
      titleNumberOfLines,
      descriptionNumberOfLines,
      imageProps,
    )
    : null;
}


const styles = {
  containerStyle: {
    flexDirection: 'row',
  },
};

RNUrlPreview.defaultProps = {
  onLoad: () => { },
  onError: () => { },
  text: null,
  containerStyle: {
    backgroundColor: 'rgba(239, 239, 244,0.62)',
    alignItems: 'center',
  },
  imageStyle: {
    width: Platform.isPad ? 160 : 110,
    height: Platform.isPad ? 160 : 110,
    paddingRight: 10,
    paddingLeft: 10,
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: true,
  description: true,
  titleStyle: {
    fontSize: 17,
    color: '#000',
    marginRight: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica',
  },
  titleNumberOfLines: 2,
  descriptionStyle: {
    fontSize: 14,
    color: '#81848A',
    marginRight: 10,
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica',
  },
  descriptionNumberOfLines: Platform.isPad ? 4 : 3,
  imageProps: { resizeMode: 'contain' },
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
  description: PropTypes.bool,
  titleStyle: Text.propTypes.style,
  titleNumberOfLines: Text.propTypes.numberOfLines,
  descriptionStyle: Text.propTypes.style,
  descriptionNumberOfLines: Text.propTypes.numberOfLines,
};
