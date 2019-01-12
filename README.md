
# react-native-react-native-url-preview 🐜

## Getting started 🐜

`$ npm install react-native-url-preview --save`

## Usage 🐜
```javascript
import RNUrlPreview from 'react-native-url-preview';

<RNUrlPreview text={"https://github.com/maherzaidoune"}/>
```

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



