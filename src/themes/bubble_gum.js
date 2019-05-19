// The base colors
const color1 = 'rgba(216, 226, 220, 1)';
const color2 = 'rgba(255, 229, 217, 1)';
const color3 = 'rgba(255, 202, 212, 1)';
const color4 = 'rgba(244, 172, 183, 1)';
const color5 = 'rgba(157, 129, 137, 1)';

// Additional colors
const color6 = '#FFFFFF';
const color7 = 'rgba(0,0,0,.6)';

const theme = {
    // Styles of common components
    segment: {
        borderTopColor: color4,
    },

    // Main layout styling
    layout: {
        language: {
            color: color7,
        },
    },

    // Page styling
    search: {
        // The background of search page
        background: color3,
        // Style of search form action button
        searchButton: {
            background: color4,
            color: color7,
        },
        // Last search request label style
        lastSearchItem: {
            background: color4,
            color: color7,
        },
        fieldLabel: {
            color: color7,
        },
    },
    flights: {
        // Flight results header styles
        headerCityName: color4,
        headerDivider: color4,
        // Flight booking button
        bookButton: {
            background: color4,
            color: color7,
        },
        // Show more flight results button
        showMoreButton: {
            background: color5,
            color: color6,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color1,
            color: color7,
        },
        directFlightLabel: {
            background: color3,
            color: color7,
        },
        // The main color of filters <controls></controls>
        filters: color4,

        preloading: {
            header: color3,
            spinner: color3,
            icon: color2,
        },
    },
    booking: {
        header: color4,
        stepsBadge: {
            color: color5,
            borderColor: color5,
        },
        activeStepText: {
            color: color5,
        },

        // Page where user provide personal data
        details: {
            checkoutButton: {
                background: color4,
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
                checkinIcon: color3,

                payButton: {
                    background: color4,
                    color: color7,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color3,
                    color: color7,
                },
            },
        },
    },
};

export default theme;
