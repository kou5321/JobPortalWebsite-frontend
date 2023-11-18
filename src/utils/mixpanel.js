import mixpanel from "mixpanel-browser";

mixpanel.init("35895f1959566aa51147f834bc722c70", {
    debug: process.env.NODE_ENV !== "production",
});

export default mixpanel;