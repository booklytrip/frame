import { lighten } from 'polished';

// The base colors
const color1 = 'rgba(100, 166, 189, 1)';
const color2 = 'rgba(144, 168, 195, 1)';
const color3 = 'rgba(173, 167, 201, 1)';
// const color4 = 'rgba(215, 185, 213, 1)';
const color5 = 'rgba(244, 202, 224, 1)';

// Additional colors
const color6 = '#FFFFFF';
const color7 = 'rgba(0,0,0,.6)';

const theme = {
    // Styles of common components
    segment: {
        borderTopColor: color1,
    },

    // Main layout styling
    layout: {
        language: {
            color: color6,
        },
    },

    // Page styling
    search: {
        // The background of search page
        background: color1,
        // Style of search form action button
        searchButton: {
            background: color2,
            color: color6,
        },
        // Last search request label style
        lastSearchItem: {
            background: lighten(0.1, color1),
            color: color6,
        },
        fieldLabel: {
            color: color6,
        },
    },
    flights: {
        // Flight results header styles
        headerCityName: color1,
        headerDivider: color1,
        // Flight booking button
        bookButton: {
            background: color2,
            color: color7,
        },
        // Show more flight results button
        showMoreButton: {
            background: color2,
            color: color6,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color5,
            color: color6,
        },
        directFlightLabel: {
            background: color3,
            color: color6,
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
                background: color2,
                color: color7,
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
                    background: color2,
                    color: color7,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color2,
                    color: color7,
                },
            },
        },
    },
};

export default theme;
