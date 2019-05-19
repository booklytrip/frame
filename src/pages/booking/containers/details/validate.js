import { defineMessages } from 'react-intl';
import { isEmpty, isEmail, isAlpha, isNumeric } from 'validator';
import { has, set, get, each } from 'lodash';

const intlMessages = {
    contact: {
        fullName: defineMessages({
            isEmpty: {
                id: 'booking.details.ContactInformation.fullName.isEmpty',
                defaultMessage: 'Enter your name',
            },
            isInvalid: {
                id: 'booking.details.ContactInformation.fullName.isInvalid',
                defaultMessage: 'Enter only latin letters',
            },
        }),
        email: defineMessages({
            isEmpty: {
                id: 'booking.details.ContactInformation.email.isEmpty',
                defaultMessage: 'Enter your email',
            },
            isInvalid: {
                id: 'booking.details.ContactInformation.email.isInvalid',
                defaultMessage: 'Please enter a valid email address',
            },
        }),
        phone: {
            countryCode: defineMessages({
                isEmpty: {
                    id: 'booking.details.ContactInformation.phone.countryCode.isEmpty',
                    defaultMessage: 'Select country code',
                },
            }),
            number: defineMessages({
                isEmpty: {
                    id: 'booking.details.ContactInformation.phone.number.isEmpty',
                    defaultMessage: 'Enter phone number',
                },
                isInvalid: {
                    id: 'booking.details.ContactInformation.phone.number.isInvalid',
                    defaultMessage: 'Please enter a valid phone number',
                },
            }),
        },
    },
    passenger: {
        title: defineMessages({
            isEmpty: {
                id: 'booking.details.PassengerInformation.title.isEmpty',
                defaultMessage: 'Select your title',
            },
        }),
        firstName: defineMessages({
            isEmpty: {
                id: 'booking.details.PassengerInformation.firstName.isEmpty',
                defaultMessage: 'Enter your first name',
            },
            isInvalid: {
                id: 'booking.details.PassengerInformation.firstName.isInvalid',
                defaultMessage: 'Enter only latin letters',
            },
        }),
        lastName: defineMessages({
            isEmpty: {
                id: 'booking.details.PassengerInformation.lastName.isEmpty',
                defaultMessage: 'Enter your last name',
            },
            isInvalid: {
                id: 'booking.details.PassengerInformation.lastName.isInvalid',
                defaultMessage: 'Enter only latin letters',
            },
        }),
    },
};

export default (values, { flight, intl, ...props }) => {
    const errors = {};

    // Validate contact form
    const contactFullName = 'contact.fullName';
    if (
        !has(values, contactFullName) || isEmpty(get(values, contactFullName))
    ) {
        set(errors, contactFullName, intlMessages.contact.fullName.isEmpty);
    } else if (!isAlpha(get(values, contactFullName))) {
        set(errors, contactFullName, intlMessages.contact.fullName.isInvalid);
    }

    const contactEmail = 'contact.email';
    if (!has(values, contactEmail) || isEmpty(get(values, contactEmail))) {
        set(errors, contactEmail, intlMessages.contact.email.isEmpty);
    } else if (!isEmail(get(values, contactEmail))) {
        set(errors, contactEmail, intlMessages.contact.email.isInvalid);
    }

    const contactPhoneCode = 'contact.phone.countryCode';
    const contactPhoneNumber = 'contact.phone.number';

    if (
        !has(values, contactPhoneCode) || isEmpty(get(values, contactPhoneCode))
    ) {
        set(
            errors,
            'contact.phone',
            intlMessages.contact.phone.countryCode.isEmpty,
        );
    } else if (
        !has(values, contactPhoneNumber) ||
        isEmpty(get(values, contactPhoneNumber))
    ) {
        set(errors, 'contact.phone', intlMessages.contact.phone.number.isEmpty);
    } else if (!isNumeric(get(values, contactPhoneNumber))) {
        set(
            errors,
            'contact.phone',
            intlMessages.contact.phone.number.isInvalid,
        );
    }

    // Validate passengers forms
    const types = {
        adults: 'ADULT',
        children: 'CHILD',
        infants: 'INFANT',
    };

    const { general: { passengers } } = flight;
    each(passengers, (count, type) => {
        for (let i = 0; i < count; i++) {
            const title = `passengers.${types[type]}[${i}].title`;
            if (!has(values, title) || isEmpty(get(values, title))) {
                set(errors, title, intlMessages.passenger.title.isEmpty);
            }

            const firstName = `passengers.${types[type]}[${i}].firstName`;
            if (!has(values, firstName) || isEmpty(get(values, firstName))) {
                set(
                    errors,
                    firstName,
                    intlMessages.passenger.firstName.isEmpty,
                );
            } else if (!isAlpha(get(values, firstName))) {
                set(
                    errors,
                    firstName,
                    intlMessages.passenger.firstName.isInvalid,
                );
            }

            const lastName = `passengers.${types[type]}[${i}].lastName`;
            if (!has(values, lastName) || isEmpty(get(values, lastName))) {
                set(errors, lastName, intlMessages.passenger.lastName.isEmpty);
            } else if (!isAlpha(get(values, lastName))) {
                set(
                    errors,
                    lastName,
                    intlMessages.passenger.lastName.isInvalid,
                );
            }
        }
    });

    return errors;
};
