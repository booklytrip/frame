import { darken } from 'polished';

// The base colors
const color1 = 'rgba(205, 220, 17, 1)';
const color2 = 'rgba(17, 22, 94, 1)';
const color3 = 'rgba(6, 10, 48, 0.7)';

// Additional colors
const color4 = '#FFFFFF';

const theme = {
    // Styles of common components
    segment: {
        borderTopColor: color1,
    },

    // Main layout styling
    layout: {
        language: {
            color: color4,
        },
    },

    // Page styling
    search: {
        // The background of search page
        background: color1,
        // Style of search form action button
        searchButton: {
            background: darken(0.1, color1),
            color: color4,
        },
        // Last search request label style
        lastSearchItem: {
            background: darken(0.1, color1),
            color: color4,
        },
        fieldLabel: {
            color: color4,
        },
    },
    flights: {
        // Flight results header styles
        headerCityName: color2,
        headerDivider: color2,
        // Flight booking button
        bookButton: {
            background: color3,
            color: color4,
        },
        // Show more flight results button
        showMoreButton: {
            background: color1,
            color: color4,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color1,
            color: color4,
        },
        directFlightLabel: {
            background: color2,
            color: color4,
        },
        // The main color of filters
        filters: color1,

        preloading: {
            header: color1,
            spinner: color1,
            icon: color2,
        },
    },
    booking: {
        header: color2,
        stepsBadge: {
            color: color2,
            borderColor: color2,
        },
        activeStepText: {
            color: color2,
        },

        // Page where user provide personal data
        details: {
            checkoutButton: {
                background: color1,
                color: color4,
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
                    color: color4,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color1,
                    color: color4,
                },
            },
        },
    },
};

export default theme;
