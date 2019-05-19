import React from 'react';
import ServiceItem from './ServiceItem.jsx';

const PriorityBoardingService = () => (
    <ServiceItem
        icon="male"
        header="Priority bordig service"
        description="Priority boarding - be among the first getting to board!"
        price={ {
            amount: '25.00',
            currency: 'EUR',
        } }
    />
);

export default PriorityBoardingService;
