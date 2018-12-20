'use strict'

import { isArray } from 'util';

const md5 = require('md5');

const signer = (imageURL, secureURLToken, imgixDomains = [])  => {
    const urlObj = new URL(imageURL);
    let signedImageURL = '';

    if(!Array.isArray(imgixDomains)) {
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

export default signer;