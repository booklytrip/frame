// The base colors
// const color1 = 'rgba(255, 205, 178, 1)';
const color2 = 'rgba(255, 180, 162, 1)';
const color3 = 'rgba(229, 152, 155, 1)';
const color4 = 'rgba(181, 131, 141, 1)';
const color5 = 'rgba(109, 104, 117, 1)';

// Additional colors
const color6 = '#FFFFFF';
// const color7 = 'rgba(0,0,0,.6)';

const theme = {
    // Styles of common components
    segment: {
        borderTopColor: color2,
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
        background: color2,
        // Style of search form action button
        searchButton: {
            background: color3,
            color: color6,
        },
        // Last search request label style
        lastSearchItem: {
            background: color3,
            color: color6,
        },
        fieldLabel: {
            color: color6,
        },
    },
    flights: {
        // Flight results header styles
        headerCityName: color3,
        headerDivider: color3,
        // Flight booking button
        bookButton: {
            background: color3,
            color: color6,
        },
        // Show more flight results button
        showMoreButton: {
            background: color5,
            color: color6,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color4,
            color: color6,
        },
        directFlightLabel: {
            background: color3,
            color: color6,
        },
        // The main color of filters
        filters: color2,

        preloading: {
            header: color2,
            spinner: color2,
            icon: color2,
        },
    },
    booking: {
        header: color3,
        stepsBadge: {
            color: color4,
            borderColor: color4,
        },
        activeStepText: {
            color: color4,
        },

        // Page where user provide personal data
        details: {
            checkoutButton: {
                background: color3,
                color: color6,
            },
        },

        // Self-service page
        service: {
            // Order number text color
            orderNumber: color2,

            // Payment stage
            payment: {
                // Icon that higlight selected payment method
                checkinIcon: color2,

                payButton: {
                    background: color3,
                    color: color6,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color3,
                    color: color6,
                },
            },
        },
    },
};

export default theme;
