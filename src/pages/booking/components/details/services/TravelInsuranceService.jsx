import React from 'react';
import ServiceItem from './ServiceItem.jsx';

const TravelInsuranceService = () => (
    <ServiceItem
        icon="umbrella"
        header="You can expect everything. Purchase travel insurance!"
        description="You can expect everything. Purchase travel insurance!"
        price={ {
            amount: '25.00',
            currency: 'EUR',
        } }
    />
);

export default TravelInsuranceService;
