'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const md5 = require('md5'); // const sanitize = (path) => {
//     path = path.replace(/^\//, '');
//     path = encodeURI(path);
//     return '/' + path;
// };


const signer = (imageURL, secureURLToken, imgixDomains = []) => {
  let signedImageURL = '';
  let urlObj;

  try {
    urlObj = new URL(imageURL);
  } catch (err) {
    console.error(`Error: ${imageURL} doesn't seem to be an URL. Skipping.`);
    return imageURL;
  }

  if (!Array.isArray(imgixDomains)) {
    imgixDomains = [imgixDomains];
  }

  if (imgixDomains.length > 0 && !imgixDomains.includes(urlObj.hostname)) {
    signedImageURL = imageURL;
  } else {
    const signatureBase = secureURLToken + urlObj.pathname + urlObj.search;
    const signature = md5(signatureBase);

    if (urlObj.search.length > 0) {
      signedImageURL = `${imageURL}&s=${signature}`;
    } else {
      signedImageURL = `${imageURL}?s=${signature}`;
    }
  }

  return signedImageURL;
};

var _default = signer;
exports.default = _default;