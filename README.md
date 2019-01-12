
# react-native-react-native-url-preview 🐜

[![NPM](https://nodei.co/npm/react-native-url-preview.png)](https://www.npmjs.com/package/react-native-url-preview)

## Getting started 🐜

`$ npm install react-native-url-preview --save`

## Usage 🐜
```javascript
import RNUrlPreview from 'react-native-url-preview';

<RNUrlPreview text={"https://www.youtube.com/watch?v=Kmiw4FYTg2U"}/>
```

## Examples🐜

Please refer to the [react-native-url-preview example](https://github.com/maherzaidoune/RNUrlPreviewExample) provided to see how `react-native-url-preview` can be used .

## Demo🐜

![](https://github.com/maherzaidoune/RNUrlPreviewExample/blob/master/rnUrlPreviewer.gif)

## Customization 🐜

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| text | YES | Null | `string` | The text that is parsed and where the URL is retrieved |
| title | NO | True | `Boolean` | determine whether the URL title is displyed or not |
| titleStyle | NO | defaultStyle | `style` | self explanatory i believe |
| containerStyle | NO | defaultStyle | `style` | you can pass a custom container style |
| imageStyle | NO | defaultStyle | `style` | you can pass a custom image style |
| faviconStyle | NO | defaultStyle | `style` | you can pass a custom favicon style |
| textContainerStyle | NO | defaultStyle | `style` | you can pass a custom style for the text container |
| descriptionStyle | NO | defaultStyle | `style` | self explanatory i believe |
| titleNumberOfLines | NO | 2 | `number` | self explanatory i believe |
| descriptionNumberOfLines | NO | Ipad?4:3 | `number` | self explanatory i believe |

## Credits 🐜

- Thanks to [marouan frih](https://github.com/Madm0x) for the REGEX
- extract information from a URL with [react-native-link-preview](https://www.npmjs.com/package/react-native-link-preview)
