/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { Search as BaseSearch, Flag, Icon } from 'semantic-ui-react';
import { toLower } from 'lodash';

type AirportOptionProps = {
    label: string,
    value: string,
    cityCode: string,
    countryCode: string,
    iata: string,
    name: string,
    shift: boolean,
};

type AirportProps = {
    loading: boolean,
    results: Array<AirportOptionProps>,
    text: string,
    placeholder: string,
    onSearchChange: Function,
    onResultSelect: Function,
    onSwap: Function,
    onBlur: Function,
};

const ShiftIcon = styled(Icon)`
    margin-left: 1em !important;
`;

const Search = styled(BaseSearch)`
    input {
        height: 56px !important;
        border-radius: 4px !important;
    }
`;

const SwapIcon = styled.div`
    cursor: pointer;
    position: absolute;
    z-index: 20;
    right: 14px;
    top: 18px;
    width: 18px;
    height: 18px;

    &:hover {
        &:before {
            transform: translateX(-2px);
        }
        &:after {
            transform: translateX(2px);
        }
    }

    &:before {
        bottom: 0;
        left: 0;
        color: #2185D0;
        font-family: Icons;
        content: "\uF177";
        display: block;
        position: absolute;
        transition: transform .2s ease-in-out,-o-transform .2s ease-in-out;
    }

    &:after {
        color: #2185D0;
        font-family: Icons;
        content: "\uF178";
        display: block;
        position: absolute;
        transition: transform .2s ease-in-out,-o-transform .2s ease-in-out;
        top: 8px;
        left: 2px;
    }
`;

const IataCode = styled.div`
    display: block;
    position: absolute;
    top: 0;
    right: 0px;
    font-size: 0.8em;
    line-height: 18px;
    color: #999;
`;

const AirportOptionContent = styled.div`
    position: relative;
    padding-right: 30px;
`;

const AirportOption = ({
    label,
    shift,
    countryCode,
    cityCode,
    iata,
}: AirportOptionProps) => (
    <AirportOptionContent>
        {shift
            ? <ShiftIcon name="chevron right" />
            : <Flag name={toLower(countryCode)} />}
        {label}
        <IataCode>{iata || cityCode}</IataCode>
    </AirportOptionContent>
);

const Airport = ({
    loading,
    text,
    placeholder,
    results,
    onSearchChange,
    onResultSelect,
    onSwap,
    onBlur,
}: AirportProps) => (
    <Search
        loading={loading}
        value={text}
        placeholder={placeholder}
        icon={loading || !onSwap ? <Icon /> : <SwapIcon onClick={onSwap} />}
        results={results}
        resultRenderer={AirportOption}
        onSearchChange={onSearchChange}
        onResultSelect={onResultSelect}
        onBlur={onBlur}
        selectFirstResult
    />
);

export default Airport;
