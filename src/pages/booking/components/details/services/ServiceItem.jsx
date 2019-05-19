import React from 'react';

import { Icon } from 'semantic-ui-react';
import { Price } from '../../../../../components';

const styles = {
    title: {
        boxShadow: '-1px 0px 0px 0px rgba(34, 36, 38, 0.0980392)',
    },
    chevronIcon: {
        marginLeft: '15px',
    },
};

const ServiceItem = ({ icon, header, description, price }) => (
    <div className="ui secondary segment">
        <div className="ui grid">
            <div className="row">
                <div className="two wide center aligned middle aligned column">
                    <Icon name={`yellow image huge ${icon}`} />
                </div>
                <div className="ten wide column" style={styles.title}>
                    <div className="ui header">{header}</div>
                    <div className="description">{description}</div>
                </div>
                <div className="middle aligned right aligned four wide column">
                    <Price price={price} />
                    <Icon name="chevron down" style={styles.chevronIcon} />
                </div>
            </div>
        </div>
    </div>
);

ServiceItem.propTypes = {
    icon: React.PropTypes.string.isRequired,
    header: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    price: React.PropTypes.object.isRequired,
};

export default ServiceItem;
