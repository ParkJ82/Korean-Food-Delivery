import React, { useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BottomWidget() {

    const { t } = useTranslation()

    const [deliveryContactOpen, setDeliveryContactOpen] = useState(false)

    function handleClose() {
        setDeliveryContactOpen(false)
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={3}>
                    <h4>{t("customer_service")}</h4>
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/customerservice" className="text-muted" style={{ textDecoration: 'none' }}>{t("contacts")}</Link>
                    <br />
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/purchasepolicy" className="text-muted" style={{ textDecoration: 'none' }}>{t("fulfillment_policy")}</Link>
                    <br />
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/securitypolicy" className="text-muted" style={{ textDecoration: 'none' }}>{t("privacy_policy")}</Link>
                    <br />
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/pcicompliance" className="text-muted" style={{ textDecoration: 'none' }}>{t("PCI_compliance")}</Link>
                    <br />
                    <br />
                </Col>
                <Col md={3}>
                    <h4>{t("delivery_service")}</h4>
                    <Link onClick={() => {setDeliveryContactOpen(true)}} className="text-muted" style={{ textDecoration: 'none' }}>{t("register_your_delivery_service")}</Link>
                    <br />
                    <br />
                </Col>
                <Col md={3}>
                    <h4>{t("careers")}</h4>
                    <Link className="text-muted" style={{ textDecoration: 'none', opacity: 0.3, pointerEvents: "none" }}>{t("job_postings")}</Link>
                    <br />
                    <Link className="text-muted" style={{ textDecoration: 'none', opacity: 0.3, pointerEvents: "none" }}>{t("who_we_look_for")}</Link>
                    <br />
                    <br />
                </Col>
                <Col md={3}>
                    <h4>{t("links")}:</h4>
                    <h4>
                    <i className="bi bi-instagram" ></i>
                    &nbsp;
                    <i className="bi bi-facebook"></i>
                    &nbsp;
                    <i className="bi bi-linkedin" style={{ opacity: 0.3, pointerEvents: "none" }}></i>
                    </h4>
                    <h4>{t("accepted_cards")}:</h4>
                    <a title="Mastercard Inc. and Pentagram Design, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Mastercard-logo.svg"><img height="30" alt="Mastercard-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png" /></a>
                    &nbsp;
                    <a title="Discover Financial Services, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Discover_Card_logo.svg"><img height="30" alt="Discover Card logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/64px-Discover_Card_logo.svg.png" /></a>
                    &nbsp;
                    <a title="Pentagram Studio, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:American_Express_logo_(2018).svg"><img height="30" alt="American Express logo (2018)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/512px-American_Express_logo_%282018%29.svg.png" /></a>
                    &nbsp;
                    <a title="JCB, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:JCB_logo.svg"><img height="30" alt="JCB logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/256px-JCB_logo.svg.png" /></a>
                    &nbsp;
                    <a title="UnionPay, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:UnionPay_logo.svg"><img height="30" alt="UnionPay logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/256px-UnionPay_logo.svg.png" /></a>
                    &nbsp;
                    <a title="Visa Incorporated KUsam at en.wikipedia, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Visa_Inc._logo.svg"><img height="30" alt="Visa Inc. logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png" /></a>
                </Col>
            </Row>
            <br />
            <br />
        </Container>

        <Modal show={deliveryContactOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                {t("delivery_register")}
            </Modal.Header>
            <Modal.Body>
                {t("email")}: hanbanfoods@gmail.com
                <br />
                {t("kakao_id")}: icewater745434
            </Modal.Body>
        </Modal> 
        </>
    )
}