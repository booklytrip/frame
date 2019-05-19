// The base colors
const color1 = 'rgba(30, 138, 223, 1)';
const color2 = 'rgba(7, 53, 144, 1)';
const color3 = 'rgba(255,255,255,.3)';
const color4 = 'rgba(241, 201, 51, 1)';
const color5 = 'rgba(207, 46, 29, 1)';

// Additional colors
const color6 = '#FFFFFF';

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
        background: color1,
        // Style of search form action button
        searchButton: {
            background: color4,
            color: color2,
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
        headerCityName: color2,
        headerDivider: color2,
        // Flight booking button
        bookButton: {
            background: color4,
            color: color2,
        },
        // Show more flight results button
        showMoreButton: {
            background: color1,
            color: color6,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color5,
            color: color6,
        },
        directFlightLabel: {
            background: color2,
            color: color6,
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
                background: color4,
                color: color2,
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
                    background: color4,
                    color: color2,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color4,
                    color: color2,
                },
            },
        },
    },
};

export default theme;
