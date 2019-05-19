/**
 * @flow
 */

import crypto from 'crypto-js';
import { trimStart, trimEnd, indexOf } from 'lodash';

type HorizontalAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "bottom" | "middle";
type Crop = {
    left: number,
    right: number,
    top: number,
    bottom: number,
};

type Settings = {
    securityKey: string,
    serverUrl: string,
    rootUrl: string,
    imagePath: string,
    width: number,
    height: number,
    smart: boolean,
    fitInFlag: boolean,
    withFlipHorizontally: boolean,
    withFlipVertically: boolean,
    halignValue: HorizontalAlign,
    valignValue: VerticalAlign,
    cropValues: Crop,
    meta: boolean,
    filtersCalls: Array<string>,
};

const initialSettings = {
    securityKey: undefined,
    serverUrl: undefined,
    rootUrl: undefined,
    imagePath: '',
    width: 0,
    height: 0,
    smart: false,
    fitInFlag: false,
    withFlipHorizontally: false,
    withFlipVertically: false,
    halignValue: undefined,
    valignValue: undefined,
    cropValues: undefined,
    meta: false,
    filtersCalls: [],
};

function thumbor(originalSettings?:Settings) {
    const settings = Object.assign({}, initialSettings, originalSettings);

    return {
        setServerUrl(serverUrl:string) {
            return thumbor({
                ...settings,
                serverUrl,
            });
        },

        setRootUrl(rootUrl:string) {
            return thumbor({
                ...settings,
                rootUrl: trimEnd(rootUrl, '/'),
            });
        },

        /**
         * Set path of image
         *
         * @param {String} imagePath [description]
         */
        setImagePath(imagePath:string) {
            return thumbor({
                ...settings,
                imagePath: trimStart(imagePath, '/'),
            });
        },

        /**
         * Converts operation array to string
         *
         * @return {String}
         */
        getOperationPath() {
            const parts = this.urlParts();

            if (parts.length === 0) {
                return '';
            }

            return parts.join('/');
        },

        /**
         * Build operation array
         *
         * @TODO Should be refactored so that strings are generated in the
         * commands as opposed to in 1 massive function
         *
         * @return {Array}
         */
        urlParts() {
            if (!settings.imagePath) {
                throw new Error('The image url can\'t be undefined or empty.');
            }

            const parts = [];

            if (settings.meta) {
                parts.push('meta');
            }

            if (settings.cropValues) {
                parts.push(`
                    ${settings.cropValues.left}x${settings.cropValues.top}
                    :
                    ${settings.cropValues.right}x${settings.cropValues.bottom}
                `);
            }

            if (settings.fitInFlag) {
                parts.push('fit-in');
            }

            if (
                settings.width ||
                settings.height ||
                settings.withFlipHorizontally ||
                settings.withFlipVertically
            ) {
                let sizeString = '';

                if (settings.withFlipHorizontally) {
                    sizeString += '-';
                }
                sizeString += settings.width;

                sizeString += 'x';

                if (settings.withFlipVertically) {
                    sizeString += '-';
                }
                sizeString += settings.height;

                parts.push(sizeString);
            }

            if (settings.halignValue) {
                parts.push(settings.halignValue);
            }

            if (settings.valignValue) {
                parts.push(settings.valignValue);
            }

            if (settings.smart) {
                parts.push('smart');
            }

            if (settings.filtersCalls.length) {
                parts.push(`filters:${settings.filtersCalls.join(':')}`);
            }

            return parts;
        },

        /*
         * Resize the image to the specified dimensions. Overrides any previous call
         * to `fitIn` or `resize`.
         *
         * Use a value of 0 for proportional resizing. E.g. for a 640 x 480 image,
         * `.resize(320, 0)` yields a 320 x 240 thumbnail.
         *
         * Use a value of 'orig' to use an original image dimension. E.g. for a 640
         * x 480 image, `.resize(320, 'orig')` yields a 320 x 480 thumbnail.
         *
         * @param  {Number} width
         * @param  {Number} height
         */
        resize(width:number, height:number) {
            return thumbor({
                ...settings,
                width,
                height,
            });
        },

        /**
         * Use smart cropping
         *
         * Thumbor uses some very advanced techniques for obtaining important points of
         * the image (referred to as Focal Points in the rest of this documentation).
         */
        smartCrop(smart:boolean) {
            return thumbor({
                ...settings,
                smart,
            });
        },

        /**
         * Resize the image to fit in a box of the specified dimensions. Overrides
         * any previous call to `fitIn` or `resize`.
         *
         * @param {Number} width
         * @param {Number} height
         */
        fitIn(width:number, height:number) {
            return thumbor({
                ...settings,
                width,
                height,
                fitInFlag: true,
            });
        },

        /**
         * Flip ima ge horizontally
         */
        flipHorizontally() {
            return thumbor({
                ...settings,
                withFlipHorizontally: true,
            });
        },

        /**
         * Flip image vertically
         */
        flipVertically() {
            return thumbor({
                ...settings,
                withFlipVertically: true,
            });
        },

        /**
         * Specify horizontal alignment used if width is altered due to cropping
         *
         * @param {String} halignValue - Can have a value: 'left', 'center', 'right'
         */
        halign(halignValue:HorizontalAlign) {
            if (indexOf(['left', 'right', 'center'], halignValue) === -1) {
                throw new Error('Horizontal align must be left, right or center.');
            }

            return thumbor({
                ...settings,
                halignValue,
            });
        },

        /**
         * Specify vertical alignment used if height is altered due to cropping
         *
         * @param {String} valignValue - Can have a value: 'top', 'middle', 'bottom'
         */
        valign(valignValue:VerticalAlign) {
            if (indexOf(['top', 'bottom', 'middle'], valignValue) === -1) {
                throw new Error('Vertical align must be top, bottom or middle.');
            }

            return thumbor({
                ...settings,
                valignValue,
            });
        },

        /**
         * Specify that JSON metadata should be returned instead of the thumbnailed
         * image.
         *
         * @param {Boolean} meta
         */
        metaDataOnly(meta:boolean) {
            return thumbor({
                ...settings,
                meta,
            });
        },

        /**
         * Append a filter, e.g. quality(80)
         *
         * @param {String} filterCall
         */
        filter(filterCall:string) {
            return thumbor({
                ...settings,
                filtersCalls: [
                    ...(settings.filtersCalls || []),
                    filterCall,
                ],
            });
        },

        /**
         * Manually specify crop window
         *
         * @param {Integer} left
         * @param {Integer} top
         * @param {Integer} right
         * @param {Integer} bottom
         */
        crop(left:number, top:number, right:number, bottom:number) {
            if (left > 0 && top > 0 && right > 0 && bottom > 0) {
                return thumbor({
                    ...settings,
                    cropValues: {
                        left,
                        top,
                        right,
                        bottom,
                    },
                });
            }

            return thumbor(settings);
        },

        /**
         * Combine image url and operations with secure and unsecure (unsafe) paths
         * @return {String}
         */
        buildUrl() {
            const operation = this.getOperationPath();

            let urlParts = [];
            if (settings.securityKey) {
                let key = crypto.HmacSHA1(
                    operation + settings.imagePath,
                    settings.securityKey
                );
                key = crypto.enc.Base64.stringify(key);
                key = key.replace(/\+/g, '-').replace(/\//g, '_');

                urlParts = [
                    settings.serverUrl,
                    key,
                    operation,
                    settings.rootUrl,
                    settings.imagePath,
                ];
            } else {
                urlParts = [
                    settings.serverUrl,
                    'unsafe',
                    operation,
                    settings.rootUrl,
                    settings.imagePath,
                ];
            }

            return urlParts.filter(i => i !== undefined).join('/');
        },
    };
}

export default thumbor;
