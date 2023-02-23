import React from "react";
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";

export default function PCICompliance() {
    const { t } = useTranslation()
    return (
        <>
        <div className="jumbotron">
            <Container>
                <h3 className="display-4">PCI Compliance</h3>
                <p className="lead">
                    All Information about how Hanban complies with the PCI standards and how your payment information is handled safely.
                </p>
            </Container>
            
        </div>
        <Container>
            <h2>We completely comply with the PCI standards when handling with customer payment data. </h2><br />
            Complying with PCI Standards means that <br />
            1. We use Stripe's Element integration, which is securely transmitted directly to Stripe without it passing through our servers. <br />
            2. We serve our payment pages securely using Transport Layer Security (TLS) so that they make use of HTTPS. <br />
            3. We review and validate our account's PCI compliance annually.<br /><br />

            Your payment information is handled safely by our integrated third party called Stripe. <br />
            You can learn more about Stripe at stripe.com <br /> <br />
            <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px"}} to="/">
                <i class="bi bi-chevron-double-left"></i>{t("see_more_foods")}
            </Link>
        </Container>
        </>
    )
}