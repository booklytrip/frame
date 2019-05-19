import { lighten } from 'polished';

// The base colors
const color1 = 'rgba(14, 141, 204, 1)';
const color2 = 'rgba(29, 170, 240, 1)';
const color3 = 'rgba(251, 189, 8, 1)';
const color4 = 'rgba(242, 113, 28, 1)';
const color5 = 'rgba(255, 255, 255, 1)';

const theme = {
    // Styles of common components
    segment: {
        borderTopColor: color1,
    },

    // Main layout styling
    layout: {
        language: {
            color: color5,
        },
    },

    // Page styling
    search: {
        // The background of search page
        background: color1,
        // Style of search form action button
        searchButton: {
            background: color4,
            color: color5,
        },
        // Last search request label style
        lastSearchItem: {
            background: lighten(0.1, color1),
            color: color5,
        },
        fieldLabel: {
            color: color5,
        },
    },
    flights: {
        // Flight results header styles
        headerCityName: color1,
        headerDivider: color1,
        // Flight booking button
        bookButton: {
            background: color3,
            color: color5,
        },
        // Show more flight results button
        showMoreButton: {
            background: color1,
            color: color5,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color3,
            color: color5,
        },
        directFlightLabel: {
            background: color1,
            color: color5,
        },
        // The main color of filters
        filters: color1,

        preloading: {
            header: color1,
            spinner: color1,
            icon: color1,
        },
    },
    booking: {
        header: color1,
        stepsBadge: {
            color: color1,
            borderColor: color1,
        },
        activeStepText: {
            color: color1,
        },

        // Page where user provide personal data
        details: {
            checkoutButton: {
                background: color1,
                color: color5,
            },
        },

        // Self-service page
        service: {
            // Order number text color
            orderNumber: color2,

            // Payment stage
            payment: {
                // Icon that higlight selected payment method
                checkinIcon: color1,

                payButton: {
                    background: color1,
                    color: color5,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color1,
                    color: color5,
                },
            },
        },
    },
};

export default theme;
