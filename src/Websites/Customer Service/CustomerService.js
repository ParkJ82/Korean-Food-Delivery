import React from "react";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"

export default function CustomerService() {
    const { t } = useTranslation()

    return (
        <div>
        <div className="jumbotron">
        <Container>

        <h3 className="display-4"> <i className="bi bi-info-circle"></i> {t("customer_service")}</h3>
        <p className="lead">
            {t("customer_service_description")}
        </p>

        </Container>
        
        <br />
        </div>
        <Container>
        <h2>{t("commonly_asked_questions")}</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h4>{t("question_one")}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        {t("answer_one")}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h4>{t("question_two")}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        {t("answer_two")}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <h4>{t("question_three")}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        {t("answer_three")}
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </Container>
        <br />
        <Container>

            

            <h2>{t("contacts")}: </h2>

            <h3>{t("contacts_description")}</h3>

            <h3> <i class="bi bi-telephone-plus-fill"></i> {t("phone_number")}: (561)-419-1811</h3>

            {/* <h3>{t("kakao_id")}: icewater745434</h3> */}

            <h3><i class="bi bi-inbox"></i> {t("email")}: hanbanfoods@gmail.com </h3>

            <br />

            <Link style={{ textDecoration: 'none', color: 'black', fontSize: "20px"}} to="/">
                <i class="bi bi-chevron-double-left"></i>{t("see_more_foods")}
            </Link>
            
        </Container>
        </div>
    )
}