import React from "react";
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";



export default function SecurityPolicy() {
    const { t } = useTranslation()

    return (
        <>
        <div className="jumbotron">
            <Container>
                <h3 className="display-4">{t("privacy_policy")}</h3>
                <p className="lead">
                    {t("privacy_policy_description")}
                </p>
            </Container>
            
        </div>
        <Container>

        <h2>{t("full_version")}</h2>

        <br />

        <h3>Hanban Privacy Policy</h3> <br />

        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from http://hanbanfoods.com (the “Site”). <br /><br />

        PERSONAL INFORMATION WE COLLECT <br /><br />

        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.” <br /><br />

        We collect Device Information using the following technologies: <br /><br />

            - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.<br />
            - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.<br />
            - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.<br />
            - "Session Storage" stores key/value pairs in the browser; the data is only stored for one session. <br /><br />
        Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, Apple Pay, Google Pay, and Link), kakao id, and phone number. We refer to this information as “Order Information.”<br /><br />

        When a user first registers, we collect their account information (name, user id, password, phone number, kakao id). We only store the data user id and password in the user login process to verify the user. We use the name, phone number, and kakao id to help users simplify the purchase process by adding an optional feature to prefill the purchase information. The logged-in user additionally acquires the ability to rate each delivery service. We collect the rating and display the ratings to help other users choose what delivery service to use.<br /><br />

        When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.<br /><br />

        HOW DO WE USE YOUR PERSONAL INFORMATION?<br /><br />

        We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).  Additionally, we use this Order Information to: <br />
        Communicate with you;<br />
        Screen our orders for potential risk or fraud; and<br />
        When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.<br />
        The Order Information (Name, Phone Number, Kakao Id, Shipping Address) is distributed to the corresponding delivery service(s) to help the delivery services identify and contact the user about their delivery information. The delivery service uses the shipping address to verify and send the product to the address.<br />
        We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).<br />
        Through the cookie, we store the login token and the user’s preferred language. The token is used to verify and keep track of the login status of the user. The preferred language (Korean or English) is used to display the website in the user’s preferred language. The shopping cart is used to send the shopping cart to each corresponding delivery service that the user used when the user completed the purchase: the delivery service collects the shopping cart and prepares the corresponding food for delivery to the user.<br /><br />
        SHARING YOUR PERSONAL INFORMATION<br /><br />

        We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe as our payment processor--you can read more about how Stripe uses your Personal Information here: https://stripe.com/privacy.<br /><br />

        Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful requests for information we receive, or to otherwise protect our rights.<br /><br />

        DO NOT TRACK<br />
        Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.<br /><br />

        DATA RETENTION<br />
        When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.<br /><br />

        MINORS<br />
        The Site is not intended for individuals under the age of 13.<br /><br />

        CHANGES<br />
        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.<br /><br />

        CONTACT US<br />
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at hanbanfoods@gmail.com or by mail using the details provided below:<br /><br />

        33 Third Ave, New York, NY, 10003, United States
        <br /><br />
        <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px"}} to="/">
            <i class="bi bi-chevron-double-left"></i>{t("see_more_foods")}
        </Link>
        </Container>
    </>
    )
}