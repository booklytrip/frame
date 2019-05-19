// The base colors
const color1 = 'rgba(198, 0, 126, 1)';
const color2 = 'rgba(6, 3, 141, 1)';
const color3 = 'rgba(0, 177, 232, 1)';
const color4 = 'rgba(219, 219, 219, 1)';
const color5 = 'rgba(145, 145, 145, 1)';

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
            color: color5,
        },
        // Last search request label style
        lastSearchItem: {
            background: color2,
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
            color: color5,
        },
        // Show more flight results button
        showMoreButton: {
            background: color1,
            color: color6,
        },
        // Special flights labels styles
        bestFlightLabel: {
            background: color3,
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
                checkinIcon: color1,

                payButton: {
                    background: color1,
                    color: color6,
                },
            },

            // Tickets stage
            tickets: {
                checkinButton: {
                    background: color1,
                    color: color6,
                },
            },
        },
    },
};

export default theme;
