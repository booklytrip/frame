import validator from 'validator';
import { has, set, isEmpty } from 'lodash';

export default function(values, { passenger }) {
    const errors = {};

    if (!has(values, 'nationality') || isEmpty(values.nationality)) {
        set(errors, 'nationality', true);
    }

    if (
        !has(values, 'birthDate') ||
        isEmpty(values.birthDate) ||
        !validator.isISO8601(values.birthDate)
    ) {
        set(errors, 'birthDate', true);
    }

    if (!has(values, 'documentType') || isEmpty(values.documentType)) {
        set(errors, 'documentType', true);
    }

    if (!has(values, 'documentNumber') || isEmpty(values.documentNumber)) {
        set(errors, 'documentNumber', true);
    }

    if (
        !has(values, 'documentIssueCountry') ||
        isEmpty(values.documentIssueCountry)
    ) {
        set(errors, 'documentIssueCountry', true);
    }

    if (
        !has(values, 'documentIssueDate') ||
        isEmpty(values.documentIssueDate) ||
        !validator.isISO8601(values.documentIssueDate)
    ) {
        set(errors, 'documentIssueDate', true);
    }

    if (
        !has(values, 'documentExpirationDate') ||
        isEmpty(values.documentExpirationDate) ||
        !validator.isISO8601(values.documentExpirationDate)
    ) {
        set(errors, 'documentExpirationDate', true);
    }

    if (!has(values, 'confirmed') || values.confirmed !== true) {
        set(errors, 'confirmed', true);
    }

    return errors;
}
