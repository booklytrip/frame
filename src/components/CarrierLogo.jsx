/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import thumbor from '../lib/thumbor';

import { Image } from 'semantic-ui-react';

import config from '../config';

import type { Carrier } from '../types';

const LogoImage = styled(Image)`
    display: inline-block !important;
    height: 44px !important;
    width: 44px !important;
`;

const buildUrl = (path: string) =>
    thumbor()
        .setServerUrl(config.thumborServer)
        .setRootUrl(config.staticUrl)
        .fitIn(44, 44)
        .filter('fill(white)')
        .setImagePath(path)
        .buildUrl();

type CarrierLogoProps = {
    className?: string,
    carrier: Carrier,
    style?: Object,
};

const CarrierLogo = ({ className, carrier, style }: CarrierLogoProps) => (
    <LogoImage
        className={className}
        style={style}
        src={buildUrl(`/images/carriers/${carrier.code}.png`)}
        alt={carrier.name}
    />
);

export default CarrierLogo;
