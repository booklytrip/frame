/**
 * Component represents check-in button which opens a modal
 * form required to be filled to complete check-in process.
 *
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import withModal from '../../../../../lib/withModal';

import { Icon } from 'semantic-ui-react';
import CheckinForm from '../../../containers/service/tickets/CheckinForm.js';

import type { ModalDialogTrigger, Passenger } from '../../../../../types';

type CheckinButtonProps = {
    passenger: Passenger,
} & ModalDialogTrigger;

const Link = styled.a`
    color: #0085ca;
    border-bottom: 1px dashed #bfe0f2;
`;

const CheckinButton = ({
    open,
    onOpen,
    onClose,
    passenger,
}: CheckinButtonProps) => (
    <CheckinForm
        trigger={
            <span onClick={onOpen}>
                <Icon name="blue edit" />
                <Link href="#">
                    <FormattedMessage
                        id="booking.service.tickets.CheckinButton"
                        defaultMessage="Check-in registration"
                    />
                </Link>
            </span>
        }
        passenger={passenger}
        open={open}
        onClose={onClose}
    />
);

export default withModal(CheckinButton);
