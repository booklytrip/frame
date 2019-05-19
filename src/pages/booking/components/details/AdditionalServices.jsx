import React from 'react';

import {
    PriorityBoardingService,
    TravelInsuranceService,
} from './services';

const AdditionalServices = () => (
    <div>
        <PriorityBoardingService />
        <TravelInsuranceService />
    </div>
);

export default AdditionalServices;
