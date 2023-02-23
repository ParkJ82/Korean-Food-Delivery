import React, {useState} from "react";
import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import Modal from "react-bootstrap/Modal"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function PurchasePolicy() {
    const { t } = useTranslation()

    const [policyModalOpen, setPolicyModalOpen] = useState(false)

    return (
        <>
            <div className="jumbotron">
                <Container>
                    <h3 className="display-4">{t("fulfillment_policy")}</h3>
                    <p className="lead">
                        {t("purchase_policy_description")}
                    </p>
                </Container>
                
            </div>
            <Container>
                <h1><i class="bi bi-receipt-cutoff"></i> {t("purchases")}</h1>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h4>{t("refunds")}</h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            {t("refunds_description")}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <h4>{t("returns")}</h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            {t("returns_description")}
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <h4>{t("cancellations")}</h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            {t("cancellations_description")}
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    
                </Accordion>

                <br />
                <br />

                <h1><i className="bi bi-truck"></i> {t("delivery_policy")}</h1>
                <h3>{t("delivery_policy_description")}
                <strong><Link onClick={() => setPolicyModalOpen(true)}>{t("delivery_policy_link")}</Link></strong>
                {t("delivery_policy_description_two")}
                </h3>

                <br />
                <br />

                <h2>{t("full_version")}</h2>

                <h4>RETURNS</h4> <br />

                We do not accept returns under any conditions. However, we do accept refunds under certain conditions.  <br /> <br />

                <h4>Deliveries</h4><br />

                We are a service that collects all the Korean food delivery service providers, and thus we do not have a fixed timeline for the shipping services. The timelines for each individual delivery service can be found <Link onClick={() => setPolicyModalOpen(true)}>here</Link>.<br /><br />

                <h4>Cancellations</h4><br />

                We do not accept returns under any conditions. However, we do accept refunds under certain conditions. Since we are a New York City based company, once more be careful not to purchase the foods in different areas because we will not be able to offer you a cancellation in that situation. <br /><br />

                <h4>Refunds</h4><br />

                Damages and Issues <br /> <br />

                Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we may evaluate the issue and make it right. <br />
                Please get in touch if you have questions or concerns about your specific item. <br /><br />

                We will notify you once we’ve inspected your request to let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.<br /><br />

                If more than 15 business days have passed since we’ve approved your return, please contact us at hanbanfoods@gmail.com. <br /><br />

                You can always contact us for any additional questions at hanbanfoods@gmail.com.<br /><br />


                <br />
                <br />

                <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px"}} to="/">
                    <i class="bi bi-chevron-double-left"></i>{t("see_more_foods")}
                </Link>
                
            </Container>
            <Modal show={policyModalOpen} onHide={() => setPolicyModalOpen(false)}>
                <Modal.Header closeButton>
                    <h3>{t("all_delivery_policies")}</h3>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        </>
    )
}